// @ts-ignore
import rightShevron from '@/assets/forward_shevron.svg?url';
import ButtonWithIcon from './ButtonWithIcon';
import ImageModule from '../image/Image';
import cls from 'classnames';

import type { ImageModuleProps } from '../image/Image';
import type { CustomButtonAttrs } from './Button';

const defaultContainerClassNames = ``;

type RightButtonProps = {
  iconProps?: {} & Partial<ImageModuleProps>;
  classNames?: string;
  attrs?: {} & CustomButtonAttrs;
};

const RightButton: React.FC<RightButtonProps> = ({
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
        src={rightShevron}
        alt="right"
        draggable={false}
        className="w-6 h-6"
        {...iconProps}
      />
    </ButtonWithIcon>
  );
};

export default RightButton;
