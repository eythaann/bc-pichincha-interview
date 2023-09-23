import React, { MouseEvent, ReactEventHandler, ReactNode } from 'react';

import { Tooltip } from '../tooltip';
import { Link } from 'react-router-dom';

import styles from './index.module.css';

type Props = {
  children: ReactNode;
  disabled?: boolean;
  disabledTooltip?: string;
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
    disabledTooltip,
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

  const button = <button disabled={disabled} className={classNames} onClick={onInternalClick}>
    {children}
  </button>;

  if (disabledTooltip) {
    return <Tooltip text={disabledTooltip}>
      {button}
    </Tooltip>;
  }

  return button;
};