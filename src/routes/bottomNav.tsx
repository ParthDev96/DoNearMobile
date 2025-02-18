import {
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef} from 'react';
import theme from '../config';
import {RootNavPropsType} from './navParamsType';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import config from '../config';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screens from 'src/screens';
import utils from 'src/utils';
import Components from 'src/components';
import FastImage from 'react-native-fast-image';

const Tab = createMaterialTopTabNavigator<RootNavPropsType>();
const Stack = createNativeStackNavigator<RootNavPropsType>();

const BottomTabNavigator = () => {
  const renderCustomTab = useCallback((props: MaterialTopTabBarProps) => {
    return <MyTabBar {...props} />;
  }, []);
  // return <View />;
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {},
        lazy: true,
        swipeEnabled: false,
      })}
      backBehavior="history"
      tabBar={props => renderCustomTab(props)}>
      <Tab.Screen name={'HomeStack'} component={HomeStackNavigator} />
      <Tab.Screen name={'VolunteerStack'} component={VolunteerStackNavigator} />
      <Tab.Screen name={'NgoStack'} component={NGOStackNavigator} />
      <Tab.Screen name={'ProfileStack'} component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={screens.HomeScreen} />
    </Stack.Navigator>
  );
};
export const VolunteerStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="VolunteerScreen">
      <Stack.Screen
        name="VolunteerScreen"
        component={screens.VolunteerScreen}
      />
    </Stack.Navigator>
  );
};
export const NGOStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="NGOScreen">
      <Stack.Screen name="NGOScreen" component={screens.NGOScreen} />
    </Stack.Navigator>
  );
};
export const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ProfileScreen">
      <Stack.Screen name="ProfileScreen" component={screens.ProfileScreen} />
    </Stack.Navigator>
  );
};

function MyTabBar({state, navigation}: MaterialTopTabBarProps) {
  //Constants
  const {t} = useTranslation();

  // const dispatch = useDispatch();

  // const unreadCount = useSelector(
  //   (state: RootState) => state.app.notificationCount,
  // );
  // const messageUnreadCount = useSelector(
  //   (state: RootState) => state.app.messageUnreadCount,
  // );
  // const userData = useSelector((state: RootState) => state.login);
  const tabBarWidth = useRef<number>(0);
  const insets = useSafeAreaInsets();
  const ITEM_TITLES = [t('Home'), t('Volunteer'), t('NGO'), t('Profile')];
  const IMAGES = [
    theme.images.ic_home,
    theme.images.ic_volunteer,
    theme.images.ic_ngo,
    theme.images.ic_user,
  ];

  const IMAGES_SELECTED = [
    theme.images.ic_home_filled,
    theme.images.ic_volunteer_filled,
    theme.images.ic_ngo_filled,
    theme.images.ic_user_filled,
  ];

  const rotateValue = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: rotateValue.value}],
    };
  });

  const onPress = (index: number, isFocused: boolean, route: any) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    // if (route.name === 'ExecutionStack') {
    //   DeviceEventEmitter.emit(theme.constant.EVENT_EMITTER_KEYS.EXECUTION);
    // } else if (route.name === 'Introspection') {
    //   DeviceEventEmitter.emit(theme.constant.EVENT_EMITTER_KEYS.INSTROSPECTION);
    // }

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate({
        name: route.name,
        merge: true,
        params: {isTabPressed: true},
      });
    }
  };

  return (
    <View
      style={[
        styles.commonTabBarStyle,
        {
          paddingBottom: insets.bottom + utils.normalize(10),
        },
      ]}>
      <View
        onLayout={event => {
          var {width} = event.nativeEvent.layout;
          if (tabBarWidth.current <= 0) {
            tabBarWidth.current = width;
          }
        }}
        style={styles.iconContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              key={route.name}
              onPress={() => onPress(index, isFocused, route)}
              style={[
                styles.tabItemsTouchable,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  flex: index === 1 || index === 2 ? 3 : 1,
                },
              ]}>
              <Animated.Image
                style={[styles.rightIcon, isFocused && animatedStyle]}
                resizeMode={'contain'}
                source={isFocused ? IMAGES_SELECTED[index] : IMAGES[index]}
              />
              <Components.CustomText
                style={[
                  styles.gradientText,
                  {
                    color: isFocused
                      ? theme.colors.COLOR_APP_TEXT
                      : theme.colors.COLOR_APP_LIGHT_GRAY,
                    fontFamily: isFocused
                      ? theme.font.NotoSansBold
                      : theme.font.NotoSansRegular,
                  },
                ]}>
                {ITEM_TITLES[index]}
              </Components.CustomText>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          Linking.openURL('https://square.link/u/lt3touPi?src=sheet');
        }}
        style={styles.plusContainer}>
        <FastImage
          source={config.images.ic_donate}
          resizeMode="contain"
          style={styles.plusImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  plusContainer: {
    position: 'absolute',
    height: utils.normalize(70),
    width: utils.normalize(70),
    borderRadius: utils.normalize(30),
    alignSelf: 'center',
    top: utils.normalize(-30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusImage: {
    height: '100%',
    width: '100%',
    // tintColor: config.colors.COLOR_WHITE,
  },
  bottomLine: {
    height: utils.normalize(6),
    borderTopLeftRadius: utils.normalize(3),
    borderTopRightRadius: utils.normalize(3),
    backgroundColor: theme.colors.COLOR_APP_TEXT,
  },
  gradientText: {
    fontSize: utils.normalize(11),
    lineHeight: utils.normalize(16),
    textAlign: 'center',
  },

  rightIcon: {
    width: utils.normalize(23),
    height: utils.normalize(23),
    marginBottom: utils.normalize(3),
  },

  iconContainer: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: utils.normalize(15),
  },
  tabItemsTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  commonTabBarStyle: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    zIndex: 100,
    backgroundColor: config.colors.COLOR_WHITE,
    borderTopLeftRadius: utils.normalize(30),
    borderTopRightRadius: utils.normalize(30),
    paddingTop: utils.normalize(15),
    bottom: 0,
  },
  shadowContainer:
    Platform.OS === 'android'
      ? {
          elevation: 8,
        }
      : {
          shadowColor: config.colors.COLOR_APP_TEXT + '80',
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          zIndex: 100,
        },
});
