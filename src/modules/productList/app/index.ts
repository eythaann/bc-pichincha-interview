import { dateToOwnFormat } from '../../shared/app/utils/date';

import { IProduct } from '../../product/domain';
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

