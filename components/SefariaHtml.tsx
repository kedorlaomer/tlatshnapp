// Note: This is a hack. We parse Sefaria's subset of HTML into React components instead of using a WebView.

import { StyleSheet, Text, type TextProps } from 'react-native';

import { baseFontSize } from '@/constants/Fonts';

export type SefariaHtmlProps = TextProps & {
    text: string,
    color?: string,
};

function span(x: string, ch: string)  {
    const rv = x.split(ch)   
    if (rv.length == 1) {       
        return [x, ""]          
    }                           
                                 
    return [rv[0], rv.slice(1, rv.length).join(ch)]
}

const ENTITIES = new Map([
    ["&nbsp;", " "],
    ["&thinsp;", " "],
    ["<br>", ""], // strictly speaking, not an entity; we simply ignore it
]);

function cleanEntities(x: string):string {
    for (const [k, v] of ENTITIES.entries()) {
        x = x.replaceAll(k, v)
    }
    return x;
}

export function SefariaHtml({
    style,
    color,
    text,
} : SefariaHtmlProps) {

    const COMPONENT_STYLES: Record<string, any> = {
        "<b": { fontWeight: 'bold', fontSize: baseFontSize },
        "<i": { display: 'none' },
        "<big": { fontSize: baseFontSize+4 },
        "<small": { fontSize: baseFontSize-4 },
        "<sup": { fontSize: baseFontSize-2 },
        "<span": { fontSize: baseFontSize },
    };

    let accu: JSX.Element[] = []
    text = cleanEntities(text);

    while (text.length > 0 && text != "<") {
        let componentStyle: any = { ...style, color }
        // process closing tags
        while (text.startsWith("</")) {
            text = span(text, ">")[1]
        }
        // process leading tags
        while (text.startsWith("<")) {

            const tag = text.match(/<[a-z]*/);
            if (tag && tag.length > 0) {
                const tagStyle = COMPONENT_STYLES[tag[0]];
                if (tagStyle) {
                    componentStyle = { ...componentStyle, ...tagStyle };
                }
            }
            text = span(text, ">")[1];
        }

        let formattedText: string
        [formattedText, text] = span(text, "<")

        accu.push(<Text key={text.length} style={componentStyle}>{formattedText}</Text>)
        text = "<" + text;
    }

    return <Text style={{ width: '80%' }}>{accu}</Text>;
}

const styles = StyleSheet.create({
  invisible: {
    display: 'none',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: baseFontSize,
  },
  big: {
      fontSize: baseFontSize+4,
  },
  small: {
      fontSize: baseFontSize-4,
  },
  normal: {
      fontSize: baseFontSize,
  },
   superscript: {
      fontSize: baseFontSize-2,
  }
});