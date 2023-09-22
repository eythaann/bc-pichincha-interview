import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProduct } from '../../product/domain';

const initialState: IProduct[] = [];

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    'addProduct': (state, action: PayloadAction<IProduct>) => {
      state.push(action.payload);
    },
  },
});

export const productsActions = slice.actions;
export const productsReducer = slice.reducer;
