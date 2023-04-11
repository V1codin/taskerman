import fetcher from '@/utils/api/fetcher';
import useSWR from 'swr';

import { getSetToastState } from '@/context/stateManager';
import {
  API_REQUEST_SESSION_URL,
  BG_IMAGE,
  getBodyRef,
} from '@/utils/constants';
import { isLink } from '@/utils/helpers';
import { useAtom } from 'jotai';
import { MutableRefObject, useCallback, useEffect } from 'react';
import { TAuthenticatedUser } from '@/pages/api/auth/session';
import { TError } from '@/types/state';

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

    setTimeout(resetToast, toast.timeout || timerToRemoveToast);
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

const useEscapeCallback = <TProps extends unknown>(
  callback: (arg: KeyboardEvent, props?: TProps) => void,
  props?: TProps,
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

const useSessionFromServer = () => {
  const { data, error, isLoading } = useSWR<TAuthenticatedUser, TError>(
    API_REQUEST_SESSION_URL,
    fetcher,
    {
      shouldRetryOnError: false,
    },
  );

  return {
    data,
    error,
    isLoading,
  };
};

export {
  useSessionFromServer,
  useToast,
  useDebounce,
  useBodyColor,
  useEscapeCallback,
  useOuterCLick,
};
