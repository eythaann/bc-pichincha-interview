import { AppDispatch } from '../../../../store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { GlobalState } from '../../domain/globalState';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<GlobalState> = useSelector;