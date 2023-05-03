import ListBody from './ListBody';

import { getListsFromSingleBoardState } from '@/context/stateManager';
import { useAtomValue } from 'jotai';
import { StyledList } from './styledList';

type ListsProps = {};

const Lists: React.FC<ListsProps> = () => {
  const lists = useAtomValue(getListsFromSingleBoardState);

  return (
    <>
      {lists.map((item) => {
        return (
          <StyledList className="colored" key={item._id}>
            <ListBody list={item} />
          </StyledList>
        );
      })}
    </>
  );
};

export default Lists;
