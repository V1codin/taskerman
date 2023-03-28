import BoardHeader from './components/boardHeader/BoardHeader';

import { ListsWrapper } from './components/lists';
import { AddForm } from './components/addForm';

import { StyledBoardCard } from './styledBoardCard';

type BoardCardProps = {
  id: string;
};

const Board: React.FC<BoardCardProps> = ({ id }) => {
  return (
    <StyledBoardCard className="boards">
      {/* <BoardHeader _boardId={id} /> */}

      {/* 
      <div className="container">
        <ListsWrapper _boardId={id} />
        <AddForm _boardId={id} />
      </div>
       */}
    </StyledBoardCard>
  );
};
export default Board;
