import styled from 'styled-components';

export const StyledDropDown = styled.div`
  position: absolute;
  z-index: 8000;
  padding-bottom: 5px;
  top: 60px;
  right: 10px;
  min-width: 200px;

  .popup__header {
    position: relative;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    background-color: ${({ theme }) => theme.colors.darkGrey};

    padding: 10px;
    text-align: center;
  }
  .popup__header,
  .body_shape {
    border-bottom: 1px solid var(--blue);
  }

  .popup__article {
    grid-column: 2;
    color: var(--pale-green);
  }

  .body_shape {
    list-style-type: none;
    padding: 5px;
  }

  .body_shape {
    border-bottom: 1px solid var(--blue);
  }

  .popup__body {
    font-size: 0.8em;
  }

  .popup__body__el {
    display: flex;
    align-items: center;
    width: 100%;
    text-align: start;
    font-size: 1em;
    color: #fff;
    cursor: pointer;
    padding: 10px 5px;
    border: 1px solid transparent;

    & > img ~ span {
      margin-left: 5px;
    }
  }

  .list__body_mt5 {
    margin-top: 5px;
  }

  .el__span {
    font-size: 1.1em;
    font-weight: 700;
    font-style: italic;

    text-align: inherit;
  }
  .el__article {
    margin-top: 3px;
  }

  .popup__body__el:hover {
    background-color: var(--hover-blue);
  }

  .popup__body__el:active {
    background-color: var(--aqua-active);
  }

  .list__body_mt5 * {
    text-align: start;
  }

  .add,
  .account {
    min-width: 300px;
  }
  .note {
    width: 450px;
    height: 300px;

    overflow: auto;
  }

  .note > header {
    position: sticky;
    top: 0;
    background-color: var(--monokai);
    z-index: 500;
  }

  .info__image {
    width: 350px;
    height: 200px;
  }
  .account__el {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-left: 15px;
  }

  .body_row {
    display: flex;
    align-items: center;
  }

  .ta_center {
    text-align: center;
  }

  button:focus {
    border-color: transparent;
    box-shadow: none;
  }
`;
