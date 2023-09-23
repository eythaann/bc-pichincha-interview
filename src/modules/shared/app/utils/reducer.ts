import { Reducer } from '@reduxjs/toolkit';
import { NoInfer } from 'react-redux';

export const unifyReducersInOne = <
  T extends [Reducer<any, any>, ...Reducer<any, any>[]],
  State = Parameters<T[number]>[0],
  Action = Parameters<T[number]>[1],
>(reducers: T) => {
  return (state: NoInfer<State>, action: NoInfer<Action>): NoInfer<State> => {
    return reducers.reduce((stateToReturn, currentReducer) => {
      const newstate = currentReducer(stateToReturn, action);
      return newstate == null ? stateToReturn : newstate;
    }, state);
  };
};