import React from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import config from '../config';
import Components from '.';
interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSelectGallery: () => void;
  onSelectCamera: () => void;
}
const ImagePickerModal = (props: Props) => {
  const {isVisible, onClose, onSelectCamera, onSelectGallery} = props;
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}>
      <View style={styles.content}>
        <Components.TouchableComponent
          text={'Gallery'}
          onPress={onSelectGallery}
          style={styles.buttonContainer}
        />
        <Components.TouchableComponent
          text={'Camera'}
          onPress={onSelectCamera}
          style={styles.buttonContainer}
        />
        <Components.TouchableComponent
          text={'Cancel'}
          onPress={onClose}
          style={styles.cancelButtonContainer}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cancelButtonContainer: {
    borderRadius: 50,
    marginTop: 20,
    backgroundColor: config.colors.COLOR_TRANSPARENT,
  },
  buttonContainer: {
    borderRadius: 50,
    marginTop: 20,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#007BFF',
  },
});

export default ImagePickerModal;
