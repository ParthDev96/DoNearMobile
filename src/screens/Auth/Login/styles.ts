import {Platform, StyleSheet} from 'react-native';
import config from 'src/config';
import utils from 'src/utils';

export default StyleSheet.create({
  submitButton: {
    alignSelf: 'center',
    marginTop: utils.normalize(30),
  },
  centerContainer: {
    backgroundColor: config.colors.COLOR_SECONDARY + '20',
    width: config.ConstantVariables.DYNAMIC_COMPONENTS_WIDTH,
    alignSelf: 'center',
    borderRadius: utils.normalize(10),
    paddingVertical: utils.normalize(25),
    marginTop: utils.normalize(25),
  },
  privacyText1: {
    fontFamily: config.Font.NotoSansRegular,
    marginTop: utils.normalize(15),
    fontSize: utils.normalize(13),
    color: config.colors.COLOR_APP_BROWN,
    marginHorizontal: utils.normalize(30),
    textAlign: 'center',
  },
  privacyText2: {
    fontFamily: config.Font.NotoSansBold,
    marginTop: utils.normalize(25),
    fontSize: utils.normalize(13),
    color: config.colors.COLOR_APP_BROWN,
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
    fontFamily: config.Font.NotoSansBold,
    fontSize: utils.normalize(15),
    lineHeight: utils.normalize(30),
    color: config.colors.COLOR_APP_BROWN,
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
          shadowColor: config.colors.COLOR_APP_BROWN + '80',
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
    fontFamily: config.Font.NotoSansMedium,
    marginTop: utils.normalize(25),
    marginBottom: utils.normalize(40),
    fontSize: utils.normalize(15),
    color: config.colors.COLOR_APP_BROWN,
  },
  welcomeBackText: {
    fontFamily: config.Font.NotoSansBold,
    fontSize: utils.normalize(21),
    lineHeight: utils.normalize(30),
    color: config.colors.COLOR_APP_BROWN,
  },
  signInText: {
    fontFamily: config.Font.NotoSansMedium,
    fontSize: utils.normalize(15),
    lineHeight: utils.normalize(18),
    color: config.colors.COLOR_APP_BROWN,
  },
  registerText: {
    fontFamily: config.Font.NotoSansBold,
    lineHeight: utils.normalize(16),
    color: config.colors.COLOR_BLACK,
    fontSize: utils.normalize(14),
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: config.ConstantVariables.DYNAMIC_COMPONENTS_WIDTH,
    alignSelf: 'center',
    marginTop: utils.normalize(25),
  },
  inputContainer: {
    marginHorizontal: utils.normalize(25),
    alignSelf: 'center',
  },
  passwordInputContainer: {
    marginTop: utils.normalize(20),
    marginHorizontal: utils.normalize(25),
    alignSelf: 'center',
  },
  logoImage: {
    height: utils.normalize(120),
    width: utils.normalize(120),
    borderRadius: utils.normalize(120) / 2,
  },
  rightBottomOrangeImage: {
    width: utils.normalize(75),
    height: utils.normalize(75),
    position: 'absolute',
    right: utils.normalize(-35),
    bottom: utils.normalize(35),
  },
  logoImageMainContainer: {
    width: config.ConstantVariables.DYNAMIC_COMPONENTS_WIDTH,
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
    backgroundColor: config.colors.COLOR_PRIMARY,
  },
  loginTitle: {
    fontSize: utils.normalize(18),
    lineHeight: utils.normalize(25),
    fontFamily: config.Font.NotoSansBold,
    textAlign: 'center',
    marginTop: utils.dimension.isPad
      ? utils.normalize(80)
      : utils.normalize(50),
  },
});
