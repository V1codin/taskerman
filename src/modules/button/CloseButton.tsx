// @ts-ignore
import deleteIco from '@/assets/plus.svg?url';
import ImageModule from '../image/Image';
import ButtonWithIcon from './ButtonWithIcon';
import cls from 'classnames';

import { forwardRef } from 'react';

import type { MouseEventHandler } from 'react';
import type { CustomButtonAttrs } from './Button';

const defaultButtonClasses = cls(`rounded-xl
active:border-bright-blue active:border-[1px]
absolute top-3 right-3 w-8 h-8 p-0 
flex items-center justify-center 
border-0 border-solid border-transparent`);

type CloseProps = {
  click: MouseEventHandler<HTMLButtonElement>;
  attrs?: {} & CustomButtonAttrs;
  classNames?: string
};

const CloseButton = forwardRef<HTMLButtonElement, CloseProps>(
  ({ click, attrs, classNames }, ref) => {
    return (
      <ButtonWithIcon
        attrs={{
          ...attrs,
          onClick: click,
        }}
        ref={ref}
        classNames={cls(defaultButtonClasses, classNames)}
      >
        <ImageModule
          src={deleteIco}
          alt="delete"
          draggable={false}
          className="rotate-45 hover:scale-110"
        />
      </ButtonWithIcon>
    );
  },
);

CloseButton.displayName = 'CloseButton';

export default CloseButton;
