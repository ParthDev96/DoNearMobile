import React from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import config from '../../../config';
import {HomeScreenNavigationProps} from '../../../types/navigation';
import styles from './styles';

const HomeScreen = ({}: HomeScreenNavigationProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={config.images.ic_logo}
          resizeMode="contain"
          style={styles.logo}
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
