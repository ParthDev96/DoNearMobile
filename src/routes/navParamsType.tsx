import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

/**  those are stack screen */
export type RootNavPropsType = {
  Splash: {};
  Login: {};
  Register: {};
  HomeScreen: {};

  TabStack: NavigatorScreenParams<any>;
};

// this line pass navigation and route props for each stack screen
export type StackPropsType<T extends keyof RootNavPropsType> =
  NativeStackScreenProps<RootNavPropsType, T>;
