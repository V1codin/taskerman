import styled from 'styled-components';

export const StyledConfirmButtonsWrapper = styled.div`
  padding: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  & button {
    box-shadow: none;
    margin: 0;
  }

  .btn_secondary {
    margin-left: 10px;
    background-color: ${({ theme }) => theme.colors.gentleBlack};
    color: ${({ theme }) => theme.colors.blue};

    &:hover {
      background-color: ${({ theme }) => theme.colors.darkGrey};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.yellow};
    }
  }
`;
