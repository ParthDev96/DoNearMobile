import React from 'react';
import ToastComponent, {
  ToastComponentProps,
} from '../components/ToastComponent';

const toastConfig: any = {
  customToast: ({props}: {props: ToastComponentProps}) => {
    return <ToastComponent {...props} />;
  },
};

export default toastConfig;
