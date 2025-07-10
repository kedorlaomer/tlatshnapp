import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const StartCounter = () => {
  const [count, setCount] = useState(0);
  const storage = useStorage;

  useEffect(() => {
    const loadAndIncrementCounter = async () => {
      try {
        const storedCount = await storage.getItem('appStartCount');
        let newCount;
        if (storedCount !== null) {
          newCount = parseInt(storedCount) + 1;
        } else {
          newCount = 1;
        }
        setCount(newCount);
        await storage.setItem('appStartCount', newCount.toString());
      } catch (error) {
        console.error(error);
      }
    };
    loadAndIncrementCounter();
  }, [storage]);

  return (
    <View style={styles.container}>
      <Text>App started {count} times</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartCounter;

