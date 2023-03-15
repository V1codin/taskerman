import styled from 'styled-components';

export const StyledHeader = styled.header`
  z-index: 6000;
  min-height: 65px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px;

  .header__link {
    margin-left: 15px;
    border-radius: 20px;
    text-decoration: none;
  }

  & h1 {
    cursor: pointer;
    color: #ccc;
    font-family: 'Roboto Condensed';
    font-weight: 300;
    font-style: italic;
    transition: 0.3s;
    text-shadow: 2px 2px 10px #000000;

    /* * gradient for text */
    background: -webkit-linear-gradient(var(--blue), var(--yellow));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    &:hover {
      text-shadow: 2px 2px 10px #cecece;
    }
  }

  .header__log {
    display: flex;
    margin-right: 20px;
  }
  .log__btn {
    font-size: 1em;
    font-weight: 700;
    color: var(--yellow);
    padding: 10px;
    margin-right: 5px;
  }
  .log__btn_sign {
    color: #ffffff;
    margin-right: 0;
    border-radius: 7px;
    border: 1px dashed transparent;
    transition: 0.3s;
  }

  .userSection {
    display: flex;
    align-items: center;
    position: fixed;
    right: 40px;
    z-index: 7000;
  }

  .log__btn:hover {
    text-decoration: underline;
  }
  .log__btn_sign:hover {
    text-decoration: none;
    background-color: #4343ff;
  }

  *:focus {
    border-bottom: 1px dashed var(--pale-blue);
    box-shadow: none;
  }
  button:focus {
    border-radius: 7px;
  }

  .active {
    background-color: unset !important;
  }

  .active button {
    color: #21e421 !important;
  }
`;
