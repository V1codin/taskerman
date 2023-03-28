import styled from 'styled-components';

export const StyledHeader = styled.header`
  z-index: 6000;
  min-height: 65px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px;
  position: relative;

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

  .userSection {
    display: flex;
    align-items: center;
    position: fixed;
    right: 40px;
    z-index: 7000;
  }

  button:focus {
    border: 1px solid var(--pale-blue);
    box-shadow: none;
  }

  .active {
    background-color: unset !important;
  }

  .active button {
    color: #21e421 !important;
  }
`;
