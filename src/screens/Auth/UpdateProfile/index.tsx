import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './styles';
import {
  Keyboard,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native-gesture-handler';
import {StackPropsType} from 'src/routes/navParamsType';
import useSelectImage from 'src/hooks/useSelectImage';
// import {useAppDispatch} from 'src/redux/store';
import AppLoader from 'src/components/AppLoader/AppLoaderManager';
import validations from 'src/utils/validations';
import AppMediaOptions from 'src/components/AppMediaOptions/AppMediaOptionsManager';
import {IMediaOptions} from 'src/components/AppMediaOptions/AppMediaOptions';
import Components from 'src/components';
import config from 'src/config';
import ProgressiveImage from 'src/components/ProgressiveImage';
import {default as Feather} from 'react-native-vector-icons/Feather';
import utils from 'src/utils';

const UpdateProfile = ({
  navigation,
  route,
}: StackPropsType<'UpdateProfile'>) => {
  const isEdit = route.params && route.params.isEdit;

  const {t} = useTranslation();
  // const {uploadImages} = useUploadImage();
  const {chooseFromCamera, chooseFromGallery} = useSelectImage();

  // const profileData = useSelector((state: RootState) => state.userSlice);
  // const dispatch = useAppDispatch();

  const [profileImage, setProfileImage] = useState<string>('');
  const [profileImageError, setProfileImageError] = useState<string>('');

  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');

  const [phone, setPhone] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const phoneRef = useRef<TextInput | null>();
  const emailRef = useRef<TextInput | null>();
  const addressRef = useRef<TextInput | null>();
  const isProfileUpdated = useRef<boolean>(false);

  useEffect(() => {
    // if (profileData && profileData.user) {
    //   setName(profileData.user.name);
    //   setEmail(profileData.user.email);
    //   if (profileData.user.contactNumber) {
    //     setPhone(profileData.user.contactNumber);
    //   }
    //   if (profileData.user.profilePicture) {
    //     setProfileImage(utils.awsFunctions.getProfileURL());
    //   }
    // }
  }, []);

  // const callUpdateProfileAPI = useCallback(
  //   async (payload: any) => {
  //     const response = await dispatch(updateProfileThunk(payload));
  //     AppLoader.hide();
  //     if (
  //       response &&
  //       response.meta.requestStatus === 'fulfilled' &&
  //       response.payload
  //     ) {
  //       if (isEdit) {
  //         navigation.goBack();
  //       } else {
  //         navigation.reset({
  //           index: 0,
  //           routes: [{name: 'TabStack'}],
  //         });
  //       }
  //     }
  //   },
  //   [dispatch, isEdit, navigation],
  // );

  //login api calling
  const onPressSubmit = useCallback(async () => {
    var nameText = name.trim();
    var phoneText = phone.trim();

    var isValid = true;
    if (profileImage === '') {
      isValid = false;
      setProfileImageError(t('PleaseSelectAnImage'));
    } else {
      setProfileImageError('');
    }
    if (validations.isBlank(nameText)) {
      isValid = false;
      setNameError(t('PleaseEnterName'));
    } else {
      setNameError('');
    }
    if (validations.isBlank(phoneText)) {
      isValid = false;
      setPhoneError(t('PleaseEnterContactNumber'));
    } else if (!validations.isValidPhone(phoneText)) {
      isValid = false;
      setPhoneError(t('PleaseEnterTenDigitContactNumber'));
    } else {
      setPhoneError('');
    }
    if (!isValid) {
      return;
    }
    Keyboard.dismiss();
    AppLoader.show({});
    navigation.reset({
      index: 0,
      routes: [{name: 'TabStack'}],
    });
    // if (isProfileUpdated.current) {
    //   let fileUpload = await uploadImages([
    //     {
    //       folder: AWS_DREDENTIALS.FOLDERS.profile,
    //       key: profileData.user?.id + '.png',
    //       uri: profileImage,
    //     },
    //   ]);
    //   console.log('fileUpload: ', fileUpload);

    //   if (fileUpload && fileUpload[0].Key) {
    //     const payload: any = {
    //       name: nameText,
    //       contactNumber: phoneText,
    //       profilePicture: fileUpload[0].Bucket + '/' + fileUpload[0].Key,
    //     };
    //     await callUpdateProfileAPI(payload);
    //   } else {
    //     errorToast({
    //       text1: 'Error',
    //       text2: 'Error while uploading an image.',
    //     });
    //   }
    // } else {
    //   const payload: any = {
    //     name: nameText,
    //     contactNumber: phoneText,
    //   };
    //   await callUpdateProfileAPI(payload);
    // }

    AppLoader.hide();
  }, [name, navigation, phone, profileImage, t]);

  const onProfilePress = useCallback(() => {
    AppMediaOptions.show({
      onSelectOption: async (option: string) => {
        if (option === IMediaOptions.camera) {
          chooseFromCamera();
        } else if (option === IMediaOptions.gallery) {
          const s_image: any = await chooseFromGallery({
            freeStyleCropEnabled: false,
            height: 300,
            width: 300,
          });
          if (s_image && s_image.path) {
            setProfileImageError('');
            setProfileImage(s_image.path);
            isProfileUpdated.current = true;
          }
        }
      },
    });
  }, [chooseFromCamera, chooseFromGallery]);

  return (
    <View style={styles.container}>
      <Components.NavigationBar
        title={isEdit ? t('Edit') : t('CreateProfile')}
        showBack={navigation.canGoBack()}
        onBackPress={() => navigation.goBack()}
        titleStyle={!isEdit ? styles.headerTitle : undefined}
      />
      <ScrollView style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onProfilePress}
          style={styles.profileImagecontainer}>
          <ProgressiveImage
            thumbImageUri={profileImage}
            imageStyle={styles.profileImage}
          />
          <View
            style={[
              styles.editImageContainer,
              styles.editImageshadowContainer,
            ]}>
            <Feather
              name={'edit'}
              size={utils.normalize(17)}
              color={config.colors.COLOR_APP_TEXT}
            />
          </View>
        </TouchableOpacity>
        {profileImageError !== '' && (
          <Components.CustomText style={styles.profileImageErrorText}>
            {profileImageError}
          </Components.CustomText>
        )}
        <Components.CustomTextInput
          error={nameError}
          onChangeText={(text: string) => {
            setName(text);
            setNameError('');
          }}
          leftImage={config.images.ic_user}
          value={name}
          placeholder={t('NAME')}
          containerStyle={styles.nameInputContainer}
          onSubmitEditing={() => {
            phoneRef!.current?.focus();
          }}
          returnKeyType="next"
        />
        <Components.CustomTextInput
          onCreateRef={(ref: TextInput) => {
            phoneRef.current = ref;
          }}
          maxLength={10}
          error={phoneError}
          onChangeText={(text: string) => {
            setPhone(text);
            setPhoneError('');
          }}
          leftImage={config.images.ic_phone}
          value={phone}
          placeholder={t('PhoneNumber')}
          containerStyle={styles.inputContainer}
          onSubmitEditing={() => {
            emailRef!.current?.focus();
          }}
          returnKeyType="next"
          keyboardType="phone-pad"
        />
        <Components.CustomTextInput
          onCreateRef={(ref: TextInput) => {
            emailRef.current = ref;
          }}
          editable={false}
          error={emailError}
          onChangeText={(text: string) => {
            setEmail(text);
            setEmailError('');
          }}
          leftImage={config.images.ic_email}
          value={email}
          placeholder={t('EMAIL')}
          containerStyle={styles.inputContainer}
          onSubmitEditing={() => {
            addressRef!.current?.focus();
          }}
          returnKeyType="next"
          keyboardType="email-address"
        />
        <Components.AppButton
          containerStyle={styles.updateButtonContainer}
          text={isEdit ? t('Submit') : t('Update')}
          onPress={() => {
            onPressSubmit();
          }}
        />
      </ScrollView>
      <SafeAreaView />
    </View>
  );
};

export default UpdateProfile;
