'use client';

// @ts-ignore
import boardIcon from '@/assets/board_colored.svg?url';
// @ts-ignore
import binIcon from '@/assets/bin.svg?url';

import CardDropDown from './CardDropDown';
import EllipsisButton from '@/modules/button/EllipsisButton';
import Link from 'next/link';
import ImageModule from '@/modules/image/Image';
import DropDownElement from '@/components/Header/logged/components/dropdownBodies/DropDownElement';
import ButtonWithIcon from '@/modules/button/ButtonWithIcon';
import cls from 'classnames';

import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import { LAPTOP_MEDIA_POINT_WIDTH } from '@/utils/constants';
import { listInnerActiveElementDefaultClass } from '@/components/Header/logged/components/dropdownBodies/DropDownElement';

import type { IBoard } from '@/models/boards';

const ellipsisDefaultClasses = cls(
  `colored designed absolute top-2 right-3 !p-0`,
);

type SubButtonsProps = {
  board: IBoard;
  containerRef: MutableRefObject<HTMLElement | null>;
  openDeleteBoardModal: (board: IBoard) => void;
};

const SubButtons: React.FC<SubButtonsProps> = ({
  board,
  containerRef,
  openDeleteBoardModal,
}) => {
  const [isDesktop, setIsDesktop] = useState(true);

  const [dropDown, setDropDown] = useState('');
  const [ellipsClass, setEllipsClass] = useState(ellipsisDefaultClasses);
  const href = `/board/${board._id}`;

  useEffect(() => {
    const resize = () => {
      setIsDesktop(window.innerWidth > LAPTOP_MEDIA_POINT_WIDTH);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const toggleDropDown = useCallback((dropDownId: string) => {
    setDropDown((prev) => {
      if (prev !== dropDownId) {
        setEllipsClass((prev) => prev + ' ' + 'ellipsis_active');
        return dropDownId;
      }

      setEllipsClass(ellipsisDefaultClasses);
      return '';
    });
  }, []);

  const toggleDropDownHandler = useCallback(() => {
    toggleDropDown(board._id);
  }, [board._id, toggleDropDown]);

  return typeof window === 'undefined' || isDesktop ? (
    <>
      <EllipsisButton
        classNames={ellipsClass}
        attrs={{
          type: 'button',
          onClick: toggleDropDownHandler,
          'data-drop-type': board._id,
        }}
        iconProps={{
          title: 'more options',
        }}
      />
      {dropDown === board._id ? (
        <CardDropDown
          closeDropDown={toggleDropDownHandler}
          containerRef={containerRef}
        >
          <DropDownElement>
            <Link className={listInnerActiveElementDefaultClass} href={href}>
              <ImageModule
                src={boardIcon}
                alt="board icon"
                title="Go to the board"
                width={24}
                height={24}
              />
              <span className="ml-1">Go to board</span>
            </Link>
          </DropDownElement>

          <DropDownElement>
            <ButtonWithIcon
              classNames={listInnerActiveElementDefaultClass}
              attrs={{
                onClick: () => openDeleteBoardModal(board),
              }}
            >
              <ImageModule
                src={binIcon}
                alt="remove icon"
                title="Remove the board"
                width={24}
                height={24}
              />
              <span className="ml-1">Remove board</span>
            </ButtonWithIcon>
          </DropDownElement>
        </CardDropDown>
      ) : null}
    </>
  ) : (
    <div className="bg-alpha-black my-auto min-h-[inherit] w-full">
      <div className="flex items-stretch w-fit min-h-[inherit]">
        <Link className={listInnerActiveElementDefaultClass} href={href}>
          <ImageModule
            src={boardIcon}
            alt="board icon"
            title="Go to the board"
            width={24}
            height={24}
          />
        </Link>
        <ButtonWithIcon
          classNames={listInnerActiveElementDefaultClass}
          attrs={{
            onClick: () => openDeleteBoardModal(board),
          }}
        >
          <ImageModule
            src={binIcon}
            alt="remove icon"
            title="Remove the board"
            width={24}
            height={24}
          />
        </ButtonWithIcon>
      </div>
    </div>
  );
};

export default SubButtons;
