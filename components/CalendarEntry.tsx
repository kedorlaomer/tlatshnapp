import { TouchableOpacity, View, StyleSheet, Text, type TextProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { baseFontSize } from '@/constants/Fonts';

export type CalendarEntryProps = TextProps & {
  label: string;
  onSelect: () => void;
  lightColor: string;
  darkColor: string;
};

export default function CalendarEntry({
  label,
  onSelect,
  style,
  lightColor,
  darkColor,
}: CalendarEntryProps) {

  let bgColor = useThemeColor({ dark: lightColor, light: darkColor }, 'text');
  const styles = StyleSheet.create({
      button: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 5,
      margin: 5,
    },
    buttonText: {
      fontSize: baseFontSize,
      color: bgColor,
    },
  });


  const navigation = useNavigation();
  const handlePress = () => {
         navigation.navigate('calendar', { label: label });
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}
