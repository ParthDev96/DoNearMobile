import React from 'react';
import {
  Platform,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Components from '.';
import config from '../config';

interface Props {
  text: string;
  style?: ViewStyle;
  hasShadow?: boolean;
  textStyle?: TextStyle;
  onPress: () => void;
}

const TouchableComponent: React.FC<Props> = (props: Props) => {
  const {hasShadow = true} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.onPress}
      style={[
        styles.container,
        hasShadow && styles.shadowContainer,
        props.style,
      ]}>
      <Components.TextComponent style={[styles.text, props.textStyle]}>
        {props.text}
      </Components.TextComponent>
    </TouchableOpacity>
  );
};

export default TouchableComponent;

const styles = StyleSheet.create({
  text: {
    color: config.colors.COLOR_BLACK,
    fontWeight: '600',
    fontSize: 17,
  },
  container: {
    height: 50,
    // width: '100%',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.colors.COLOR_PRIMARY + '90',
    borderRadius: 25,
  },
  shadowContainer:
    Platform.OS === 'android'
      ? {
          elevation: 4,
        }
      : {
          shadowColor: config.colors.COLOR_APP_DARK_GRAY + '80',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.4,
          shadowRadius: 4,
          zIndex: 100,
        },
});
