import React, {useCallback} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import Components from '../components';
import config from '../config';
import {HomeScreenNavigationProps} from '../types/navigation';

const HomeScreen = ({navigation}: HomeScreenNavigationProps) => {
  const onDonatePress = useCallback(() => {
    navigation.navigate('SelectCategory', {});
  }, [navigation]);

  const onCollectPress = useCallback(() => {
    navigation.navigate('CollectProductListScreen', {});
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={config.images.ic_logo}
          resizeMode="contain"
          style={styles.logo}
        />
        <Components.TouchableComponent
          text={config.strings.Donate}
          onPress={onDonatePress}
        />
        <Components.TouchableComponent
          text={config.strings.Volunteer}
          onPress={() => {}}
          style={styles.collectTouchableStyle}
        />
        <Components.TouchableComponent
          text={config.strings.NGO}
          onPress={onCollectPress}
          style={styles.collectTouchableStyle}
        />
        <Image
          source={config.images.ic_logo}
          resizeMode="contain"
          style={styles.logoBottom}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
