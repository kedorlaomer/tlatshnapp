import { StyleSheet, Text, View } from 'react-native';
import { Passuk } from '@/components/Passuk';
import extractSpan from '@/helpers/extractSpan.tsx';
import { useThemeColor } from '@/hooks/useThemeColor';
import { baseFontSize } from '@/constants/Fonts';

export type AliaProps = {
   psukim: Map<string, string>,
   from_: string,
   to_: string,
   heading: string
}

export function Alia({
   psukim,
   from_,
   to_,
   heading,
  lightColor,
  darkColor,
   ...rest
}: AliaProps) {

  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    return (
      <View>
        <Text style={[
          { color },
          styles.heading
        ]}>    
         {heading}{'    '}
      </Text>
          {
            extractSpan(psukim, from_, to_).map(([source, text]) => (
              <Passuk key={source} source={source} text={text}/>))
          }
      </View>
   );
}

const styles = StyleSheet.create({
    heading: {
      fontSize: baseFontSize+4,
      fontWeight: 'bold',
      padding: 10,
      textAlign: "right",
  }
});
