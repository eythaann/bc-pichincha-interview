import React, { useEffect, useRef, useState } from 'react';

import styles from './index.module.css';

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

export const Popup = ({ children, trigger }: Props) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prevState) => !prevState);

  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return <div className={styles.popupContainer}>
    <div onClick={toggleOpen} className={styles.trigger}>{trigger}</div>
    <div
      ref={popupRef}
      className={cx(styles.popup, {
        [styles.open]: open,
      })}
    >
      {children}
    </div>
  </div>;
};