import cls from 'classnames';

const defaultClasses = 'px-0 py-3 ml-1 border-l-2 border-solid';

type DividerProps = {
  classNames?: string;
};

const Divider: React.FC<DividerProps> = ({ classNames }) => {
  return <span className={cls(defaultClasses, classNames)}></span>;
};

export default Divider;
