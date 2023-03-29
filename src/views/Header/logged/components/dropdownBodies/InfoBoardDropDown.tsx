import DropDown from '@/modules/dropdown/DropDown';
import Image from 'next/image';

import { imagesForInfoDropDown } from '@/utils/helpers';
import { MouseEvent, SyntheticEvent, useState } from 'react';

type InfoBoardDropDownProps = {
  closeDropDown: (
    e: KeyboardEvent | MouseEvent | SyntheticEvent<HTMLButtonElement>,
  ) => void;
};

const InfoBoardDropDown: React.FC<InfoBoardDropDownProps> = ({
  closeDropDown,
}) => {
  const [imageState] = useState(imagesForInfoDropDown);
  const [imageIterator, setImageIterator] = useState(0);

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
