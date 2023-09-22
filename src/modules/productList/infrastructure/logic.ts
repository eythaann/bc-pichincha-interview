import { callApi } from '../../shared/infrastructure/api';
import { store } from '../../shared/infrastructure/store';

import { BakendProductParser } from '../app';
import { productsActions } from '../app/slice';

import { ProductsMap } from '../../product/domain';
import { httpMethod } from '../../shared/domain/httpTypes';
import { ServicesUrl } from '../../shared/domain/services';
import { IBackendProduct } from '../domain/interfaces';

export const fetchProducts = () => callApi({
  url: ServicesUrl.products,
  path: '/bp/products',
  method: httpMethod.get,
  onSuccess: (res: IBackendProduct[]) => {
    const dict = res.reduce((acc: ProductsMap, current) => {
      acc[current.id] = BakendProductParser(current);
      return acc;
    }, {});

    store.dispatch(productsActions.setProducts(dict));
  },
});