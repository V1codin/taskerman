import fetcher from './fetcher';

import { API_SIGNUP_URL, API_USER_UPDATE_URL, BASE_URL } from '../constants';
import { AuthClient } from '@/types/state';
import { TEditableUserProps } from '@/models/users';
import { SessionUser } from '@/types/db';

export const signUp = <T extends TSignUp>(
  type: T,
  userData: AuthClient.TSignUpBodyReducer<T>,
) => {
  return fetcher<{
    message: string;
  }>(`${BASE_URL}${API_SIGNUP_URL}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      authType: type,
      userData,
    }),
  });
};

export const updateUser = (userData: TEditableUserProps) => {
  return fetcher<{ updatedUser: SessionUser }>(
    `${BASE_URL}${API_USER_UPDATE_URL}`,
    {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(userData),
    },
  );
};
