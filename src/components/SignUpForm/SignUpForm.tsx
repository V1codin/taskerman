import React from 'react';
import ImageModule from '@/modules/image/Image';
// @ts-ignore
import googleIcon from '@/assets/google_icon.svg?url';
import ButtonWithLoader from '@/modules/button/ButtonWithLoader';

import { AuthClient, credentialsSignUpSchema } from '@/types/state';
import { FormWrapper } from '@/modules/formWrapper/FormWrapper';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebounce, useToast } from '@/hooks/hooks';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { getSetModal } from '@/context/stateManager';
import { ToastProps } from '@/types/helpers';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { api } from '@/utils/api/api';

type SignUpFormProps = {};

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const {
    register,
    handleSubmit,
    trigger,
    setFocus,
    formState: { errors },
  } = useForm<AuthClient.TUserSignUp>({
    resolver: zodResolver(credentialsSignUpSchema),
  });

  const [, setAuthState] = useAtom(getSetModal);

  const [loader, setLoader] = useState(false);

  const { setToast } = useToast();

  useEffect(() => {
    setFocus('username', { shouldSelect: true });
  }, [setFocus]);

  const debouncedInputChange = useDebounce(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      trigger(e.target.name as keyof AuthClient.TUserSignUp),
  );

  const onSubmit: SubmitHandler<AuthClient.TUserSignUp> = async (
    userToSubmit,
    e,
  ) => {
    e?.preventDefault();

    try {
      setLoader(true);

      const result = await api.create('user', {
        authType: 'credentials',
        userData: userToSubmit,
      });

      if (!result) {
        throw new Error('Wrong username or password');
      }

      setLoader(false);

      setAuthState({
        isOpen: true,
        window: {
          type: 'auth',
          view: 'login',
        },
      });

      setToast({
        message: `${result.message}. Please sign in`,
        typeClass: 'notification',
        timeout: 3000,
      });
    } catch (e) {
      setLoader(false);
      const newToast: ToastProps = {
        typeClass: 'conflict',
        message: e instanceof Error ? e.message : 'Server Error',
      };

      setToast(newToast);
    }
  };

  const oauthHandler = async (type: TAuthTypes) => {
    try {
      await signIn(type);
    } catch (e) {
      setToast({
        message: 'Unexpected error',
        typeClass: 'conflict',
      });
    }
  };

  useEffect(() => {
    setFocus('username', { shouldSelect: true });
  }, [setFocus]);

  return (
    <FormWrapper
      submit={handleSubmit(onSubmit)}
      containerProps={{
        customWidth: '330px',
      }}
    >
      <h3 className="heading">Sign up for your account</h3>
      <input
        type="text"
        placeholder="Enter username"
        className="input"
        {...register('username', {
          required: true,
          onChange: debouncedInputChange,
        })}
        aria-invalid={Boolean(errors.username)}
      />
      {errors.username && (
        <span className="warning">{errors.username.message}</span>
      )}
      <input
        type="password"
        id="password"
        className="input"
        placeholder="Enter password"
        {...register('password', {
          required: true,
          onChange: debouncedInputChange,
        })}
        aria-invalid={Boolean(errors.password)}
      />
      {errors.password && (
        <span className="warning">{errors.password.message}</span>
      )}
      <input
        type="password"
        id="confirmPassword"
        className="input"
        placeholder="Confirm password"
        {...register('confirmPassword', {
          required: true,
          onChange: debouncedInputChange,
        })}
        aria-invalid={Boolean(errors.confirmPassword)}
      />

      {errors.confirmPassword && (
        <span className="warning">{errors.confirmPassword.message}</span>
      )}

      <input
        type="text"
        className="input"
        placeholder="Enter Your full name"
        {...register('displayName', {
          required: true,
          onChange: debouncedInputChange,
        })}
        aria-invalid={Boolean(errors.displayName)}
      />
      {errors.displayName && (
        <span className="warning">{errors.displayName.message}</span>
      )}

      <input
        type="email"
        className="input"
        placeholder="Enter Your Email"
        {...register('email', {
          required: true,
          onChange: debouncedInputChange,
        })}
        aria-invalid={Boolean(errors.email)}
      />
      {errors.email && <span className="warning">{errors.email.message}</span>}
      <ButtonWithLoader
        isLoading={loader}
        attrs={{
          className: 'btn btn_primary',
          type: 'submit',
          disabled: loader,
        }}
      >
        <span>Sign up</span>
      </ButtonWithLoader>
      <button
        className="btn google__btn btn_secondary"
        type="button"
        data-oauthtype="google"
        onClick={(e) => {
          e.preventDefault();

          const type = e.currentTarget.dataset['oauthtype']! as TAuthTypes;
          oauthHandler(type);
        }}
      >
        <ImageModule src={googleIcon} alt="google" width={20} height={20} />{' '}
        Continue with Google
      </button>
    </FormWrapper>
  );
};

export default SignUpForm;
