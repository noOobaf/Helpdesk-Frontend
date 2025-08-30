import React, { useState } from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import SignInForm from '../../components/auth/SignInForm';
import { AuthView } from '../../types/auth';

const AuthPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>('signin');

  const handleSignUp = () => {
    setCurrentView('signup');
  };

  const handleForgotPassword = () => {
    setCurrentView('forgot-password');
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
          <div style={{ textAlign: 'center', color: '#8897AD' }}>
            <h2>Sign Up Form</h2>
            <p>Coming soon...</p>
            <button onClick={handleBackToSignIn}>Back to Sign In</button>
          </div>
        );
      case 'forgot-password':
        return (
          <div style={{ textAlign: 'center', color: '#8897AD' }}>
            <h2>Forgot Password</h2>
            <p>Coming soon...</p>
            <button onClick={handleBackToSignIn}>Back to Sign In</button>
          </div>
        );
      case 'verify':
        return (
          <div style={{ textAlign: 'center', color: '#8897AD' }}>
            <h2>Verify Account</h2>
            <p>Coming soon...</p>
            <button onClick={handleBackToSignIn}>Back to Sign In</button>
          </div>
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
