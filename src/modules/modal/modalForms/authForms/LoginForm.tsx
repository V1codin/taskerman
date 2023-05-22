'use client';
// @ts-ignore
import googleIcon from '@/assets/google_icon.svg?url';
import ButtonWithLoader from '@/modules/button/ButtonWithLoader';
import ButtonWithIcon from '@/modules/button/ButtonWithIcon';
import ImageModule from '@/modules/image/Image';
import Link from 'next/link';

import {
  FormWrapper,
  defaultInputClass,
  defaultWarningClass,
} from '@/modules/formWrapper/FormWrapper';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { getSetModal } from '@/context/stateManager';
import { signIn } from 'next-auth/react';
import { useDebounce } from '@/hooks/useDebounce';
import { useToast } from '@/hooks/useToast';
import { userLoginSchema } from '@/types/state';
import { useRouter } from 'next/navigation';

import type { ToastProps } from '@/types/helpers';
import type { AuthClient } from '@/types/state';

type LoginFormProps = {};

const LoginForm: React.FC<LoginFormProps> = () => {
  const {
    register,
    handleSubmit,
    trigger,
    setFocus,

    formState: { errors },
  } = useForm<AuthClient.TUserLogin>({
    resolver: zodResolver(userLoginSchema),
  });
  const { refresh } = useRouter();

  const [, setAuthState] = useAtom(getSetModal);

  const [loader, setLoader] = useState(false);

  const { setToast } = useToast();

  useEffect(() => {
    setFocus('username', { shouldSelect: true });
  }, [setFocus]);

  const refreshData = () => {
    refresh();
  };

  const debouncedInputChange = useDebounce(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      trigger(e.target.name as keyof AuthClient.TUserLogin),
  );

  const onSubmit: SubmitHandler<AuthClient.TUserLogin> = async (
    userToSubmit,
    e,
  ) => {
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

      refreshData();
    } catch (e) {
      setLoader(false);
      const newToast: ToastProps = {
        typeClass: 'warning',
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
    <FormWrapper
      submit={handleSubmit(onSubmit)}
      containerClassNames="w-[330px]"
    >
      <h2 className="text-bright-green text-lg font-semibold">Login</h2>
      <input name="csrfToken" type="hidden" defaultValue={''} />
      <input
        type="text"
        className={defaultInputClass}
        placeholder="Enter username"
        {...register('username', {
          required: true,
          onChange: debouncedInputChange,
        })}
        aria-invalid={Boolean(errors.username)}
      />
      {errors.username && (
        <span className={defaultWarningClass}>{errors.username.message}</span>
      )}
      <input
        type="password"
        className={defaultInputClass}
        placeholder="Enter password"
        {...register('password', {
          required: true,
          onChange: debouncedInputChange,
        })}
        aria-invalid={Boolean(errors.password)}
      />
      {errors.password && (
        <span className={defaultWarningClass}>{errors.password.message}</span>
      )}

      <ButtonWithLoader
        isLoading={loader}
        isBordered={true}
        attrs={{
          disabled: loader,
        }}
        classNames="font-bold w-full mt-4 h-11 bg-pale-green text-white hover:bg-[#71c74f] active:bg-green-500"
      >
        <span>Log in</span>
      </ButtonWithLoader>

      <ButtonWithIcon
        classNames="w-full mt-4 h-11 justify-evenly
        font-bold
        bg-white
        text-blue-second
        hover:bg-blue-second
        hover:text-white
        focus:bg-blue-second
        focus:text-white
        "
        attrs={{
          'data-oauthtype': 'google',
          type: 'button',
          onClick: (e) => {
            const type = e.currentTarget.dataset['oauthtype']! as TAuthTypes;
            oauthHandler(type);
          },
        }}
      >
        <ImageModule src={googleIcon} alt="google" width={20} height={20} />{' '}
        Continue with Google
      </ButtonWithIcon>
      <Link
        href="/signup"
        className="mt-4 text-white font-light active:text-yellow hover:underline"
        onClick={signUpLinkClick}
      >
        Sign up for an account
      </Link>
    </FormWrapper>
  );
};

LoginForm.displayName = 'LoginForm';

export default LoginForm;
