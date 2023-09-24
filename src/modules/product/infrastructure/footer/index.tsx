import React from 'react';

import { Button } from '../../../../layouts/components/button';

import { callApi } from '../../../shared/infrastructure/api';

import { useAppDispatch, useAppSelector } from '../../../shared/app/hooks/reduxHooks';
import { selectProductErrors, selectShowErrors } from '../../../shared/app/selectors/errors';
import { errorsActions } from '../../../shared/app/slices/errors';
import { ownFormatToDate } from '../../../shared/app/utils/date';
import { ProductScheme } from '../../app/scheme';

import { httpMethod } from '../../../shared/domain/httpTypes';
import { ServicesUrl } from '../../../shared/domain/services';
import { Time } from '../../../shared/domain/types';
import { OnBuildingProduct } from '../../domain';

import styles from './index.module.css';

type Props = {
  isNew: boolean;
  product: OnBuildingProduct;
};

export const FooterForm = ({ product, isNew }: Props) => {
  const { id, name, description, logo, emitionDate, revisionDate } = product;

  const showErrors = useAppSelector(selectShowErrors);
  const productErros = useAppSelector(selectProductErrors);
  const dispatch = useAppDispatch();

  const onSave = () => {
    if (!showErrors) {
      dispatch(errorsActions.setShowErrors(true));
    }

    const parsed = ProductScheme.safeParse(product);
    const parsedErrors = parsed.success === false ? parsed.error.errors : [];
    dispatch(errorsActions.setProductErrors(parsedErrors));

    if (!parsedErrors.length) {
      callApi({
        url: ServicesUrl.products,
        path: '/bp/products',
        method: isNew ? httpMethod.post : httpMethod.put,
        data: {
          id,
          name,
          description,
          logo,
          date_release: ownFormatToDate(emitionDate as Time),
          date_revision: ownFormatToDate(revisionDate as Time),
        },
        onSuccess: () => {
          location.href = '/';
        },
      });
    }
  };

  return <div className={styles.footer}>
    <Button styleType="secondary" type="link" route="/">
      Cancel
    </Button>
    <Button
      onClick={onSave}
      disabled={!!productErros.length}
      disabledTooltip="Solucione los problemas en el formulario antes de guardar"
    >
      {isNew ? 'Enviar' : 'Guardar'}
    </Button>
  </div>;
};