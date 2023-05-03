import DropDown from '@/modules/dropdown/DropDown';

import { useOuterCLick } from '@/hooks/hooks';
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
  useOuterCLick(containerRef, closeDropDown);

  return (
    <DropDown close={closeDropDown} heading="Board actions" minWidth="200px">
      {children}
    </DropDown>
  );
};

export default CardDropDown;
