import {StyleSheet} from 'react-native';
import config from 'src/config';

export default StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
    marginTop: -200,
    alignSelf: 'center',
  },
  logoBottom: {
    width: 350,
    height: 350,
    position: 'absolute',
    bottom: -70,
    left: -70,
    transform: [
      {
        rotate: '30deg',
      },
    ],
    zIndex: -1000,
    opacity: 0.3,
  },
  collectTouchableStyle: {
    marginTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: config.colors.COLOR_BG_APP,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});
