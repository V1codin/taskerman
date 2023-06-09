// import { useEffect } from 'react';
// import { getBodyRef } from '@/utils/constants';

import { isLink } from '@/libs/server.helpers';

export const useBackGround = (background?: string) => {
  const linkChecker = isLink(background);

  if (!background) return {};

  const style = {} as Pick<
    CSSStyleDeclaration,
    'backgroundImage' | 'background' | 'backgroundRepeat' | 'backgroundSize'
  >;

  if (!linkChecker) {
    style.backgroundImage = 'none';
    style.background = background;
  } else {
    style.background = '';
    style.backgroundRepeat = 'no-repeat';
    style.backgroundSize = 'cover';
    style.backgroundImage = `url(${background})`;
  }

  return style;
};

/*
export const _useBackGround = (background?: string) => {
  const bodyRef = getBodyRef()!;
  const linkChecker = isLink(background);

  useEffect(() => {
    if (!background) return;

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
*/
