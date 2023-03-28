import { useContext } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ParentRefContext } from '../../';
import { auth } from '../../../../../api/auth.api';
import { useOuterCLick } from '../../../../../hooks/hooks';

import { UserInfo } from '../../../../../modules/userInfo';
import { DropDown } from '../../../../../modules/dropdown';

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.user,
  };
};

const PopupBody = (props) => {
  const { logoutHandler, ...res } = props;

  return (
    <>
      <li className="list__body_mt5">
        <UserInfo {...res} />
      </li>
      <li className="list__body_mt5">
        <button className="popup__body__el" onClick={logoutHandler}>
          <span className="el__span">Log out</span>
        </button>
      </li>
    </>
  );
};

function RawAccountDrop(props) {
  const { toggle, dispatch, userInfo } = props;

  const parentRef = useContext(ParentRefContext);
  const history = useHistory();

  const click = () => {
    history.push('/');
    toggle();
  };

  useOuterCLick(parentRef, toggle);

  const logoutHandler = async () => {
    try {
      await auth.logout(dispatch);
    } catch (e) {
      console.log('Logout error', e);
    }
  };

  const dropProps = {
    toggle,
    heading: 'Account',
    classList: ['account'],
    popupBody: PopupBody({ ...userInfo, click, logoutHandler }),
  };

  return <DropDown {...dropProps} />;
}
const AccountDrop = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RawAccountDrop);

export { AccountDrop };
