import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  ImageStyle,
  ViewStyle,
  TextStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AnimatedButton from './AnimatedButton';
import CustomText from './CustomText';
import LinearGradient from 'react-native-linear-gradient';
import utils from 'src/utils';
import config from 'src/config';
import {default as Ionicons} from 'react-native-vector-icons/Ionicons';

type Props = {
  showBack?: boolean;
  showGradient?: boolean;
  title?: string;
  backgroundColor?: string;
  titleStyle?: TextStyle;
  rightText?: string;
  onPressNotification?: () => void;
  onBackPress?: () => void;
  onPressRight?: () => void;
  showNotification?: boolean;
  backBtnContainer?: ViewStyle;
  backBtnImageStyle?: ImageStyle;
  safeAreaViewStyle?: ViewStyle;
  mainContainerStyle?: ViewStyle;
  leftImage?: any;
  rightImage?: any;
  rightImageStyle?: ImageStyle;
  rightImageContainer?: ViewStyle;
  onPressRightButton?: any;
  customRightView?: React.ReactNode;
  customCenterView?: any;
  image?: any;
  showRunningTimer?: boolean;
  onPressTimer?: () => void;
};

const NavigationBar = (props: Props) => {
  const {
    showBack = false,
    title,
    titleStyle,
    rightText,
    onBackPress = () => {},
    onPressRight = () => {},
    backBtnContainer,
    safeAreaViewStyle,
    mainContainerStyle,
    rightImage,
    rightImageStyle,
    rightImageContainer,
    onPressRightButton,
    customRightView,
    customCenterView,
    image,
    backgroundColor = config.colors.COLOR_WHITE,
    showGradient,
  } = props;
  const insets = useSafeAreaInsets();

  // const notificationCount = useSelector(
  //   (state: RootState) => state.app.notificationCount,
  // );
  // const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);

  return (
    <View style={[styles.mainContainerStyle, mainContainerStyle]}>
      <View
        style={[
          styles.statusBar,
          {
            height: insets.top,
            backgroundColor: backgroundColor,
          },
          safeAreaViewStyle,
        ]}
      />
      {showGradient && (
        <LinearGradient
          colors={[config.colors.COLOR_ORANGE, config.colors.COLOR_APP_BROWN]}
          locations={[0, 1]}
          useAngle={true}
          angle={165}
          angleCenter={{x: 0.5, y: 0.5}}
          style={styles.linearContainer}
        />
      )}
      <View
        style={[
          styles.container,
          styles.shadowContainer,
          {
            backgroundColor: showGradient
              ? config.colors.COLOR_TRANSPARENT
              : backgroundColor,
          },
        ]}>
        {showBack ? (
          <AnimatedButton
            activeOpacity={0.7}
            onPress={() => onBackPress()}
            style={[styles.backBtnContainer, backBtnContainer]}>
            <Ionicons
              name={'chevron-back'}
              size={utils.normalize(17)}
              color={config.colors.COLOR_APP_TEXT}
            />
            {/* <Image
              style={[styles.backBtnImg, backBtnImageStyle]}
              source={leftImage ? leftImage : config.images.ic_back}
              resizeMode={FastImage.resizeMode.contain}
            /> */}
          </AnimatedButton>
        ) : (
          <View />
        )}
        {image && (
          <Image source={image} resizeMode="contain" style={styles.image} />
        )}
        {title && (
          <CustomText
            numberOfLines={2}
            style={StyleSheet.flatten([
              styles.titleTxt,
              showGradient && {color: config.colors.COLOR_WHITE},
              titleStyle,
            ])}>
            {title}
          </CustomText>
        )}
        {rightText && (
          <AnimatedButton
            activeOpacity={0.7}
            onPress={() => onPressRight()}
            style={[styles.rightBtnContainer, styles.rightButtonContainer2]}>
            <CustomText style={styles.rightTxt}>{rightText}</CustomText>
          </AnimatedButton>
        )}
        {rightImage && (
          <View style={styles.rightBtnContainer}>
            <AnimatedButton
              activeOpacity={0.7}
              onPress={() => {
                if (onPressRightButton) {
                  onPressRightButton();
                }
              }}
              style={[styles.btnContainer, rightImageContainer]}>
              <Image
                style={[styles.btnImg, rightImageStyle]}
                source={rightImage}
                resizeMode={FastImage.resizeMode.contain}
              />
            </AnimatedButton>
          </View>
        )}
        {customRightView && customRightView}
      </View>
      {customCenterView && customCenterView()}
    </View>
  );
};

const styles = StyleSheet.create({
  linearContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
  },

  mainContainerStyle: {
    zIndex: 1000,
  },
  image: {
    height: utils.normalize(23),
    width: utils.normalize(23),
    marginLeft: utils.normalize(20),
    marginRight: utils.normalize(10),
  },
  logoImage: {
    height: utils.normalize(40),
    width: utils.normalize(100),
  },
  centerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLogo: {
    width: utils.dimension.SCREEN_WIDTH * 0.7,
    height: utils.normalize(32),
    transform: [{scale: utils.normalize(0.6)}],
  },
  statusBar: {
    width: '100%',
    zIndex: 100,
    backgroundColor: config.colors.COLOR_WHITE,
  },
  container: {
    width: '100%',
    height: utils.normalize(50),
    paddingHorizontal: utils.normalize(15),
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1000,
  },
  shadowContainer:
    Platform.OS === 'android'
      ? {
          backgroundColor: config.colors.COLOR_WHITE,
          elevation: 8,
        }
      : {
          backgroundColor: config.colors.COLOR_WHITE,
          shadowColor: config.colors.COLOR_APP_BROWN + '80',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          zIndex: 100,
        },
  btnContainer: {
    width: utils.normalize(45),
    height: utils.normalize(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnContainer: {
    width: utils.normalize(35),
    height: utils.normalize(45),
    borderRadius: utils.normalize(45),
    justifyContent: 'center',
  },
  noBackBtnContainer: {
    width: utils.normalize(25),
  },
  btnImg: {
    width: utils.normalize(22),
    height: utils.normalize(22),
  },
  titleTxt: {
    fontFamily: config.font.NotoSansBold,
    fontSize: utils.normalize(18),
    color: config.colors.COLOR_BLACK,
    lineHeight: utils.normalize(24),
    flex: 1,
  },
  rightTxt: {
    fontFamily: config.font.NotoSansMedium,
    fontSize: utils.normalize(15),
    color: config.colors.COLOR_APP_BROWN,
    textDecorationLine: 'underline',
  },
  backBtnImg: {
    width: utils.normalize(25),
    height: utils.normalize(25),
  },
  rightBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: utils.normalize(5),
  },
  rightButtonContainer2: {
    position: 'absolute',
    top: 0,
    right: 1,
    height: utils.normalize(50),
    width: utils.normalize(40),
  },
  textContainer: {
    paddingHorizontal: utils.normalize(10),
  },
});

export default NavigationBar;
