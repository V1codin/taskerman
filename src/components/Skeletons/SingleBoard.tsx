import cls from 'classnames';

import { SKELETON_CLASS_NAMES } from '@/utils/constants';

type SingleBoardProps = {};

const SingleBoard: React.FC<SingleBoardProps> = () => {
  return (
    <>
      <header className="flex">
        <h2
          className={cls(
            'w-[376px] laptop:w-[40vw] rounded-md h-11 mobile:h-[38px]',
            SKELETON_CLASS_NAMES,
          )}
        ></h2>
      </header>

      <section
        className="flex items-center
      fixed right-10 
      p-2 mx-1 
      top-[var(--header-height)] 
      z-[2900] 
      after:absolute
      after:content-['']
      after:block
      after:left-0
      after:w-full
      after:h-4
      after:bottom-[0.2rem]
      after:bg-transparent
      after:border-b
      after:border-l
      after:border-r
      after:border-pale-blue
      "
      >
        <div className="relative flex items-center max-w-[240px] overflow-hidden">
          <div
            className={cls(
              'rounded-[50%] w-[34px] h-[34px]',
              SKELETON_CLASS_NAMES,
            )}
          ></div>
          <span className="px-0 py-3 ml-1 border-l-[1px] border-solid !m-2 mobile:hidden"></span>
          <div
            className={cls(
              'rounded-[50%] w-[34px] h-[34px] mobile:hidden',
              SKELETON_CLASS_NAMES,
            )}
          ></div>
          <span className="px-0 py-3 ml-1 border-l-[1px] border-solid !m-2 mobile:hidden"></span>
          <div
            className={cls(
              'rounded-[50%] w-[34px] h-[34px] mobile:hidden',
              SKELETON_CLASS_NAMES,
            )}
          ></div>
          <span className="px-0 py-3 ml-1 border-l-[1px] border-solid !m-2"></span>
          <div
            className={cls('rounded-[7px] w-8 h-8', SKELETON_CLASS_NAMES)}
          ></div>
        </div>
      </section>
    </>
  );
};

export default SingleBoard;
