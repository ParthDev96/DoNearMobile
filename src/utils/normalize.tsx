import {Dimensions, PixelRatio} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export var {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

const normalize = (size: number, based: 'width' | 'height' = 'width') => {
  let isTab = DeviceInfo.isTablet();

  if (isTab) {
    const wscale: number = SCREEN_WIDTH / 600;
    const hscale: number = SCREEN_HEIGHT / 800;

    const newSize = based === 'height' ? size * hscale : size * wscale;

    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    const wscale: number = SCREEN_WIDTH / 375;
    const hscale: number = SCREEN_HEIGHT / 812;

    const newSize = based === 'height' ? size * hscale : size * wscale;

    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
};

export default normalize;
