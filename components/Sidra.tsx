import { StyleSheet, Text } from 'react-native';

import generalCalendarData from '@/assets/general_calendar.json';
import hebrewJson from '@/assets/hebrew.json';
import { Alia } from '@/components/Alia';
import { baseFontSize } from '@/constants/Fonts';
import { useThemeColor } from '@/hooks/useThemeColor';

// Convert the JSON object to a Map
const hebrew = new Map(Object.entries(hebrewJson));

export type SidraProps = {
    label?: string,
    sidra?: string,
    haftara?: string,
    lightColor?: string,
    darkColor?: string,
}

export function Sidra({
    label,
    sidra,
    haftara,
    lightColor = '#000000',
    darkColor = '#FFFFFF',
    }: SidraProps
) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    const KEY = "Name of the Sidra";
    const isDefined = (x: any) => x != "";
    
    // Use sidra for readingData if provided, otherwise use label
    const searchLabel = sidra || label || "";
    const readingData: any = generalCalendarData.find((x: any) => x[KEY] == searchLabel);
    console.log(`label = ${label}`);
    console.log(`sidra = ${sidra}`);
    console.log(`searchLabel = ${searchLabel}`);
    console.log(`readingData = ${readingData}`);
    
    if (!readingData) {
        return [<Text key="error" style={[{ color }, styles.heading]}>No data found for {searchLabel}</Text>];
    }
    
    const aliotStart = [1,2,3,4,5,6,7].map((x) => `Beginning of ${x}. Aliya`).map((x) => readingData[x]).filter(isDefined)
    const aliotEnd = [1,2,3,4,5,6,7].map((x) => `End of ${x}. Aliya`).map((x) => readingData[x]).filter(isDefined)
    
    let haftaraStart = readingData["Beginning of Haftara"]
    let haftaraEnd = readingData["End of Haftara"]
    
    // Use haftara override if provided
    if (haftara) {
      const haftaraParts = haftara.split('-');
      haftaraStart = haftaraParts[0]?.trim();
      haftaraEnd = haftaraParts[1]?.trim();
    }
    console.log(readingData)
    console.log(haftaraStart, haftaraEnd);

    // Use label for header if provided and non-empty, otherwise use sidra
    const displayLabel = (label && label.trim() !== '') ? label : sidra;

    let rv = [
        <Text 
          key="Heading key"
          style={[
          { color },
          styles.heading
        ]}>{displayLabel}</Text>
    ];
    for (let i = 0; i < aliotStart.length; i++) {
        const heading = `${i+1}.`
        rv.push(<Alia key={i} psukim={hebrew} from_={aliotStart[i]} to_={aliotEnd[i]} heading={heading} lightColor={lightColor} darkColor={darkColor}/>)
    }

    if (haftaraStart && haftaraEnd) {
        rv.push(<Alia key="haftara" psukim={hebrew} from_={haftaraStart} to_={haftaraEnd} heading="הפטרה" lightColor={lightColor} darkColor={darkColor}/>)
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