import React from 'react';

import { ProductsTableRow } from './row';
import { TopActions } from './topActions';
import { useDispatch, useSelector } from 'react-redux';

import { callApi } from '../../shared/infrastructure/api';

import { useOnMount } from '../../shared/app/hooks/useOnMount';
import { selectProductsDict } from '../app/selector';
import { productsActions } from '../app/slice';

import { IProduct } from '../../product/domain';
import { httpMethod } from '../../shared/domain/httpTypes';
import { ServicesUrl } from '../../shared/domain/services';

import styles from './index.module.css';

export const ProductList = () => {
  const dispatch = useDispatch();
  const productsDict = useSelector(selectProductsDict);

  useOnMount(() => {
    callApi({
      url: ServicesUrl.products,
      path: '/bp/products',
      method: httpMethod.get,
      onSuccess: (res: IProduct[]) => dispatch(productsActions.setProducts(res)),
    });
  });

  return <div className={styles.container}>
    <TopActions/>
    <div className={styles.tableContainer}>
        table
      <div className={styles.tableHeader}>
        table
      </div>
      <div className={styles.table}>
        {Object.values(productsDict).map((product) => {
          return <ProductsTableRow/>;
        })}
      </div>
      <div className={styles.tableFooter}>
        table
      </div>
    </div>
  </div>;
};