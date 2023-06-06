// @ts-ignore
import edit from '@/assets/edit.svg?url';

import cls from 'classnames';
import ImageModule from '../image/Image';
import ButtonWithIcon from './ButtonWithIcon';

const defaultContainerClassNames = `group`;
const defaultIconClassNames = `group-hover:scale-125 group-active:scale-150`;

type EditButtonProps = {
  classNames?: string;
  iconClassNames?: string;
  click: () => void;
};

const EditButton: React.FC<EditButtonProps> = ({
  classNames,
  iconClassNames,
  click,
}) => {
  return (
    <ButtonWithIcon
      classNames={cls(defaultContainerClassNames, classNames)}
      attrs={{
        name: 'edit',
        title: 'Edit board',
        onClick: click,
      }}
    >
      <ImageModule
        src={edit}
        alt="edit"
        height={20}
        width={20}
        className={cls(defaultIconClassNames, iconClassNames)}
      />
    </ButtonWithIcon>
  );
};

export default EditButton;
