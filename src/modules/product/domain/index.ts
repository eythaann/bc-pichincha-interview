import { Modify, Opaque } from 'readable-types';

import { Time } from '../../shared/domain/types';

export interface IProduct {
  id: Opaque<string, IProduct>;
  name: string;
  description: string;
  logo: string;
  emitionDate: Time;
  revisionDate: Time;
}

export type OnBuildingProduct = Modify<IProduct, {
  id: string;
  emitionDate: string;
  revisionDate: string;
}>;

export type ProductsMap = Record<IProduct['id'], IProduct>;