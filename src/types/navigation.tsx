import {PRODUCT} from './Products';
import {StackScreenProps} from '@react-navigation/stack';

type RootStackParamList = {
  HomeScreen: {};
  AddProductScreen: {};
  DonateProductListScreen: {};
  ProductDetailsScreen: {
    product: PRODUCT;
    isCollect?: boolean;
  };
  CollectProductListScreen: {};
  SelectCategory: {};
  CartScreen: {};
};

export default RootStackParamList;

export type HomeScreenNavigationProps = StackScreenProps<
  RootStackParamList,
  'HomeScreen'
>;

export type CartScreenNavigationProps = StackScreenProps<
  RootStackParamList,
  'CartScreen'
>;

export type AddProductNavigationProps = StackScreenProps<
  RootStackParamList,
  'AddProductScreen'
>;

export type SelectCategoryNavigationProps = StackScreenProps<
  RootStackParamList,
  'SelectCategory'
>;

export type CollectProductListNavigationProps = StackScreenProps<
  RootStackParamList,
  'CollectProductListScreen'
>;
export type ProductDetailsScreenNavigationProps = StackScreenProps<
  RootStackParamList,
  'ProductDetailsScreen'
>;
export type DonateProductListNavigationProps = StackScreenProps<
  RootStackParamList,
  'DonateProductListScreen'
>;
