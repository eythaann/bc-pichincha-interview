import React, { useState } from 'react';

import { Button } from '../../../shared/components/button';
import { Input } from '../../../shared/components/input';
import styles from './index.module.css';

export const TopActions = () => {
  const [search, setSearch] = useState<string>('');

  const onChangeInput = (value: string) => {
    setSearch(value);
  };

  return <div className={styles.headerActions}>
    <Input
      value={search}
      onChange={onChangeInput}
    />
    <Button type="link" route="/product">
        Agregar
    </Button>
  </div>;
};