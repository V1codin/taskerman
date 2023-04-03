import styled from 'styled-components';

export const StyledBoardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  background-color: unset;

  .board__card {
    position: relative;
    margin: 10px 0 0 15px;
    overflow: auto;

    cursor: pointer;
    width: 225px;
    height: 150px;
  }

  .card__error {
    left: 50%;
    top: -3%;
  }

  .board__card:hover {
    box-shadow: 0 0 15px var(--blue);
  }

  .board__card:active {
    background-color: red;
  }

  .card__btn {
    position: absolute;
    bottom: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 43px;
    overflow: auto;
  }

  .popup__btn:active {
    background-color: var(--aqua-active);
  }

  .btn_static {
    position: static;
  }

  .btn_ml10 {
    margin-left: 10px;
  }

  .btn {
    cursor: pointer;
    padding: 10px;
    width: 100%;
    background-color: var(--pale-green);
    border: none;
    color: var(--yellow);
    font-size: 1em;
    font-weight: 700;
    transition: 0.2s ease;
  }

  .btn:hover {
    background-color: #71c74f;
  }
  .btn:active {
    border-radius: 7px;
    background-color: var(--yellow);
    color: var(--pale-green);
  }
  .btn:focus {
    border: 1px dashed var(--pale-blue);
  }
`;
