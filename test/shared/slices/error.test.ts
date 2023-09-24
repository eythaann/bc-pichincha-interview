import { configureStore } from '@reduxjs/toolkit';
import { ZodIssue } from 'zod';

import { errorsActions, errorsReducers } from '../../../src/modules/shared/app/slices/errors';

describe('errors slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        errors: errorsReducers,
      },
    });
  });

  it('should handle initial state', () => {
    const state = store.getState().errors;
    expect(state.product).toEqual([]);
    expect(state.showErrors).toBe(false);
  });

  it('should handle setProductErrors', () => {
    const errors = [{ message: 'Error 1' }, { message: 'Error 2' }] as ZodIssue[];
    store.dispatch(errorsActions.setProductErrors(errors));
    const state = store.getState().errors;
    expect(state.product).toEqual(errors);
  });

  it('should handle setShowErrors', () => {
    store.dispatch(errorsActions.setShowErrors(true));
    const state = store.getState().errors;
    expect(state.showErrors).toBe(true);
  });

  it('should handle resetErrors', () => {
    store.dispatch(errorsActions.setShowErrors(true));
    store.dispatch(errorsActions.setProductErrors([{ message: 'Error' }] as ZodIssue[]));
    store.dispatch(errorsActions.resetErrors());
    const state = store.getState().errors;
    expect(state).toEqual({ product: [], showErrors: false });
  });
});