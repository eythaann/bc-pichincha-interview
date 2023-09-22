import React from 'react';

import { useRouteError } from 'react-router-dom';

import styles from './style.module.css';

export default function ErrorPage() {
  const error = useRouteError() as Record<string, any>;
  console.error(error);

  return (
    <div id="error-page">
      <div className={styles.box}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}