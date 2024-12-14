import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';

interface Props extends TextProps {
  children: string;
}

const TextComponent: React.FC<Props> = ({children, ...rest}) => {
  return (
    <Text style={styles.text} {...rest}>
      {children}
    </Text>
  );
};

export default TextComponent;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
  },
});
