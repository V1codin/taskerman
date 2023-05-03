import DropDown from '@/modules/dropdown/DropDown';

import { useOuterCLick } from '@/hooks/hooks';
import { MutableRefObject } from 'react';

type ListDropDownProps = {
  closeDropDown: () => void;
  containerRef: MutableRefObject<HTMLElement | null>;
  children: React.ReactNode;
};

const ListDropDown: React.FC<ListDropDownProps> = ({
  closeDropDown,
  containerRef,
  children,
}) => {
  useOuterCLick(containerRef, closeDropDown);

  return (
    <DropDown close={closeDropDown} heading="List actions" minWidth="200px">
      {children}
    </DropDown>
  );
};

export default ListDropDown;
