'use client';

// @ts-ignore
import edit from '@/assets/edit.svg?url';
import ButtonWithIcon from '@/modules/button/ButtonWithIcon';

import { useBackGround } from '@/hooks/useBackGround';
import { IBoard } from '@/models/boards';
import ImageModule from '@/modules/image/Image';

type BoardProps = {
  board?: IBoard | null;
};

const Board: React.FC<BoardProps> = ({ board }) => {
  useBackGround(board?.bg);

  const toggleDropDown = () => {};

  if (!board) return null;
  return (
    <>
      <header className="flex">
        <h2 className="text-3xl bg-monokai w-fit rounded-md p-1">
          {board.title}
        </h2>
        <ButtonWithIcon
          classNames="hover:scale-110"
          attrs={{
            name: 'edit',
            title: 'Edit board',
            onClick: toggleDropDown,
          }}
        >
          <ImageModule src={edit} alt="info" height={20} width={20} />
        </ButtonWithIcon>
      </header>
    </>
  );
};

export default Board;
