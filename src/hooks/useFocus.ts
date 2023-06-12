import { useEffect } from 'react';

import type { RefObject } from 'react';

export const useFocus = <TRef extends HTMLElement>(
  ref: RefObject<TRef>,
  isTriggered: boolean = true,
) => {
  useEffect(() => {
    if (isTriggered) {
      ref.current?.focus();
    }
  }, [isTriggered, ref]);
};
