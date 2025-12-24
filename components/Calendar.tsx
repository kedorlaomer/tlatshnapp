import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarEntry from '@/components/CalendarEntry';

export type CalendarProps = {
  labels: string[];
  lightColor: string;
  darkColor: string;
};

export function Calendar({ labels, lightColor, darkColor }: CalendarProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1); // -1 indicates no selection

  return (
    <View style={styles.container}>
      {labels.map((label, index) => (
      typeof(label) === "string"?
        <CalendarEntry
          key={index}
          label={label}
          lightColor={lightColor}
          darkColor={darkColor}
        /> : label
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    padding: 10,
  },
});

