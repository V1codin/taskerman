import React from 'react';
import Image from 'next/image';
// @ts-ignore
import GoogleIcon from '@/assets/google_icon.svg?url';
import ActiveLink from '@/modules/activeLink/ActiveLink';
import ButtonWithLoader from '@/modules/button/ButtonWithLoader';
import fetcher from '@/libs/fetcher';

import { userLoginSchema } from '../../../types/state';
import { FormWrapper } from '@/modules/formWrapper/FormWrapper';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AUTH_URL } from '@/utils/constants';
import { ToastProps, TOAuth } from '../../../types/helpers';
import { TUserLogin } from '../../../types/state';
import { useDebounce, useLogin, useToast } from '@/hooks/hooks';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { isAuthenticatedAtom } from '@/context/stateManager';

type LoginFormProps = {};

const LoginForm: React.FC<LoginFormProps> = () => {
  const {
    register,
    handleSubmit,
    trigger,
    setFocus,
    formState: { errors },
  } = useForm<TUserLogin>({
    shouldUseNativeValidation: true,
    resolver: zodResolver(userLoginSchema),
  });
  const debouncedInputChange = useDebounce(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      trigger(e.target.name as keyof TUserLogin),
  );
  const [, setAuth] = useAtom(isAuthenticatedAtom);

  const { mutateUser } = useLogin({
    redirectTo: '/profile',
    redirectIfFound: true,
  });
  const [loader, setLoader] = useState(false);

  const { setToast } = useToast();

  useEffect(() => {
    setFocus('username', { shouldSelect: true });
  }, [setFocus]);

  const onSubmit: SubmitHandler<TUserLogin> = async (userToSubmit, e) => {
    e?.preventDefault();

    try {
      setLoader(true);
      const data = await mutateUser(
        await fetcher(AUTH_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userToSubmit),
        }),
        {
          throwOnError: true,
        },
      );
      setAuth(true);
      // TODO set user data to storage
      console.log('data: ', data);
    } catch (e) {
      const newToast: ToastProps = {
        typeClass: 'conflict',
        message: e instanceof Error ? e.message : 'Server Error',
      };

      setToast(newToast);
    } finally {
      setLoader(false);
    }
  };

  const oauthHandler = useCallback((type: keyof TOAuth) => {
    console.log('type: ', type);
  }, []);

  return (
    <FormWrapper submit={handleSubmit(onSubmit)}>
      <h3 className="form__heading">Login</h3>
      <input
        type="text"
        className="form__input"
        placeholder="Enter username"
        {...register('username', {
          required: true,
          onChange: debouncedInputChange,
        })}
      />
      {errors.username && (
        <span className="form__warning">{errors.username.message}</span>
      )}
      <input
        type="password"
        className="form__input"
        placeholder="Enter password"
        {...register('password', {
          required: true,
          onChange: debouncedInputChange,
        })}
      />
      {errors.password && (
        <span className="form__warning">{errors.password.message}</span>
      )}
      <ButtonWithLoader
        isLoading={loader}
        styles={{
          boxShadow: 'none',
        }}
        attrs={{
          className: 'form__btn',
          type: 'submit',
          disabled: loader,
        }}
      >
        <span>Log in</span>
      </ButtonWithLoader>
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
    </FormWrapper>
  );
};

export default LoginForm;
