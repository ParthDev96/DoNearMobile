import {Platform, StyleSheet} from 'react-native';
import config from 'src/config';
import utils from 'src/utils';

export default StyleSheet.create({
  profileImageErrorText: {
    color: config.colors.RED,
    textAlign: 'center',
    marginTop: utils.normalize(10),
  },
  profileImage: {
    height: '100%',
    width: '100%',
    borderRadius: utils.normalize(60),
  },
  headerTitle: {
    marginLeft: utils.normalize(20),
  },
  rowContainer: {
    height: utils.normalize(100),
    alignItems: 'flex-start',
  },
  profileImagecontainer: {
    height: utils.normalize(120),
    width: utils.normalize(120),
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: config.colors.COLOR_APP_DARK_GRAY + '90',
    borderRadius: utils.normalize(60),
    marginTop: utils.normalize(40),
  },
  updateButtonContainer: {
    marginTop: utils.normalize(25),
    width: config.ConstantVariables.DYNAMIC_COMPONENTS_WIDTH,
    alignSelf: 'center',
  },
  centerContainer: {
    backgroundColor: config.colors.COLOR_APP_BROWN + '20',
    width: config.ConstantVariables.DYNAMIC_COMPONENTS_WIDTH,
    alignSelf: 'center',
    borderRadius: utils.normalize(10),
    paddingVertical: utils.normalize(25),
    marginTop: utils.normalize(25),
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

  inputContainer: {
    marginTop: utils.normalize(20),
    width: config.ConstantVariables.DYNAMIC_COMPONENTS_WIDTH,
    alignSelf: 'center',
  },
  nameInputContainer: {
    width: config.ConstantVariables.DYNAMIC_COMPONENTS_WIDTH,
    alignSelf: 'center',
    marginTop: utils.normalize(30),
  },
  logoImage: {
    height: '100%',
    width: '100%',
    borderRadius: utils.normalize(60),
    alignSelf: 'center',
  },
  editImage: {
    height: utils.normalize(13),
    width: utils.normalize(13),
  },
  editImageContainer: {
    height: utils.normalize(30),
    width: utils.normalize(30),
    position: 'absolute',
    bottom: utils.normalize(0),
    right: utils.normalize(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.colors.COLOR_PRIMARY,
    borderRadius: utils.normalize(25),
  },
  editImageshadowContainer:
    Platform.OS === 'android'
      ? {
          elevation: 8,
        }
      : {
          shadowColor: config.colors.COLOR_APP_BROWN + '80',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.4,
          shadowRadius: 3,
          zIndex: 100,
        },

  container: {
    flex: 1,
    backgroundColor: config.colors.COLOR_BG_APP,
  },
});
