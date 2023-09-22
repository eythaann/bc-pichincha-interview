import { Reducer } from '@reduxjs/toolkit';
import { NoInfer } from 'react-redux';

export const unifyReducersInOne = <
  T extends [Reducer<any, any>, ...Reducer<any, any>[]],
  State = Parameters<T[number]>[0],
  Action = Parameters<T[number]>[1],
>(reducers: T) => {
  return (state: NoInfer<State>, action: NoInfer<Action>): NoInfer<State> => {
    return reducers.reduce((stateToReturn, currentReducer) => {
      if (Array.isArray(stateToReturn)) {
        return [...stateToReturn, ...currentReducer(state, action)];
      }
      return { ...stateToReturn, ...currentReducer(state, action) };
    }, state);
  };
};