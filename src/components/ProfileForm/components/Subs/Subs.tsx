import { isLink } from '@/utils/helpers';
import {
  StyledCard,
  StyledInputContainer,
  StyledSub,
  StyledSubsContainer,
} from '../../styledProfile';
import { useAtomValue } from 'jotai';
import { userSubsAtom } from '@/context/stateManager';

type SubsProps = {};

const Subs: React.FC<SubsProps> = () => {
  const subs = useAtomValue(userSubsAtom);

  return (
    <StyledInputContainer>
      <h3>Subs</h3>
      <StyledSubsContainer>
        {subs.map((board, index) => {
          const bgChecker = isLink(board.bg);

          const style = bgChecker
            ? {
                backgroundImage: `url(${board.bg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }
            : { background: board.bg };

          return (
            <StyledSub key={Math.random() * 100 + index}>
              <h4>{board.title}</h4>
              <StyledCard
                style={{
                  ...style,
                }}
              ></StyledCard>
            </StyledSub>
          );
        })}
      </StyledSubsContainer>
    </StyledInputContainer>
  );
};

export default Subs;
