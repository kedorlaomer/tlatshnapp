import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useThemeColor } from '@/hooks/useThemeColor';
import { baseFontSize } from '@/constants/Fonts';
import CalendarEntry from '@/components/CalendarEntry';

const CALENDAR_SOURCE = 'https://dl.dropboxusercontent.com/scl/fi/la2ykugg7v3qozg0f5yxb/Calendar.xlsx?rlkey=qbp5tlcme2e7hdxdjc1vux036&st=thetk3fz&dl=1';

export type YearlyCalendarProps = {
  lightColor: string;
  darkColor: string;
}

const isWeb = process?.env?.EXPO_ENV === 'web';

const useStorage = isWeb ? 
  {
    getItem: async (key) => {
      return localStorage.getItem(key);
    },
    setItem: async (key, value) => {
      localStorage.setItem(key, value);
    },
  } : 
  {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  };


function formatExcelDate(excelDate: number, locale: string = navigator.language || navigator.userLanguage): string {
    const excelEpoch = new Date('1899-12-31');
    const jsDate = new Date((excelDate - 1) * 24 * 60 * 60 * 1000 + excelEpoch.getTime());

    return jsDate.toLocaleDateString(locale);
}

export function YearlyCalendar({
    lightColor,
    darkColor
}: YearlyCalendarProps
) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  let color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  useEffect(() => {
    const downloadAndParseCalendar = async () => {
      let pairs;
      try {
        const response = await fetch(CALENDAR_SOURCE);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer);
        const worksheet = workbook.Sheets['Yearly'];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // skip header row
        pairs = jsonData.slice(1).map((row) => [row.Date, row.Sidra]);

        setData(pairs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

      return pairs;
    };

    async function go() {
      // call downloadAndParseCalendar with cache
      const storage = useStorage;
      const lastVisit = await storage?.getItem("last_date");
      const old = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000); // three days old
      let data = JSON.parse(await storage?.getItem("calendar"));
      if (lastVisit == undefined || lastVisit < old || data == undefined) {
          data = await downloadAndParseCalendar();
          storage?.setItem("last_date", new Date().toISOString())
          if (data != undefined) {
              storage?.setItem("calendar", JSON.stringify(data))
          }
      } 

      if (data != undefined) {
          setData(data);
      }
      setLoading(false);
    }

    go();
  }, []);

  if (loading) {
    return <Text style={[ {color}, styles.loading ]}>Loading...</Text>;
  }

  return (
    <View>
      {data.map((pair, index) => (
        <View key={index} style={[ {color}, styles.calendar ]}>
          <Text style={[ {color}, styles.calendar ]}>{formatExcelDate(pair[0])}</Text>
            <CalendarEntry
              key={index}
              label={pair[1]}
              lightColor={lightColor}
              darkColor={darkColor}
            />
        </View>
      ))}
    </View>
  );
};

export default YearlyCalendar;

const styles = StyleSheet.create({
    loading: {
      fontSize: baseFontSize+8,
      fontWeight: 'bold',
      padding: 10,
      textAlign: "right",
  },

  calendar: { 
      flexDirection: 'row', 
      justifyContent: 'space-between' 
  }
});
