// Note: This is a hack. We parse Sefaria's subset of HTML into React components instead of using a WebView.

import { View, StyleSheet, Text, type TextProps } from 'react-native';

import { baseFontSize } from '@/constants/Fonts';

export type SefariaHtmlProps = TextProps & {
    source: string,
    text: string,
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

function mergeStyles<T extends Record<string, any>>(style1: T, style2: T): T {
    return { ...style1, ...style2 };
}

export function SefariaHtml({
    style,
    color,
    text,
} : SefariaHtmlProps) {

    const COMPONENT_STYLES = new Map([
        ["<b", styles.bold],
        ["<i", styles.invisible],
        ["<big", styles.big],
        ["<small", styles.small],
        ["<sup", styles.superscript],
        ["<span",styles.normal],
    ]);

    let accu = []
    text = cleanEntities(text);

    while (text.length > 0 && text != "<") {
        let componentStyle = mergeStyles(style, {color})
        // process closing tags
        while (text.startsWith("</")) {
            text = span(text, ">")[1]
        }
        // process leading tags
        while (text.startsWith("<")) {

            const tag = text.match(/<[a-z]*/);
            if (tag.length > 0) {
                componentStyle = mergeStyles(componentStyle, COMPONENT_STYLES.get(tag[0]));
            }
            text = span(text, ">")[1];
        }

        let formattedText
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
      display: 'inline',
  },
   superscript: {
      baseline: 'sup',
      fontSize: baseFontSize-2,
  }
});

