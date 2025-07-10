import { Image } from 'expo-image';
import { View, Platform, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useRoute } from '@react-navigation/native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HomeButton } from '@/components/HomeButton';

import baseFontSize from '@/constants/Fonts';

import generalCalendarData from '@/assets/general_calendar.json';

import { Sidra } from '@/components/Sidra';

export default function SidraScreen() {
  const route = useRoute();
  const label = route.params?.label;
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <Sidra label={label} />
      <HomeButton />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
