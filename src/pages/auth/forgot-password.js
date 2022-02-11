import React from 'react';
import AuthWrapper from '../../components/authentication/AuthWrapper';
import ForgotPasswordForm from '../../components/authentication/ForgotPasswordForm';

export default function login() {
  return (
    <AuthWrapper>
      <ForgotPasswordForm />
    </AuthWrapper>
  );
}
