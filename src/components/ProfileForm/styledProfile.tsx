import styled from 'styled-components';

export const StyledProfile = styled.div`
  max-width: 980px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 470px;
  grid-column-gap: 30px;

  & h3 {
    padding: 5px;
  }

  & h4,
  h3 {
    width: 100%;
    text-align: center;
    border-radius: 5px;
    background-color: var(--black-aqua);
  }
  & h4,
  & .board_title {
    background-color: #333;
  }

  & .board_title {
    padding: 5px;
    color: #fff;
  }

  @media (max-width: 1100px) {
    display: block;
    max-width: 90%;
  }
`;

export const StyledInputContainer = styled.form`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  &:after {
    content: '';
    display: block;
    width: 105%;
    height: 15px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.blue};
    border-left: 1px solid ${({ theme }) => theme.colors.blue};
    border-right: 1px solid ${({ theme }) => theme.colors.blue};
  }

  & .position_left {
    margin: 10px 0 0 auto;
  }

  & .flex {
    display: flex;
    align-items: flex-end;
  }

  & .mr_10 {
    margin-right: 10px;
  }

  & .primary {
    min-width: 66px;
    min-height: 30px;
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

export const StyledInput = styled.input`
  margin-top: 15px;
  border-radius: 5px;
  background-color: #333333a1;
  width: 100%;

  color: #fffff4;
  padding: 10px;
  font-size: 0.9em;
  border: unset;
  border-bottom: 1px solid #e0fd4d;
  outline: none;

  &:invalid {
    border-color: red;
  }

  &:focus {
    border-color: #69abad;
  }
`;

export const StyledSubsContainer = styled.div`
  transition: transform 0.5s;
  width: auto;
  position: relative;
  max-height: 75vh;
  display: flex;
`;

export const StyledSub = styled.div`
  margin-top: 15px;
  width: 470px;
`;

export const StyledCard = styled.div`
  position: relative;
  border-radius: 5px;
  margin: 5px auto;
  width: 100%;
  min-height: 200px;
`;

export const StyledColumn_1 = styled.div`
  grid-column: 1/1;
`;

export const StyledColumn_2 = styled.div`
  overflow-x: hidden;
  padding-bottom: 250px;
  margin-bottom: -250px;
  grid-column: 2/2;
`;

export const StyledSubsMap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  & canvas {
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    z-index: 5000;

    &:hover {
      transform: scale(1.5);
    }
  }
`;
