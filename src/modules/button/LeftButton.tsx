// @ts-ignore
import leftShevron from '@/assets/backward_shevron.svg?url';
import ButtonWithIcon from './ButtonWithIcon';
import ImageModule from '../image/Image';
import cls from 'classnames';

import type { ImageModuleProps } from '../image/Image';
import type { CustomButtonAttrs } from './Button';

const defaultContainerClassNames = ``;

type LeftButtonProps = {
  iconProps?: {} & Partial<ImageModuleProps>;
  classNames?: string;
  attrs?: {} & CustomButtonAttrs;
};

const LeftButton: React.FC<LeftButtonProps> = ({
  attrs,
  classNames,
  iconProps,
}) => {
  return (
    <ButtonWithIcon
      classNames={cls(defaultContainerClassNames, classNames)}
      attrs={attrs}
    >
      <ImageModule
        src={leftShevron}
        alt="left"
        draggable={false}
        className="w-6 h-6"
        {...iconProps}
      />
    </ButtonWithIcon>
  );
};

export default LeftButton;
