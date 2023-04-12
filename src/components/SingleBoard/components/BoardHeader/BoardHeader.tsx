import Divider from '@/modules/divider/Divider';
import SubscriberSection from './SubscriberSection';
import styled from 'styled-components';

import { IUser } from '@/models/users';

type BoardHeaderProps = {
  title: string;
  boardMembers: IUser[];
  owner: IUser;
};

const StyledSection = styled.section``;

const StyledBoardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  box-shadow: unset;
  position: fixed;
  right: 55px;
  top: 67px;
  z-index: 5500;

  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.brightBlue};
  padding: 5px;
`;

const BoardHeader: React.FC<BoardHeaderProps> = ({
  title,
  boardMembers,
  owner,
}) => {
  return (
    <StyledSection>
      <StyledBoardContainer className="colored">
        <h4 className="unselectable" title="Board name">
          {title}
        </h4>
        <Divider />
        <SubscriberSection members={boardMembers} owner={owner} />
        <Divider />
        {/* {currentUser === ownerId ? (
          <Invite ownerId={ownerId} boardId={_id} />
        ) : null} */}
      </StyledBoardContainer>
    </StyledSection>
  );
};
export default BoardHeader;
