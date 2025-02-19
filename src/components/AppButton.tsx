import React from 'react';
import {
  StyleSheet,
  Image,
  ActivityIndicator,
  TextStyle,
  ViewStyle,
  View,
  Platform,
} from 'react-native';
import CustomText from './CustomText';
import AnimatedButton from './AnimatedButton';
import config from 'src/config';
import utils from 'src/utils';

type Props = {
  onPress: () => void;
  title?: string;
  titleStyle?: TextStyle;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  text?: string;
  leftIcon?: React.ReactNode;
  leftImage?: any;
  leftImageStyle?: any;
  rightImage?: any;
  rightImageStyle?: any;
  rightImageButtonStyle?: ViewStyle;
  onRightImageButtonPress?: () => void;
  textStyle?: TextStyle;
  customLeftView?: any;
  loading?: boolean;
  hasShadow?: boolean;
  loaderColor?: string;
  error?: string;
};

const AppButton = (props: Props) => {
  const {
    title,
    titleStyle,
    style,
    containerStyle,
    onPress = () => {},
    text,
    leftIcon,
    leftImage = null,
    leftImageStyle,
    rightImage = null,
    rightImageStyle,
    rightImageButtonStyle,
    onRightImageButtonPress,
    textStyle,
    customLeftView,
    loading,
    loaderColor,
    error,
    hasShadow = true,
  } = props;

  return (
    <View style={containerStyle}>
      {!!title && (
        <CustomText style={StyleSheet.flatten([styles.titleStyle, titleStyle])}>
          {title}
        </CustomText>
      )}
      <AnimatedButton
        disabled={loading}
        activeOpacity={0.75}
        onPress={() => onPress()}
        style={[styles.container, hasShadow && styles.shadowContainer, style]}>
        {customLeftView && customLeftView()}
        {!!leftIcon && leftIcon}
        {!!leftImage && (
          <Image
            style={StyleSheet.flatten([styles.leftImage, leftImageStyle])}
            source={leftImage}
            resizeMode={'contain'}
          />
        )}
        {!!text && !loading && (
          <CustomText
            numberOfLines={2}
            style={StyleSheet.flatten([styles.text, textStyle])}>
            {text}
          </CustomText>
        )}
        {!!rightImage && (
          <AnimatedButton
            activeOpacity={0.9}
            onPress={() => {
              if (onRightImageButtonPress) {
                onRightImageButtonPress();
              } else if (onPress) {
                onPress();
              }
            }}
            style={rightImageButtonStyle}>
            <Image
              style={[styles.rightImage, rightImageStyle]}
              source={rightImage}
              resizeMode={'contain'}
            />
          </AnimatedButton>
        )}
        {loading && <ActivityIndicator color={loaderColor} />}
      </AnimatedButton>
      {!!error && <CustomText style={styles.errorText}>{error}</CustomText>}
    </View>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  mainContainer: {
    height: utils.normalize(45),
  },
  shadowContainer:
    Platform.OS === 'android'
      ? {
          elevation: 4,
        }
      : {
          shadowColor: config.colors.COLOR_APP_BROWN + '80',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.4,
          shadowRadius: 4,
          zIndex: 100,
        },
  errorText: {
    color: config.colors.RED,
    fontSize: utils.normalize(11),
  },
  indicator: {
    marginLeft: utils.normalize(10),
  },
  titleStyle: {
    fontSize: utils.normalize(12),
    lineHeight: utils.normalize(15),
    fontFamily: config.font.NotoSansMedium,
    color: config.colors.COLOR_WHITE,
    marginBottom: utils.normalize(5),
  },
  container: {
    backgroundColor: config.colors.COLOR_PRIMARY,
    alignItems: 'center',
    borderRadius: utils.normalize(25),
    flexDirection: 'row',
    justifyContent: 'center',
    height: utils.normalize(50),
    // borderColor: config.colors.COLOR_APP_BROWN + '30',
    // borderWidth: utils.normalize(1),
  },
  text: {
    fontFamily: config.font.NotoSansBold,
    fontSize: utils.normalize(16),
    color: config.colors.COLOR_BLACK,
    textAlign: 'center',
    lineHeight: utils.normalize(20),
  },
  leftImage: {
    width: utils.normalize(14),
    height: utils.normalize(14),
    marginRight: utils.normalize(7),
  },
  rightImage: {
    width: utils.normalize(14),
    height: utils.normalize(14),
    marginLeft: utils.normalize(7),
  },
});
