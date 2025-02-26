import React from 'react';
// import BottomTabNavigator from './bottomNav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {createStackNavigator} from '@react-navigation/stack';
// import AppImageViewer from 'app/screens/common/AppImageViewer';
import screens from 'src/screens';
import BottomTabNavigator from './bottomNav';
import RootStackParamList from 'src/types/navigation';
// import {useAppSelector} from 'src/redux/store';

const Stack = createNativeStackNavigator<RootStackParamList>();
// const Drawer = createDrawerNavigator();

// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerType: 'front',
//         drawerPosition: 'right',
//         swipeEnabled: false,
//         drawerStyle: {
//           width: '80%',
//         },
//       }}
//       drawerContent={props => <CustomDrawerContent {...props} />}
//       initialRouteName="Home">
//       <Drawer.Screen name="Home" component={StackNavigator} />
//     </Drawer.Navigator>
//   );
// };

const StackNavigator = () => {
  // const authData = useAppSelector(state => state.userSlice);
  // const getInitialRoute = () => {
  //   // if (authData.isLoggedIn) {
  //   //   if (!authData.user?.userProfileCompleted) {
  //   //     return 'UpdateProfile';
  //   //   }
  //   //   return 'TabStack';
  //   // }
  //   return 'Login';
  // };
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Login'}>
      <Stack.Screen name="Login" component={screens.Login} />
      <Stack.Screen name="TabStack" component={BottomTabNavigator} />
      <Stack.Screen name="Signup" component={screens.Signup} />
      <Stack.Screen name="UpdateProfile" component={screens.UpdateProfile} />
      <Stack.Screen name="ProductDetails" component={screens.ProductDetails} />
      <Stack.Screen name="Cart" component={screens.Cart} />
      <Stack.Screen
        name="AddDonateProduct"
        component={screens.AddDonateProduct}
      />
      <Stack.Screen
        name="SelectDonateCategory"
        component={screens.SelectDonateCategory}
      />
    </Stack.Navigator>
  );
};

const RootStack = createStackNavigator();

const RootStackScreen: React.FC = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: 'transparent'},
      }}>
      <RootStack.Screen
        name="StackNavigator"
        component={StackNavigator}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
