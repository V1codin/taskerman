import BoardsContainer from '@/components/BoardsContainer/BoardsContainer';

import { boardsStateAtom } from '@/context/stateManager';
import { useAtomValue } from 'jotai';

export default function Boards() {
  const clientBoards = useAtomValue(boardsStateAtom);

  return (
    <>{clientBoards.length > 0 && <BoardsContainer boards={clientBoards} />}</>
  );
}
