import { NavigationContainer, DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import { RootNavigator } from '@/app/stack/_layout.tsx';

import GeneralCalendarScreen from '@/app/stack/calendar';
import SidraScreen from '@/app/stack/index';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const Stack = createStackNavigator();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name="TlattShnapp"
            component={SidraScreen}
          />
          <Stack.Screen
            name="calendar"
            component={GeneralCalendarScreen}
          />
        </Stack.Navigator>
      </View>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'auto',
  },
});
