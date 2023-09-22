import { useEffect } from 'react';

export const useOnMount = (cb: () => void) => {
  useEffect(() => {
    cb();
  }, []);
};