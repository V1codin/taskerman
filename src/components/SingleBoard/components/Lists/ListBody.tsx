// @ts-ignore
import binIcon from '@/assets/bin.svg?url';
import EllipsisButton from '@/modules/button/EllipsisButton';

import { TListNS } from '@/types/db';
import { StyledListHeader } from './styledList';
import { useCallback, useRef, useState } from 'react';
import ListDropDown from './ListDropDown';
import Button from '@/modules/button/Button';
import ImageModule from '@/modules/image/Image';

type ListBodyProps = {
  list: TListNS.TList;
};

const ListBody: React.FC<ListBodyProps> = ({ list }) => {
  const { title } = list;

  const containerRef = useRef(null);
  const [dropDown, setDropDown] = useState(false);
  const [ellipsClass, setEllipsClass] = useState('colored');

  const deleteList = () => {};

  const toggleDropDown = useCallback(() => {
    setDropDown((prev) => {
      if (prev) {
        setEllipsClass('colored');
      } else {
        setEllipsClass('colored active');
      }
      return !prev;
    });
  }, []);

  return (
    <div ref={containerRef}>
      <StyledListHeader>
        <h3 className="unselectable">{title}</h3>
      </StyledListHeader>

      <EllipsisButton
        attrs={{
          type: 'button',
          className: ellipsClass,
          onClick: () => toggleDropDown(),
        }}
        iconProps={{
          title: 'more options',
        }}
      />
      {dropDown && (
        <ListDropDown
          containerRef={containerRef}
          closeDropDown={toggleDropDown}
        >
          <li className="list__body_mt5">
            <Button
              attrs={{
                className: 'popup__body__el',
                onClick: deleteList,
              }}
            >
              <ImageModule
                src={binIcon}
                alt="remove icon"
                title="Remove the list"
                width={24}
                height={24}
              />
              <span className="el__span">Remove list</span>
            </Button>
          </li>
        </ListDropDown>
      )}
    </div>
  );
};

export default ListBody;
