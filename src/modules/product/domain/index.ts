import { Opaque } from 'readable-types';

export interface IProduct {
  id: Opaque<string, IProduct>;
  name: string;
  description: string;
  logo: string;
  emitionDate: Date;
  revisionDate: Date;
}

export type ProductsMap = Record<IProduct['id'], IProduct>;