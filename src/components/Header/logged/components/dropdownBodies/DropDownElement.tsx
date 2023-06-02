import cls from 'classnames';

import type { PropsWithChildren } from 'react';

export const listInnerActiveElementDefaultClass = `flex items-center 
w-full text-center 
text-white cursor-pointer px-2 py-2 
border border-solid border-transparent
shadow-none
hover:bg-hover-blue
active:bg-aqua-active
[&>span]:font-bold italic
`;

type DropDownElementProps = {
  classNames?: string;
};

const DropDownElement: React.FC<PropsWithChildren<DropDownElementProps>> = ({
  children,
  classNames,
}) => {
  return <li className={cls('mt-1', classNames)}>{children}</li>;
};

export default DropDownElement;
