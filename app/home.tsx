import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { Platform, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import NetworkErrorScreen from '@/components/NetworkErrorScreen';
import { WEB_URL } from '@/constants/webUrl';

export default function Home() {
  const { isConnected } = useLocalSearchParams();

  if (isConnected === 'false') {
    return <NetworkErrorScreen />;
  }

  return (
    <>
      <WebView
        textZoom={100}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: WEB_URL }}
        style={styles.webview}
        allowsBackForwardNavigationGestures={Platform.OS === 'ios'}
      />
    </>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
