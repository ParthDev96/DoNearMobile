import React from 'react';
import {Text, TextProps, StyleSheet, TextStyle} from 'react-native';

interface Props extends TextProps {
  titleText: string;
  titleTextStyle?: TextStyle;
  valueText: string;
  valueTextStyle?: TextStyle;
}

const NestedTextComponent: React.FC<Props> = props => {
  const {titleText, titleTextStyle, valueText, valueTextStyle} = props;
  return (
    <Text style={[styles.text, titleTextStyle]}>
      {titleText}
      <Text style={[styles.text2, valueTextStyle]}>{valueText}</Text>
    </Text>
  );
};

export default NestedTextComponent;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
  },
  text2: {
    fontSize: 17,
    fontWeight: '600',
  },
});
