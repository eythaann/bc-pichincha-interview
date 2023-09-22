
import { AnyAction, combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';

import { productReducer } from './modules/product/app/slice';
import { productsReducer } from './modules/productList/app/slice';

const unifyReducersInOne = <State, T extends [Reducer<State, any>, ...Reducer<State, any>[]]>(reducers: T) => {
  return (state: State, action: AnyAction) => {
    let stateToReturn: State = undefined as State;

    reducers.forEach((currentReducer) => {
      stateToReturn = currentReducer(state, action);
    });

    return stateToReturn;
  };
};

export const store = configureStore({
  reducer: combineReducers({
    admin: combineReducers({
      products: unifyReducersInOne([productReducer, productsReducer]),
    }),
    // user: { ... maybe future implementations }
  }),
});

export type AppDispatch = typeof store.dispatch;