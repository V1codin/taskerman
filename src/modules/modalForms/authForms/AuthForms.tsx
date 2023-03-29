import LoginForm from '@/components/LoginForm/LoginForm';
import SignUpForm from '@/components/SignUpForm/SignUpForm';

import { TAuthForms } from '../../../../types/state';

type AuthFormsProps = {
  view: TAuthForms;
};

const AuthForms: React.FC<AuthFormsProps> = ({ view }) => {
  if (view === 'login') {
    return <LoginForm />;
  }

  if (view === 'signup') {
    return <SignUpForm />;
  }

  return null;
};

export default AuthForms;
