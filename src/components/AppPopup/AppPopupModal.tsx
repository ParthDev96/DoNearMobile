import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet, TextStyle, ViewStyle, Image} from 'react-native';
import Modal from 'react-native-modal';
import AppPopupManager from './AppPopup';
import Components from '..';
import {useTranslation} from 'react-i18next';
import utils from 'src/utils';
import config from 'src/config';

export interface IModalConfig {
  title?: string;
  image?: any;
  customIcon?: any;
  message?: string;
  cancelText?: string;
  cancelButtonVisible?: boolean;
  submitText?: string;
  onCancel?: () => void;
  onSubmit?: () => void;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
  cancelButtonStyle?: ViewStyle;
  cancelButtonTextStyle?: TextStyle;
  submitButtonStyle?: ViewStyle;
  submitButtonTextStyle?: TextStyle;
}

const AppPopupModal: React.FC = () => {
  const {t} = useTranslation();
  const [isVisible, setVisible] = useState<boolean>(false);
  const [modalConfig, setModalConfig] = useState<IModalConfig>({
    cancelButtonVisible: true,
    title: '',
    message: '',
    cancelText: t('Cancel'),
    submitText: t('ok'),
    onCancel: () => {},
    onSubmit: () => {},
    titleStyle: {},
    messageStyle: {},
    cancelButtonStyle: {},
    cancelButtonTextStyle: {},
    submitButtonStyle: {},
    submitButtonTextStyle: {},
    image: undefined,
    customIcon: undefined,
  });

  useEffect(() => {
    const listener = {
      show: (popupConfig: IModalConfig) => {
        var t_config = {
          cancelButtonVisible: popupConfig.cancelButtonVisible
            ? popupConfig.cancelButtonVisible
            : true,
          title: popupConfig.title ? popupConfig.title : '',
          message: popupConfig.message ? popupConfig.message : '',
          cancelText: popupConfig.cancelText
            ? popupConfig.cancelText
            : t('Cancel'),
          submitText: popupConfig.submitText ? popupConfig.submitText : t('ok'),
          onCancel: popupConfig.onCancel ? popupConfig.onCancel : () => {},
          onSubmit: popupConfig.onSubmit ? popupConfig.onSubmit : () => {},
          titleStyle: popupConfig.titleStyle ? popupConfig.titleStyle : {},
          messageStyle: popupConfig.messageStyle
            ? popupConfig.messageStyle
            : {},
          cancelButtonStyle: popupConfig.cancelButtonStyle
            ? popupConfig.cancelButtonStyle
            : {},
          cancelButtonTextStyle: popupConfig.cancelButtonTextStyle
            ? popupConfig.cancelButtonTextStyle
            : {},
          submitButtonStyle: popupConfig.submitButtonStyle
            ? popupConfig.submitButtonStyle
            : {},
          submitButtonTextStyle: popupConfig.submitButtonTextStyle
            ? popupConfig.submitButtonTextStyle
            : {},
          image: popupConfig.image ? popupConfig.image : undefined,
          customIcon: popupConfig.customIcon
            ? popupConfig.customIcon
            : undefined,
        };
        setModalConfig(t_config);
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
  }, [t]);

  const renderCancelButton = useMemo(() => {
    return (
      <>
        {modalConfig.cancelButtonVisible && (
          <Components.AppButton
            style={StyleSheet.flatten([
              styles.cancelButtonStyle,
              modalConfig.cancelButtonStyle,
            ])}
            textStyle={StyleSheet.flatten([
              styles.cancelButtonText,
              modalConfig.cancelButtonTextStyle,
            ])}
            text={modalConfig.cancelText}
            onPress={() => {
              if (modalConfig.onCancel) {
                modalConfig.onCancel();
              }
              AppPopupManager.hide();
            }}
            containerStyle={styles.button}
          />
        )}
        {modalConfig.cancelButtonVisible && <View style={styles.buttonSep} />}
      </>
    );
  }, [modalConfig]);

  return (
    <>
      <Modal statusBarTranslucent={true} isVisible={isVisible}>
        <View style={styles.modalView}>
          {modalConfig.image && (
            <Image
              source={modalConfig.image}
              resizeMode="contain"
              style={styles.image}
            />
          )}
          {modalConfig.customIcon && (
            <View style={styles.customIconContainer}>
              {modalConfig.customIcon}
            </View>
          )}
          <Components.CustomText style={[styles.title, modalConfig.titleStyle]}>
            {modalConfig.title}
          </Components.CustomText>
          <Components.CustomText
            style={[styles.message, modalConfig.messageStyle]}>
            {modalConfig.message}
          </Components.CustomText>
          <View style={styles.buttonContainer}>
            {renderCancelButton}
            <Components.AppButton
              style={StyleSheet.flatten([
                styles.submitButtonStyle,
                modalConfig.submitButtonStyle,
              ])}
              textStyle={StyleSheet.flatten([
                styles.submitButtonText,
                modalConfig.submitButtonTextStyle,
              ])}
              text={modalConfig.submitText}
              onPress={() => {
                if (modalConfig.onSubmit) {
                  modalConfig.onSubmit();
                }
                AppPopupManager.hide();
              }}
              containerStyle={styles.button}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  customIconContainer: {
    marginBottom: utils.normalize(10),
  },
  image: {
    width: utils.normalize(50),
    height: utils.normalize(50),
  },
  buttonSep: {
    width: utils.normalize(15),
  },
  submitButtonStyle: {
    height: utils.normalize(45),
  },
  cancelButtonStyle: {
    height: utils.normalize(45),
    backgroundColor: config.colors.COLOR_WHITE,
    borderWidth: utils.normalize(1),
    borderColor: config.colors.COLOR_APP_DARK_GRAY,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: utils.normalize(10),
    padding: utils.normalize(20),
    alignItems: 'center',
    alignSelf: 'center',
    width: config.ConstantVariables.DYNAMIC_SCREEN_WIDTH,
  },
  title: {
    fontSize: utils.normalize(18),
    lineHeight: utils.normalize(22),
    textAlign: 'center',
    marginTop: utils.normalize(5),
  },
  message: {
    fontSize: utils.normalize(14),
    lineHeight: utils.normalize(20),
    marginTop: utils.normalize(15),
    fontFamily: config.font.NotoSansRegular,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: utils.normalize(25),
  },
  button: {
    flex: 1,
  },
  submitButtonText: {},
  cancelButtonText: {
    color: config.colors.COLOR_BLACK,
  },
});

export default AppPopupModal;
