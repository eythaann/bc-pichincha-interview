import { ZodIssue } from 'zod';

import { ProductsMap } from '../../product/domain';

export type IErrors = {
  product: ZodIssue[];
  showErrors: boolean;
};

export type GlobalState = {
  admin: {
    products: ProductsMap;
  };
  errors: IErrors;
};