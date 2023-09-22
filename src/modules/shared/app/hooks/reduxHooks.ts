import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';

import { AppDispatch, store } from '../../infrastructure/store';

import { GlobalState } from '../../domain/globalState';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<GlobalState> = useSelector;
export const useAppStore: () => store = useStore;