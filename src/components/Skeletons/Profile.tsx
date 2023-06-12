import cls from 'classnames';

import { SKELETON_CLASS_NAMES } from '@/utils/constants';

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  return (
    <div
      className="max-w-[950px] 
      mx-auto my-0 grid 
      grid-cols-2 gap-x-6 
      laptop:block 
      laptop:w-auto
      laptop:px-10
      laptop:py-0
      "
    >
      <div className="col-span-1">
        <form
          className={cls(
            `flex 
        flex-col 
        justify-start 
        items-center
        after:content-['']
        after:block
        after:w-[105%]
        after:h-4
        after:border-b
        after:border-l
        after:border-r
        after:border-pale-blue
        laptop:m-0`,
          )}
        >
          <h3
            className={cls(
              `w-full
              h-9
              p-1
              rounded-md 
              `,
              SKELETON_CLASS_NAMES,
            )}
          ></h3>
          <div
            className={cls(
              `mt-4 rounded-md 
          h-[41px] 
        bg-alpha-black 
          w-full
          p-2
          border-b 
          border-b-yellow`,
              SKELETON_CLASS_NAMES,
            )}
          ></div>
          <div
            className={cls(
              `min-w-[79px] h-[34px]
            rounded-md
            py-1 px-3
            mt-2
            mr-0
            mb-0
            ml-auto
            laptop:w-full
            laptop:p-2
            laptop:h-[42px]
            `,
              SKELETON_CLASS_NAMES,
            )}
          ></div>
        </form>
        <form
          className="mt-4 flex 
      flex-col 
      justify-start 
      items-center
      after:content-['']
      after:block
      after:w-[105%]
      after:h-4
      after:border-b
      after:border-l
      after:border-r
      after:border-pale-blue
      "
        >
          <h3
            className={cls(
              `w-full 
                p-1
                h-9
                rounded-md`,
              SKELETON_CLASS_NAMES,
            )}
          ></h3>
          <div
            className={cls(
              `mt-4 rounded-md 
          h-[41px] 
        bg-alpha-black 
          w-full
          p-2
          border-b 
          border-b-yellow`,
              SKELETON_CLASS_NAMES,
            )}
          ></div>

          <div className="flex items-end relative mt-2 mr-0 mb-0 ml-auto laptop:w-full">
            <div
              className={cls(
                `mr-2 laptop:absolute 
                rounded-md
                w-[34px]
                h-[34px]
              laptop:-top-[46px] laptop:right-1
              laptop:m-0`,
                SKELETON_CLASS_NAMES,
              )}
            />
            <div
              className={cls(
                `min-w-[79px] h-[33px]
              rounded-md
              py-1 px-3
              mt-2
              mr-0
              mb-0
              ml-auto
              laptop:w-full
              laptop:p-2
              laptop:h-[42px]`,
                SKELETON_CLASS_NAMES,
              )}
            ></div>
          </div>
        </form>
      </div>
      <div
        className="overflow-x-hidden 
      pb-64 mb-[-256px] col-span-1 
      laptop:overflow-x-visible 
      laptop:pb-0 laptop:mb-0 laptop:mt-4
      "
      >
        <div>
          <h3
            className={cls(
              `w-full
                h-9
                p-1
                rounded-md 
                `,
              SKELETON_CLASS_NAMES,
            )}
          ></h3>
          <div className="w-full flex justify-between items-center mt-2 laptop:hidden h-[100px]">
            <div
              datatype-name="LEFT_BUTTON"
              className={cls(
                'relative left-[2px] top-0 p-0 w-6 h-6',
                SKELETON_CLASS_NAMES,
              )}
            ></div>
            <div datatype-name="CANVAS_CONTAINER" className="relative">
              <div
                className={cls(
                  `rounded-[50%] w-[70px] h-[70px] bg-monokai absolute top-0`,
                  SKELETON_CLASS_NAMES,
                )}
              ></div>
              <div
                className="absolute top-0 left-0 rounded-[50%] 
              w-[55px] h-[55px] bg-black-aqua translate-y-[15%] translate-x-[15%]"
              ></div>
            </div>
            <div
              datatype-name="RIGHT_BUTTON"
              className={cls(
                'relative right-[2px] top-0 p-0 w-6 h-6',
                SKELETON_CLASS_NAMES,
              )}
            ></div>
          </div>

          <div
            className={cls(
              `mt-2  
                relative 
                desktop:mt-2 
                laptop:block 
                laptop:w-full
                grid
                grid-flow-col
                auto-cols-[465px]`,
            )}
          >
            <div
              className="w-[465px] laptop:mt-2 laptop:w-full 
                laptop:flex
                laptop:flex-col
                laptop:items-center
                laptop:overflow-visible
                laptop:after:content-['']
                laptop:after:block
                laptop:after:w-[105%]
                laptop:after:h-4
                laptop:after:border-b
                laptop:after:border-l
                laptop:after:border-r
                laptop:after:border-pale-blue
                "
            >
              <h4
                className={cls(
                  `rounded-md bg-[#333] flex self-start h-8
                min-w-[40%]
                px-3 py-1 w-full
                laptop:w-fit
                laptop:self-start`,
                  SKELETON_CLASS_NAMES,
                )}
              ></h4>
              <div
                className={cls(
                  `relative rounded 
                  flex
                mx-auto my-1 w-full 
                min-h-[200px] laptop:min-h-[45px]`,
                  SKELETON_CLASS_NAMES,
                )}
              >
                <div
                  datatype-name="ELLIPSIS_BUTTON"
                  className={cls(
                    `laptop:hidden !absolute top-2 right-3 p-0 w-[26px] h-[26px] rounded-md`,
                    SKELETON_CLASS_NAMES,
                  )}
                ></div>
                <div
                  datatype-name="LAPTOP_BUTTONS"
                  className={cls(
                    `hidden laptop:block w-[42px] h-[45px]`,
                    SKELETON_CLASS_NAMES,
                  )}
                ></div>
                <div
                  datatype-name="LAPTOP_BUTTONS"
                  className={cls(
                    `hidden laptop:block w-[42px] h-[45px]`,
                    SKELETON_CLASS_NAMES,
                  )}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
