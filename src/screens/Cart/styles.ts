import {StyleSheet} from 'react-native';
import config from 'src/config';
import utils from 'src/utils';

export default StyleSheet.create({
  bottomContainer: {
    backgroundColor: config.colors.COLOR_WHITE,
    paddingTop: utils.normalize(20),
    borderTopLeftRadius: utils.normalize(40),
    borderTopRightRadius: utils.normalize(40),
    width: config.ConstantVariables.DYNAMIC_POPUP_WIDTH,
    alignSelf: 'center',
  },
  submitButtonStyle: {
    marginHorizontal: utils.normalize(20),
  },

  emptyCartText: {
    fontSize: utils.normalize(20),
    lineHeight: utils.normalize(25),
    fontFamily: config.font.NotoSansMedium,
  },
  flatListContainer: {
    paddingVertical: utils.normalize(10),
    width: config.ConstantVariables.DYNAMIC_SCREEN_WIDTH,
    alignSelf: 'center',
  },
  imagePlaceholder: {
    height: utils.normalize(200),
    width: utils.normalize(200),
    marginBottom: utils.normalize(30),
  },
  container: {
    flex: 1,
    backgroundColor: config.colors.COLOR_BG_APP,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: utils.normalize(-100),
  },
  itemSep: {
    height: utils.normalize(15),
  },
});
