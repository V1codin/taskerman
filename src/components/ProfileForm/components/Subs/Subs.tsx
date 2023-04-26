import SingleSub from './SingleSub';
import SubsMap from './SubsMap';

import { StyledInputContainer, StyledSubsContainer } from '../../styledProfile';
import { useAtomValue } from 'jotai';
import {
  boardsStateAtom,
  getSetProfileSubsActiveAtom,
} from '@/context/stateManager';

type SubsIteratorProps = {};

const SubsIterator: React.FC<SubsIteratorProps> = () => {
  const subs = useAtomValue(boardsStateAtom);
  const translate = useAtomValue(getSetProfileSubsActiveAtom);

  return (
    <StyledSubsContainer
      style={{
        transform: `translate(${translate.coords}px, 0)`,
      }}
    >
      {subs.map((board) => {
        return <SingleSub board={board} key={board._id} />;
      })}
    </StyledSubsContainer>
  );
};

type SubsProps = {};

const Subs: React.FC<SubsProps> = () => {
  return (
    <StyledInputContainer>
      <h3>Subs</h3>
      <SubsMap />
      <SubsIterator />
    </StyledInputContainer>
  );
};

export default Subs;
