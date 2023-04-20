import styled from 'styled-components';

export const StyledProfile = styled.div`
  max-width: 980px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  grid-column-gap: 25px;

  & h4,
  h3 {
    width: 100%;
    text-align: center;
    border-radius: 5px;
    background-color: var(--black-aqua);
    padding: 5px;
  }

  & h4 {
    color: #fff;
    background-color: #333;
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
  // padding-bottom: 5px;

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

    @media (max-width: 1100px) {
      width: 100%;
      padding: 10px;
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
  display: block;
  width: 100%;
  overflow: auto;
`;

export const StyledSub = styled.div`
  margin-top: 15px;
`;

export const StyledCard = styled.div`
  border-radius: 5px;
  margin: 5px auto;
  cursor: pointer;
  width: 100%;
  min-height: 200px;
`;

export const StyledColumn_1 = styled.div`
  grid-column: 1/1;
`;

export const StyledColumn_2 = styled.div`
  grid-column: 2/2;
`;
