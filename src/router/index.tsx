import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { Header } from '../layouts/header';

import ErrorPage from '../modules/error/infrastructure';
import { Product } from '../modules/product/infrastructure';
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
        path: '/product',
        element: <Product />,
        children: [
          {
            path: 'new',
            element: <Product isNew />,
          },
        ],
      },
    ],
  },
]);
