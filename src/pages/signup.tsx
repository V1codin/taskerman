import HeaderLayout from '@/layouts/HeaderLayout';
// @ts-ignore
import GoogleIcon from '@/assets/google_icon.svg?url';
import Image from 'next/image';

import { Form } from '@/modules/formWrapper';
import { useState } from 'react';

export default function SignUp() {
  const formDefault = {
    username: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    email: '',
    className: '',
  };

  const [form, setForm] = useState(formDefault);
  const [warn, setWarn] = useState(formDefault);

  const changeHandler = () => {};

  const submit = () => {};

  const confirmBlur = () => {};

  const oauthHandler = (type: string) => {
    console.log('type: ', type);
  };
  return (
    <HeaderLayout>
      <Form>
        <>
          <h3 className="form__heading">Sign up for your account</h3>
          <input
            type="text"
            name="username"
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
            name="password"
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

          <input
            type="password"
            name="confirmPassword"
            data-validatefor="password"
            className="form__input"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={changeHandler}
            onBlur={confirmBlur}
            required
          />

          {warn.confirmPassword ? (
            <span className="form__warning">{warn.confirmPassword}</span>
          ) : null}

          <input
            type="text"
            name="displayName"
            className="form__input"
            placeholder="Enter Your full name"
            value={form.displayName}
            onChange={changeHandler}
            required
          />
          {warn.displayName ? (
            <span className="form__warning">{warn.displayName}</span>
          ) : null}

          <input
            type="email"
            name="email"
            className="form__input"
            placeholder="Enter Your Email"
            value={form.email}
            onChange={changeHandler}
            required
          />
          {warn.email ? (
            <span className="form__warning">{warn.email}</span>
          ) : null}
          <button className="form__btn" onClick={submit}>
            Sign up
          </button>
          <button
            className="form__btn google__btn"
            type="button"
            data-oauthtype="google"
            onClick={(e) => {
              const type = e.currentTarget.dataset['oauthtype']!;
              oauthHandler(type);
            }}
          >
            <Image src={GoogleIcon} alt="google" width={20} height={20} />{' '}
            Continue with Google
          </button>
        </>
      </Form>
    </HeaderLayout>
  );
}
