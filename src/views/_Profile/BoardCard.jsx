import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useAsyncCallback } from 'react-async-hook';
import { board } from '../../api/board.api';

import { Process } from '../../modules/process';
import { useState } from 'react';
import { ErrorBlock } from '../../modules/error';

function BoardCard(props) {
  const { _id, bg, deleteIco, title, bgChecker, dispatch } = props;
  const navLinkRef = useRef(null);
  const [errorState, setErrorState] = useState({
    message: '',
    errorClass: '',
  });

  const timer = useRef();

  const deleteBoardHandler = async (e) => {
    try {
      const { name } = e.target;
      await board.delete(name, dispatch);
    } catch (e) {
      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        setErrorState(() => {
          return {
            message: '',
            errorClass: '',
          };
        });
      }, 3000);
      setErrorState(() => {
        return {
          message: e.message,
          errorClass: 'card__error',
        };
      });
      console.log('delete board err ', e);
    }
  };

  const { execute, loading } = useAsyncCallback(deleteBoardHandler);

  const boardRedirect = (e) => {
    navLinkRef.current.click();
  };

  return loading ? (
    <div className="board__card centeredContainer">
      <Process isShown={loading} />
    </div>
  ) : (
    <div
      className="board__card card_design"
      name={_id}
      style={
        bgChecker
          ? {
              backgroundImage: `url(${bg})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }
          : { background: bg }
      }
      title={title}
    >
      {errorState.message && <ErrorBlock {...errorState} />}
      <NavLink to={`/board/${_id}`} ref={navLinkRef} hidden></NavLink>
      <button className="close__btn" onClick={execute} name={_id}>
        <img
          src={deleteIco}
          name={_id}
          alt="delete"
          className="menu__ico board__ico"
          title="Delete the board"
          draggable={false}
        />
      </button>
      <button
        className="form__btn card__btn"
        title="Go to the board"
        onClick={boardRedirect}
      >
        {title}
      </button>
    </div>
  );
}

export { BoardCard };

/*

? prev

import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAsyncCallback } from "react-async-hook";
import { board } from "../../api/board.api";

import { Process } from "../../modules/process";

function BoardCard(props) {
  const { _id, bg, deleteIco, title, bgChecker, dispatch } = props;
  const navLinkRef = useRef(null);

  const deleteBoardHandler = async (e) => {
    try {
      const { name } = e.target;
      await board.delete(name, dispatch);
    } catch (e) {
      console.log("delete board err ", e);
    }
  };

  const { execute, loading } = useAsyncCallback(deleteBoardHandler);

  const boardRedirect = (e) => {
    navLinkRef.current.click();
  };

  return loading ? (
    <div className="board__card card_design">
      <Process isShown={loading} />
    </div>
  ) : (
    <div
      className="board__card card_design"
      name={_id}
      style={
        bgChecker
          ? {
              backgroundImage: `url(${bg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }
          : { background: bg }
      }
      title={title}
    >
      <NavLink to={`/board/${_id}`} ref={navLinkRef} hidden></NavLink>
      <button className="close__btn" onClick={execute} name={_id}>
        <img
          src={deleteIco}
          name={_id}
          alt="delete"
          className="menu__ico board__ico"
          title="Delete the board"
          draggable={false}
        />
      </button>
      <button
        className="form__btn card__btn"
        title="Go to the board"
        onClick={boardRedirect}
      >
        {title}
      </button>
    </div>
  );
}

export { BoardCard };



*/
