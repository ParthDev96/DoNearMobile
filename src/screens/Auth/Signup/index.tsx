import React, {useCallback, useRef, useState} from 'react';
import {View, Keyboard, ScrollView, TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import validations from 'src/utils/validations';
import AppLoader from 'src/components/AppLoader/AppLoaderManager';
import styles from './styles';
import Components from 'src/components';
import config from 'src/config';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import utils from 'src/utils';
import {StackPropsType} from 'src/types/navigation';

const Signup = ({navigation}: StackPropsType<'Signup'>) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState(
    __DEV__ ? 'parth.silversky@gmail.com' : '',
  );
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState(__DEV__ ? '123456' : '');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState<string>(
    __DEV__ ? '123456' : '',
  );
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const passwordRef = useRef<TextInput | null>();
  const confirmPasswordRef = useRef<TextInput | null>();

  const onPressSubmit = useCallback(async () => {
    const emailText = email.trim();
    const passwordText = password.trim();
    const confirmPasswordText = confirmPassword.trim();

    var isValid = true;
    if (validations.isBlank(emailText)) {
      setEmailError('Please enter email');
      isValid = false;
    } else if (!validations.isValidEmail(emailText)) {
      setEmailError('Please enter valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (validations.isBlank(passwordText)) {
      setPasswordError('Please enter password');
      isValid = false;
    } else if (!validations.isValidPassword(passwordText)) {
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError('');
    }
    if (validations.isBlank(confirmPasswordText)) {
      setConfirmPasswordError('Please enter confirm password');
      isValid = false;
    } else if (
      !validations.isPasswordMatch(passwordText, confirmPasswordText)
    ) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!isValid) {
      return;
    }
    Keyboard.dismiss();

    AppLoader.show({});
    // Call loginUser function

    // const result = await registerUser(emailText, passwordText);

    // Handle result

    // if (result.success) {
    //   await firebaseUserActions.createUserInFirestore({
    //     email: emailText,
    //     loginType: USER_LOGIN_TYPE.EMAIL,
    //   });
    //   if (result.user) {
    //     result.user
    //       .sendEmailVerification()
    //       .then(function () {
    //         setTimeout(() => {
    //           AppPopupManager.show({
    //             title: 'Verify your email address',
    //             message:
    //               'We have sent you an email for verification. Please verify your email and log in.',
    //             submitText: 'Ok',
    //             cancelButtonVisible: false,
    //             onSubmit: async () => {},
    //           });
    //         }, 500);
    //         AppLoader.hide();
    //         navigation.navigate('Login');
    //       })
    //       .catch(function () {
    //         AppLoader.hide();
    //         console.log('error while email sent');
    //       });
    //   }
    // } else {
    //   AppLoader.hide();
    //   errorToast({
    //     text1: 'Create account error',
    //     text2: result.message,
    //   });
    // }
  }, [confirmPassword, email, password]);

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{paddingTop: insets.top + utils.normalize(20)}}
        style={styles.scrollView}>
        <FastImage
          source={config.images.ic_logo}
          resizeMode="contain"
          style={styles.logoImage}
        />
        <View style={styles.centerContainer}>
          {/* <Components.CustomTextInput
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
              emailRef!.current?.focus();
            }}
            returnKeyType="next"
          /> */}
          <Components.CustomTextInput
            // onCreateRef={(ref: TextInput) => {
            //   emailRef.current = ref;
            // }}
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
              passwordRef!.current?.focus();
            }}
            returnKeyType="next"
          />
          <Components.CustomTextInput
            onCreateRef={(ref: TextInput) => {
              passwordRef.current = ref;
            }}
            error={passwordError}
            onChangeText={(text: string) => {
              setPassword(text);
              setPasswordError('');
            }}
            value={password}
            placeholder={t('Password')}
            containerStyle={styles.passwordInputContainer}
            password
            showEye
            returnKeyType="next"
            onSubmitEditing={() => {
              confirmPasswordRef!.current?.focus();
            }}
            leftImage={config.images.ic_lock}
          />
          <Components.CustomTextInput
            onCreateRef={(ref: TextInput) => {
              confirmPasswordRef.current = ref;
            }}
            error={confirmPasswordError}
            onChangeText={(text: string) => {
              setConfirmPassword(text);
              setConfirmPasswordError('');
            }}
            value={confirmPassword}
            placeholder={t('ConfirmPassword')}
            containerStyle={styles.passwordInputContainer}
            password
            showEye
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            leftImage={config.images.ic_lock}
          />
          <Components.CustomText style={styles.privacyText1}>
            {t('SignUpTermsAndConditions') + ' '}
            <Components.CustomText
              onPress={() => {}}
              style={styles.privacyText2}>
              {t('TermAndConditions')}
            </Components.CustomText>
            <Components.CustomText style={styles.privacyText1}>
              {' ' + t('and') + ' '}
            </Components.CustomText>
            <Components.CustomText
              onPress={() => {}}
              style={styles.privacyText2}>
              {t('PrivacyPolicy') + '.'}
            </Components.CustomText>
          </Components.CustomText>
          <Components.RoundedButton
            extraButtonProps={{
              activeOpacity: 0.99,
            }}
            onPress={() => {
              onPressSubmit();
            }}
            containerStyle={styles.submitButton}
          />
        </View>
      </ScrollView>
      <Components.CustomText style={styles.stillNotRegisterText}>
        {t('AlreadyHaveAnAccount') + ' '}
        <Components.CustomText
          onPress={() => {
            navigation.popTo('Login', {});
          }}
          style={styles.registerText}>
          {t('LOGIN')}
        </Components.CustomText>
      </Components.CustomText>
    </View>
  );
};

export default Signup;
