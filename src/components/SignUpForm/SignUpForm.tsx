import React from 'react';
import ImageModule from '@/modules/image/Image';
// @ts-ignore
import GoogleIcon from '@/assets/google_icon.svg?url';

import { TAuthTypes, TUserSignUp, userSignUpSchema } from '@/types/state';
import { FormWrapper } from '@/modules/formWrapper/FormWrapper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebounce } from '@/hooks/hooks';
import { useEffect } from 'react';

type SignUpFormProps = {};

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const {
    register,
    handleSubmit,
    trigger,
    setFocus,
    formState: { errors },
  } = useForm<TUserSignUp>({
    resolver: zodResolver(userSignUpSchema),
  });
  const debouncedInputChange = useDebounce(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      trigger(e.target.name as keyof TUserSignUp),
  );

  const onSubmit = () => {};
  const oauthHandler = (type: TAuthTypes) => {
    console.log(type);
  };

  useEffect(() => {
    setFocus('username', { shouldSelect: true });
  }, [setFocus]);

  return (
    <FormWrapper submit={handleSubmit(onSubmit)}>
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
      <button className="btn">Sign up</button>
      <button
        className="btn google__btn"
        type="button"
        data-oauthtype="google"
        onClick={(e) => {
          const type = e.currentTarget.dataset['oauthtype']! as TAuthTypes;
          oauthHandler(type);
        }}
      >
        <ImageModule src={GoogleIcon} alt="google" width={20} height={20} />{' '}
        Continue with Google
      </button>
    </FormWrapper>
  );
};
export default SignUpForm;
