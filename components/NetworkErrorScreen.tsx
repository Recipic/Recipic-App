import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function NetworkErrorScreen() {
  return (
    <View style={styles.errorContainer}>
      <Image
        style={styles.image}
        source={require('../assets/icons/wifiSlash.png')}
      />
      <Text style={styles.errorText}>인터넷에 연결되어 있지 않아요</Text>
      <Text style={styles.errorSubText}>네트워크 환경을 확인해주세요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  errorSubText: {
    fontSize: 14,
    fontWeight: 'semibold',
    color: 'gray',
  },
  image: {
    width: 100,
    height: 100,
  },
});
