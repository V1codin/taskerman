import styled from 'styled-components';

import { PartialContainerProps } from './FormWrapper';

export const StyledFormContainer = styled.div<{
  containerProps: PartialContainerProps;
}>`
  width: ${({ theme, containerProps }) =>
    containerProps.customWidth
      ? containerProps.customWidth
      : containerProps.width
      ? theme.formWidth[containerProps.width]
      : theme.formWidth.default};
  margin: 0 auto;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;

  padding: 20px 30px;
  text-align: center;

  .loading {
    padding: 0;
    border-radius: 50%;
  }

  & h2 {
    font-size: 1.2em;
  }

  .input {
    color: ${({ theme }) => theme.colors.white};
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    font-size: 0.9em;
    background-color: unset;
    border: unset;
    border-bottom: 1px solid ${({ theme }) => theme.colors.yellow};
    outline: none;

    &:focus,
    &:hover {
      &::placeholder {
        color: ${({ theme }) => theme.colors.yellow};
      }
    }

    &:invalid {
      border-color: red;
    }
  }

  & button {
    cursor: pointer;
    font-size: 1em;
    font-weight: 700;
    transition: 0.2s ease;
  }

  .heading {
    color: ${({ theme }) => theme.colors.brightGreen};
  }

  & a {
    margin-top: 15px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.white};
  }

  .warning {
    font-weight: 600;
    margin-top: 5px;
    color: ${({ theme }) => theme.colors.red};
  }

  .color-picker {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 10px;
  }

  .color-picker__el {
    cursor: pointer;
    padding: 15px;

    border: 1px dashed transparent;
  }

  .add__list__btns {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 15px;

    & .primary {
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
    }
  }
  .add__list__input {
    width: 100%;
    height: 35px;
  }

  .color-picker > li {
    margin-left: 10px;
  }
  .color-picker > li:first-of-type {
    margin-left: 0;
  }
  .link:active {
    color: ${({ theme }) => theme.colors.yellow};
  }

  .link:hover {
    text-decoration: underline;
  }

  .btn {
    width: 100%;
    margin-top: 15px;
    height: 43px;
    padding: 10px;
  }

  .btn_primary {
    box-shadow: none;

    background-color: ${({ theme }) => theme.colors.paleGreen};
    color: ${({ theme }) => theme.colors.yellow};
  }

  .btn_secondary {
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gentleBlack};
    color: ${({ theme }) => theme.colors.gentleBlack};
  }

  .btn:hover {
    background-color: #71c74f;
  }

  .btn:active {
    background-color: ${({ theme }) => theme.colors.yellow};
    color: ${({ theme }) => theme.colors.paleGreen};
  }
  .btn:focus {
    border: 1px dashed ${({ theme }) => theme.colors.paleBlue};
  }

  .input:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.paleBlue};
  }

  .google__btn {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: ${({ theme }) => theme.colors.white};
    color: #2727fe;
  }
  .google__btn:hover {
    background-color: #2727fe;
    color: ${({ theme }) => theme.colors.white};
  }
`;
