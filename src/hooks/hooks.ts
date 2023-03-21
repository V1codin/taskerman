import { useEffect, useState } from 'react';
import { ErrorToastProps, TToasts } from '../../types/helpers';

const useToast = (
  type: TToasts = 'notification',
  timerToRemoveToast: number = 2000,
) => {
  const [toast, setToast] = useState<ErrorToastProps>({
    message: '',
    typeClass: type,
  });

  useEffect(() => {
    if (!toast.message) {
      return;
    }

    const time = setTimeout(() => {
      setToast({
        message: '',
        typeClass: type,
      });
    }, timerToRemoveToast);

    return () => {
      clearTimeout(time);
    };
    // eslint-disable-next-line
  }, [toast.message, timerToRemoveToast]);

  return {
    toast,
    setToast,
  };
};

const useFetch = <TResponse extends unknown, K>(
  asyncFunction: (props: K) => Promise<TResponse>,
) => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState<TResponse>();

  const exec = async (props: K) => {
    try {
      setLoader(true);
      const data = await asyncFunction(props);
      setData(data);

      return data;
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e?.message || 'Fetch data error');
      }

      throw e;
    } finally {
      setLoader(false);
    }
  };

  return {
    data,
    loader,
    setLoader,
    exec,
  };
};

export { useToast, useFetch };

/*
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import useConstant from 'use-constant';

import { useCallback, useState, useEffect } from 'react';
import { useAsyncAbortable } from 'react-async-hook';
import { isLink } from '../utils/helpers';
import { BG_IMAGE, BODY_REF } from '../utils/constants';

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback((newS) => {
    if (typeof newS === 'boolean') {
      setState(newS);
    } else {
      setState((state) => !state);
    }
  }, []);

  return [state, toggle];
};

const useOuterCLick = (parentRef, ...callbacks) => {
  const click = useCallback(
    (e) => {
      if (
        (e.type === 'click' && !parentRef.current?.contains(e.target)) ||
        (e.type === 'keydown' && e.code === 'Escape')
      ) {
        callbacks.forEach((callback) => callback());
      }
    },
    [parentRef, callbacks]
  );

  useEffect(() => {
    document.addEventListener('click', click, { capture: true });

    document.addEventListener('keydown', click);

    return () => {
      document.removeEventListener('click', click, { capture: true });
      document.removeEventListener('keydown', click);
    };
    // eslint-disable-next-line
  }, []);
};

const useBodyColor = (background = BG_IMAGE) => {
  const bodyRef = BODY_REF;
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

const useAddForm = (defaultFormState) => {
  const formDefState = {
    ...defaultFormState,
    isAddForm: false
  };
  const [formState, setFormState] = useState(formDefState);

  const formToggle = () => {
    setFormState({
      ...formDefState,
      isAddForm: !formState.isAddForm
    });
  };

  const changeHandler = (e) => {
    const { value } = e.target;
    setFormState({
      ...formState,
      name: value
    });
  };

  return {
    isAddForm: formState.isAddForm,
    formToggle,
    setFormState,
    changeHandler,
    formState
  };
};

const useDebouncedFetch = (fetchFn) => {
  const [inputText, setInputText] = useState('');

  const debouncedSearch = useConstant(() => AwesomeDebouncePromise(fetchFn, 2000));

  const search = useAsyncAbortable(
    async (_, text) => {
      let res;

      if (text.length === 0) {
        res = [];
      } else {
        res = await debouncedSearch(text);
      }

      return res;
    },
    [inputText]
  );

  return {
    inputText,
    setInputText,
    search
  };
};

export { useToggle, useOuterCLick, useBodyColor, useAddForm, useDebouncedFetch };
*/
