import React from 'react';
import {
  Image,
  ImageStyle,
  Platform,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import config from 'src/config';
import utils from 'src/utils';
import AnimatedButton from './AnimatedButton';

type Props = {
  onPress: () => void;
  containerStyle?: ViewStyle;
  image?: any;
  imageStyle?: ImageStyle;
  extraButtonProps?: TouchableOpacityProps;
  customImage?: React.ReactNode;
  scaleValue?: number;
  hasShadow?: boolean;
};

const RoundedButton = (props: Props) => {
  const {
    imageStyle,
    containerStyle,
    onPress,
    image = config.images.ic_cart_empty,
    extraButtonProps,
    customImage,
    scaleValue,
    hasShadow = true,
  } = props;
  return (
    <AnimatedButton
      activeOpacity={0.99}
      style={[
        styles.loginImageContainer,
        hasShadow && styles.shadowContainer,
        containerStyle,
      ]}
      onPress={() => {
        onPress();
      }}
      scaleValue={scaleValue}
      {...extraButtonProps}>
      {customImage ? (
        customImage
      ) : (
        <Image
          resizeMode="contain"
          source={image}
          style={[styles.loginImage, imageStyle]}
        />
      )}
    </AnimatedButton>
  );
};

export default RoundedButton;

const styles = StyleSheet.create({
  loginImage: {
    width: utils.normalize(25),
    height: utils.normalize(25),
  },
  loginImageContainer: {
    width: utils.normalize(60),
    height: utils.normalize(60),
    backgroundColor: config.colors.COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: utils.normalize(30),
  },
  shadowContainer:
    Platform.OS === 'android'
      ? {}
      : {
          backgroundColor: config.colors.COLOR_WHITE,
          shadowColor: config.colors.COLOR_PRIMARY + '80',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          zIndex: 100,
        },
});
