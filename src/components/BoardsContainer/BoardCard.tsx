// @ts-ignore
import deleteIco from '@/assets/plus.svg?url';
import Router from 'next/router';
import CloseBtn from '@/modules/button/CloseBtn';

import { useSetAtom } from 'jotai';
import { getSetModal } from '@/context/stateManager';
import { TRawUserBoard } from '@/libs/boards.service';

type BoardCardProps = TRawUserBoard & {
  bgChecker: boolean;
};

const BoardCard: React.FC<BoardCardProps> = ({ _id, bgChecker, bg, title }) => {
  const setModal = useSetAtom(getSetModal);
  const deleteBoard = async () => {
    setModal({
      isOpen: true,
      window: {
        type: 'delete',
        view: 'delete_board',
        data: {
          id: _id,
          text: title,
          entity: 'board',
        },
      },
    });
  };

  const redirectToBoard = () => {
    Router.push(`/board/${_id}`);
  };
  return (
    <div
      className="board__card colored"
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
    </div>
  );
};
export default BoardCard;
