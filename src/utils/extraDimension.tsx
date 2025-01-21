import {Dimensions, Platform} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight =
  Platform.OS === 'ios'
    ? Dimensions.get('window').height
    : ExtraDimensions.getRealWindowHeight();

export default {
  deviceHeight,
  deviceWidth,
};
