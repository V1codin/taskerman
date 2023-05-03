// @ts-ignore
import boardIcon from '@/assets/board_colored.svg?url';
// @ts-ignore
import binIcon from '@/assets/bin.svg?url';

import EllipsisButton from '@/modules/button/EllipsisButton';
import CardDropDown from './CardDropDown';
import Link from 'next/link';
import ImageModule from '@/modules/image/Image';
import Button from '@/modules/button/Button';

import { getSetModal, userStateAtom } from '@/context/stateManager';
import { StyledCard, StyledSub } from '../../styledProfile';
import { IBoard } from '@/models/boards';
import { isLink } from '@/utils/helpers';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRef, useState } from 'react';
import type { MouseEvent } from 'react';

type SingleSubProps = {
  board: IBoard;
};

const SingleSub: React.FC<SingleSubProps> = ({ board }) => {
  const setModal = useSetAtom(getSetModal);
  const user = useAtomValue(userStateAtom);
  const [dropDown, setDropDown] = useState('');
  const [ellipsClass, setEllipsClass] = useState('colored');
  const containerRef = useRef(null);

  const bgChecker = isLink(board.bg);
  const href = `/board/${board._id}`;

  const toggleDropDown = (dropDownId: string) => {
    setDropDown((prev) => {
      if (prev !== dropDownId) {
        setEllipsClass('colored active');
        return dropDownId;
      }

      setEllipsClass('colored');
      return '';
    });
  };

  const modalMessage =
    user?._id === board.owner._id
      ? 'Delete the board, titled'
      : 'Unsubscribe from the board';

  const openDeleteBoardModal = (
    boardId: string,
    boardTitle: string,
    modalMessage: string,
  ) => {
    setModal({
      isOpen: true,
      window: {
        type: 'delete',
        view: 'delete_board',
        data: {
          id: boardId,
          children: (
            <h3>
              {modalMessage} -{' '}
              <span style={{ color: 'red' }}>{boardTitle}</span> ?
            </h3>
          ),
          entity: 'board',
        },
      },
    });
  };

  const deleteBoard = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    openDeleteBoardModal(board._id, board.title, modalMessage);
  };

  const style = bgChecker
    ? {
        backgroundImage: `url(${board.bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }
    : { background: board.bg };

  const toggleDropDownHandler = () => {
    toggleDropDown(board._id);
  };

  return (
    <StyledSub key={board._id} ref={containerRef}>
      <h4 className="board_title">{board.title}</h4>
      <StyledCard
        style={{
          ...style,
        }}
      >
        <EllipsisButton
          attrs={{
            type: 'button',
            className: ellipsClass,
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
            <li className="list__body_mt5">
              <Link className="popup__body__el" href={href}>
                <ImageModule
                  src={boardIcon}
                  alt="board icon"
                  title="Go to the board"
                  width={24}
                  height={24}
                />
                <span className="el__span">Go to board</span>
              </Link>
            </li>

            <li className="list__body_mt5">
              <Button
                attrs={{
                  className: 'popup__body__el',
                  onClick: deleteBoard,
                }}
              >
                <ImageModule
                  src={binIcon}
                  alt="remove icon"
                  title="Remove the board"
                  width={24}
                  height={24}
                />
                <span className="el__span">Remove board</span>
              </Button>
            </li>
          </CardDropDown>
        ) : null}
      </StyledCard>
    </StyledSub>
  );
};

export default SingleSub;
