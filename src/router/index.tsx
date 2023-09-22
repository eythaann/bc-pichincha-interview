import React from 'react';

import { Header } from '../layouts/header';
import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '../modules/error/infrastructure';
import { ProductFields } from '../modules/product/infrastructure';
import { ProductList } from '../modules/productList/infrastructure';

import { IProduct } from '../modules/product/domain';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Header/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <ProductList/>,
      },
      {
        path: '/product/new',
        element: <ProductFields isNew />,
      },
      {
        path: '/product/:id',
        element: <ProductFields id={'1' as IProduct['id']} />,
      },
    ],
  },
]);
