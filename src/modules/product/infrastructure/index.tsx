import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { Input } from '../../../layouts/components/input';
import { useOnMount } from '../../shared/app/hooks/useOnMount';
import { selectProductById } from '../app/selectors';

import ErrorPage from '../../error/infrastructure';
import { fetchData } from '../../shared/infrastructure/api';

import { httpMethod } from '../../shared/domain/httpTypes';
import { ServicesUrl } from '../../shared/domain/services';
import { IProduct } from '../domain';

interface IProps {
  id: IProduct['id'];
  isNew?: boolean;
}

export const Product = ({ isNew, id }: IProps) => {
  const [isValidId, setIsValidId] = useState<null | boolean>(null);

  const Product = useSelector(selectProductById(id));

  useOnMount(() => fetchData({
    url: ServicesUrl.products,
    path: '/bp/products',
    method: httpMethod.get,
    onSuccess: () => setIsValidId(true),
    onFailure: () => setIsValidId(false),
  }));

  if (isValidId === null) {
    return <div> loading </div>;
  }

  if (!product || isValidId) {
    return <ErrorPage />;
  }

  const {} = prod;

  return <div>
    {isNew ? 'Formulario de Registro' : 'Modificar Producto'}
    <hr/>
    <Input />
    <Input />
    <Input />
    <Input />
    <Input />
    <Input />
  </div>;
};