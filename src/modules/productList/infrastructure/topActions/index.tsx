import React, { useState } from 'react';

import { Button } from '../../../../layouts/components/button';
import { Input } from '../../../../layouts/components/input';

import styles from './index.module.css';

type Props = {
  onFilter: (text: string) => void;
};

export const TopActions = ({ onFilter }: Props) => {
  const [search, setSearch] = useState<string>('');

  const onChangeInput = (value: string) => {
    setSearch(value);
    onFilter(value);
  };

  return <div className={styles.headerActions}>
    <Input
      value={search}
      onChange={onChangeInput}
      placeholder="Buscar..."
    />
    <Button type="link" route="/product/new">
        Agregar
    </Button>
  </div>;
};