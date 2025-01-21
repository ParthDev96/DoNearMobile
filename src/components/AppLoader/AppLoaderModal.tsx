import React, {useState, useEffect} from 'react';
import {StyleSheet, ActivityIndicator, StatusBar} from 'react-native';
import Modal from 'react-native-modal';
import AppLoaderManager from './AppLoaderManager';
import utils from 'src/utils';
import CustomText from '../CustomText';
import colors from 'src/config/colors';

export interface ILoaderConfig {
  text?: string;
}

const AppLoaderModal: React.FC = () => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [modalConfig, setModalConfig] = useState<ILoaderConfig>({});

  useEffect(() => {
    const listener = {
      show: (loaderConfig: ILoaderConfig) => {
        setModalConfig(loaderConfig);
        setVisible(true);
      },
      hide: () => {
        setVisible(false);
      },
    };

    AppLoaderManager.registerListener(listener);

    return () => {
      AppLoaderManager.unregisterListener(listener);
    };
  }, []);

  return (
    <Modal
      statusBarTranslucent
      deviceWidth={utils.extraDimension.deviceWidth}
      deviceHeight={utils.extraDimension.deviceHeight}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      isVisible={isVisible}>
      <StatusBar barStyle={'light-content'} />
      <ActivityIndicator color={colors.COLOR_WHITE} size={'large'} />
      {modalConfig.text && (
        <CustomText style={styles.title}>{modalConfig.text}</CustomText>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 20,
    color: colors.COLOR_WHITE,
  },
});

export default AppLoaderModal;
