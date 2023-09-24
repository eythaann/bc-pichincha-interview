import { Env } from './config';
import { Action as _Action, combineReducers, configureStore } from '@reduxjs/toolkit';

import { productReducer } from '../../product/app/slice';
import { productsReducer } from '../../productList/app/slice';
import { errorsReducers } from '../app/slices/errors';
import { unifyReducersInOne } from '../app/utils/reducer';

import { GlobalState } from '../domain/globalState';

export const store = configureStore({
  reducer: combineReducers({
    admin: combineReducers({
      products: unifyReducersInOne([productReducer, productsReducer]),
    }),
    errors: errorsReducers,
  }),
  devTools: Env.ambient !== 'production',
});

export type store = {
  dispatch: AppDispatch;
  getState: () => GlobalState;
};
export type AppDispatch = typeof store.dispatch;