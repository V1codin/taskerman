type SingleBoardProps = {};

const SingleBoard: React.FC<SingleBoardProps> = () => {
  return (
    <>
      <header className="flex">
        <h2 className="w-[376px] laptop:w-[50vw] rounded-md skeleton_block skeleton_bg_l skeleton_bg_d h-11"></h2>
      </header>

      <section
        className="flex items-center
      fixed right-14
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
      mobile:right-4 
      laptop:right-4 
      "
      >
        <div className="relative p-2 flex items-center w-[204px] mx-2 overflow-hidden mobile:w-12">
          <div className="skeleton_block skeleton_bg_l skeleton_bg_d rounded-[50%] w-8 h-8"></div>
          <span className="px-0 py-3 ml-1 border-l-2 border-solid !m-2 mobile:hidden"></span>
          <div className="skeleton_block skeleton_bg_l skeleton_bg_d rounded-[50%] w-8 h-8 mobile:hidden"></div>
          <span className="px-0 py-3 ml-1 border-l-2 border-solid !m-2 mobile:hidden"></span>
          <div className="skeleton_block skeleton_bg_l skeleton_bg_d rounded-[50%] w-8 h-8 mobile:hidden"></div>
          <span className="px-0 py-3 ml-1 border-l-2 border-solid !m-2 mobile:hidden"></span>
          <div className="skeleton_block skeleton_bg_l skeleton_bg_d rounded-[50%] w-8 h-8 mobile:hidden"></div>
        </div>
      </section>
    </>
  );
};

export default SingleBoard;
