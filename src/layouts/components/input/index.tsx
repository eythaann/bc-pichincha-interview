import React, { ChangeEvent } from 'react';

import styles from './index.module.css';

interface IProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const Input = ({
  onChange,
  value,
  disabled,
  placeholder = 'Write here...',
}: IProps) => {
  const internalChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.value || '');
    }
  };

  return <input
    className={cx(styles.input, {
      [styles.disabled]: disabled,
      [styles.placeholder]: !value,
    })}
    onChange={internalChange}
    placeholder={placeholder}
    value={value}
  />;
};