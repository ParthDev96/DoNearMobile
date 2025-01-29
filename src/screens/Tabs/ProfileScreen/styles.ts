import {Platform, StyleSheet} from 'react-native';
import config from 'src/config';
import utils from 'src/utils';

export default StyleSheet.create({
  leftImageSize: {
    height: utils.normalize(20),
    width: utils.normalize(20),
  },
  leftIconContainer: {
    height: utils.normalize(30),
    width: utils.normalize(30),
    marginRight: utils.normalize(5),
    justifyContent: 'center',
  },
  shadowContainer:
    Platform.OS === 'android'
      ? {
          backgroundColor: config.colors.COLOR_WHITE,
          elevation: 4,
        }
      : {
          backgroundColor: config.colors.COLOR_WHITE,
          shadowColor: config.colors.COLOR_BLACK + '80',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.4,
          shadowRadius: 5,
          zIndex: 100,
        },
  userOptionContainer: {
    height: utils.normalize(55),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: utils.normalize(20),
  },

  userOptionsMainContainer: {
    marginTop: utils.normalize(30),
    borderRadius: utils.normalize(20),
    paddingVertical: utils.normalize(10),
  },
  profileOptionsMainContainer: {
    marginTop: utils.normalize(20),
  },
  profileOptionContainer: {
    height: utils.normalize(60),
    borderBottomColor: config.colors.COLOR_APP_LIGHT_GRAY,
    borderBottomWidth: utils.normalize(1),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: utils.normalize(10),
  },
  profileRightContainer: {
    flex: 1,
    marginLeft: utils.normalize(20),
  },
  titleText: {
    flex: 1,
    fontSize: utils.normalize(14),
    lineHeight: utils.normalize(20),
    fontFamily: config.font.NotoSansMedium,
  },
  logoutText: {
    flex: 1,
    fontSize: utils.normalize(14),
    lineHeight: utils.normalize(20),
    fontFamily: config.font.NotoSansMedium,
    color: config.colors.RED,
  },
  userName: {
    fontSize: utils.normalize(18),
    lineHeight: utils.normalize(24),
    marginTop: utils.normalize(25),
  },

  container: {
    flex: 1,
    backgroundColor: config.colors.COLOR_WHITE,
  },
  scrollView: {
    width: config.ConstantVariables.DYNAMIC_COMPONENTS_WIDTH,
    alignSelf: 'center',
  },
  profileMainContainer: {
    flexDirection: 'row',
  },
  profileContainer: {
    height: utils.normalize(80),
    width: utils.normalize(80),
  },
  profileImage: {
    height: utils.normalize(35),
    width: utils.normalize(35),
  },
});
