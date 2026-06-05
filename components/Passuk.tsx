import { View, StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { SefariaHtml } from '@/components/SefariaHtml';
import { ExternalLink } from '@/components/ExternalLink';
import { baseFontSize } from '@/constants/Fonts';
import parseSource from '@/helpers/parseSource';
import simplifySource from '@/helpers/simplifySource';

function sourceUrl(source: string): string {
  const [book, chapter, verse] = parseSource(source);
  const bookSlug = book.replace(/[^a-zA-Zא-ת ]/g, '').trim().replace(/\s+/g, '.');
  return `https://www.sefaria.org/${encodeURIComponent(`${bookSlug}.${chapter}.${verse}`)}`;
}

export type PassukProps = TextProps & {
    source: string,
    text: string,
    isFirst?: boolean,
    lightColor?: string,
    darkColor?: string,
};

export function Passuk({
  style,
  lightColor,
  darkColor,
  source,
  text,
  isFirst = true,
  ...rest
}: PassukProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const displaySource = isFirst ? source : simplifySource(source);

  return (
    <View key={source} style={styles.container}>
        <ExternalLink href={sourceUrl(source)}>
          <Text style={[
              { color },
              styles.source
          ]}>
            {displaySource}{'    '}
          </Text>
        </ExternalLink>
      <SefariaHtml 
        style={styles.text}
        color={color}
        text={text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: baseFontSize,
    lineHeight: baseFontSize+8,
    textAlign: 'right',
  },      
  source: {
      fontSize: baseFontSize-10,
      marginLeft: 10,
      maxWidth: '20%',
      flexShrink: 1,
      paddingTop: baseFontSize / 2,
      paddingRight: 4,
      textAlign: 'right',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});
