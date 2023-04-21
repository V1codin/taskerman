import CloseBtn from '@/modules/button/CloseBtn';

import { isLink } from '@/utils/helpers';
import {
  StyledCard,
  StyledInputContainer,
  StyledSub,
  StyledSubsContainer,
} from '../../styledProfile';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  getSetModal,
  userStateAtom,
  boardsStateAtom,
} from '@/context/stateManager';
import type { MouseEvent } from 'react';

type SubsProps = {};

const Subs: React.FC<SubsProps> = () => {
  const subs = useAtomValue(boardsStateAtom);
  const setModal = useSetAtom(getSetModal);
  const user = useAtomValue(userStateAtom);

  return (
    <StyledInputContainer>
      <h3>Subs</h3>
      <StyledSubsContainer>
        {subs.map((board) => {
          const bgChecker = isLink(board.bg);

          const deleteBoard = async (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            const modalMessage =
              user?._id === board.owner._id
                ? 'Delete the board, titled'
                : 'Unsubscribe from the board';

            setModal({
              isOpen: true,
              window: {
                type: 'delete',
                view: 'delete_board',
                data: {
                  id: board._id,
                  children: (
                    <h3>
                      {modalMessage} -{' '}
                      <span style={{ color: 'red' }}>{board.title}</span> ?
                    </h3>
                  ),
                  entity: 'board',
                },
              },
            });
          };

          const style = bgChecker
            ? {
                backgroundImage: `url(${board.bg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }
            : { background: board.bg };

          return (
            <StyledSub key={board._id}>
              <h4>{board.title}</h4>
              <StyledCard
                style={{
                  ...style,
                }}
              >
                <CloseBtn
                  attrs={{
                    onClick: deleteBoard,
                    name: board._id,
                  }}
                  iconProps={{
                    title: 'Delete the board',
                  }}
                />
              </StyledCard>
            </StyledSub>
          );
        })}
      </StyledSubsContainer>
    </StyledInputContainer>
  );
};

export default Subs;
