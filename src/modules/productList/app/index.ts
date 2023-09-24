import { dateToOwnFormat } from '../../shared/app/utils/date';

import { IProduct, ProductsMap } from '../../product/domain';
import { IBackendProduct } from '../domain/interfaces';

export const BakendProductParser = (backendProduct: IBackendProduct): IProduct => {
  const { id, name, description, logo, date_release, date_revision } = backendProduct;
  return {
    id,
    name,
    description,
    logo,
    emitionDate: dateToOwnFormat(new Date(date_release)),
    revisionDate: dateToOwnFormat(new Date(date_revision)),
  };
};

export const FilterProducts = (productsDict: ProductsMap, textToSearch: string) => {
  const searchString = textToSearch.toLowerCase();
  return Object.values(productsDict).filter((product) => {
    return product.name.toLowerCase().includes(searchString)
    || product.description.toLowerCase().includes(searchString)
    || product.emitionDate.includes(searchString)
    || product.revisionDate.includes(searchString);
  });
};