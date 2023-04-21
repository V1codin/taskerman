import DropDown from '@/modules/dropdown/DropDown';
import Image from 'next/image';

import { imagesForInfoDropDown } from '@/utils/helpers';
import { MutableRefObject, useState } from 'react';
import { useOuterCLick } from '@/hooks/hooks';

type InfoBoardDropDownProps = {
  closeDropDown: () => void;
  containerRef: MutableRefObject<HTMLElement | null>;
};

const InfoBoardDropDown: React.FC<InfoBoardDropDownProps> = ({
  closeDropDown,
  containerRef,
}) => {
  const [imageState] = useState(imagesForInfoDropDown);
  const [imageIterator, setImageIterator] = useState(0);

  useOuterCLick(containerRef, closeDropDown);

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
    <DropDown close={closeDropDown} dropDownType="info" heading="Info">
      <li className="list__body_mt5">
        <div className="popup__body__el">
          <Image
            src={currentTip.url!}
            alt="info"
            className="info__image card_design"
            onClick={changeTip}
            width={350}
            height={200}
          />
        </div>
      </li>
      <li className="list__body_mt5">
        <span className="el__span text_center">{currentTip.title}</span>
      </li>
      <li className="list__body_mt5">
        <button className="popup__body__el text_center" onClick={changeTip}>
          <span className="el__span text_center">
            {currentTip.changeTipTitle}
          </span>
        </button>
      </li>
    </DropDown>
  );
};

export default InfoBoardDropDown;
