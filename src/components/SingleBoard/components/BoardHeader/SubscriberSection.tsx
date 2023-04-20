// @ts-ignore
import ownerIco from '@/assets/owner.svg?url';
import ImageModule from '@/modules/image/Image';
import Avatar from '@/modules/avatar/Avatar';
import styled from 'styled-components';

import { IUser } from '@/models/users';

type SubscriberSectionProps = {
  members: IUser[];
  owner: IUser;
};

const StyledContainer = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 90px;
  margin-left: 5px;
  height: 35px;
`;

const StyledAvatarContainer = styled.section`
  position: relative;
  width: 27px;
  height: 27px;
  font-size: 12px;

  & .owner__icon {
    top: 20px;
    left: 15px;
  }
`;

const SubscriberSection: React.FC<SubscriberSectionProps> = ({
  members,
  owner,
}) => {
  return (
    <StyledContainer>
      <StyledAvatarContainer>
        <Avatar
          avatarHeight={25}
          avatarWidth={25}
          imageURL={owner.imageURL}
          className="border_round"
          displayName={owner.displayName}
          username={owner.username}
        />
        <ImageModule alt="owner icon" src={ownerIco} className="owner__icon" />
      </StyledAvatarContainer>
      {members.map(({ _id, imageURL, displayName, username }) => {
        return (
          <Avatar
            key={_id + Math.random()}
            avatarHeight={25}
            avatarWidth={25}
            imageURL={imageURL}
            className="border_round"
            displayName={displayName}
            username={username}
          />
        );
      })}
    </StyledContainer>
  );
};

export default SubscriberSection;
