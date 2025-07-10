import { StyleSheet, Text } from 'react-native';

import generalCalendarData from '@/assets/general_calendar';
import hebrew from '@/assets/hebrew';
import { Alia } from '@/components/Alia';
import { baseFontSize } from '@/constants/Fonts';
import { useThemeColor } from '@/hooks/useThemeColor';

export type SidraProps = {
    label: string,
}

export function Sidra({
    label,
    lightColor,
    darkColor,
    }: SidraProps
) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const KEY = "Name of the Sidra";
    const isDefined = (x) => x != "";
    const readingData = generalCalendarData.find((x) => x[KEY] == label);
    const aliot_start = [1,2,3,4,5,6,7].map((x) => `Beginning of ${x}. Aliya`).map((x) => readingData[x]).filter(isDefined)
    const aliot_end = [1,2,3,4,5,6,7].map((x) => `End of ${x}. Aliya`).map((x) => readingData[x]).filter(isDefined)

    let rv = [
        <Text 
          key="Heading key"
          style={[
          { color },
          styles.heading
        ]}>{label}</Text>
    ];
    for (let i = 0; i < aliot_start.length; i++) {
        const heading = `${i+1}.` 
        rv.push(<Alia key={i} psukim={hebrew} from_={aliot_start[i]} to_={aliot_end[i]} heading={heading}/>)
    }

    return rv
}

const styles = StyleSheet.create({
    heading: {
      fontSize: baseFontSize+12,
      fontWeight: 'bold',
      padding: 10,
      textAlign: "right",
  }
});
