// @ts-ignore
import deleteIco from '@/assets/plus.svg?url';
import CloseButton from '../button/CloseButton';
import cls from 'classnames';

import { TDropDownMinWidth } from '@/types/helpers';
import { useEscapeKeyCallback } from '@/hooks/useEscapeKeyCallback';

const defaultContainerClasses = cls(`
colored absolute 
z-[8000] pb-1 top-[60px] 
right-2 min-w-[200px]`);

const defaultHeaderClasses = cls(
  `relative rounded-t-md 
  bg-monokai p-2 
  text-center 
  border-b
  border-b-bright-blue`,
);

type DropDownProps = {
  heading?: string;
  close: () => void;
  children?: React.ReactNode;
  dropDownType?: string;
  containerClassNames?: string;
  minWidth?: TDropDownMinWidth;
};

const DropDown: React.FC<DropDownProps> = ({
  close,
  heading,
  children,
  dropDownType,
  containerClassNames,
}) => {
  useEscapeKeyCallback(close);

  return (
    <div className={cls(defaultContainerClasses, containerClassNames)}>
      <header className={cls(defaultHeaderClasses)}>
        <h4 className="text-pale-green font-bold unselectable">
          {heading || 'List'}
        </h4>
        <CloseButton
          click={close}
          classNames={cls('top-[2px] right-[5px]')}
          attrs={{
            'data-drop-type': dropDownType || '',
          }}
        />
      </header>
      {children && <ul className="text-[0.8em] p-1">{children}</ul>}
    </div>
  );
};

export default DropDown;
