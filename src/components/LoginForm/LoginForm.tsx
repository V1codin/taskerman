// @ts-ignore
import GoogleIcon from '@/assets/google_icon.svg?url';
import ActiveLink from '@/modules/activeLink/ActiveLink';
import ButtonWithLoader from '@/modules/button/ButtonWithLoader';
import ImageModule from '@/modules/image/Image';
import Router from 'next/router';

import { userLoginSchema } from '../../../types/state';
import { FormWrapper } from '@/modules/formWrapper/FormWrapper';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastProps, TOAuth } from '../../../types/helpers';
import { TUserLogin } from '../../../types/state';
import { useDebounce, useToast } from '@/hooks/hooks';
import { useAtom } from 'jotai';
import { getSetModal } from '@/context/stateManager';
import { signIn } from 'next-auth/react';

type LoginFormProps = {};

const LoginForm: React.FC<LoginFormProps> = () => {
  const {
    register,
    handleSubmit,
    trigger,
    setFocus,
    formState: { errors },
  } = useForm<TUserLogin>({
    resolver: zodResolver(userLoginSchema),
  });
  const debouncedInputChange = useDebounce(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      trigger(e.target.name as keyof TUserLogin),
  );

  const [, setAuthState] = useAtom(getSetModal);

  const [loader, setLoader] = useState(false);

  const { setToast } = useToast();

  useEffect(() => {
    setFocus('username', { shouldSelect: true });
  }, [setFocus]);

  const onSubmit: SubmitHandler<TUserLogin> = async (userToSubmit, e) => {
    e?.preventDefault();

    try {
      setLoader(true);
      const result = await signIn('credentials', {
        username: userToSubmit.username,
        password: userToSubmit.password,
        redirect: false,
      });

      if (result?.error || !result) {
        throw new Error('Wrong username or password');
      }

      setAuthState({
        isOpen: false,
        window: null,
      });
      Router.push('/');
    } catch (e) {
      setLoader(false);
      const newToast: ToastProps = {
        typeClass: 'conflict',
        message: e instanceof Error ? e.message : 'Server Error',
      };

      setToast(newToast);
    }
  };

  const oauthHandler = useCallback((type: keyof TOAuth) => {
    console.log('type: ', type);
  }, []);

  const signUpLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setAuthState({
      isOpen: true,
      window: {
        type: 'auth',
        view: 'signup',
      },
    });
  };

  return (
    <FormWrapper submit={handleSubmit(onSubmit)}>
      <h3 className="form__heading">Login</h3>
      <input name="csrfToken" type="hidden" defaultValue={''} />
      <input
        type="text"
        className="form__input"
        placeholder="Enter username"
        {...register('username', {
          required: true,
          onChange: debouncedInputChange,
        })}
        aria-invalid={Boolean(errors.username)}
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
        aria-invalid={Boolean(errors.password)}
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
        <ImageModule src={GoogleIcon} alt="google" width={20} height={20} />{' '}
        Continue with Google
      </button>
      <ActiveLink
        href="/signup"
        className="form__link"
        activeClassName={''}
        onClick={signUpLinkClick}
      >
        Sign up for an account
      </ActiveLink>
    </FormWrapper>
  );
};

export default LoginForm;
