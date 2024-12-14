import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {PRODUCT} from '../../types/Products';

export interface CartState {
  products: PRODUCT[];
}

const initialState: CartState = {
  products: [],
};

export const cartClice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<PRODUCT>) => {
      state.products = [...state.products, action.payload];
    },
    removeProductFromCart: (state, action: PayloadAction<PRODUCT>) => {
      state.products = state.products.filter(
        product => product.product_id !== action.payload.product_id,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {addProductToCart, removeProductFromCart} = cartClice.actions;

export default cartClice.reducer;
