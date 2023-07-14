'use client';
// @ts-ignore
import googleIcon from '@/assets/google_icon.svg?url';
import ButtonWithLoader from '@/modules/button/ButtonWithLoader';
import ButtonWithIcon from '@/modules/button/ButtonWithIcon';
import ImageModule from '@/modules/image/Image';
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { credentialsSignUpSchema } from '@/types/state';
import { useRouter } from 'next/navigation';
import {
  FormWrapper,
  defaultInputClass,
  defaultWarningClass,
} from '@/modules/formWrapper/FormWrapper';
import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { getSetToastState } from '@/context/stateManager';
import { debounce } from '@/utils/helpers';
import { api } from '@/utils/api/api';
import { signIn } from 'next-auth/react';

import type { ToastProps } from '@/types/helpers';
import type { AuthClient } from '@/types/state';

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

  const [loader, setLoader] = useState(false);

  const { push } = useRouter();

  const setToast = useSetAtom(getSetToastState);

  useEffect(() => {
    setFocus('username', { shouldSelect: true });
  }, [setFocus]);

  const debouncedInputChange = debounce(
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
        throw new Error('Wrong data');
      }

      setToast({
        message: result.message,
        typeClass: 'notification',
      });

      push('/login');
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

  return (
    <FormWrapper
      submit={handleSubmit(onSubmit)}
      containerClassNames="w-[330px]"
    >
      <h2 className="text-bright-green text-lg font-semibold">
        Sign up for your account
      </h2>
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
      <input
        type="password"
        id="confirmPassword"
        className={defaultInputClass}
        placeholder="Confirm password"
        {...register('confirmPassword', {
          required: true,
          onChange: debouncedInputChange,
        })}
        aria-invalid={Boolean(errors.confirmPassword)}
      />
      {errors.confirmPassword && (
        <span className={defaultWarningClass}>
          {errors.confirmPassword.message}
        </span>
      )}
      <input
        type="email"
        className={defaultInputClass}
        placeholder="Enter Your Email"
        {...register('email', {
          required: true,
          onChange: debouncedInputChange,
        })}
        aria-invalid={Boolean(errors.email)}
      />
      {errors.email && (
        <span className={defaultWarningClass}>{errors.email.message}</span>
      )}
      <input
        type="text"
        className={defaultInputClass}
        placeholder="Enter Your full name"
        {...register('displayName', {
          required: true,
          onChange: debouncedInputChange,
        })}
        aria-invalid={Boolean(errors.displayName)}
      />
      {errors.displayName && (
        <span className={defaultWarningClass}>
          {errors.displayName.message}
        </span>
      )}

      <ButtonWithLoader
        isLoading={loader}
        isBordered={true}
        attrs={{
          disabled: loader,
        }}
        classNames="font-bold w-full mt-4 h-11
            rounded-md
            bg-pale-green 
            text-white 
            hover:bg-pale-bright-green 
            active:bg-green-500"
      >
        <span>Sign up</span>
      </ButtonWithLoader>

      <ButtonWithIcon
        classNames="w-full mt-4 h-11 justify-evenly
            rounded-md
            font-bold
            bg-white
            text-blue-second
            hover:bg-blue-second
            hover:text-white
            focus:bg-blue-second
            focus:text-white
            active:bg-pale-bright-blue
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
        href="/login"
        className="mt-4 text-white font-light active:text-yellow hover:underline"
      >
        Already have an account?
      </Link>
    </FormWrapper>
  );
};

export { SignUpForm };
