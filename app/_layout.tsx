import NetworkErrorScreen from '@/components/NetworkErrorScreen';
import { useNetwork } from '@/hooks/useNetwork';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import {
  useColorScheme,
  StyleSheet,
  StatusBar,
  Platform,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout(): JSX.Element | null {
  const [loaded, error] = useFonts({
    Pretendard: require('../assets/fonts/PretendardVariable.ttf'),
    ...FontAwesome.font,
  });
  const isConnected = useNetwork();
  const [exitApp, setExitApp] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const backAction = (): boolean => {
      if (!exitApp) {
        setExitApp(true);
        ToastAndroid.show(
          '뒤로가기 버튼을 한번 더 누르시면 종료되요.',
          ToastAndroid.SHORT,
        );
        timerRef.current = setTimeout(() => {
          setExitApp(false);
        }, 2000); // 2초 내에 다시 누르지 않으면 초기화
        return true;
      } else {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        BackHandler.exitApp(); // 앱 종료
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [exitApp]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!isConnected) {
    return <NetworkErrorScreen />;
  }

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={Platform.OS === 'ios' ? ['top', 'bottom'] : ['top']}
      >
        <StatusBar
          backgroundColor="white"
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        />
        <RootLayoutNav />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function RootLayoutNav(): JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'Pretendard',
  },
});
