import styled from 'styled-components';

type DefaultAccountImageProps = {
  userAliases: {
    displayName?: string;
    username?: string;
  };
};

const StyledImageContainer = styled.span`
  text-align: center;
  font-size: 1.4em;
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
