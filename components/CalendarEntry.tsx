import { TouchableOpacity, View, StyleSheet, Text, type TextProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { baseFontSize } from '@/constants/Fonts';

export type CalendarEntryProps = TextProps & {
  label?: string;
  sidra?: string;
  haftara?: string;
  lightColor: string;
  darkColor: string;
};

export default function CalendarEntry({
  label,
  sidra,
  haftara,
  lightColor,
  darkColor,
}: CalendarEntryProps) {
  console.log('CalendarEntry rendered with label:', label, 'sidra:', sidra, 'haftara:', haftara);

  let textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const borderColor = useThemeColor({ light: '#ccc', dark: '#555' }, 'text');
  const backgroundColor = useThemeColor({ light: '#fff', dark: '#333' }, 'background');
  
  const styles = StyleSheet.create({
      button: {
      borderWidth: 1,
      borderColor: borderColor,
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 5,
      margin: 5,
      backgroundColor: backgroundColor,
    },
    buttonText: {
      fontSize: baseFontSize,
      color: textColor,
    },
  });


  const navigation = useNavigation();
  const handlePress = () => {
    // @ts-ignore
    navigation.navigate('calendar', { label: label, sidra: sidra, haftara: haftara });
  }

  // Use label if provided and non-empty, otherwise use sidra
  const displayLabel = (label && label.trim() !== '') ? label : sidra;

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{displayLabel}</Text>
    </TouchableOpacity>
  );
}