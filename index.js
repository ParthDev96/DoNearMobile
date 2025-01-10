/**
 * @format
 */

import 'react-native-gesture-handler';
import './src/locales';
import {AppRegistry, Text, TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {enableScreens} from 'react-native-screens';

enableScreens();

Text.defaultProps = {
  ...Text.defaultProps,
  allowFontScaling: false,
};

TextInput.defaultProps = {
  ...TextInput.defaultProps,
  allowFontScaling: false,
};

AppRegistry.registerComponent(appName, () => App);
