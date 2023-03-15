import ActiveLink from '../activeLink/ActiveLink';
import Image from 'next/image';
// @ts-ignore
import GoogleIcon from '@/assets/google_icon.svg?url';

import { LOGIN_KEYS } from '@/utils/constants';
import { ILoginForm, TOAuth } from '../../../types/helpers';
import { ChangeEvent } from 'react';

type Props = {
  formState: {
    form: ILoginForm;
    warn: ILoginForm;
  };
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  submit: () => void;
  oauthHandler: (type: keyof TOAuth) => void;
};

export default function LoginFormBody({
  formState,
  changeHandler,
  submit,
  oauthHandler,
}: Props) {
  const { form, warn } = formState;

  return (
    <>
      <h3 className="form__heading">Login</h3>
      <input
        type="text"
        name={LOGIN_KEYS.USERNAME}
        className="form__input"
        placeholder="Enter username"
        value={form.username}
        onChange={changeHandler}
        required
        autoFocus
      />
      {warn.username ? (
        <span className="form__warning">{warn.username}</span>
      ) : null}
      <input
        type="password"
        name={LOGIN_KEYS.PASSWARD}
        className="form__input"
        data-validatefor="confirmPassword"
        placeholder="Enter password"
        value={form.password}
        onChange={changeHandler}
        required
      />
      {warn.password ? (
        <span className="form__warning">{warn.password}</span>
      ) : null}
      <button className="form__btn" onClick={submit}>
        Log in
      </button>
      <button
        className="form__btn google__btn"
        type="button"
        data-oauthtype="google"
        onClick={(e) => {
          const type = e.currentTarget.dataset['oauthtype']! as keyof TOAuth;
          oauthHandler(type);
        }}
      >
        <Image src={GoogleIcon} alt="google" width={20} height={20} /> Continue
        with Google
      </button>
      <ActiveLink href="/signup" className="form__link" activeClassName={''}>
        Sign up for an account
      </ActiveLink>
    </>
  );
}
