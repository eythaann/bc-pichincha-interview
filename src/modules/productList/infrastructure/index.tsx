import React from 'react';

import styles from './index.module.css';
import { TopActions } from './topActions';

export const ProductList = () => {
  return <div className={styles.container}>
    <TopActions/>
    <div className={styles.tableContainer}>
        table
      <div className={styles.tableHeader}>
        table
      </div>
      <div className={styles.table}>
        table
      </div>
      <div className={styles.tableFooter}>
        table
      </div>
    </div>
  </div>;
};