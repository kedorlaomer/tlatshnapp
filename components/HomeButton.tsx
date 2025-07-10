import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { baseFontSize } from '@/constants/Fonts';

export function HomeButton({
  style,
  lightColor,
  darkColor,
}) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('TlattShnapp');
  };

  return <TouchableOpacity onPress={onPress}>
      <Text style={[
          { color },
          styles.homeButton
      ]}>→</Text>
      </TouchableOpacity>
}

const styles = StyleSheet.create({
  homeButton: {
      fontSize: baseFontSize+20,
      textAlign: "right",
      margin: 20,
  }
});
