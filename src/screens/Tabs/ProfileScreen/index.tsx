import React, {useCallback, useMemo, useRef} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {default as IconEntypo} from 'react-native-vector-icons/Entypo';
import {default as IconAntDesign} from 'react-native-vector-icons/AntDesign';
import {default as IconFontAwesome} from 'react-native-vector-icons/FontAwesome';
import {default as IconMaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {StackPropsType} from 'src/routes/navParamsType';
import utils from 'src/utils';
import config from 'src/config';
import AppPopup from 'src/components/AppPopup/AppPopup';
import AppLoader from 'src/components/AppLoader/AppLoaderManager';
import Components from 'src/components';
import ProgressiveImage from 'src/components/ProgressiveImage';

type IOptions = {
  id: number;
  title: string;
  icon?: any;
};

const ProfileScreen = ({navigation}: StackPropsType<'ProfileScreen'>) => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  // const profileData = useSelector((state: RootState) => state.userSlice);

  const PROFILE_OPTIONS = useRef<IOptions[]>([
    {
      id: 0,
      title: t('Favourites'),
      icon: (
        <IconAntDesign
          name="hearto"
          size={utils.normalize(20)}
          color={config.colors.COLOR_APP_LIGHT_GRAY}
        />
      ),
    },
    {
      id: 1,
      title: t('EditProfile'),
      icon: (
        <IconFontAwesome
          name="edit"
          size={utils.normalize(20)}
          color={config.colors.COLOR_APP_LIGHT_GRAY}
        />
      ),
    },
    // {
    //   id: 4,
    //   title: t('Orders'),
    //   icon: (
    //     <Image
    //       source={config.images.ic_orders}
    //       resizeMode="contain"
    //       style={styles.leftImageSize}
    //     />
    //   ),
    // },
    {
      id: 2,
      title: t('ChangePassword'),
      icon: (
        <IconMaterialIcons
          name="password"
          size={utils.normalize(20)}
          color={config.colors.COLOR_APP_LIGHT_GRAY}
        />
      ),
    },
    {
      id: 3,
      title: t('SETTINGS'),
      icon: (
        <IconAntDesign
          name="setting"
          size={utils.normalize(20)}
          color={config.colors.COLOR_APP_LIGHT_GRAY}
        />
      ),
    },
  ]);

  const USER_OPTIONS = useRef([
    {
      id: 0,
      title: t('PrivacyPolicy'),
    },
    {
      id: 1,
      title: t('TermAndConditions'),
    },
    {
      id: 2,
      title: t('DELETE_ACCOUNT'),
    },
  ]);

  const renderLogoutCutomIcon = useCallback((name: string) => {
    return (
      <IconAntDesign
        name={name}
        size={utils.normalize(50)}
        color={config.colors.RED}
      />
    );
  }, []);

  const callLogoutAPI = useCallback(async () => {
    // const payload: any = {};
    // const data = await dispatch(logoutThunk(payload));
    // if (data.meta.requestStatus === 'fulfilled') {
    //   // setTimeout(() => {
    //   //   navigation.reset({
    //   //     index: 0,
    //   //     routes: [{name: 'Login'}],
    //   //   });
    //   // }, 400);
    // }
    // dispatch(setLogout());
    AppLoader.hide();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  }, [navigation]);

  const callDeleteAccountAPI = useCallback(async () => {
    // await dispatch(deleteAccountThunk()).unwrap();
    // dispatch(setLogout());
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'Login'}],
    // });
  }, []);

  const onLogout = useCallback(() => {
    AppPopup.show({
      title: t('LOGOUT'),
      message: t('LOGOUT_MESSAGE'),
      submitText: t('LOGOUT'),
      onSubmit: async () => {
        setTimeout(() => {
          AppLoader.show({});
          callLogoutAPI();
        }, 400);
      },
      customIcon: renderLogoutCutomIcon('logout'),
    });
  }, [t, renderLogoutCutomIcon, callLogoutAPI]);

  const onDeleteAccount = useCallback(() => {
    AppPopup.show({
      title: t('DELETE_ACCOUNT'),
      message: t('DELETE_MESSAGE'),
      submitText: t('DELETE'),
      onSubmit: () => callDeleteAccountAPI(),
      submitButtonStyle: {
        backgroundColor: config.colors.RED,
      },
      submitButtonTextStyle: {
        color: config.colors.COLOR_WHITE,
      },
      customIcon: renderLogoutCutomIcon('deleteuser'),
    });
  }, [renderLogoutCutomIcon, t, callDeleteAccountAPI]);

  const onProfileOptionsPress = useCallback(
    (item: IOptions) => {
      if (item.id === 0) {
        // Favourites
        // navigation.navigate('Favourites', {});
      } else if (item.id === 1) {
        // Edit profile
        navigation.navigate('UpdateProfile', {
          isEdit: true,
        });
      } else if (item.id === 2) {
        // Change password
        // navigation.navigate('ChangePassword', {});
      } else if (item.id === 3) {
        // Settings
      } else if (item.id === 4) {
        // Orders
      }
    },
    [navigation],
  );

  const onUserOptionsPress = useCallback(
    (item: IOptions) => {
      if (item.id === 0) {
        // Privacy policy
      } else if (item.id === 1) {
        // terms
      } else if (item.id === 2) {
        // Delete user
        onDeleteAccount();
      }
    },
    [onDeleteAccount],
  );

  const renderArrow = useMemo(() => {
    return (
      <IconEntypo
        name="chevron-right"
        size={utils.normalize(15)}
        color={config.colors.COLOR_APP_LIGHT_GRAY}
      />
    );
  }, []);

  const renderLeftImage = useCallback((icon?: any) => {
    return <View style={styles.leftIconContainer}>{icon}</View>;
  }, []);

  const renderProfileOptions = useMemo(() => {
    return (
      <View style={styles.profileOptionsMainContainer}>
        {PROFILE_OPTIONS.current.map(item => {
          return (
            <TouchableOpacity
              key={item.id + ''}
              activeOpacity={0.7}
              onPress={() => onProfileOptionsPress(item)}
              style={styles.profileOptionContainer}>
              {renderLeftImage(item.icon)}
              <Components.CustomText style={styles.titleText}>
                {item.title}
              </Components.CustomText>
              {renderArrow}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }, [renderArrow, renderLeftImage, onProfileOptionsPress]);

  const renderUserOptions = useMemo(() => {
    return (
      <View style={[styles.userOptionsMainContainer, styles.shadowContainer]}>
        {USER_OPTIONS.current.map(item => {
          return (
            <TouchableOpacity
              key={item.id + ''}
              activeOpacity={0.7}
              onPress={() => onUserOptionsPress(item)}
              style={styles.userOptionContainer}>
              <Components.CustomText style={styles.titleText}>
                {item.title}
              </Components.CustomText>
              {renderArrow}
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onLogout()}
          style={styles.userOptionContainer}>
          <Components.CustomText style={styles.logoutText}>
            {t('LOGOUT')}
          </Components.CustomText>
          {renderArrow}
        </TouchableOpacity>
      </View>
    );
  }, [onUserOptionsPress, renderArrow, onLogout, t]);

  const renderProfileView = useMemo(() => {
    return (
      <View
        style={[
          styles.profileMainContainer,
          {
            paddingTop: insets.top + utils.normalize(20),
          },
        ]}>
        <ProgressiveImage
          thumbImageUri={' '}
          containerStyle={styles.profileContainer}
          imageStyle={styles.profileImage}
        />
        <View style={styles.profileRightContainer}>
          <Components.CustomText style={styles.userName}>
            {'John Doe'}
          </Components.CustomText>
        </View>
      </View>
    );
  }, [insets.top]);

  return (
    <View style={styles.container}>
      {renderProfileView}
      <ScrollView
        contentContainerStyle={{
          paddingBottom:
            insets.bottom +
            config.ConstantVariables.TAB_BAR_TOTAL_HEIGHT +
            utils.normalize(40),
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.scrollView}>
          {renderProfileOptions}
          {renderUserOptions}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
