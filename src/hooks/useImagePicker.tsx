// useImagePicker.js
import {Alert, Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const useImagePicker = () => {
  const requestCameraPermission = async () => {
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;

    const result = await request(permission);
    return result === RESULTS.GRANTED;
  };

  const requestGalleryPermission = async () => {
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY;

    const result = await request(permission);
    return result === RESULTS.GRANTED;
  };

  const pickImageFromCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission denied', 'Camera permission is required.');
      return Promise.reject('Camera permission denied');
    }

    return new Promise((resolve, reject) => {
      launchCamera({mediaType: 'photo'}, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          reject(null);
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
          reject(response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          resolve(response.assets[0]);
        } else {
          reject(null);
        }
      });
    });
  };

  const pickImageFromGallery = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert('Permission denied', 'Gallery permission is required.');
      return Promise.reject('Gallery permission denied');
    }

    return new Promise((resolve, reject) => {
      launchImageLibrary({mediaType: 'photo'}, response => {
        if (response) {
          if (response.didCancel) {
            console.log('User cancelled image picker');
            reject(null);
          } else if (response.errorMessage) {
            console.log('ImagePicker Error: ', response.errorMessage);
            reject(response.errorMessage);
          } else if (response.assets && response.assets.length > 0) {
            resolve(response.assets[0]);
          } else {
            reject(null);
          }
        }
      });
    });
  };

  return {
    pickImageFromCamera,
    pickImageFromGallery,
  };
};

export default useImagePicker;
