import React, {useMemo} from 'react';
import {Platform, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import config from '../config';
import Components from '.';
import Icon from 'react-native-vector-icons/Feather';

export interface ToastComponentProps {
  toastType?: 'success' | 'error';
  containerStyle?: ViewStyle;
  message: string;
  messageStyle?: TextStyle;
}
const ToastComponent = (props: ToastComponentProps) => {
  const {containerStyle, toastType = 'success', message, messageStyle} = props;
  var bg_color = config.colors.COLOR_PRIMARY;
  var icon = 'check';
  if (toastType === 'error') {
    bg_color = config.colors.COLOR_APP_RED;
    icon = 'x';
  }

  const renderLeftIcon = useMemo(() => {
    return (
      <View style={[styles.leftImageContainer, {backgroundColor: bg_color}]}>
        <Icon name={icon} size={25} color="white" />
      </View>
    );
  }, [bg_color, icon]);

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        {borderColor: bg_color},
        styles.containerShadow,
      ]}>
      {renderLeftIcon}
      <Components.TextComponent
        numberOfLines={2}
        style={[styles.message, messageStyle]}>
        {message}
      </Components.TextComponent>
    </View>
  );
};

export default ToastComponent;

const styles = StyleSheet.create({
  message: {
    fontSize: 14,
    marginHorizontal: 10,
  },
  leftImageContainer: {
    height: '100%',
    width: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    height: 50,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
  },
  containerShadow:
    Platform.OS === 'ios'
      ? {
          shadowColor: config.colors.COLOR_APP_DARK_GRAY + '50',
          shadowOffset: {width: 0, height: 5},
          shadowRadius: 5,
          shadowOpacity: 0.4,
        }
      : {
          elevation: 5,
        },
});
