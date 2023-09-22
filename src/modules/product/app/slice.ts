import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addYears } from '../../shared/app/utils/date';

import { IProduct, ProductsMap } from '../domain';

const initialState: ProductsMap = new Map();

type Payload<T> = PayloadAction<{
  id: IProduct['id'];
  value: T;
}>;

const setProperty = <K extends keyof IProduct>(
  state: ProductsMap,
  id: IProduct['id'],
  propName: K,
  value: IProduct[K],
) => {
  const product = state.get(id);
  if (product) {
    product[propName] = value;
  }
};

const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setName: (state, action: Payload<string>) => {
      const { id, value } = action.payload;
      setProperty(state, id, 'name', value);
    },

    setDescription: (state, action: Payload<string>) => {
      const { id, value } = action.payload;
      setProperty(state, id, 'description', value);
    },

    setLogo: (state, action: Payload<string>) => {
      const { id, value } = action.payload;
      setProperty(state, id, 'logo', value);
    },

    setEmitionDate: (state, action: Payload<Date>) => {
      const { id, value } = action.payload;
      setProperty(state, id, 'emitionDate', value);
      setProperty(state, id, 'revisitionDate', addYears(value, 1));
    },
  },
});

export const productActions = slice.actions;
export const productReducer = slice.reducer;
