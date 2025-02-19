import {Platform, StyleSheet} from 'react-native';
import config from 'src/config';
import utils from 'src/utils';

export default StyleSheet.create({
  submitButton: {
    alignSelf: 'center',
    marginTop: utils.normalize(30),
  },
  centerContainer: {
    backgroundColor: config.colors.COLOR_APP_TEXT + '20',
    width: config.ConstantVariables.DYNAMIC_SCREEN_WIDTH,
    alignSelf: 'center',
    borderRadius: utils.normalize(10),
    paddingVertical: utils.normalize(25),
  },
  privacyText1: {
    fontFamily: config.font.NotoSansRegular,
    marginTop: utils.normalize(15),
    fontSize: utils.normalize(13),
    color: config.colors.COLOR_APP_TEXT,
    marginHorizontal: utils.normalize(30),
    textAlign: 'center',
  },
  privacyText2: {
    fontFamily: config.font.NotoSansBold,
    marginTop: utils.normalize(25),
    fontSize: utils.normalize(13),
    color: config.colors.COLOR_APP_TEXT,
    marginHorizontal: utils.normalize(30),
    textDecorationLine: 'underline',
  },

  forgotPasswordContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: utils.normalize(10),
    marginRight: utils.normalize(28),
    borderRadius: utils.normalize(30),
  },
  forgotPasswordText: {
    fontFamily: config.font.NotoSansBold,
    fontSize: utils.normalize(15),
    lineHeight: utils.normalize(30),
    color: config.colors.COLOR_APP_TEXT,
    textDecorationLine: 'underline',
  },

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
    alignSelf: 'center',
    marginTop: utils.normalize(50),
    borderRadius: utils.normalize(30),
  },
  shadowContainer:
    Platform.OS === 'android'
      ? {
          backgroundColor: config.colors.COLOR_WHITE,
          elevation: 8,
        }
      : {
          backgroundColor: config.colors.COLOR_WHITE,
          shadowColor: config.colors.COLOR_APP_TEXT + '80',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          zIndex: 100,
        },

  stillNotRegisterText: {
    alignSelf: 'center',
    fontFamily: config.font.NotoSansMedium,
    marginTop: utils.normalize(25),
    marginBottom: utils.normalize(40),
    fontSize: utils.normalize(15),
    color: config.colors.COLOR_APP_TEXT,
  },
  welcomeBackText: {
    fontFamily: config.font.NotoSansBold,
    fontSize: utils.normalize(21),
    lineHeight: utils.normalize(30),
    color: config.colors.COLOR_APP_TEXT,
  },
  signInText: {
    fontFamily: config.font.NotoSansMedium,
    fontSize: utils.normalize(15),
    lineHeight: utils.normalize(18),
    color: config.colors.COLOR_APP_TEXT,
  },
  registerText: {
    fontFamily: config.font.NotoSansBold,
    lineHeight: utils.normalize(16),
    color: config.colors.COLOR_BLACK,
    fontSize: utils.normalize(14),
    textDecorationLine: 'underline',
  },
  inputContainer: {
    marginHorizontal: utils.normalize(20),
    alignSelf: 'center',
  },
  passwordInputContainer: {
    marginTop: utils.normalize(20),
    marginHorizontal: utils.normalize(20),
    alignSelf: 'center',
  },
  logoImage: {
    height: utils.normalize(150),
    width: utils.normalize(150),
  },
  rightBottomOrangeImage: {
    width: utils.normalize(75),
    height: utils.normalize(75),
    position: 'absolute',
    right: utils.normalize(-35),
    bottom: utils.normalize(35),
  },
  logoImageMainContainer: {
    width: config.ConstantVariables.DYNAMIC_SCREEN_WIDTH,
    alignSelf: 'center',
    margin: utils.normalize(20),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftBottomOrangeImage: {
    width: utils.dimension.isPad ? utils.normalize(150) : utils.normalize(130),
    height: utils.dimension.isPad ? utils.normalize(150) : utils.normalize(130),
    position: 'absolute',
    left: utils.normalize(-45),
    bottom: utils.normalize(-80),
    transform: [
      {
        rotateX: '180deg',
      },
      {
        rotateZ: '180deg',
      },
    ],
  },
  container: {
    flex: 1,
    backgroundColor: config.colors.COLOR_BG_APP,
  },
  scrollView: {
    flex: 1,
  },
  loginTitle: {
    fontSize: utils.normalize(18),
    lineHeight: utils.normalize(25),
    fontFamily: config.font.NotoSansBold,
    textAlign: 'center',
    marginTop: utils.dimension.isPad
      ? utils.normalize(80)
      : utils.normalize(50),
  },
});
