import { useCallback, useEffect } from 'react';

export const useEscapeKeyCallback = <TProps extends unknown>(
  callback: (arg: KeyboardEvent, props?: TProps) => void,
  props?: TProps,
  isAttachListenerDependency?: boolean,
) => {
  const keyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        callback(e, props);
      }
    },
    [callback, props],
  );

  useEffect(() => {
    if (isAttachListenerDependency) {
      window.addEventListener('keydown', keyDown);
    } else {
      window.removeEventListener('keydown', keyDown);
    }

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  });
};
