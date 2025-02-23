import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import AppPopupManager from './AppMediaOptionsManager';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppButton from '../AppButton';
import utils from 'src/utils';
import CustomText from '../CustomText';
import {useTranslation} from 'react-i18next';
import config from 'src/config';

export const IMediaOptions = {
  camera: 'camera',
  gallery: 'gallery',
};

export interface IMediaOptionConfig {
  onSelectOption: (option: string) => void;
}

const AppMediaOptionsModal: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const [isVisible, setVisible] = useState<boolean>(false);
  const [modalConfig, setModalConfig] = useState<IMediaOptionConfig>({
    onSelectOption: () => {},
  });

  useEffect(() => {
    const listener = {
      show: (popupConfig: IMediaOptionConfig) => {
        setModalConfig(popupConfig);
        setVisible(true);
      },
      hide: () => {
        setVisible(false);
      },
    };

    AppPopupManager.registerListener(listener);

    return () => {
      AppPopupManager.unregisterListener(listener);
    };
  }, []);

  return (
    <View>
      <Modal
        statusBarTranslucent
        deviceWidth={utils.extraDimension.deviceWidth}
        deviceHeight={utils.extraDimension.deviceHeight}
        style={styles.modalStyle}
        isVisible={isVisible}
        onBackdropPress={() => AppPopupManager.hide()}>
        <View
          style={[
            styles.modalView,
            {
              paddingBottom: insets.bottom + 10,
            },
          ]}>
          <CustomText style={styles.message}>{t('ChooseOption')}</CustomText>
          <AppButton
            style={StyleSheet.flatten([styles.cameraButtonStyle])}
            text={t('Camera')}
            onPress={() => {
              AppPopupManager.hide();
              setTimeout(() => {
                modalConfig.onSelectOption(IMediaOptions.camera);
              }, 500);
            }}
          />
          <AppButton
            style={StyleSheet.flatten([styles.submitButtonStyle])}
            textStyle={StyleSheet.flatten([styles.submitButtonText])}
            text={t('Gallery')}
            onPress={() => {
              AppPopupManager.hide();
              setTimeout(() => {
                modalConfig.onSelectOption(IMediaOptions.gallery);
              }, 500);
            }}
            containerStyle={styles.galleryButton}
          />
          <AppButton
            style={StyleSheet.flatten([styles.cancelButtonStyle])}
            text={t('Cancel')}
            onPress={() => {
              AppPopupManager.hide();
            }}
            containerStyle={styles.galleryButton}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  submitButtonStyle: {
    height: utils.normalize(45),
  },
  cameraButtonStyle: {
    height: utils.normalize(45),
  },
  cancelButtonStyle: {
    height: utils.normalize(45),
    backgroundColor: config.colors.COLOR_WHITE,
    borderWidth: 0,
    borderColor: config.colors.COLOR_APP_DARK_GRAY,
    shadowOpacity: 0,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: utils.normalize(20),
    alignSelf: 'center',
    width: '100%',
  },
  message: {
    fontSize: utils.normalize(15),
    lineHeight: utils.normalize(20),
    marginBottom: utils.normalize(20),
    fontFamily: config.font.NotoSansMedium,
    textAlign: 'center',
    color: config.colors.COLOR_APP_DARK_GRAY,
  },
  galleryButton: {
    marginTop: utils.normalize(20),
  },
  submitButtonText: {},
  cancelButtonText: {
    color: config.colors.COLOR_BLACK,
  },
});

export default AppMediaOptionsModal;
