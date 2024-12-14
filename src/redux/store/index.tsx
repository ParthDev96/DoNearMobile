import {configureStore} from '@reduxjs/toolkit';
import * as reducers from '../reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistCombineReducers, persistStore} from 'redux-persist';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
// store file store and manage whole app data in reducer
const persistedReducer = persistCombineReducers(persistConfig, reducers);

// reducerProxy function take argument state and action from configureStore and return valid satae to app reducer.
// if action like signOut, deleteAccount and clearSlice then whole reducer is set as a undefind
const reducerProxy = (state: any, action: any) => {
  return persistedReducer(state, action);
};
export const store = configureStore({
  reducer: reducerProxy,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
