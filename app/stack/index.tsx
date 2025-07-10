import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GeneralCalendar} from '@/components/GeneralCalendar';
import { YearlyCalendar} from '@/components/YearlyCalendar';
import StartCounter from '@/components/StartCounter';

import hebrew from '@/assets/hebrew.json';

export default function GeneralCalendarScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}>
      <YearlyCalendar/>
      <GeneralCalendar/>
      <StartCounter/>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
