import cls from 'classnames';
import Button from './Button';

import { CustomButtonAttrs } from './Button';
import { PropsWithChildren, forwardRef } from 'react';

const defaultButtonWithIconClasses = 'flex items-center duration-300';

type ButtonWithIconProps = {
  classNames?: string;
  attrs?: {} & CustomButtonAttrs;
};

const ButtonWithIcon = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonWithIconProps>
>(({ classNames, children, attrs }, ref) => {
  return (
    <Button
      attrs={attrs}
      ref={ref}
      containerClassNames={cls(defaultButtonWithIconClasses, classNames)}
    >
      {children}
    </Button>
  );
});

ButtonWithIcon.displayName = 'ButtonWithIcon';

export default ButtonWithIcon;
