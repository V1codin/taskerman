import styled from 'styled-components';

type DefaultAccountImageProps = {
  userAliases: {
    displayName?: string;
    username?: string;
  };
};

const StyledImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4em;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.yellow};
  background-color: ${({ theme }) => theme.colors.gentleBlack};
`;

const DefaultAccountImage: React.FC<DefaultAccountImageProps> = ({
  userAliases: { displayName, username },
}) => {
  const content = displayName
    ? displayName.split(' ').reduce((acc, item) => {
        acc += item[0];

        return acc;
      }, '')
    : username
    ? username.split(' ').reduce((acc, item) => {
        acc += item[0];

        return acc;
      }, '')
    : 'N A';
  return <StyledImageContainer>{content}</StyledImageContainer>;
};

export default DefaultAccountImage;
