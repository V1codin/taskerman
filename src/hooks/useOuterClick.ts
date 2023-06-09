import { MutableRefObject, useCallback, useEffect } from 'react';

export const useOuterClick = (
  parentRef: MutableRefObject<HTMLElement | null>,
  callback: <T extends MouseEvent>(event: T) => void,
) => {
  const click = useCallback(
    (e: MouseEvent) => {
      if (e.target instanceof Node && !parentRef.current?.contains(e.target)) {
        callback(e);
      }
    },

    [parentRef, callback],
  );

  useEffect(() => {
    document.addEventListener('click', click, { capture: true });

    return () => {
      document.removeEventListener('click', click, { capture: true });
    };
    // eslint-disable-next-line
  }, []);
};
