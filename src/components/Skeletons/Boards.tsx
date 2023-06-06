type BoardsProps = {};

const Boards: React.FC<BoardsProps> = () => {
  return (
    <>
      <div className="skeleton_block skeleton_bg_l skeleton_bg_d relative mt-2 mr-0 mb-0 ml-4 w-56 h-[150px] designed mobile:mx-[auto] mobile:w-3/4">
        <div className="skeleton_block skeleton_bg_l skeleton_bg_d !absolute !top-1 !right-1 !w-5 !h-5 !p-1 rounded-[50%]"></div>
        <div className="skeleton_block skeleton_bg_l skeleton_bg_d w-full h-11 !absolute bottom-0 m-0"></div>
      </div>

      <div className="skeleton_block skeleton_bg_l skeleton_bg_d relative mt-2 mr-0 mb-0 ml-4 w-56 h-[150px] designed mobile:mx-[auto] mobile:w-3/4">
        <div className="skeleton_block skeleton_bg_l skeleton_bg_d !absolute !top-1 !right-1 !w-5 !h-5 !p-1 rounded-[50%]"></div>
        <div className="skeleton_block skeleton_bg_l skeleton_bg_d w-full h-11 !absolute bottom-0 m-0"></div>
      </div>
    </>
  );
};

export default Boards;
