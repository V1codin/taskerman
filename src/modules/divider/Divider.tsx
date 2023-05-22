import cls from 'classnames';

const defaultClasses = cls(
  'px-0 py-3 ml-1 border-l-2 border-solid border-gray_divider',
);

type DividerProps = {
  classNames?: string;
};

const Divider: React.FC<DividerProps> = ({ classNames }) => {
  return <span className={cls(defaultClasses, classNames)}></span>;
};

export default Divider;
