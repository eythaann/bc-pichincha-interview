import { ZodIssue } from 'zod';

import { GlobalState } from '../../domain/globalState';

export const selectErrors = (state: GlobalState) => state.errors;

export const selectProductErrors = (state: GlobalState) => selectErrors(state).product;

export const selectShowErrors = (state: GlobalState) => selectErrors(state).showErrors;

export const getErrorByPath = (path: string[], errors: ZodIssue[]) => {
  return errors.find((issue) => {
    return issue.path.join() === path.join();
  });
};