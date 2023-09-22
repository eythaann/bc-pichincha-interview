import React from 'react';

import { Button } from '../../../layouts/components/button';
import { useRouteError } from 'react-router-dom';

import { defaultError } from '../domain/constants';

import styles from './style.module.css';

export default function ErrorPage() {
  const error: Record<string, any> = useRouteError() || defaultError;
  console.error(error);

  return (
    <div id="error-page">
      <div className={styles.box}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText} {error.message}</i>
        </p>
        <Button type="link" route="/">
          Back To Home
        </Button>
      </div>
    </div>
  );
}