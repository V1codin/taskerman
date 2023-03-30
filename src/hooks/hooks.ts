import { getSetToastState } from '@/context/stateManager';
import { BG_IMAGE, getBodyRef } from '@/utils/constants';
import { isLink } from '@/utils/helpers';
import { useAtom } from 'jotai';
import { MutableRefObject, useCallback, useEffect } from 'react';

const useToast = (timerToRemoveToast: number = 2000) => {
  const [toast, setToast] = useAtom(getSetToastState);

  useEffect(() => {
    if (!toast.message) {
      return;
    }

    const resetToast = () => {
      setToast({
        message: '',
      });
    };

    const time = setTimeout(resetToast, toast.timeout || timerToRemoveToast);

    return () => {
      clearTimeout(time);
      resetToast();
    };
  }, [setToast, toast.message, timerToRemoveToast, toast.timeout]);

  return {
    toast,
    setToast,
  };
};

const useDebounce = (
  callback: (...args: any[]) => Promise<any>,
  timeOut: number = 600,
) => {
  let timer: NodeJS.Timeout;

  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      await callback(...args);
    }, timeOut);
  };
};

const useBodyColor = (background = BG_IMAGE) => {
  const bodyRef = getBodyRef()!;
  const linkChecker = isLink(background);

  useEffect(() => {
    if (!linkChecker) {
      bodyRef.style.backgroundImage = 'none';
      bodyRef.style.background = background;
    } else {
      bodyRef.style.background = '';
      bodyRef.style.backgroundRepeat = 'no-repeat';
      bodyRef.style.backgroundSize = 'cover';
      bodyRef.style.backgroundImage = `url(${background})`;
    }

    return () => {
      bodyRef.style.background = '';
      bodyRef.style.backgroundRepeat = 'no-repeat';
      bodyRef.style.backgroundSize = 'cover';
      bodyRef.style.backgroundImage = '';
    };
  }, [background, linkChecker, bodyRef]);
};

const useEscapeCallback = (callback: (arg: KeyboardEvent) => void) => {
  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        callback(e);
      }
    };
    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  });
};

const useOuterCLick = (
  parentRef: MutableRefObject<HTMLElement | null>,
  callback: (event: MouseEvent) => void,
) => {
  const click = useCallback(
    (e: MouseEvent) => {
      if (
        e.type === 'click' &&
        !parentRef.current?.contains(e.target as Node)
      ) {
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

export {
  useToast,
  useDebounce,
  useBodyColor,
  useEscapeCallback,
  useOuterCLick,
};
