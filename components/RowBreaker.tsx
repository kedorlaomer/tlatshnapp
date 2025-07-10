import { View, StyleSheet } from 'react-native';

export const RowBreaker = () => {
  return <View style={styles.rowBreaker} />;
};

const styles = StyleSheet.create({
  rowBreaker: {
    flexBasis: '100%',
    height: 0,
  },
});
