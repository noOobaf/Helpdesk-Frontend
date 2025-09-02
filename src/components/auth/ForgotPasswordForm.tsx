import React, { useState } from 'react';
import { Form, Typography } from 'antd';
import Button from '../ui/Button';
import Input from '../ui/Input';

const { Title, Text } = Typography;

interface ForgotPasswordFormProps {
  onBackToSignIn: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBackToSignIn }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    // TODO: Implement forgot password logic
    console.log('Forgot password:', values);
    setTimeout(() => setLoading(false), 1000);
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
          Forgot your password?
        </Title>
        <Text style={{
          display: 'block',
          marginTop: '8px',
          color: '#0C1421',
          fontFamily: 'Lato',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '1.5'
        }}>
          No problem. Just let us know your email address and we'll email you a password reset link that will allow you to choose a new one.
        </Text>
      </div>

      {/* Forgot Password Form */}
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

        <Form.Item style={{ marginBottom: '24px' }}>
          <Button 
            type="primary" 
            htmlType="submit"
            size="large"
            loading={loading}
            style={{ width: '100%' }}
          >
            Email password reset link
          </Button>
        </Form.Item>
      </Form>

      {/* Back to Sign In Link */}
      <div style={{ textAlign: 'left', marginTop: '24px' }}>
        <Text
          onClick={onBackToSignIn}
          style={{
            color: '#4D2EED',
            cursor: 'pointer',
            fontWeight: 500,
            fontFamily: 'Lato',
            fontSize: '14px'
          }}
        >
          ← Back to Sign In
        </Text>
      </div>

      {/* Copyright */}
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

export default ForgotPasswordForm;



