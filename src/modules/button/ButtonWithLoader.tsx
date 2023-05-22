import Button from './Button';
import cls from 'classnames';

import { forwardRef } from 'react';
import { Process } from '../process/Process';

import type { CustomButtonAttrs } from './Button';
import type { PropsWithChildren } from 'react';

const defaultClasses = cls('relative');

type ButtonWithLoaderProps = {
  isLoading: boolean;
  attrs?: {} & CustomButtonAttrs;
  spinnerSize?: string;
  classNames?: string;
  isBordered?: boolean;
};

const ButtonWithLoader = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonWithLoaderProps>
>(
  (
    { classNames, isLoading, children, attrs, spinnerSize, isBordered },
    ref,
  ) => {
    return (
      <Button
        containerClassNames={cls(defaultClasses, classNames)}
        attrs={attrs}
        ref={ref}
      >
        {isLoading ? (
          <Process
            size={spinnerSize}
            isShown={isLoading}
            isBordered={isBordered}
          />
        ) : (
          children
        )}
      </Button>
    );
  },
);

ButtonWithLoader.displayName = 'ButtonWithLoader';

export default ButtonWithLoader;
