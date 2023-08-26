// @ts-ignore
import save from '@/assets/check.svg?url';

import cls from 'classnames';
import ImageModule from '../image/Image';
import ButtonWithIcon from './ButtonWithIcon';

const defaultContainerClassNames = `group`;
const defaultIconClassNames = `group-hover:scale-125 group-active:scale-150`;

type SaveButtonProps = {
  classNames?: string;
  iconClassNames?: string;
  click: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const SaveButton: React.FC<SaveButtonProps> = ({
  classNames,
  iconClassNames,
  click,
}) => {
  return (
    <ButtonWithIcon
      classNames={cls(defaultContainerClassNames, classNames)}
      attrs={{
        name: 'save',
        title: 'Save',
        onClick: click,
        type: 'submit',
      }}
    >
      <ImageModule
        src={save}
        alt="save"
        height={20}
        width={20}
        className={cls(defaultIconClassNames, iconClassNames)}
      />
    </ButtonWithIcon>
  );
};

export default SaveButton;
