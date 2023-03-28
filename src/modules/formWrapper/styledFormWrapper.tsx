import styled from 'styled-components';

export const StyledFormContainer = styled.div`
  max-width: 330px;
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

  .form__heading {
    color: var(--bright-green);
  }

  & a {
    margin-top: 15px;
    text-decoration: none;
    color: #fff;
  }

  .form__warning {
    font-weight: 600;
    margin-top: 5px;
    color: var(--pink);
  }

  .form__colorPicker {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 10px;
  }
  .menu_linkBg {
    padding: 5px !important;
    margin-right: 0 !important;
  }
  .colorPicker__el {
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

  .form__colorPicker > li {
    margin-left: 10px;
  }
  .form__colorPicker > li:first-of-type {
    margin-left: 0;
  }
  .form__link:active {
    color: var(--yellow);
  }

  .form__link:hover {
    text-decoration: underline;
  }

  .form__btn:hover {
    background-color: #71c74f;
  }

  .form__btn:active {
    background-color: var(--yellow);
    color: var(--pale-green);
  }
  .form__btn:focus {
    border: 1px dashed var(--pale-blue);
  }

  .form__input:focus {
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
