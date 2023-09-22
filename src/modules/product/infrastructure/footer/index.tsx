import React from 'react';

import { Button } from '../../../../layouts/components/button';

import { callApi } from '../../../shared/infrastructure/api';

import { httpMethod } from '../../../shared/domain/httpTypes';
import { ServicesUrl } from '../../../shared/domain/services';
import { IProduct } from '../../domain';

import styles from './index.module.css';

type Props = {
  product: IProduct;
};

export const FooterForm = ({ product }: Props) => {
  const { id, name, description, logo, emitionDate, revisionDate } = product;

  const onSave = () => {
    callApi({
      url: ServicesUrl.products,
      path: '/bp/products/verification?id=' + id,
      method: httpMethod.get,
      onSuccess: (_res) => {
        // api always retuning false and in the doc do not say nothing about how the id should really be
        callApi({
          url: ServicesUrl.products,
          path: '/bp/products',
          method: httpMethod.post,
          data: {
            id,
            name,
            description,
            logo,
            date_release: emitionDate,
            date_revision: revisionDate,
          },
        });
      },
    });
  };

  return <div className={styles.footer}>
    <Button styleType="secondary" type="link" route="/">
      Cancel
    </Button>
    <Button onClick={onSave}>
      Enviar
    </Button>
  </div>;
};