import BoardsContainer from '@/components/BoardsContainer/BoardsContainer';

import { getSetBoardsState } from '@/context/stateManager';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { useLayoutEffect } from 'react';

export default function Boards() {
  const { data, status } = useSession();
  const [boards, setBoards] = useAtom(getSetBoardsState);

  useLayoutEffect(() => {
    if (data && data?.user) {
      setBoards(data.user.subs);
    }
  }, [data, setBoards]);

  if (status !== 'authenticated') return null;

  return <>{boards.length > 0 && <BoardsContainer boards={boards} />}</>;
}
