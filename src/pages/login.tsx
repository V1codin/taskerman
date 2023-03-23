import React from 'react';
import HeaderLayout from '@/layouts/HeaderLayout';
import LoginForm from '@/components/LoginForm/LoginForm';

export default function Login() {
  return (
    <HeaderLayout>
      <LoginForm />
    </HeaderLayout>
  );
}
