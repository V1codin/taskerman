import ImageModule from '@/modules/image/Image';
import styled from 'styled-components';
import DefaultAccountImage from './DefaultAccountImage';

type AccountProps = {
  imageURL?: string;
  displayName?: string;
  username?: string;
  onToggle: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

const StyledAvatarButton = styled.button`
  width: 47px;
  height: 47px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

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
      className="avatar_btn colored"
      name="account"
      onClick={onToggle}
      data-drop-type="account"
    >
      {imageURL ? (
        <ImageModule src={imageURL} width={45} height={45} alt="User avarar" />
      ) : (
        <DefaultAccountImage userAliases={{ displayName, username }} />
      )}
    </StyledAvatarButton>
  );
};
export default Account;
