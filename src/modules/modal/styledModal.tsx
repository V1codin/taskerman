import styled from 'styled-components';

export const StyledModalContainer = styled.section`
  position: absolute;
  top: 0;
  left: 0;
`;

export const StyledModalOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #3a3a3ab3;
`;

export const StyledModalContent = styled.div`
  position: absolute;
  min-width: 330px;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
`;

export const StyledCloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    transform: rotate(45deg);
  }

  &:hover > img {
    transform: rotate(45deg) scale(1.1);
  }

  &:active > img {
    transform: rotate(45deg) scale(1);
  }
`;
