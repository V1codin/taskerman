import styled from 'styled-components';

export const StyledButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 15px;

  & .primary {
    min-width: 81px;
    min-height: 33px;
    font-weight: 500;
    border-radius: 7px;
    padding: 5px 10px;
    background-color: #42a185;
    color: ${({ theme }) => theme.colors.white};

    &:hover {
      background-color: #42c185;
    }

    &:active {
      box-shadow: unset;
    }

    &:disabled {
      border-radius: 7px;
    }

    @media (max-width: 1100px) {
      width: 100%;
      padding: 10px;
    }
  }
`;
