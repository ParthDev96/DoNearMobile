import React, {useMemo} from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import config from 'src/config';
import utils from 'src/utils';
import AnimatedButton from './AnimatedButton';
import {default as AntDesign} from 'react-native-vector-icons/AntDesign';

type Props = {
  onPress: () => void;
  containerStyle?: ViewStyle;
  extraButtonProps?: TouchableOpacityProps;
  customImage?: React.ReactNode;
  scaleValue?: number;
  hasShadow?: boolean;
};

const RoundedButton = (props: Props) => {
  const {
    containerStyle,
    onPress,
    extraButtonProps,
    customImage,
    scaleValue,
    hasShadow = true,
  } = props;

  const renderIcon = useMemo(() => {
    return (
      <AntDesign
        name="arrowright"
        size={utils.normalize(30)}
        color={config.colors.COLOR_PRIMARY}
      />
    );
  }, []);

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
      {customImage ? customImage : renderIcon}
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
