// @ts-ignore
import deleteIco from '@/assets/plus.svg?url';
import cls from 'classnames';
import CloseButton from '@/modules/button/CloseButton';
import Link from 'next/link';

import { BOARD_TITLE_SLICE_INDEX } from '@/utils/constants';

import type { IBoard } from '@/models/boards';
import type { MouseEvent } from 'react';

const defaultContainerClasses = `relative mt-2 mr-0 mb-0 ml-4 overflow-auto cursor-pointer w-56 h-[150px] mobile:mx-[auto] mobile:w-3/4`;

type BoardCardProps = IBoard & {
  bgChecker: boolean;
  deleteBoard: (e: MouseEvent<HTMLButtonElement>) => void;
};

const BoardCard: React.FC<BoardCardProps> = ({
  _id,
  bgChecker,
  bg,
  title,
  deleteBoard,
}) => {
  return (
    <div
      className={cls(defaultContainerClasses, 'colored designed')}
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
      <CloseButton
        isBackgrounded={true}
        classNames="!top-1 !right-1 !w-5 !h-5 !p-1"
        click={deleteBoard}
        attrs={{
          name: _id,
        }}
        iconAttributes={{
          title: 'Delete the board',
        }}
      />
      <Link
        href={`/board/${_id}`}
        className="card__btn"
        title={`Go to the board ${title}`}
        prefetch={false}
      >
        {title.length >= BOARD_TITLE_SLICE_INDEX
          ? title.slice(0, BOARD_TITLE_SLICE_INDEX) + '...'
          : title}
      </Link>
    </div>
  );
};

export default BoardCard;
