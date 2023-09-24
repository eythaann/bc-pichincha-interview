import { addYears, dateToOwnFormat } from '../../shared/app/utils/date';
import { generateId } from '../../shared/app/utils/idGenerator';

import { IProduct, OnBuildingProduct } from '../domain';

export class Product implements OnBuildingProduct {
  public id: OnBuildingProduct['id'];
  public name: OnBuildingProduct['name'];
  public description: OnBuildingProduct['description'];
  public logo: OnBuildingProduct['logo'];
  public revisionDate: OnBuildingProduct['revisionDate'];
  public emitionDate: OnBuildingProduct['emitionDate'];

  public constructor(product?: Partial<OnBuildingProduct>) {
    const date = new Date();

    const {
      id = generateId<IProduct['id']>(),
      name = '',
      description = '',
      logo = '',
      emitionDate = dateToOwnFormat(date),
      revisionDate = dateToOwnFormat(addYears(date, 1)),
    } = product || {};

    this.id = id;
    this.name = name;
    this.description = description;
    this.logo = logo;
    this.emitionDate = emitionDate;
    this.revisionDate = revisionDate;
  }
}