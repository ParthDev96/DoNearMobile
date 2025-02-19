import {Platform, StyleSheet} from 'react-native';
import config from 'src/config';
import utils from 'src/utils';

export default StyleSheet.create({
  collectButtonStyle: {
    marginVertical: utils.normalize(15),
  },
  scrollViewContentContainer: {
    paddingTop: utils.normalize(15),
  },
  productImage: {
    height: utils.normalize(200),
    width: '100%',
    alignSelf: 'center',
    borderRadius: utils.normalize(15),
  },
  productImageShadow:
    Platform.OS === 'ios'
      ? {
          shadowColor: config.colors.COLOR_APP_DARK_GRAY + '50',
          shadowOffset: {width: 0, height: utils.normalize(5)},
          shadowRadius: 5,
          shadowOpacity: 0.7,
        }
      : {
          elevation: utils.normalize(5),
        },
  expiryDate: {
    fontSize: utils.normalize(14),
    marginTop: utils.normalize(10),
    color: config.colors.COLOR_APP_DARK_GRAY,
  },
  expiryDateValue: {
    color: config.colors.COLOR_BLACK,
    fontSize: utils.normalize(15),
  },
  description: {
    fontSize: utils.normalize(14),
    fontFamily: config.font.NotoSansRegular,
    marginTop: utils.normalize(5),
    textAlign: 'justify',
  },
  title: {
    fontSize: utils.normalize(18),
    marginTop: utils.normalize(20),
  },
  innerView: {
    width: config.ConstantVariables.DYNAMIC_SCREEN_WIDTH,
    alignSelf: 'center',
  },

  expandedTitle: {
    color: config.colors.COLOR_WHITE,
  },
  expandedBackButton: {
    // backgroundColor: config.colors.COLOR_BLACK + '20',
  },
  container: {
    flex: 1,
    backgroundColor: config.colors.COLOR_BG_APP,
  },
});
