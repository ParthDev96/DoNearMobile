import React from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import config from '../config';
import {useTranslation} from 'react-i18next';
import AppButton from './AppButton';
import utils from 'src/utils';
interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSelectGallery: () => void;
  onSelectCamera: () => void;
}
const ImagePickerModal = (props: Props) => {
  const {isVisible, onClose, onSelectCamera, onSelectGallery} = props;
  const {t} = useTranslation();

  return (
    <View>
      <Modal
        statusBarTranslucent
        isVisible={isVisible}
        onBackdropPress={onClose}
        onSwipeComplete={onClose}
        swipeDirection="down"
        style={styles.modal}>
        <View style={styles.content}>
          <AppButton
            text={t('Gallery')}
            onPress={onSelectGallery}
            style={styles.buttonContainer}
          />
          <AppButton
            text={t('Camera')}
            onPress={onSelectCamera}
            style={styles.buttonContainer}
          />
          <AppButton
            text={t('Cancel')}
            onPress={onClose}
            style={styles.cancelButtonContainer}
            hasShadow={false}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cancelButtonContainer: {
    borderRadius: utils.normalize(50),
    marginTop: utils.normalize(20),
    backgroundColor: config.colors.COLOR_TRANSPARENT,
  },
  buttonContainer: {
    borderRadius: utils.normalize(50),
    marginTop: utils.normalize(20),
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    paddingHorizontal: utils.normalize(20),
    paddingBottom: utils.normalize(15),
    borderTopLeftRadius: utils.normalize(20),
    borderTopRightRadius: utils.normalize(20),
    width: config.ConstantVariables.DYNAMIC_POPUP_WIDTH,
    alignSelf: 'center',
  },
});

export default ImagePickerModal;
