import React from 'react';

import { Header } from '../layouts/header';
import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from '../modules/error/infrastructure';
import { ProductFields } from '../modules/product/infrastructure';
import { ProductList } from '../modules/productList/infrastructure';

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
        path: '/product/:id',
        element: <ProductFields />,
      },
    ],
  },
]);
