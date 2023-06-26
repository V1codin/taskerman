'use client';

import cls from 'classnames';

import { useAtom } from 'jotai';
import { getSetToastState } from '@/context/stateManager';
import { useEffect, useRef } from 'react';

type ToastProps = {};

const Toast: React.FC<ToastProps> = ({}) => {
  const [toast, setToast] = useAtom(getSetToastState);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!toast.message) {
      return;
    }

    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    const resetToast = () => {
      setToast({
        message: '',
      });

      timeout.current = null;
    };

    const time = toast.timeout || 2000;

    timeout.current = setTimeout(resetToast, time);
  }, [setToast, toast.message, toast.timeout]);

  return toast.message ? (
    <div className={cls('toast', toast.typeClass)}>
      <h4>{toast.message}</h4>
    </div>
  ) : null;
};

Toast.displayName = 'Toast';

export default Toast;
