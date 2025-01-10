import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type extraProps = {
  scaleValue?: number;
  animatedViewStyle?: ViewStyle;
};

const withScaleAnimation = <Props extends object>(
  WrappedComponent: React.ComponentType<Props>,
) => {
  return (props: Props & extraProps) => {
    const scaleValue = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{scale: scaleValue.value}],
      };
    });

    const handlePressIn = () => {
      scaleValue.value = withSpring(props.scaleValue ? props.scaleValue : 0.9);
    };

    const handlePressOut = () => {
      scaleValue.value = withSpring(1);
    };

    return (
      <Animated.View style={[props.animatedViewStyle, animatedStyle]}>
        <WrappedComponent
          {...(props as Props)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        />
      </Animated.View>
    );
  };
};

const AnimatedButton = withScaleAnimation(TouchableOpacity);

export default AnimatedButton;
