// @ts-ignore
import Plus from '@/assets/plus.svg?url';
import ImageModule from '../image/Image';
import Button from './Button';

import type { CustomButtonAttrs } from './Button';
import type { MouseEventHandler, ReactNode } from 'react';

type AddButtonProps = {
  children?: ReactNode;
  onClick: MouseEventHandler;
  attrs?: {} & CustomButtonAttrs;

  className?: string;
};

const AddButton: React.FC<AddButtonProps> = ({
  children,
  className,
  onClick,
  attrs,
}) => {
  return (
    <Button
      attrs={{
        className,
        name: 'add',
        title: 'Create',
        onClick,
        ...attrs,
      }}
    >
      <ImageModule src={Plus} alt="add" className="menu__ico" />
      {children}
    </Button>
  );
};

export default AddButton;
