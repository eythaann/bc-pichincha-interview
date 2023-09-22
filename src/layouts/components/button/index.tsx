import React, { MouseEvent, ReactEventHandler, ReactNode } from 'react';

import { Link } from 'react-router-dom';

import style from './index.module.css';

type Props = {
  children: ReactNode;
  disabled?: boolean;
  styleType?: 'primary' | 'secondary';
} & ({
  type?: 'button';
  onClick: ReactEventHandler<HTMLButtonElement>;
} | {
  type: 'link';
  route: string;
});

export const Button = (props: Props) => {
  const {
    children,
    disabled,
    styleType = 'primary',
  } = props;

  const classNames = cx(style.button, style[styleType]);

  if (props.type === 'link') {
    return <Link className={classNames} to={props.route}>
      {children}
    </Link>;
  }

  const onInternalClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disabled || !props.type || props.type === 'button') {
      props.onClick(e);
    }
  };

  return <button className={classNames} onClick={onInternalClick}>
    {children}
  </button>;
};