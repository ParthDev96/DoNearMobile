import React, {useMemo} from 'react';
import {
  Platform,
  StyleProp,
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
  containerStyle?: StyleProp<ViewStyle>;
  extraButtonProps?: TouchableOpacityProps;
  customImage?: React.ReactNode;
  scaleValue?: number;
  hasShadow?: boolean;
  iconNameAntDesign?: string;
};

const RoundedButton = (props: Props) => {
  const {
    containerStyle,
    onPress,
    extraButtonProps,
    customImage,
    scaleValue,
    hasShadow = true,
    iconNameAntDesign,
  } = props;

  const renderIcon = useMemo(() => {
    return (
      <AntDesign
        name={iconNameAntDesign ? iconNameAntDesign : 'arrowright'}
        size={utils.normalize(30)}
        color={config.colors.COLOR_APP_TEXT}
      />
    );
  }, [iconNameAntDesign]);

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
      ? {
          elevation: utils.normalize(6),
        }
      : {
          backgroundColor: config.colors.COLOR_WHITE,
          shadowColor: config.colors.COLOR_APP_TEXT + '80',
          shadowOffset: {
            width: 0,
            height: utils.normalize(8),
          },
          shadowOpacity: 0.5,
          shadowRadius: utils.normalize(4),
          zIndex: 100,
        },
});
