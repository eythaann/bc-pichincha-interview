import { addYears } from '../../shared/app/utils/date';
import { generateId } from '../../shared/app/utils/idGenerator';

import { IProduct } from '../domain';

export class Product implements IProduct {
  public id: IProduct['id'];
  public name: IProduct['name'];
  public description: IProduct['description'];
  public logo: IProduct['logo'];
  public revisionDate: IProduct['revisionDate'];
  public emitionDate: IProduct['emitionDate'];

  public constructor(product?: Partial<IProduct>) {
    const {
      id = generateId<IProduct['id']>(),
      name = '',
      description = '',
      logo = '',
      emitionDate = new Date(),
    } = product || {};

    this.id = id;
    this.name = name;
    this.description = description;
    this.logo = logo;
    this.emitionDate = emitionDate;
    this.revisionDate = addYears(this.emitionDate, 1);
  }
}