import React, { useRef, useState } from 'react';

import ReactDOM from 'react-dom';

import styles from './index.module.css';

type Props = {
  text: string;
  children: React.ReactNode;
};

export const Tooltip = ({ text, children }: Props) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      top: rect.top + window.scrollY - 40,
      left: rect.left + window.scrollX + rect.width / 2,
    });
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  const tooltip = visible
    ? <div
      className={styles.tooltip}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
    >
      {text}
    </div>
    : null;

  return (
    <div
      className={styles.container}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      ref={tooltipRef}
    >
      {children}
      {ReactDOM.createPortal(tooltip, document.getElementById('tooltip-root')!)}
    </div>
  );
};
