import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import RootStackParamList from '../types/navigation';
import AddProductScreen from '../screens/Donate/AddProductScreen';
import DonateProductListScreen from '../screens/Donate/DonateProductListScreen';
import ProductDetailsScreen from '../screens/Donate/ProductDetailsScreen';
import CollectProductListScreen from '../screens/Collect/CollectProductListScreen';
import {createStackNavigator} from '@react-navigation/stack';
import SelectCategory from '../screens/common/SelectCategory';
import CartScreen from '../screens/common/CartScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
      <Stack.Screen
        name="DonateProductListScreen"
        component={DonateProductListScreen}
      />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
      <Stack.Screen
        name="CollectProductListScreen"
        component={CollectProductListScreen}
      />
      <Stack.Screen name="SelectCategory" component={SelectCategory} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
