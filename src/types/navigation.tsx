import {NavigatorScreenParams} from '@react-navigation/native';
import {PRODUCT} from './Products';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

// this line pass navigation and route props for each stack screen
export type StackPropsType<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

type RootStackParamList = {
  Splash: {};
  Login: {};
  Signup: {};
  DonateScreen: {};
  VolunteerScreen: {};
  ProfileScreen: {};
  HomeStack: {};
  VolunteerStack: {};
  NgoStack: {};
  ProfileStack: {};
  TabStack: NavigatorScreenParams<any>;
  UpdateProfile: {isEdit?: boolean};
  HomeScreen: {};
  NGOScreen: {};
  AddDonateProduct: {};
  ProductDetails: {
    product: PRODUCT;
    isCollect?: boolean;
  };
  CollectProductListScreen: {};
  SelectDonateCategory: {};
  Cart: {};
};

export default RootStackParamList;
