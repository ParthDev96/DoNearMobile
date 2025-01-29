import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import ImagePicker, {Image, Options} from 'react-native-image-crop-picker';
import {PERMISSIONS, RESULTS} from 'react-native-permissions';
import {
  setCameraPermission,
  setPhotoLibraryPermission,
} from 'src/redux/slices/appSlice';
import {useAppDispatch, useAppSelector} from 'src/redux/store';
import utils from 'src/utils';
import ImageResizer, {Response} from '@bam.tech/react-native-image-resizer';

interface IMAGE_PROPS {
  width?: number;
  height?: number;
  freeStyleCropEnabled?: boolean;
  multiple?: boolean;
}
const useSelectImage = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  let cameraPermission = useAppSelector(
    state => state.appSlice.cameraPermission,
  );
  let photoLibraryPermission = useAppSelector(
    state => state.appSlice.photoLibraryPermission,
  );

  const checkMediaPermission = async () => {
    const androidOSVersion = await DeviceInfo.getApiLevel().then(apiLevel => {
      return apiLevel;
    });

    let ANDROID_PERMISSION =
      androidOSVersion >= 33
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

    let result = await utils.checkPermission(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : ANDROID_PERMISSION,
    );

    if (result === RESULTS.BLOCKED || result === RESULTS.UNAVAILABLE) {
      if (photoLibraryPermission) {
        utils.showPermissionSettingPopup(
          t('PERMISSION_FILES_MEDIA_TITLE'),
          t('PERMISSION_FILES_MEDIA_DESCRIPTION'),
          t('SETTINGS'),
          t('Cancel'),
          // Config.Images.icons.ic_camera_permission,
        );
      } else {
        dispatch(setPhotoLibraryPermission(true));
      }
      return false;
    }
    return true;
  };

  const chooseFromGallery = async ({
    width = 1024,
    height = 1024,
    freeStyleCropEnabled = true,
    multiple = false,
  }: IMAGE_PROPS): Promise<Image[] | Image | null> => {
    return new Promise(async (resolve, reject) => {
      let isMediaPermissionAvailable = await checkMediaPermission();
      if (!isMediaPermissionAvailable) {
        reject(null);
        return;
      }
      ImagePicker.openPicker({
        width: width,
        height: height,
        multiple: multiple,
        enableRotationGesture: true,
        mediaType: 'photo',
        showCropFrame: true,
        cropping: true,
        freeStyleCropEnabled: freeStyleCropEnabled,
        compressImageQuality: 0.9,
      })
        .then(images => {
          console.log('images: ', images);
          resolve(images);
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    });
  };
  const checkCameraPermission = async () => {
    let result = await utils.checkPermission(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    if (result === RESULTS.BLOCKED || result === RESULTS.UNAVAILABLE) {
      if (cameraPermission) {
        utils.showPermissionSettingPopup(
          t('PERMISSION_CAMERA_TITLE'),
          t('PERMISSION_CAMERA_DESCRIPTION'),
          t('SETTINGS'),
          t('Cancel'),
          // Config.Images.icons.ic_camera_permission,
        );
      } else {
        dispatch(setCameraPermission(true));
      }

      return false;
    }
    return true;
  };

  const chooseFromCamera = async (): Promise<Image> => {
    return new Promise(async (resolve, reject) => {
      let isCameraPermissionAvailable = await checkCameraPermission();
      if (!isCameraPermissionAvailable) {
        reject(null);
        return;
      }

      let IOSOptions: Options = {
        width: 1024,
        height: 1024,
        enableRotationGesture: true,
        mediaType: 'photo',
        showCropFrame: true,
        cropping: true,
        freeStyleCropEnabled: true,
        compressImageQuality: 0.9,
        smartAlbums: [
          'Favorites',
          'UserLibrary',
          'RecentlyAdded',
          'PhotoStream',
          'Generic',
          'Timelapses',
          'AllHidden',
          'Bursts',
          'SlomoVideos',
          'SelfPortraits',
          'Screenshots',
          'DepthEffect',
          'LivePhotos',
          'Animated',
          'LongExposure',
        ],
      };
      let AndroidOptions: Options = {
        enableRotationGesture: true,
        mediaType: 'photo',
        showCropFrame: true,
        cropping: true,
        freeStyleCropEnabled: true,
        compressImageQuality: 0.9,
        smartAlbums: [
          'Favorites',
          'UserLibrary',
          'RecentlyAdded',
          'PhotoStream',
          'Generic',
          'Timelapses',
          'AllHidden',
          'Bursts',
          'SlomoVideos',
          'SelfPortraits',
          'Screenshots',
          'DepthEffect',
          'LivePhotos',
          'Animated',
          'LongExposure',
        ],
      };
      const options = Platform.OS === 'ios' ? IOSOptions : AndroidOptions;
      ImagePicker.openCamera(options)
        .then(images => {
          console.log('images: ', images);
          resolve(images);
        })
        .catch(err => {
          console.log(err);
          reject(null);
        });
    });
  };

  var getCalculatedSize = (maxWidth: number, maxHeight: number) => {
    var ratio = 1024 / maxWidth;
    var newWidth = 1024;
    var newHeight = maxHeight * ratio;
    if (newHeight > 1024) {
      var ratio = 1024 / maxHeight;
      newHeight = 1024;
      newWidth = maxWidth * ratio;
    }
    return {width: newWidth, height: newHeight};
  };

  const getCompressedImage = async ({
    path,
    maxWidth = 300,
    maxHeight = 300,
    quality = 99,
  }: {
    path: string;
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
  }): Promise<Response | null> => {
    var newSize = {
      width: maxWidth,
      height: maxHeight,
    };
    if (maxWidth > 1024 && maxHeight > 1024) {
      newSize = getCalculatedSize(maxWidth, maxHeight);
    }
    try {
      const result = await ImageResizer.createResizedImage(
        path,
        newSize.width,
        newSize.height,
        'JPEG',
        quality,
      );
      if (result && result.path) {
        return {
          ...result,
          path:
            Platform.OS === 'android' ? 'file://' + result.path : result.path,
        };
      }
      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  return {chooseFromCamera, chooseFromGallery, getCompressedImage};
};

export default useSelectImage;
