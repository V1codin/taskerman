import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Children } from 'react';

import { useBodyColor } from '../../hooks/hooks';
import { BoardCard } from './BoardCard';
import { isLink } from '../../utils/helpers';

import deleteIco from '../../assets/plus.svg';

import './Profile.css';

const mapStateToProps = (state) => {
  return {
    isLogged: state.auth.isLogged,
    boards: state.boards,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

function RawProfile(props) {
  const { isLogged, boards, dispatch } = props;
  useBodyColor();

  if (isLogged === false) return <Redirect to="login" />;

  return (
    <div className="profile container">
      {Children.toArray(
        boards.map((board) => {
          const bgChecker = isLink(board.bg);

          const boardProps = {
            ...board,
            deleteIco,
            bgChecker,
            dispatch,
          };
          return <BoardCard {...boardProps} />;
        }),
      )}
    </div>
  );
}

const Profile = connect(mapStateToProps, mapDispatchToProps)(RawProfile);

export { Profile };
