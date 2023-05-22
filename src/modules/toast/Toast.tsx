'use client';

import cls from 'classnames';

import { useAtomValue } from 'jotai';
import { getSetToastState } from '@/context/stateManager';

const Toast: React.FC<{}> = ({}) => {
  const currentToast = useAtomValue(getSetToastState);

  return currentToast.message ? (
    <div className={cls('toast', currentToast.typeClass)}>
      <h4>{currentToast.message}</h4>
    </div>
  ) : null;
};

Toast.displayName = 'Toast';

export default Toast;
