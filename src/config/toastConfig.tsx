import React from 'react';
import Toast, {ToastConfig} from 'react-native-toast-message';
import {default as IconFontAwesome} from 'react-native-vector-icons/FontAwesome6';
import {default as AntDesign} from 'react-native-vector-icons/AntDesign';

import Colors from './colors';
import utils from 'src/utils';
import Components from 'src/components';
import {TOAST_PROPS} from 'src/components/Toast/CustomToastComponent';

const toastConfig: ToastConfig = {
  success: (params: any) => {
    const leftIcon = () => {
      return (
        <IconFontAwesome
          name="circle-check"
          size={utils.normalize(30)}
          color={Colors.COLOR_SECONDARY}
        />
      );
    };
    return (
      <Components.CustomToastComponent
        leftIcon={params.props.leftIcon ? params.props.leftIcon : leftIcon}
        {...params.props}
      />
    );
  },
  error: (params: any) => {
    const leftIcon = () => {
      return (
        <AntDesign
          name="closecircleo"
          size={utils.normalize(30)}
          color={Colors.RED}
        />
      );
    };
    return (
      <Components.CustomToastComponent
        leftIcon={params.props.leftIcon ? params.props.leftIcon : leftIcon}
        mainContainerStyle={[
          {
            borderColor: Colors.RED,
          },
          params.props.mainContainerStyle,
        ]}
        {...params.props}
      />
    );
  },
};

export default toastConfig;

export const successToast = (props: TOAST_PROPS) => {
  Toast.show({
    props: props,
    type: 'success',
    position: 'top',
  });
};

export const errorToast = (props: TOAST_PROPS) => {
  Toast.show({
    props: props,
    type: 'error',
    position: 'top',
  });
};
