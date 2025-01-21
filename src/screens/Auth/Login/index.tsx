import React, {useCallback, useRef, useState} from 'react';
import styles from './styles';
import config from 'src/config';
import Components from 'src/components';
import {Keyboard, TextInput, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
// import {useAppDispatch} from 'src/redux/store';
import validations from 'src/utils/validations';
import {StackPropsType} from 'src/routes/navParamsType';

const Login = ({navigation}: StackPropsType<'Login'>) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  // const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>(
    __DEV__ ? 'parth.v.1011@gmail.com' : '',
  );
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState<string>(__DEV__ ? '123456' : '');
  const [passwordError, setPasswordError] = useState('');

  const loginRef = useRef<TextInput | null>();
  const passwordRef = useRef<TextInput | null>();

  //login api calling
  const onPressLogin = useCallback(async () => {
    var emailText = email.trim();
    var passwordText = password.trim();

    var isValid = true;
    if (validations.isBlank(emailText)) {
      setEmailError(t('PleaseEnterEmail'));
      isValid = false;
    } else if (!validations.isValidEmail(emailText)) {
      setEmailError(t('PleaseEnterValidEmail'));
      isValid = false;
    } else {
      setEmailError('');
    }

    if (validations.isBlank(passwordText)) {
      setPasswordError(t('PleaseEnterPassword'));
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isValid) {
      return;
    }
    Keyboard.dismiss();
    navigation.reset({
      index: 0,
      routes: [{name: 'TabStack'}],
    });
    // const payload: any = {
    //   email: emailText,
    //   password: passwordText,
    // };
    // const response = await dispatch(loginThunk(payload)).unwrap();

    // if (response) {
    //   if (!response.user.isEmailVerified) {
    //     navigation.navigate('Verification', {});
    //   } else if (!response.user.userProfileCompleted) {
    //     navigation.reset({
    //       index: 0,
    //       routes: [{name: 'UpdateProfile'}],
    //     });
    //   } else {
    //     navigation.reset({
    //       index: 0,
    //       routes: [{name: 'TabStack'}],
    //     });
    //   }
    // }
  }, [email, navigation, password, t]);

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{paddingTop: insets.top}}
        style={styles.scrollView}>
        <View style={styles.logoImageMainContainer}>
          <View>
            <Components.CustomText
              onPress={() => {
                // navigation.navigate('Register', {});
              }}
              style={styles.welcomeBackText}>
              {t('Welcome')}
            </Components.CustomText>
            <Components.CustomText
              onPress={() => {
                // navigation.navigate('Register', {});
              }}
              style={styles.signInText}>
              {t('SignInToContinue')}
            </Components.CustomText>
          </View>
          <FastImage
            source={config.images.ic_logo}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </View>
        <View style={styles.centerContainer}>
          <Components.CustomTextInput
            onCreateRef={(ref: TextInput) => {
              loginRef.current = ref;
            }}
            error={emailError}
            onChangeText={(text: string) => {
              setEmail(text);
              setEmailError('');
            }}
            // leftImage={config.images.ic_email}
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
            returnKeyType="done"
            onSubmitEditing={() => {
              onPressLogin();
            }}
            // leftImage={config.images.ic_lock}
          />
          <Components.AnimatedButton
            activeOpacity={0.99}
            style={[styles.forgotPasswordContainer]}
            onPress={() => {
              // if (onTitleRightImage) {
              //   onTitleRightImage();
              // }
            }}>
            <Components.CustomText style={styles.forgotPasswordText}>
              {t('ForgotPassword')}
            </Components.CustomText>
          </Components.AnimatedButton>
          <Components.CustomText style={styles.privacyText1}>
            {t('SignInTermsAndConditions') + ' '}
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
              onPressLogin();
            }}
            containerStyle={styles.submitButton}
          />
        </View>
      </ScrollView>
      <Components.CustomText style={styles.stillNotRegisterText}>
        {t('StillNotRegistered') + ' '}
        <Components.CustomText
          onPress={() => {
            navigation.navigate('Signup', {});
          }}
          style={styles.registerText}>
          {t('Register')}
        </Components.CustomText>
      </Components.CustomText>
    </View>
  );
};

export default Login;
