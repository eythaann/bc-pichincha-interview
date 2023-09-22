import { Opaque } from 'readable-types';

export interface IProduct {
  id: Opaque<string, IProduct>;
  name: string;
  description: string;
  logo: string;
  emitionDate: Date;
  revisitionDate: Date;
}

export type ProductsMap = Map<IProduct['id'], IProduct>;