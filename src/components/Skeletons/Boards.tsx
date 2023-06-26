import cls from 'classnames';

import { SKELETON_CLASS_NAMES } from '@/utils/constants';

type BoardsProps = {};

const Boards: React.FC<BoardsProps> = () => {
  return (
    <>
      <div
        className={cls(
          'relative mt-2 mr-0 mb-0 ml-4 w-56 h-[150px] designed mobile:mx-[auto] mobile:w-3/4',
          SKELETON_CLASS_NAMES,
        )}
      >
        <div
          className={cls(
            '!absolute !top-1 !right-1 !w-5 !h-5 !p-1 rounded-[50%]',
            SKELETON_CLASS_NAMES,
          )}
        ></div>
        <div
          className={cls(
            'w-full h-11 !absolute bottom-0 m-0',
            SKELETON_CLASS_NAMES,
          )}
        ></div>
      </div>

      <div
        className={cls(
          'relative mt-2 mr-0 mb-0 ml-4 w-56 h-[150px] designed mobile:mx-[auto] mobile:w-3/4',
          SKELETON_CLASS_NAMES,
        )}
      >
        <div
          className={cls(
            '!absolute !top-1 !right-1 !w-5 !h-5 !p-1 rounded-[50%]',
            SKELETON_CLASS_NAMES,
          )}
        ></div>
        <div
          className={cls(
            'w-full h-11 !absolute bottom-0 m-0',
            SKELETON_CLASS_NAMES,
          )}
        ></div>
      </div>
    </>
  );
};

export default Boards;
