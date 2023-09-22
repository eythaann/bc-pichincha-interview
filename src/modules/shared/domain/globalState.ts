import { ProductsMap } from '../../product/domain';

export type GlobalState = {
  admin: {
    products: ProductsMap;
  };
};