import React, { useState } from 'react';

import styles from './index.module.css';

type Props = {
  url: string;
  fallbackText?: string;
};

export const Avatar = ({ url, fallbackText }: Props) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const text = fallbackText?.substring(0, 2).toUpperCase();

  return <div className={styles.avatar}>
    {hasError ? (
      <div>{text}</div>
    ) : (
      <img src={url} onError={handleError} alt={text} />
    )}
  </div>;
};