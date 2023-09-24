import React, { useEffect, useState } from 'react';

import { Spiner } from '../../../layouts/components/spiner';
import { Tooltip } from '../../../layouts/components/tooltip';
import { fetchProducts } from './logic';
import { ProductsTableRow } from './row';
import { TopActions } from './topActions';
import { useSelector } from 'react-redux';

import { useOnMount } from '../../shared/app/hooks/customHooks';
import { FilterProducts } from '../app';
import { selectProductsDict } from '../app/selector';

import { IProduct } from '../../product/domain';

import styles from './index.module.css';

export const ProductList = () => {
  const [filteredProducts, setFiltered] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const productsDict = useSelector(selectProductsDict);

  useOnMount(async () => {
    await fetchProducts();
    setLoading(false);
  });

  useEffect(() => {
    setFiltered(Object.values(productsDict));
  }, [productsDict]);

  const onFilter = (textToFilter: string) => {
    setFiltered(FilterProducts(productsDict, textToFilter));
  };

  return <div className={styles.container}>
    <TopActions onFilter={onFilter}/>
    <div className={styles.tableContainer}>
      <div className={styles.scroollContainer}>
        <div className={styles.tableHeader}>
          <div>Logo</div>
          <div>Nombre del producto</div>
          <div>Descripcion <Tooltip text="Descripcion del producto">🛈</Tooltip></div>
          <div>Fecha de liberacion <Tooltip text="Fecha de emision del producto">🛈</Tooltip></div>
          <div>Fecha de reestructuracion <Tooltip text="Fecha de revision del producto">🛈</Tooltip></div>
        </div>
        {
          loading
            ? <div className={styles.spinerBox}> <Spiner /> </div>
            : <div className={styles.table}>
              {filteredProducts.map((product) => {
                return <ProductsTableRow key={product.id} product={product} />;
              })}
            </div>
        }
      </div>
      <div className={styles.tableFooter}>
        {loading ? null : filteredProducts.length + ' Resultados'}
      </div>
    </div>
  </div>;
};