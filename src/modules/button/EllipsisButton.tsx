// @ts-ignore
import moreDots from '@/assets/more.svg?url';
import ImageModule from '../image/Image';
import ButtonWithIcon from './ButtonWithIcon';
import cls from 'classnames';

import type { ImageModuleProps } from '../image/Image';
import type { CustomButtonAttrs } from './Button';
import { forwardRef } from 'react';

const defaultContainerClassNames = ``;

type EllipsisButtonProps = {
  iconProps?: {} & Partial<ImageModuleProps>;
  classNames?: string;
  attrs?: {} & CustomButtonAttrs;
};

const EllipsisButton = forwardRef<HTMLButtonElement, EllipsisButtonProps>(
  ({ attrs, classNames, iconProps }, ref) => {
    return (
      <ButtonWithIcon
        ref={ref}
        classNames={cls(defaultContainerClassNames, classNames)}
        attrs={attrs}
      >
        <ImageModule
          src={moreDots}
          alt="more menu"
          draggable={false}
          className="w-6 h-6"
          {...iconProps}
        />
      </ButtonWithIcon>
    );
  },
);

EllipsisButton.displayName = 'EllipsisButton';

export default EllipsisButton;
