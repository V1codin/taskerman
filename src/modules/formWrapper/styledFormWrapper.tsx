import styled from 'styled-components';

import { PartialContainerProps } from './FormWrapper';

export const StyledFormContainer = styled.div<{
  containerProps?: PartialContainerProps;
}>`
  width: ${({ theme, containerProps }) =>
    containerProps && containerProps.size
      ? theme.containerSizes[containerProps.size]
      : theme.containerSizes.default};
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

  & input {
    color: #fff;
    margin-top: 10px;
    width: 100%;
    padding: 10px;
    font-size: 0.9em;
    background-color: unset;
    border: unset;
    border-bottom: 1px solid var(--yellow);
    outline: none;

    &:focus,
    &:hover {
      &::placeholder {
        color: var(--yellow);
      }
    }

    &:invalid {
      border-color: red;
    }
  }

  & button {
    cursor: pointer;
    margin-top: 15px;
    padding: 10px;
    width: 100%;
    background-color: var(--pale-green);
    color: var(--yellow);
    font-size: 1em;
    font-weight: 700;
    transition: 0.2s ease;
  }

  .btn_secondary {
    background-color: #fff;
    border: 1px solid var(--monokai);
    color: var(--monokai);
  }

  .heading {
    color: var(--bright-green);
  }

  & a {
    margin-top: 15px;
    text-decoration: none;
    color: #fff;
  }

  .warning {
    font-weight: 600;
    margin-top: 5px;
    color: var(--pink);
  }

  .color-picker {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 10px;
  }

  .menu_linkBg {
    padding: 5px !important;
    margin-right: 0 !important;
    width: 32px;
    height: 32px;
    background-color: var(--black-aqua);
  }
  .color-picker__el {
    cursor: pointer;
    padding: 15px;

    border: 1px dashed transparent;
  }

  .add__list__btns {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 15px;
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
    color: var(--yellow);
  }

  .link:hover {
    text-decoration: underline;
  }

  .btn:hover {
    background-color: #71c74f;
  }

  .btn:active {
    background-color: var(--yellow);
    color: var(--pale-green);
  }
  .btn:focus {
    border: 1px dashed var(--pale-blue);
  }

  .input:focus {
    border-bottom: 1px solid var(--pale-blue);
  }

  .google__btn {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: #fff;
    color: #2727fe;
  }
  .google__btn:hover {
    background-color: #2727fe;
    color: #fff;
  }
`;
