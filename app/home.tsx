import React from 'react';
import { WebView } from 'react-native-webview';
import { Platform, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import NetworkErrorScreen from '@/components/NetworkErrorScreen';
import { WEB_URL } from '@/constants/webUrl';
import useWebViewLoader from '@/hooks/useWebViewLoader';
import FallbackUI from '@/components/FallbackUI';

export default function Home() {
  const { isConnected } = useLocalSearchParams();
  const { loading, handleLoadStart, handleLoadEnd } = useWebViewLoader();

  if (isConnected === 'false') {
    return <NetworkErrorScreen />;
  }

  return (
    <>
      {loading && <FallbackUI />}
      <WebView
        textZoom={100}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: WEB_URL }}
        style={styles.webview}
        allowsBackForwardNavigationGestures={Platform.OS === 'ios'}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />
    </>
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
