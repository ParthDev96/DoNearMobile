import {StyleSheet} from 'react-native';
import config from 'src/config';
import utils from 'src/utils';

export default StyleSheet.create({
  donateImage: {
    height: utils.normalize(40),
    width: utils.normalize(40),
  },
  headerContainer: {
    zIndex: 1000,
  },
  contentContainer: {
    paddingHorizontal: utils.normalize(15),
    paddingTop: utils.normalize(15),
  },
  itemSep: {
    height: utils.normalize(15),
  },
  container: {
    flex: 1,
    backgroundColor: config.colors.COLOR_BG_APP,
  },
});
