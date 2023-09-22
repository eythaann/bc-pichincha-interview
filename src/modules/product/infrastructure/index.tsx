import React, { useState } from 'react';

import { Input } from '../../../layouts/components/input';
import { FooterForm } from './footer';

import { callApi } from '../../shared/infrastructure/api';

import { useAppSelector } from '../../shared/app/hooks/reduxHooks';
import { useOnMount } from '../../shared/app/hooks/useOnMount';
import { Product } from '../app';
import { selectProductById } from '../app/selectors';

import { httpMethod } from '../../shared/domain/httpTypes';
import { ServicesUrl } from '../../shared/domain/services';
import { IProduct } from '../domain';

import styles from './index.module.css';

type IProps = {
  id: IProduct['id'];
} | {
  isNew: true;
};

export const ProductFields = (props: IProps) => {
  const [isValidId, setIsValidId] = useState<null | boolean>(null);
  const [product, setProduct] = useState<IProduct | undefined>(undefined);

  const selectedProduct = useAppSelector((state) => {
    if ('id' in props ) {
      return selectProductById(props.id)(state);
    }
  });

  useOnMount(() => {
    if ('isNew' in props) {
      setProduct(new Product());
      return;
    }

    callApi({
      url: ServicesUrl.products,
      path: '/bp/products',
      method: httpMethod.get,
      onSuccess: () => setIsValidId(true),
      onFailure: () => setIsValidId(false),
    });

    setProduct(selectedProduct);
  });

  if (!('isNew' in props) && isValidId === null) {
    return <div> loading </div>;
  }

  if (!product || isValidId) {
    return <div> id invalido </div>;
  }

  const { name, description, id, revisionDate, emitionDate, logo } = product;

  const getOnChange = <K extends keyof IProduct>(propName: K) => (value: IProduct[K]) => {
    setProduct((prevState) => ({
      ...prevState!,
      [propName]: value,
    }));
  };

  return <div className={styles.container}>
    <div className={styles.form}>
      <div className={styles.header}>
        {'isNew' in props ? 'Formulario de Registro' : 'Formulario de Registro'}
      </div>
      <div className={styles.formContent}>
        <Input label="ID" value={id} readonly />
        <Input label="Nombre" value={name} onChange={getOnChange('name')} />
        <Input label="Descripcion" value={description} onChange={getOnChange('description')} />
        <Input label="Logo" value={logo} onChange={getOnChange('logo')} />
        <Input label="Fecha liberacion" value={emitionDate} onChange={getOnChange('emitionDate')} />
        <Input disabled label="Fecha Revision" value={revisionDate} onChange={getOnChange('revisionDate')} />
      </div>
      <FooterForm product={product} />
    </div>
  </div>;
};