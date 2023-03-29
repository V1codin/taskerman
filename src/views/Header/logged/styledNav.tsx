import styled from 'styled-components';

export const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  position: fixed;
  right: 40px;
  z-index: 7000;

  .menu__btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 15px;
    padding: 7px;
    border-radius: 5px;
    box-shadow: 0 0 5px var(--yellow);
    transition: 0.2s ease;
    background-color: var(--black-aqua_op);
    border: 1px dashed transparent;
  }

  .active {
    background-color: var(--aqua-active);
    box-shadow: none;
    border: 1px solid var(--pale-blue);
  }

  .badges {
    position: absolute;

    top: -10px;
    right: -10px;
    width: 17px;
    height: 17px;
    font-size: 0.9em;
    font-weight: bold;
    color: var(--pale-green);
    background-color: var(--pink);

    overflow: hidden;

    border-radius: 50%;
  }

  .menu__btn:hover {
    box-shadow: 0 0 15px var(--blue);
  }
  .menu__btn:active {
    background-color: var(--aqua-active);
    box-shadow: none;
  }

  .menu__ico {
    width: 20px;
    height: 20px;
  }
`;
