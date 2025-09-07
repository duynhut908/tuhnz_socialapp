import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorBanner = ({ message }) => {
  if (!message) return null; // không render nếu không có lỗi

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f44336', // đỏ cảnh báo
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ErrorBanner;
