import React, { useState } from 'react';
import { Form, Typography } from 'antd';
import Button from '../ui/Button';
import Input from '../ui/Input';

const { Title, Text } = Typography;

interface VerifyAccountFormProps {
  onSignUp: () => void;
}

const VerifyAccountForm: React.FC<VerifyAccountFormProps> = ({ onSignUp }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    // TODO: Implement verify account logic
    console.log('Verify account:', values);
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
          Verify Account
        </Title>
        <Text style={{
          display: 'block',
          marginTop: '8px',
          color: '#0C1421',
          fontFamily: 'Lato',
          fontSize: '16px',
          fontWeight: 400
        }}>
          Enter your e-mail address and mobile below to verify your account.
        </Text>
      </div>

      {/* Verify Account Form */}
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
              Mobile Phone
            </Text>
          }
          name="mobilePhone"
          rules={[
            { required: true, message: 'Please enter your mobile phone' }
          ]}
          style={{ marginBottom: '24px' }}
        >
          <Input 
            placeholder="94000 12345"
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
            Submit
          </Button>
        </Form.Item>
      </Form>

      {/* Sign Up Link */}
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

export default VerifyAccountForm;



