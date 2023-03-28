import React from 'react';

import { useEffect, Children } from 'react';

import { UserInfo } from '../../../../../modules/userInfo';
import { UserInfoBody } from './UserInfoBody';

function InnerList(props) {
  const { users, boardId, ownerId, setChecks, checks } = props;

  useEffect(() => {
    // ? clear checkboxes after each request to server
    setChecks({});

    // eslint-disable-next-line
  }, [users]);

  return (
    <ul className="innerList">
      {Children.toArray(
        users.map((user) => {
          const { _id } = user;

          const isDisabled =
            ownerId === _id ? true : user.subs.includes(boardId);

          const inputChange = () => {
            setChecks((prev) => {
              // ? set value of a checkbox on change or set true after first button click
              if (prev.hasOwnProperty(_id)) {
                return { ...prev, [_id]: !prev[_id] };
              }
              return { ...prev, [_id]: true };
            });
          };

          const value = checks[_id] || false;

          const checkboxes = isDisabled
            ? () => null
            : () => UserInfoBody({ inputChange, value });

          return (
            <li className="list__body_li">
              <UserInfo
                {...user}
                isDisabled={isDisabled}
                click={inputChange}
                innerBody={checkboxes}
              />
            </li>
          );
        })
      )}
    </ul>
  );
}

export { InnerList };
