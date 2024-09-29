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
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useColorScheme,
  StyleSheet,
  StatusBar,
  Platform,
  ToastAndroid,
  BackHandler,
  TextInput,
  Alert,
  Text,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Updates from 'expo-updates';

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

  const backAction = useCallback(() => {
    if (!exitApp) {
      setExitApp(true);
      ToastAndroid.show(
        '뒤로가기 버튼을 한번 더 누르시면 종료되요.',
        ToastAndroid.SHORT,
      );
      timerRef.current = setTimeout(() => {
        setExitApp(false);
      }, 2000);
      return true;
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      BackHandler.exitApp();
      return true;
    }
  }, [exitApp]);

  useEffect(() => {
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
  }, [backAction]);

  async function checkForUpdates() {
    if (__DEV__) {
      console.log('개발 환경에서는 업데이트를 체크하지 않습니다.');
      return;
    }

    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.error('업데이트 체크 중 오류 발생:', error);
    }
  }

  useEffect(() => {
    checkForUpdates();
  }, []);

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

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}
(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
  false;
(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(
  TextInput as unknown as TextInputWithDefaultProps
).defaultProps!.allowFontScaling = false;
