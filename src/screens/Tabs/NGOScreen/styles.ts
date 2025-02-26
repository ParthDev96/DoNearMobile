import {StyleSheet} from 'react-native';
import config from 'src/config';
import utils from 'src/utils';

const styles = StyleSheet.create({
  headerContainer: {
    marginRight: utils.normalize(-10),
  },
  flatListContainer: {
    paddingTop: utils.normalize(15),
    paddingHorizontal: utils.normalize(15),
  },
  itemSep: {
    height: utils.normalize(15),
  },
  container: {
    flex: 1,
    backgroundColor: config.colors.COLOR_BG_APP,
  },
});

export default styles;
