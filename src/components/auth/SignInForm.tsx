import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Typography, Divider } from 'antd';
import Button from '../ui/Button';
import Input from '../ui/Input';

const { Title, Text } = Typography;

interface SignInFormProps {
  onSignUp: () => void;
  onForgotPassword: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSignUp, onForgotPassword }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    // MOCK: accept any non-empty email/password and "navigate" to dashboard
    const isValid = Boolean(values?.email) && Boolean(values?.password);
    setTimeout(() => {
      setLoading(false);
      if (isValid) {
        navigate('/dashboard');
      }
    }, 600);
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign in
    console.log('Google sign in');
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ textAlign: 'left', marginBottom: '50px' }}>
        <Title 
          level={1} 
          style={{ 
            margin: 0,
            color: '#0C1421',
            fontFamily: 'Lato',
            fontWeight: 800,
            fontSize: '36px',
            lineHeight: '100%',
            letterSpacing: '0.36px'
          }}
        >
          Sign In
        </Title>
        <Text style={{
          display: 'block',
          marginTop: '8px',
          color: '#0C1421',
          fontFamily: 'Lato',
          fontSize: '16px',
          fontWeight: 400
        }}>
          Enter your email and password to sign in!
        </Text>
      </div>

      {/* Google Sign In Button */}
      <Button 
        variant="secondary" 
        size="large"
        onClick={handleGoogleSignIn}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '50px',
          background: '#F7FBFF',
          border: '1px solid #D4D7E3'
        }}
      >
        <img 
          src="/Google.svg" 
          alt="Google" 
          style={{ width: '20px', height: '20px' }} 
        />
        Sign in with Google
      </Button>

      {/* Divider */}
      <Divider style={{ margin: '0 0 50px 0' }} plain>
        <Text style={{ color: '#8897AD', fontSize: '14px' }}>Or</Text>
      </Divider>

      {/* Sign In Form */}
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        style={{ width: '100%' }}
      >
        <Form.Item
          label={
            <Text style={{
              color: '#0C1421',
              fontFamily: 'Lato',
              fontSize: '14px',
              fontWeight: 500
            }}>
              Email
            </Text>
          }
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
          style={{ marginBottom: '24px' }}
        >
          <Input 
            placeholder="Example@email.com"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label={
            <Text style={{
              color: '#0C1421',
              fontFamily: 'Lato',
              fontSize: '14px',
              fontWeight: 500
            }}>
              Password
            </Text>
          }
          name="password"
          rules={[
            { required: true, message: 'Please enter your password' },
            { min: 8, message: 'Password must be at least 8 characters' }
          ]}
          style={{ marginBottom: '24px' }}
        >
          <Input.Password 
            placeholder="at least 8 characters"
            size="large"
            style={{
              background: '#F7FBFF',
              border: '1px solid #D4D7E3'
            }}
          />
        </Form.Item>

        {/* Forgot Password Link - Right Aligned */}
        <div style={{ 
          textAlign: 'right', 
          marginBottom: '24px'
        }}>
          <Text
            onClick={onForgotPassword}
            style={{
              color: '#4D2EED',
              fontFamily: 'Lato',
              fontSize: '14px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Forgot Password?
          </Text>
        </div>

        <Form.Item style={{ marginBottom: '24px' }}>
          <Button 
            type="primary" 
            htmlType="submit"
            size="large"
            loading={loading}
            style={{ width: '100%' }}
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>

      {/* Sign Up Link - Left Aligned with Sign In Button */}
      <div style={{ textAlign: 'left', marginTop: '24px' }}>
        <Text style={{
          color: '#0C1421',
          fontFamily: 'Lato',
          fontSize: '14px'
        }}>
          Don't you have an account?{' '}
          <Text
            onClick={onSignUp}
            style={{
              color: '#4D2EED',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Sign up
          </Text>
        </Text>
      </div>

      {/* Copyright - Moved Further Down */}
      <div style={{
        textAlign: 'center',
        marginTop: '60px',
        paddingTop: '24px'
      }}>
        <Text style={{
          color: '#8897AD',
          fontFamily: 'Lato',
          fontSize: '12px'
        }}>
          © 2025 ALL RIGHTS RESERVED
        </Text>
      </div>
    </div>
  );
};

export default SignInForm;
