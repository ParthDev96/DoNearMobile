import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

/**  those are stack screen */
export type RootNavPropsType = {
  Splash: {};
  Login: {};
  Signup: {};
  HomeScreen: {};
  DonateScreen: {};
  VolunteerScreen: {};
  NGOScreen: {};
  ProfileScreen: {};
  HomeStack: {};
  VolunteerStack: {};
  NgoStack: {};
  ProfileStack: {};
  TabStack: NavigatorScreenParams<any>;
  UpdateProfile: {isEdit?: boolean};
};

// this line pass navigation and route props for each stack screen
export type StackPropsType<T extends keyof RootNavPropsType> =
  NativeStackScreenProps<RootNavPropsType, T>;
