import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProduct, ProductsMap } from '../../product/domain';

const initialState: ProductsMap = {};

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    'setProducts': (_, action: PayloadAction<ProductsMap>) => {
      return action.payload;
    },
    'removeProduct': (state, action: PayloadAction<IProduct['id']>) => {
      Reflect.deleteProperty(state, action.payload);
    },
  },
});

export const productsActions = slice.actions;
export const productsReducer = slice.reducer;
