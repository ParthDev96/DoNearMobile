import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ConfigState {
  cartCount: number;
}

const configData: ConfigState = {
  cartCount: 0,
};

export interface AppState {
  cameraPermission: boolean;
  photoLibraryPermission: boolean;
  config: ConfigState;
}

const initialState: AppState = {
  cameraPermission: false,
  photoLibraryPermission: false,
  config: configData,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCameraPermission: (state, action: PayloadAction<boolean>) => {
      state.cameraPermission = action.payload;
    },
    setPhotoLibraryPermission: (state, action: PayloadAction<boolean>) => {
      state.photoLibraryPermission = action.payload;
    },
  },
});

export const {setCameraPermission, setPhotoLibraryPermission} =
  appSlice.actions;

export default appSlice.reducer;
