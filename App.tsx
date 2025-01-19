/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
// import RootNavigator from './src/routes/RootNavigator';
import {Platform, StatusBar, StyleSheet} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import toastConfig from './src/config/toastConfig';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import RootStackScreen from 'src/routes/stackNav';
import KeyboardManager from 'react-native-keyboard-manager';

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
  KeyboardManager.setShouldResignOnTouchOutside(false);
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <GestureHandlerRootView style={styles.flex}>
            <SafeAreaProvider>
              <PaperProvider>
                <StatusBar
                  barStyle={'dark-content'}
                  translucent
                  backgroundColor="transparent"
                />
                <RootStackScreen />
              </PaperProvider>
              <Toast config={toastConfig} />
              {/* <AppAlertDialog
                ref={(ref: any) => {
                  if (ref) {
                    AppAlertDialogManager.setModalRef(ref);
                  }
                }}
              /> */}
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  flex: {flex: 1},
});
