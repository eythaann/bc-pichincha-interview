import { callApi } from '../../shared/infrastructure/api';

import { httpMethod } from '../../shared/domain/httpTypes';
import { ServicesUrl } from '../../shared/domain/services';
import { IProduct } from '../domain';

/** Verify if product of Id already exist */
export const getProductIdValidator = async (id: string): Promise<(v: string) => v is IProduct['id']> => {
  return new Promise((resolve, reject) => {
    callApi({
      url: ServicesUrl.products,
      path: '/bp/products/verification?id=' + id,
      method: httpMethod.get,
      onSuccess: (res: boolean) => resolve((_id: string): _id is IProduct['id'] => res),
      onFailure: (e) => reject(e),
    });
  });
};