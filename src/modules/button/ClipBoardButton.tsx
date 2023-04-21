// @ts-ignore
import link from '@/assets/link.svg?url';
import ImageModule from '../image/Image';
import Button from './Button';

import { MouseEventHandler } from 'react';

const defaultClasses = 'menu__btn card_design menu_linkBg';

type ClipBoardButtonProps = {
  click: MouseEventHandler<HTMLButtonElement>;
  buttonName: string;
  className?: string;
};

const ClipBoardButton: React.FC<ClipBoardButtonProps> = ({
  click,
  buttonName,
  className = '',
}) => {
  const concatedClassName = className
    ? defaultClasses + ' ' + className
    : defaultClasses;

  return (
    <Button
      attrs={{
        onClick: click,
        className: concatedClassName,
        name: buttonName,
        type: 'button',
      }}
    >
      <ImageModule
        src={link}
        alt="link bg"
        className="menu__ico"
        title="Get link of the background from clipboard"
      />
    </Button>
  );
};

export default ClipBoardButton;
