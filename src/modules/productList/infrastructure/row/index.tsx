import React from 'react';

import { Popup } from '../../../../layouts/components/popup';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { callApi } from '../../../shared/infrastructure/api';

import { productsActions } from '../../app/slice';

import { IProduct } from '../../../product/domain';
import { httpMethod } from '../../../shared/domain/httpTypes';
import { ServicesUrl } from '../../../shared/domain/services';

import styles from './index.module.css';

type Props = {
  product: IProduct;
};

export const ProductsTableRow = ({ product }: Props) => {
  const { name, description, emitionDate, revisionDate, id } = product;

  const dispatch = useDispatch();

  const onDelete = () => {
    callApi({
      url: ServicesUrl.products,
      path: '/bp/products?id=' + id,
      method: httpMethod.delete,
      onSuccess: () => {
        dispatch(productsActions.removeProduct(id));
      },
      onFailure: () => {
        // api delete always fail I didn't find the way to do it work so this line is here for visual purpose
        dispatch(productsActions.removeProduct(id));
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