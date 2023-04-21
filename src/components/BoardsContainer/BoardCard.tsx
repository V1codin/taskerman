// @ts-ignore
import deleteIco from '@/assets/plus.svg?url';
import Router from 'next/router';
import CloseBtn from '@/modules/button/CloseBtn';

import { useAtomValue, useSetAtom } from 'jotai';
import { getSetModal, userStateAtom } from '@/context/stateManager';
import { IBoard } from '@/models/boards';
import styled from 'styled-components';

const StyledCard = styled.div`
  position: relative;
  margin: 10px 0 0 15px;
  overflow: auto;

  cursor: pointer;
  width: 225px;
  height: 150px;

  &:active {
    background-color: red;
  }
`;

type BoardCardProps = IBoard & {
  bgChecker: boolean;
};

const BoardCard: React.FC<BoardCardProps> = ({
  _id,
  bgChecker,
  bg,
  title,
  owner,
}) => {
  const user = useAtomValue(userStateAtom);
  const setModal = useSetAtom(getSetModal);

  const deleteBoard = async () => {
    const modalMessage =
      user?._id === owner._id
        ? 'Delete the board, titled'
        : 'Unsubscribe from the board';

    setModal({
      isOpen: true,
      window: {
        type: 'delete',
        view: 'delete_board',
        data: {
          id: _id,
          children: (
            <h3>
              {modalMessage} - <span style={{ color: 'red' }}>{title}</span> ?
            </h3>
          ),
          entity: 'board',
        },
      },
    });
  };

  const redirectToBoard = () => {
    Router.push(`/board/${_id}`);
  };
  return (
    <StyledCard
      className="colored"
      style={
        bgChecker
          ? {
              backgroundImage: `url(${bg})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }
          : { background: bg }
      }
      title={title}
    >
      <CloseBtn
        attrs={{
          onClick: deleteBoard,
          name: _id,
        }}
        iconProps={{
          title: 'Delete the board',
        }}
      />
      <button
        className="btn card__btn"
        title="Go to the board"
        onClick={redirectToBoard}
      >
        {title}
      </button>
    </StyledCard>
  );
};

export default BoardCard;
