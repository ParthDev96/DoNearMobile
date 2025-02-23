import React, {forwardRef, useImperativeHandle, useMemo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import config from '../../config';
import utils from '../../utils';
import CustomText from '../CustomText';
import AppButton from '../AppButton';
import {useTranslation} from 'react-i18next';

interface Props {
  title: string;
  message?: string;
  negativeButtonText?: string;
  customMessageView?: React.ReactNode;
  positiveButtonText?: string;
  onNegativeButtonPress?: () => void;
  onPositiveButtonPress?: () => void;
}

export interface CustomModalHandle {
  show: (props: Props) => void;
  hide: () => void;
}

const AppAlertDialogModal = forwardRef((props, ref) => {
  const [isModalVisible, setVisible] = useState(false);
  const [modalProps, setModalProps] = useState<Props | null>(null);
  const {t} = useTranslation();

  useImperativeHandle(ref, () => ({
    show: (data: Props) => {
      setModalProps(data);
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const renderViews = useMemo(() => {
    if (modalProps) {
      return (
        <View style={styles.modalContainer}>
          <CustomText style={styles.modalTitle}>{modalProps.title}</CustomText>
          {modalProps.message && (
            <CustomText style={styles.modalText}>
              {modalProps.message}
            </CustomText>
          )}
          {modalProps.customMessageView && modalProps.customMessageView}
          <View style={styles.buttonsContainer}>
            {modalProps.negativeButtonText && (
              <AppButton
                text={modalProps.negativeButtonText}
                onPress={() => {
                  if (modalProps.onNegativeButtonPress) {
                    modalProps.onNegativeButtonPress();
                  }
                  setVisible(false);
                }}
                style={styles.negativeButtonContainer}
                textStyle={styles.negativeButtonText}
              />
            )}
            {modalProps.negativeButtonText && <View style={styles.buttonSep} />}
            <AppButton
              text={
                modalProps.positiveButtonText
                  ? modalProps.positiveButtonText
                  : t('Ok')
              }
              onPress={() => {
                if (modalProps.onPositiveButtonPress) {
                  modalProps.onPositiveButtonPress();
                }
                setVisible(false);
              }}
              style={styles.positiveButtonContainer}
            />
          </View>
        </View>
      );
    }
  }, [modalProps, t]);
  return (
    <Modal
      isVisible={isModalVisible}
      statusBarTranslucent
      deviceHeight={utils.Dimen.SCREEN_HEIGHT}
      onBackButtonPress={() => {
        setVisible(false);
      }}>
      {renderViews}
    </Modal>
  );
});

const styles = StyleSheet.create({
  buttonSep: {
    width: 20,
  },
  negativeButtonContainer: {
    flex: 1,
    height: 45,
    backgroundColor: config.colors.COLOR_TRANSPARENT,
    borderWidth: 1,
    borderColor: config.colors.COLOR_APP_DARK_GRAY + '50',
  },
  positiveButtonContainer: {
    flex: 1,
    height: 45,
  },
  negativeButtonText: {
    color: config.colors.COLOR_APP_DARK_GRAY,
  },
  flex: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 30,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalText: {
    fontSize: 15,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default AppAlertDialogModal;

class ModalManager {
  private modalRef: any;

  constructor() {
    this.modalRef = React.createRef<any>();
  }

  show(data: Props) {
    if (this.modalRef) {
      this.modalRef.show(data);
    }
  }

  hide() {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  setModalRef(ref: any) {
    this.modalRef = ref;
  }
}

export const AppAlertDialog = new ModalManager();
