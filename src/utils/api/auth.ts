import fetcher from './fetcher';

import { API_SIGNUP_URL, BASE_URL } from '../constants';
import { AuthClient } from '@/types/state';

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
