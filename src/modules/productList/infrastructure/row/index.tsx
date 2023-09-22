import React from 'react';

import { Popup } from '../../../../layouts/components/popup';
import { Link } from 'react-router-dom';

import { callApi } from '../../../shared/infrastructure/api';

import { IProduct } from '../../../product/domain';
import { httpMethod } from '../../../shared/domain/httpTypes';
import { ServicesUrl } from '../../../shared/domain/services';

import styles from './index.module.css';

type Props = {
  product: IProduct;
};

export const ProductsTableRow = ({ product }: Props) => {
  const { name, description, emitionDate, revisionDate, id } = product;

  const onDelete = () => {
    callApi({
      url: ServicesUrl.products,
      path: '/bp/products?id=' + id,
      method: httpMethod.delete,
      onSuccess: () => {
        location.href = '/';
      },
    });
  };

  return <div className={styles.row}>
    <div>Img</div>
    <div>{name}</div>
    <div>{description}</div>
    <div>{emitionDate}</div>
    <div>{revisionDate}</div>
    <Popup trigger={<span className={styles.action}>⫶</span>}>
      <Link to={`/product/${id}`} className={styles.popupOption}>✏️ editar</Link>
      <div className={styles.popupOption} onClick={onDelete}>❌ eliminar</div>
    </Popup>
  </div>;
};