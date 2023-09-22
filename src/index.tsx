import React from 'react';

import { router } from './router';
import classNames from 'classnames';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { store } from './modules/shared/infrastructure/store';

import './styles/variables.css';
import './styles/reset.css';
import './styles/global.css';

window.cx = classNames;

const domNode = document.getElementById('root');
if (domNode) {
  const root = createRoot(domNode);
  root.render(<Provider store={store}>
    <RouterProvider router={router} />
  </Provider>);
}