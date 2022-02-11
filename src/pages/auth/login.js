import React from 'react';
import AuthWrapper from '../../components/authentication/AuthWrapper';
import LoginForm from '../../components/authentication/LoginForm';

export default function login() {
  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  );
}
