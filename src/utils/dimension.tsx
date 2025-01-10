import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const dimWidth = Dimensions.get('window').width;
const dimHeight = Dimensions.get('window').height;

const isLandscape = dimWidth > dimHeight;

const SCREEN_WIDTH = isLandscape ? dimHeight : dimWidth;
const SCREEN_HEIGHT = isLandscape ? dimWidth : dimHeight;

const isPad = DeviceInfo.isTablet();

export default {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  isPad,
};
