import { View, StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { SefariaHtml } from '@/components/SefariaHtml';
import { ExternalLink } from '@/components/ExternalLink';
import { baseFontSize } from '@/constants/Fonts';

export type PassukProps = TextProps & {
    source: string,
    text: string,
    lightColor?: string,
    darkColor?: string,
};

export function Passuk({
  style,
  lightColor,
  darkColor,
  source,
  text,
  ...rest
}: PassukProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <View key={source} style={styles.container}>
      <ExternalLink href={`https://www.sefaria.org/${encodeURIComponent(source)}`}>
        <Text style={[
            { color },
            styles.source
        ]}>    
           {source}{'    '}
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
      width: '20%',
  },
  container: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'flex-start',
  }
});
