import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from '@/components/Spinner';

export default function FallbackUI() {
  return (
    <View style={styles.container}>
      <Spinner size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 10000,
  },
});
