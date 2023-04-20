import BoardCard from './BoardCard';

import { isLink } from '@/utils/helpers';
import { StyledBoardContainer } from './styledBoardContainer';
import { IBoard } from '@/models/boards';

type BoardContainerProps = {
  boards: IBoard[];
};

const BoardsContainer: React.FC<BoardContainerProps> = ({ boards }) => {
  return (
    <StyledBoardContainer>
      {boards.map((board, index) => {
        const bgChecker = isLink(board.bg);

        const boardProps = {
          ...board,
          bgChecker,
        };
        return <BoardCard {...boardProps} key={Math.random() * 100 + index} />;
      })}
    </StyledBoardContainer>
  );
};

export default BoardsContainer;
