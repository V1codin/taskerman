// @ts-ignore
import clipboard from '@/assets/clipboard.svg?url';
import ImageModule from '../image/Image';
import Button from './Button';
import cls from 'classnames';

import { MouseEventHandler } from 'react';

const defaultContainerClassNames = `p-[0.4rem] w-[34px] 
h-[34x] bg-black-aqua colored designed 
active:shadow-none 
hover:shadow-[0_0_5px_#42c5e4]`;

type ClipBoardButtonProps = {
  click: MouseEventHandler<HTMLButtonElement>;
  buttonName: string;
  classNames?: string;
};

const ClipBoardButton: React.FC<ClipBoardButtonProps> = ({
  click,
  buttonName,
  classNames,
}) => {
  return (
    <Button
      containerClassNames={cls(defaultContainerClassNames, classNames)}
      attrs={{
        onClick: click,
        name: buttonName,
        type: 'button',
      }}
    >
      <ImageModule
        src={clipboard}
        alt="link bg"
        className="menu__ico"
        title="Get link of the background from clipboard"
      />
    </Button>
  );
};

export default ClipBoardButton;
