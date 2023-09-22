import React, { MouseEvent, ReactEventHandler, ReactNode } from 'react';

import { Link } from 'react-router-dom';

import styles from './index.module.css';

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

  const classNames = cx(styles.button, styles[styleType], {
    [styles.disabled]: disabled,
  });

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

  return <button disabled={disabled} className={classNames} onClick={onInternalClick}>
    {children}
  </button>;
};