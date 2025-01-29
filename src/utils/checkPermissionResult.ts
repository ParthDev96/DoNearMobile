import {
  request,
  check,
  RESULTS,
  openSettings,
  Permission,
} from 'react-native-permissions';
import AppPopup from 'src/components/AppPopup/AppPopup';

const checkPermission = async (permission: Permission): Promise<string> => {
  const result = await check(permission);
  return checkPermissionResult(result, permission);
};

const requestPermission = async (permission: Permission): Promise<string> => {
  const result = await request(permission);
  return checkPermissionResult(result, permission);
};

const checkPermissionResult = (
  result: any,
  permission: Permission,
): Promise<string> => {
  return new Promise((resolve, _reject) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        resolve(RESULTS.UNAVAILABLE);
        break;

      case RESULTS.DENIED:
        console.log('The permission is denied and not requestable anymore');
        resolve(requestPermission(permission));
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        resolve(RESULTS.LIMITED);
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        resolve(RESULTS.GRANTED);
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        resolve(RESULTS.BLOCKED);
        break;
    }
  });
};

export default checkPermission;

export const showPermissionSettingPopup = (
  title: string,
  description: string,
  confirmTitle: string,
  cancelTitle: string,
) => {
  AppPopup.show({
    title: title,
    message: description,
    submitText: confirmTitle,
    cancelText: cancelTitle,
    onSubmit: () =>
      openSettings().catch(() => console.warn('cannot open settings')),
  });
};
