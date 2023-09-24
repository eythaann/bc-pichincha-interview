import React, { useEffect, useState } from 'react';

import { Input } from '../../../layouts/components/input';
import { Spiner } from '../../../layouts/components/spiner';
import { FooterForm } from './footer';
import { getProductIdValidator } from './logic';
import { useParams } from 'react-router-dom';

import ErrorPage from '../../error/infrastructure';
import { fetchProducts } from '../../productList/infrastructure/logic';

import { useOnMount } from '../../shared/app/hooks/customHooks';
import { useAppDispatch, useAppSelector, useAppStore } from '../../shared/app/hooks/reduxHooks';
import { getErrorByPath, selectProductErrors, selectShowErrors } from '../../shared/app/selectors/errors';
import { errorsActions } from '../../shared/app/slices/errors';
import { addYears, dateToOwnFormat, ownFormatToDate, validateTime } from '../../shared/app/utils/date';
import { Product } from '../app';
import { ProductScheme } from '../app/scheme';
import { selectProductById } from '../app/selectors';

import { IProduct, OnBuildingProduct } from '../domain';

import styles from './index.module.css';

export const ProductFields = () => {
  const [internalProduct, setInternalProduct] = useState<OnBuildingProduct | undefined>(undefined);
  const [isValidId, setIsValidId] = useState<boolean | null>(null);

  const { id: paramId = '' } = useParams();

  const isNew = paramId === 'new';

  const showErrors = useAppSelector(selectShowErrors);
  const errors = useAppSelector(selectProductErrors);

  const dispatch = useAppDispatch();

  const store = useAppStore();

  useOnMount(async () => {
    dispatch(errorsActions.resetErrors());

    if (isNew) {
      return setInternalProduct(new Product());
    }

    const validator = await getProductIdValidator(paramId);
    if (!validator(paramId)) {
      return setIsValidId(false);
    }

    setIsValidId(true);
    await fetchProducts();
    setInternalProduct(selectProductById(paramId)(store.getState()));
  });

  useEffect(() => {
    if (showErrors) {
      const parsed = ProductScheme.safeParse(internalProduct);
      const parsedErrors = parsed.success === false ? parsed.error.errors : [];
      dispatch(errorsActions.setProductErrors(parsedErrors));
    }
  }, [internalProduct]);

  if (isValidId !== null && !isValidId && !isNew) {
    return <ErrorPage />;
  }

  if (!internalProduct) {
    return <div className={styles.loadingContainer}><Spiner/></div>;
  }

  const { name, description, id, revisionDate, emitionDate, logo } = internalProduct;

  const getOnChange = (propName: keyof IProduct) => (value: string) => {
    setInternalProduct((prevState) => ({
      ...prevState!,
      [propName]: value,
    }));
  };

  const onReset = () => {
    if (isNew) {
      setInternalProduct(new Product)
    }
  };

  const onChangeEmitionDate = (value: string) => {
    setInternalProduct((prevState) => ({
      ...prevState!,
      emitionDate: value,
      revisionDate: validateTime(value)
        ? dateToOwnFormat(addYears(ownFormatToDate(value), 1))
        : prevState!.revisionDate,
    }));
  };

  return <div className={styles.container}>
    <div className={styles.form}>
      <div className={styles.header}>
        {isNew ? 'Formulario de Registro' : 'Formulario de Producto'}
      </div>
      <div className={styles.formContent}>
        <Input
          error={getErrorByPath(['id'], errors)?.message}
          disabled={!isNew}
          label="ID"
          value={id}
          onChange={getOnChange('id')}
        />
        <Input
          error={getErrorByPath(['name'], errors)?.message}
          label="Nombre"
          value={name}
          onChange={getOnChange('name')}
        />
        <Input
          error={getErrorByPath(['description'], errors)?.message}
          label="Descripcion"
          value={description}
          onChange={getOnChange('description')}
        />
        <Input
          error={getErrorByPath(['logo'], errors)?.message}
          label="Logo"
          value={logo}
          onChange={getOnChange('logo')}
        />
        <Input
          error={getErrorByPath(['emitionDate'], errors)?.message}
          label="Fecha liberacion"
          value={emitionDate}
          onChange={onChangeEmitionDate}
        />
        <Input
          readonly
          disabled
          error={getErrorByPath(['revisionDate'], errors)?.message}
          label="Fecha Revision"
          value={revisionDate}
        />
      </div>
      <FooterForm onReset={onReset} isNew={isNew} product={internalProduct} />
    </div>
  </div>;
};