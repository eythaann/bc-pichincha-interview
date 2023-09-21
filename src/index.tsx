import React from 'react';

import classNames from 'classnames';
import { render } from 'react-dom';
import { RouterProvider } from 'react-router-dom';

import './styles/reset.css';
import './styles/variables.css';
import { router } from './router';

window.cx = classNames;

render( <RouterProvider router={router} />, document.getElementById('root'));