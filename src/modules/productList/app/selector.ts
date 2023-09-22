import { GlobalState } from '../../shared/domain/globalState';

export const selectProductsDict = (state: GlobalState) => {
  return state.admin.products;
};