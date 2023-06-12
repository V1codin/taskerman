import Spinner from '@/assets/pulse.svg';
import cls from 'classnames';

type ProcessProps = {
  isShown?: boolean;
  size?: string;
  isBordered?: boolean;
  classNames?: string;
};

const defaultContainerClasses = `flex justify-center 
  border-transparent
  items-center 
  border-[1px] 
  border-solid 
  absolute
  top-1/2
  left-2/4
  translate-x-[-50%]
  translate-y-[-50%]
  rounded-[50%]`;

const Process: React.FC<ProcessProps> = ({
  isShown,
  isBordered,
  classNames,
  size = 'w-9',
}) => {
  return isShown ? (
    <div
      className={cls(defaultContainerClasses, classNames, {
        '!border-pale-green': isBordered === true,
      })}
    >
      <div className={cls('spinner', size)}>
        <Spinner />
      </div>
    </div>
  ) : null;
};

export { Process };
