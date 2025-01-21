import {Platform, StyleSheet} from 'react-native';
import config from 'src/config';
import utils from 'src/utils';

export default StyleSheet.create({
  submitButton: {
    alignSelf: 'center',
    marginTop: utils.normalize(25),
    marginBottom: utils.normalize(15),
  },

  centerContainer: {
    backgroundColor: config.colors.COLOR_APP_TEXT + '20',
    width: config.ConstantVariables.DYNAMIC_SCREEN_WIDTH,
    alignSelf: 'center',
    borderRadius: utils.normalize(10),
    paddingVertical: utils.normalize(15),
    marginTop: utils.normalize(25),
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
    marginTop: utils.normalize(30),
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
  registerText: {
    fontFamily: config.font.NotoSansBold,
    lineHeight: utils.normalize(16),
    color: config.colors.COLOR_BLACK,
    fontSize: utils.normalize(14),
    textDecorationLine: 'underline',
  },
  inputContainer: {
    marginTop: utils.normalize(15),
    marginHorizontal: utils.normalize(20),
    alignSelf: 'center',
  },
  nameInputContainer: {
    marginHorizontal: utils.normalize(20),
    alignSelf: 'center',
  },
  passwordInputContainer: {
    marginTop: utils.normalize(20),
    marginHorizontal: utils.normalize(20),
    alignSelf: 'center',
  },
  logoImage: {
    height: utils.normalize(120),
    width: utils.normalize(120),
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: config.colors.COLOR_BG_APP,
  },
  scrollView: {
    flex: 1,
  },
});
