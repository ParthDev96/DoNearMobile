import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import config from '../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  title?: string;
  containerStyle?: ViewStyle;
  backButtonStyle?: ViewStyle;
  titleStyle?: TextStyle;
  customRightView?: React.ReactNode;
  backButtonColor?: string;
  onBackPress: () => void;
}
const CustomHeader = (props: Props) => {
  const {
    title,
    onBackPress,
    containerStyle,
    titleStyle,
    backButtonColor = 'black',
    backButtonStyle,
    customRightView,
  } = props;
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        styles.containerShadow,
        containerStyle,
        {paddingTop: insets.top},
      ]}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={onBackPress}
          style={[styles.backButton, backButtonStyle]}>
          <Icon name="angle-left" size={30} color={backButtonColor} />
        </TouchableOpacity>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <View style={styles.rightViewContainer}>{customRightView}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rightViewContainer: {
    position: 'absolute',
    right: 0,
    height: '100%',
    // width: 45,
    // backgroundColor: 'red',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  container: {
    backgroundColor: config.colors.COLOR_WHITE,
    width: '100%',
  },
  containerShadow:
    Platform.OS === 'ios'
      ? {
          shadowColor: config.colors.COLOR_APP_DARK_GRAY + '50',
          shadowOffset: {width: 0, height: 5},
          shadowRadius: 5,
          shadowOpacity: 0.2,
        }
      : {
          elevation: 5,
        },
  backButton: {
    position: 'absolute',
    left: 0,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    width: '75%',
    textAlign: 'center',
  },
});

export default CustomHeader;
