import styled from 'styled-components';
import Avatar from '@/modules/avatar/Avatar';

type AccountProps = {
  imageURL?: string;
  displayName?: string;
  username?: string;
  onToggle: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const StyledAvatarButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gentleBlack};

  & > img {
    border-radius: 50%;
  }

  &:active {
    background-color: var(--aqua-active);
    box-shadow: none;
  }
`;

const Account: React.FC<AccountProps> = ({
  imageURL,
  displayName,
  username,
  onToggle,
}) => {
  return (
    <StyledAvatarButton
      className="avatar__btn"
      name="account"
      onClick={onToggle}
      data-drop-type="account"
    >
      <Avatar
        displayName={displayName}
        imageURL={imageURL}
        username={username}
      />
    </StyledAvatarButton>
  );
};
export default Account;
