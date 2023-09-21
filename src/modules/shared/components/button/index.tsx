import React, { ReactEventHandler, ReactNode } from 'react';

import { Link } from 'react-router-dom';

import style from './index.module.css';

interface IProps {
  children: ReactNode;
  onClick?: ReactEventHandler<HTMLButtonElement>;
  type?: 'button' | 'link';
  route?: string;
}

export const Button = ({
  children,
  onClick,
  type = 'button',
  route = '',
}: IProps) => {
  if (type === 'link') {
    return <Link className={style.button} to={route}>
      {children}
    </Link>;
  }

  return <button className={style.button} onClick={onClick}>
    {children}
  </button>;
};