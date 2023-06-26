// @ts-ignore
import confirmIco from '@/assets/check.svg?url';

import ImageModule from '../image/Image';
import ButtonWithIcon from './ButtonWithIcon';
import cls from 'classnames';

import { forwardRef } from 'react';

import type { ImageModuleProps } from '../image/Image';
import type { MouseEventHandler } from 'react';
import type { CustomButtonAttrs } from './Button';

const defaultButtonClasses = `rounded-xl
active:border-bright-blue active:border-[1px]
absolute w-8 h-8 !p-0 
flex items-center justify-center 
border-0 border-solid border-transparent`;

type ConfirmProps = {
  click: MouseEventHandler<HTMLButtonElement>;
  attrs?: {} & CustomButtonAttrs;
  classNames?: string;
  iconAttributes?: {} & Partial<ImageModuleProps>;
  isBackgrounded?: boolean;
};

const ConfirmButton = forwardRef<HTMLButtonElement, ConfirmProps>(
  ({ click, attrs, classNames, iconAttributes, isBackgrounded }, ref) => {
    return (
      <ButtonWithIcon
        attrs={{
          ...attrs,
          onClick: click,
        }}
        ref={ref}
        classNames={cls(defaultButtonClasses, classNames, {
          'bg-slate-600 hover:bg-slate-400 active:bg-pale-green':
            isBackgrounded,
        })}
      >
        <ImageModule
          src={confirmIco}
          alt="confirm"
          draggable={false}
          className="hover:scale-110"
          {...iconAttributes}
        />
      </ButtonWithIcon>
    );
  },
);

ConfirmButton.displayName = 'ConfirmButton';

export default ConfirmButton;
