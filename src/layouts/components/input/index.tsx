import React, { ChangeEvent } from 'react';

import styles from './index.module.css';

type IProps = {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  error?: string;
} & ({
  onChange: (value: string) => void;
} | {
  readonly: true;
});

export const Input = ({
  value,
  disabled,
  label,
  error,
  placeholder = 'Write here...',
  ...restProps
}: IProps) => {
  const internalChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled || 'readonly' in restProps) {
      return;
    }
    restProps.onChange(e.target.value || '');
  };

  return <label className={styles.container}>
    <span className={styles.labelText}>{label}</span>
    <input
      className={cx(styles.input, {
        [styles.disabled]: disabled,
        [styles.placeholder]: !value,
        [styles.error]: !!error,
      })}
      onChange={internalChange}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
    />
    <span className={styles.errorMessage}>{error}</span>
  </label>;
};