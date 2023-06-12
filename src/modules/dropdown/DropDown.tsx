// @ts-ignore
import deleteIco from '@/assets/plus.svg?url';
import CloseButton from '../button/CloseButton';
import cls from 'classnames';

import { useEscapeKeyCallback } from '@/hooks/useEscapeKeyCallback';

const defaultContainerClasses = `
colored designed absolute 
z-[4000] top-[60px] 
right-2 min-w-[200px]`;

const defaultHeaderClasses = `relative rounded-t-md 
  bg-monokai p-2 
  text-center 
  border-b
  border-b-bright-blue`;

type DropDownProps = {
  heading?: string;
  close: () => void;
  children?: React.ReactNode;
  dropDownType?: string;
  containerClassNames?: string;
  listClassNames?: string;
};

const DropDown: React.FC<DropDownProps> = ({
  close,
  heading,
  children,
  dropDownType,
  containerClassNames,
  listClassNames,
}) => {
  useEscapeKeyCallback(close, null, true);

  return (
    <div className={cls(defaultContainerClasses, containerClassNames)}>
      {heading && (
        <header className={cls(defaultHeaderClasses)}>
          <h4 className="text-pale-green font-bold unselectable">{heading}</h4>
          <CloseButton
            click={close}
            classNames={cls('top-[2px] right-[5px]')}
            attrs={{
              'data-drop-type': dropDownType || '',
            }}
          />
        </header>
      )}
      {children && (
        <ul className={cls('text-[0.8em] p-1', listClassNames)}>{children}</ul>
      )}
    </div>
  );
};

export default DropDown;
