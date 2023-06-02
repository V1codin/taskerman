import DropDown from '@/modules/dropdown/DropDown';

import { useOuterClick } from '@/hooks/useOuterClick';

import type { MutableRefObject } from 'react';

type CardDropDownProps = {
  closeDropDown: () => void;
  containerRef: MutableRefObject<HTMLElement | null>;
  children: React.ReactNode;
};

const CardDropDown: React.FC<CardDropDownProps> = ({
  closeDropDown,
  containerRef,
  children,
}) => {
  useOuterClick(containerRef, closeDropDown);

  return (
    <DropDown
      close={closeDropDown}
      heading="Board actions"
      containerClassNames="min-w-[200px]"
    >
      {children}
    </DropDown>
  );
};

export default CardDropDown;
