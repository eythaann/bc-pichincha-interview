import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ZodIssue } from 'zod';

import { IErrors } from '../../domain/globalState';

const initialState: IErrors = {
  product: [],
  showErrors: false,
};

const slice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setProductErrors: (state, action: PayloadAction<ZodIssue[]>) => {
      state.product = action.payload;
    },
    setShowErrors: (state, action: PayloadAction<boolean>) => {
      state.showErrors = action.payload;
    },
    resetErrors: () => initialState,
  },
});

export const errorsActions = slice.actions;
export const errorsReducers = slice.reducer;
