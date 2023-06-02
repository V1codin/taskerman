import cls from 'classnames';

import { ButtonHTMLAttributes, PropsWithChildren, forwardRef } from 'react';

import type { TButtonDataTypes } from '@/types/utils';

const defaultButtonClasses = 'p-2 duration-300';

export type CustomButtonAttrs = TButtonDataTypes &
  Partial<ButtonHTMLAttributes<HTMLButtonElement>>;

type ButtonProps = {
  containerClassNames?: string;
  attrs?: {} & CustomButtonAttrs;
};

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  ({ children, containerClassNames, attrs }, ref) => {
    return (
      <button
        ref={ref}
        className={cls(defaultButtonClasses, containerClassNames)}
        {...attrs}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
