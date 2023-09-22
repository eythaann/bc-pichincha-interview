import { IProduct } from '../../product/domain';

export type IBackendProduct = {
  id: IProduct['id'];
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
};