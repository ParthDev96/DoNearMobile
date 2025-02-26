import React from 'react';
import {
  StyleSheet,
  TextStyle,
  // TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Components from '..';
// import Toast from 'react-native-toast-message';
import utils from 'src/utils';
import config from 'src/config';
// import {default as AntDesign} from 'react-native-vector-icons/AntDesign';

export type TOAST_PROPS = {
  onPress?: () => void;
  text1?: string;
  text1Style?: TextStyle;
  text2?: string;
  text2Style?: TextStyle;
  leftIcon?: any;
  leftIconContainerStyle?: ViewStyle;
  mainContainerStyle?: ViewStyle;
};

const CustomToastComponent = (params: TOAST_PROPS) => {
  const {
    onPress,
    text1,
    text1Style,
    text2,
    text2Style,
    leftIcon,
    leftIconContainerStyle,
    mainContainerStyle,
  } = params;

  return (
    <Components.AnimatedButton
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      disabled={!onPress}
      activeOpacity={0.99}
      style={[
        styles.container,
        mainContainerStyle,
        {
          marginTop: utils.normalize(15),
        },
      ]}>
      {!!leftIcon && (
        <View style={[styles.checkIconStyle, leftIconContainerStyle]}>
          {leftIcon()}
        </View>
      )}
      <View style={styles.textContainer}>
        {text1 && (
          <Components.CustomText
            numberOfLines={1}
            style={[styles.titleStyle, text1Style]}>
            {text1}
          </Components.CustomText>
        )}
        {text2 && (
          <Components.CustomText
            numberOfLines={2}
            style={[styles.messageStyle, text2Style]}>
            {text2}
          </Components.CustomText>
        )}
      </View>
      {/* <TouchableOpacity
        activeOpacity={0.7}
        style={styles.clostIconContainer}
        onPress={() => Toast.hide()}>
        <AntDesign
          name="closecircleo"
          size={utils.normalize(30)}
          color={config.colors.COLOR_PRIMARY}
        />
      </TouchableOpacity> */}
    </Components.AnimatedButton>
  );
};

export default CustomToastComponent;

const styles = StyleSheet.create({
  clostIconContainer: {
    padding: utils.normalize(10),
  },
  touchableStyle: {
    width: '100%',
    marginTop: utils.normalize(10),
  },
  textContainer: {
    flex: 1,
  },
  titleStyle: {
    color: config.colors.COLOR_BLACK,
    fontFamily: config.font.NotoSansMedium,
    fontSize: utils.normalize(13),
    lineHeight: utils.normalize(17),
  },
  messageStyle: {
    color: config.colors.COLOR_APP_DARK_GRAY,
    fontFamily: config.font.NotoSansMedium,
    fontSize: utils.normalize(12),
    lineHeight: utils.normalize(16),
    marginTop: utils.normalize(2),
  },
  container: {
    width: '90%',
    minHeight: utils.normalize(70),
    marginHorizontal: utils.normalize(20),
    paddingHorizontal: utils.normalize(10),
    borderRadius: utils.normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: config.colors.COLOR_WHITE,
    borderColor: config.colors.COLOR_SECONDARY,
    borderWidth: utils.normalize(2),
  },
  checkIconStyle: {
    width: utils.normalize(35),
    height: utils.normalize(35),
    marginRight: utils.normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
