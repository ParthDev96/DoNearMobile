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
          <AppButton
            text={
              modalProps.positiveButtonText
                ? modalProps.positiveButtonText
                : t('Close')
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
      );
    }
  }, [modalProps, t]);
  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        statusBarTranslucent
        style={styles.modal}
        onBackButtonPress={() => {
          setVisible(false);
        }}>
        {renderViews}
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  buttonSep: {
    width: utils.normalize(20),
  },
  negativeButtonContainer: {
    flex: 1,
    height: utils.normalize(45),
    backgroundColor: config.colors.COLOR_TRANSPARENT,
    borderWidth: utils.normalize(1),
    borderColor: config.colors.COLOR_APP_DARK_GRAY + '50',
  },
  positiveButtonContainer: {
    // flex: 1,
    height: utils.normalize(45),
    paddingHorizontal: utils.normalize(40),
    marginTop: utils.normalize(20),
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
    marginTop: utils.normalize(30),
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: utils.normalize(20),
    borderRadius: utils.normalize(10),
    alignItems: 'center',
    width: config.ConstantVariables.DYNAMIC_COMPONENTS_WIDTH,
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: utils.normalize(18),
    lineHeight: utils.normalize(22),
    fontFamily: config.font.NotoSansBold,
    marginTop: utils.normalize(10),
  },
  modalText: {
    fontSize: utils.normalize(15),
    marginTop: utils.normalize(20),
    textAlign: 'center',
    fontFamily: config.font.NotoSansRegular,
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
