import React from 'react';
import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';
import theme from 'src/config';
import utils from 'src/utils';

type Props = {
  textProps?: TextProps;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  numberOfLines?: number;
  children: any;
  adjustsFontSizeToFit?: boolean;
  onTextLayout?: (e: any) => void;
};

const CustomText = (props: Props) => {
  const {style, onPress, adjustsFontSizeToFit = false, onTextLayout} = props;

  return (
    <Text
      onTextLayout={onTextLayout}
      {...props.textProps}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      disabled={onPress ? false : true}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      numberOfLines={props.numberOfLines}
      style={[styles.text, style]}>
      {props.children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    fontSize: utils.normalize(12),
    fontFamily: theme.font.NotoSansBold,
    color: theme.colors.COLOR_BLACK,
    lineHeight: utils.normalize(18),
  },
});
