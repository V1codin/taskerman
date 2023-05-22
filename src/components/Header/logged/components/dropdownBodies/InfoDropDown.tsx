import DropDown from '@/modules/dropdown/DropDown';
import Image from 'next/image';
import DropDownElement from './DropDownElement';
import Button from '@/modules/button/Button';
import cls from 'classnames';

import { listInnerActiveElementDefaultClass } from './DropDownElement';
import { imagesForInfoDropDown } from '@/utils/helpers';
import { useState } from 'react';
import { useOuterClick } from '@/hooks/useOuterClick';

import type { MutableRefObject } from 'react';

type InfoDropDownProps = {
  closeDropDown: () => void;
  containerRef: MutableRefObject<HTMLElement | null>;
};

const InfoDropDown: React.FC<InfoDropDownProps> = ({
  closeDropDown,
  containerRef,
}) => {
  const [imageState] = useState(imagesForInfoDropDown);
  const [imageIterator, setImageIterator] = useState(0);

  useOuterClick(containerRef, closeDropDown);

  const changeTip = () => {
    setImageIterator((prevS) => {
      if (prevS >= imagesForInfoDropDown.length - 1) {
        return 0;
      }
      return ++prevS;
    });
  };

  const currentTip = imageState[imageIterator]!;

  return (
    <DropDown
      close={closeDropDown}
      dropDownType="info"
      heading="Info"
      containerClassNames="min-w-[350px]"
    >
      <DropDownElement>
        <div
          className={cls(listInnerActiveElementDefaultClass, 'justify-center')}
        >
          <Image
            src={currentTip.url!}
            alt="info"
            className="w-80 h-48 colored"
            onClick={changeTip}
            width={350}
            height={200}
          />
        </div>
      </DropDownElement>
      <DropDownElement classNames="text-center">
        <span className="mt-1 text-white">{currentTip.title}</span>
      </DropDownElement>
      <DropDownElement>
        <Button
          containerClassNames={cls(
            listInnerActiveElementDefaultClass,
            'justify-center items-center',
          )}
          attrs={{
            onClick: changeTip,
          }}
        >
          <span className="mt-1 text-yellow">{currentTip.changeTipTitle}</span>
        </Button>
      </DropDownElement>
    </DropDown>
  );
};

export default InfoDropDown;
