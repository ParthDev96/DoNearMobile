import React from 'react';
import {StyleSheet, TextInput, TextStyle} from 'react-native';
import config from '../config';

interface Props {
  inputStyle?: TextStyle;
  multiline?: boolean;
  placeholder: string;
  props?: any;
}
function TextInputComponent(props: Props) {
  const {multiline, inputStyle, placeholder} = props;
  return (
    <TextInput
      placeholder={placeholder}
      multiline={multiline}
      style={[styles.input, inputStyle]}
    />
  );
}

export default TextInputComponent;

const styles = StyleSheet.create({
  outline: {
    borderWidth: 1,
  },
  input: {
    backgroundColor: config.colors.COLOR_WHITE,
    color: config.colors.COLOR_BLACK,
    minHeight: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
