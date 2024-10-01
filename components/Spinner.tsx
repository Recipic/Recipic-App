import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Animated,
  Easing,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Size = 'small' | 'medium' | 'large';

type TSpinnerProps = {
  size?: Size;
  show?: boolean;
  children?: React.ReactNode;
  style?: ViewStyle;
};

const sizeValues = {
  small: 24,
  medium: 32,
  large: 48,
};

export function Spinner({
  size = 'medium',
  show = true,
  children,
  style,
}: TSpinnerProps) {
  const spinValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!show) return null;

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg
          width={sizeValues[size]}
          height={sizeValues[size]}
          viewBox="0 0 24 24"
        >
          <Path
            d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
            stroke="#ff6632"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="60"
            strokeDashoffset="40"
            fill="none"
          />
        </Svg>
      </Animated.View>
      {children && <Text style={styles.text}>{children}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 10,
    color: '#ff6632',
  },
});
