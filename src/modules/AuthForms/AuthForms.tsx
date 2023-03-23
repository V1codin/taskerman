import React from 'react';
import LoginForm from '@/components/LoginForm/LoginForm';
import SignUpForm from '@/components/SignUpForm/SignUpForm';

import { TAuthForms } from '../../../types/state';

type AuthFormsProps = {
  type: TAuthForms | '';
};

const AuthForms: React.FC<AuthFormsProps> = ({ type }) => {
  if (!type) {
    return null;
  }
  if (type === 'login') {
    return <LoginForm />;
  }

  if (type === 'signup') {
    return <SignUpForm />;
  }

  return null;
};
export default AuthForms;
