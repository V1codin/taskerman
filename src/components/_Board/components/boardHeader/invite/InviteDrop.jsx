import React from 'react';

import { useState, useEffect } from 'react';

import { useDebouncedFetch } from '../../../../../hooks/hooks';

import { auth } from '../../../../../api/auth.api';
import { board } from '../../../../../api/board.api';

import { Button } from '../../../../../modules/button';
import { FormWrapper } from '../../../../../modules/formWrapper';
import { DropDown } from '../../../../../modules/dropdown';
import { InnerList } from './InnerList';

// TODO to avoid many re-renders make decompose
// TODO create redux state for checkbox values

// ! TO DO SUBMIT BUTTON

const PopupBody = (props) => {
  const {
    toggle,
    changeHandler,
    requestUsersState,
    loading,
    ownerId,
    boardId,
    requestUsersState: { users, value }
  } = props;

  const [checks, setChecks] = useState({});

  const buttonProps = {
    submit: async () => {
      const members = Object.entries(checks).reduce((ac, item) => {
        const [id, isOn] = item;
        if (isOn) ac.push(id);

        return ac;
      }, []);

      if (!members.length) return;

      try {
        const data = { members, type: 'subscribe' };

        await board.patch({ boardId, data });
        toggle();
      } catch (e) {
        console.log('invite drop component error', e);
      }
    },
    btnText: 'SEND INVITATION',
    loading,
    btnClassList: ['w_100pr'],
    classList: ['w_100pr']
  };

  return (
    <>
      {users.length > 0 && (
        <InnerList
          users={users}
          boardId={boardId}
          ownerId={ownerId}
          setChecks={setChecks}
          checks={checks}
        />
      )}

      <li className="list__body_li">
        <FormWrapper form={requestUsersState}>
          <>
            <input
              type="text"
              name="invite"
              className="form__input add__list__input"
              placeholder="Email or name"
              onChange={changeHandler}
              value={value}
              autoFocus
            />
            <Button {...buttonProps} />
          </>
        </FormWrapper>
      </li>
    </>
  );
};

function InviteDrop(props) {
  const { toggle, boardId, ownerId } = props;

  const [users, setUsers] = useState([]);

  const {
    setInputText,
    inputText,
    search: { loading, result }
  } = useDebouncedFetch(async (text) => auth.getUsersFromRegex(text));

  const changeHandler = async (e) => {
    const { value } = e.target;
    setInputText(value);
  };

  useEffect(() => {
    if (Array.isArray(result)) {
      setUsers(result);
    }
  }, [result]);

  const requestUsersState = {
    value: inputText,
    className: 'invite__form',
    users
  };

  const dropProps = {
    toggle,
    heading: 'Invite to board',
    classList: ['add'],
    popupBody: PopupBody({
      ownerId,
      changeHandler,
      requestUsersState,
      boardId,
      loading,
      toggle
    })
  };

  return <DropDown {...dropProps} />;
}

export { InviteDrop };
