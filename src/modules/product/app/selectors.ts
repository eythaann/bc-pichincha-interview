import { GlobalState } from '../../shared/domain/globalState';
import { IProduct } from '../domain';

export const selectProductById = (id: IProduct['id']) => (state: GlobalState) => {
  return state.admin.products.get(id);
};