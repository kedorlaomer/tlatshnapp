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
  lightColor?: string;
  darkColor?: string;
}

const isWeb = process?.env?.EXPO_ENV === 'web';

const useStorage = isWeb ? 
  {
    getItem: async (key: string) => {
      return localStorage.getItem(key);
    },
    setItem: async (key: string, value: string) => {
      localStorage.setItem(key, value);
    },
  } : 
  {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  };


function formatExcelDate(excelDate: number | undefined | null, locale: string = 'en-US'): string {
    console.log('formatExcelDate called with:', excelDate, typeof excelDate);
    if (!excelDate) {
      console.log('Returning Invalid Date - no excelDate');
      return 'Invalid Date';
    }
    
    const excelEpoch = new Date('1899-12-31');
    const jsDate = new Date((excelDate - 1) * 24 * 60 * 60 * 1000 + excelEpoch.getTime());
    const result = jsDate.toLocaleDateString(locale);
    console.log('Date conversion result:', result);
    return result;
}

export function YearlyCalendar({
    lightColor = '#000000',
    darkColor = '#FFFFFF'
}: YearlyCalendarProps
) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  let color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  useEffect(() => {
    const downloadAndParseCalendar = async () => {
      let pairs: any[] = [];
      try {
        console.log('Starting calendar download...');
        const response = await fetch(CALENDAR_SOURCE);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer);
        console.log('Workbook sheets:', Object.keys(workbook.Sheets));
        
        const worksheet = workbook.Sheets['Yearly'];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);
        console.log('Total rows in Excel:', jsonData.length);
        
        if (jsonData.length > 0) {
          console.log('Column names:', Object.keys(jsonData[0]));
          console.log('First row (header):', jsonData[0]);
          if (jsonData.length > 1) {
            console.log('Second row (first data):', jsonData[1]);
          }
        }

        // skip header row
        pairs = jsonData.slice(1).map((row: any, index: number) => {
          const entry = {
            date: row.Date,
            sidra: row.Sidra,
            haftara: row.Haftara,
            label: row.Label
          };
          console.log(`Row ${index + 1}:`, entry);
          return entry;
        });

        console.log('Processed pairs count:', pairs.length);
        if (pairs.length > 0) {
          console.log('First processed pair:', pairs[0]);
        }
        setData(pairs);
      } catch (error) {
        console.error('Error in downloadAndParseCalendar:', error);
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
      let data = JSON.parse(await storage?.getItem("calendar") || 'null');
      if (lastVisit == undefined || new Date(lastVisit) < old || data == undefined) {
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

  console.log('Rendering YearlyCalendar with data length:', data.length);
  if (data.length > 0) {
    console.log('First data entry for rendering:', data[0]);
  }

  return (
    <View>
      {data.map((entry, index) => {
        console.log(`Rendering entry ${index}:`, entry);
        console.log(`Entry ${index} - date: ${entry.date}, label: ${entry.label}, sidra: ${entry.sidra}, haftara: ${entry.haftara}`);
        return (
          <View key={index} style={styles.calendar}>
            <Text style={[ {color}, styles.dateText ]}>{formatExcelDate(entry.date)}</Text>
              <CalendarEntry
                label={entry.label}
                sidra={entry.sidra}
                haftara={entry.haftara}
                lightColor={lightColor}
                darkColor={darkColor}
              />
          </View>
        );
      })}
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
  
  dateText: {
      textAlign: "right",
      paddingTop: 10,
  },

  calendar: { 
      flexDirection: 'row', 
      justifyContent: 'space-between' 
  }
});