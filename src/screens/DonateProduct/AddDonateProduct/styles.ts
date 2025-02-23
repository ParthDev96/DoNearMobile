import {StyleSheet} from 'react-native';
import config from 'src/config';
import utils from 'src/utils';

export default StyleSheet.create({
  radioButtonIcon: {
    paddingVertical: utils.normalize(3),
  },
  inputContainer: {
    marginTop: utils.normalize(20),
    alignSelf: 'center',
  },

  messageContainer: {
    marginTop: utils.normalize(25),
  },
  boldText: {
    fontFamily: config.font.NotoSansBold,
    fontSize: utils.normalize(15),
    lineHeight: utils.normalize(20),
    marginBottom: utils.normalize(8),
  },
  regularText: {
    fontSize: utils.normalize(15),
    fontFamily: config.font.NotoSansRegular,
    lineHeight: utils.normalize(19),
  },

  infoButton: {
    paddingHorizontal: utils.normalize(10),
    height: utils.normalize(35),
  },
  productConditonMainContainer: {
    marginTop: utils.normalize(30),
    flexDirection: 'row',
  },
  productConditonText: {
    fontSize: utils.normalize(16),
    lineHeight: utils.normalize(20),
    fontFamily: config.font.NotoSansBold,
  },

  radioButtonMainContainer: {
    flexDirection: 'row',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: utils.normalize(30),
  },
  title: {
    fontSize: utils.normalize(15),
    lineHeight: utils.normalize(19),
    marginLeft: utils.normalize(10),
  },
  selectImageText: {
    fontSize: utils.normalize(11),
    lineHeight: utils.normalize(15),
    marginTop: utils.normalize(10),
  },
  titleInputStyle: {
    marginTop: utils.normalize(20),
  },
  descInputStyle: {
    marginTop: utils.normalize(20),
    height: utils.normalize(130),
  },
  itemImage: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  addProductButtonStyle: {
    marginVertical: utils.normalize(40),
  },
  scrollViewContentContainer: {},
  scrollView: {
    height: utils.normalize(130),
    width: '100%',
    marginTop: utils.normalize(20),
  },
  itemContainer: {
    height: utils.normalize(130),
    width: utils.normalize(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: utils.normalize(1),
    borderColor: config.colors.COLOR_BLACK + '50',
    borderRadius: utils.normalize(10),
    overflow: 'hidden',
    marginRight: utils.normalize(10),
  },
  selectImageContainer: {
    height: utils.normalize(130),
    width: utils.normalize(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: utils.normalize(1),
    borderColor: config.colors.COLOR_BLACK + '50',
    marginRight: utils.normalize(10),
    borderRadius: utils.normalize(10),
    overflow: 'hidden',
  },
  button: {
    margin: utils.normalize(4),
  },
  container: {
    flex: 1,
    backgroundColor: config.colors.COLOR_BG_APP,
  },
  innerContainer: {
    flex: 1,
    width: config.ConstantVariables.DYNAMIC_SCREEN_WIDTH,
    alignSelf: 'center',
  },
});
