import React, { useState } from 'react';

import styles from './index.module.css';

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

export const Popup = ({ children, trigger }: Props) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prevState) => !prevState);

  return <div className={styles.popupContainer}>
    <div onClick={toggleOpen} className={styles.trigger}>{trigger}</div>
    <div className={cx(styles.popup, {
      [styles.open]: open,
    })}>
      {children}
    </div>
  </div>;
};