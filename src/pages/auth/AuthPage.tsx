import React, { useState } from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import SignInForm from '../../components/auth/SignInForm';
import SignUpForm from '../../components/auth/SignUpForm';
import VerifyAccountForm from '../../components/auth/VerifyAccountForm';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import { AuthView } from '../../types/auth';

const AuthPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>('signin');

  const handleSignUp = () => {
    setCurrentView('signup');
  };

  const handleSignIn = () => {
    setCurrentView('signin');
  };

  const handleForgotPassword = () => {
    setCurrentView('forgot-password');
  };

  const handleVerifyAccount = () => {
    setCurrentView('verify');
  };

  const handleBackToSignIn = () => {
    setCurrentView('signin');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'signin':
        return (
          <SignInForm
            onSignUp={handleSignUp}
            onForgotPassword={handleForgotPassword}
          />
        );
      case 'signup':
        return (
          <SignUpForm
            onSignIn={handleSignIn}
            onVerifyAccount={handleVerifyAccount}
          />
        );
      case 'verify':
        return (
          <VerifyAccountForm
            onSignUp={handleSignUp}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onBackToSignIn={handleBackToSignIn}
          />
        );
      default:
        return <SignInForm onSignUp={handleSignUp} onForgotPassword={handleForgotPassword} />;
    }
  };

  return (
    <AuthLayout>
      {renderCurrentView()}
    </AuthLayout>
  );
};

export default AuthPage;
