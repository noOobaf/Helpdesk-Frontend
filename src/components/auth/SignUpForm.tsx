import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Typography, Checkbox } from 'antd';
import Button from '../ui/Button';
import Input from '../ui/Input';

const { Title, Text } = Typography;

interface SignUpFormProps {
  onSignIn: () => void;
  onVerifyAccount: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignIn, onVerifyAccount }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    // MOCK: accept minimal fields then go to sign in
    const isValid = Boolean(values?.firstName) && Boolean(values?.email);
    setTimeout(() => {
      setLoading(false);
      if (isValid) {
        navigate('/');
      }
    }, 800);
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
          Sign Up
        </Title>
        <Text style={{
          display: 'block',
          marginTop: '8px',
          color: '#0C1421',
          fontFamily: 'Lato',
          fontSize: '16px',
          fontWeight: 400
        }}>
          Enter your email and password to sign up!
        </Text>
      </div>

      {/* Sign Up Form */}
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
              First Name
            </Text>
          }
          name="firstName"
          rules={[
            { required: true, message: 'Please enter your first name' }
          ]}
          style={{ marginBottom: '24px' }}
        >
          <Input 
            placeholder="First Name"
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
              Last Name
            </Text>
          }
          name="lastName"
          rules={[
            { required: true, message: 'Please enter your last name' }
          ]}
          style={{ marginBottom: '24px' }}
        >
          <Input 
            placeholder="Last Name"
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
              Company Name
            </Text>
          }
          name="companyName"
          rules={[
            { required: true, message: 'Please enter your company name' }
          ]}
          style={{ marginBottom: '24px' }}
        >
          <Input 
            placeholder="Company Name"
            size="large"
          />
        </Form.Item>

        {/* Terms and Conditions */}
        <Form.Item
          name="terms"
          valuePropName="checked"
          rules={[
            { 
              validator: (_, value) => 
                value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms and conditions'))
            }
          ]}
          style={{ marginBottom: '24px' }}
        >
          <Checkbox style={{
            fontFamily: 'Lato',
            fontSize: '14px',
            color: '#0C1421'
          }}>
            By creating an account means you agree to the{' '}
            <Text
              style={{
                color: '#4D2EED',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              Terms and Conditions
            </Text>
            , and our{' '}
            <Text
              style={{
                color: '#4D2EED',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              Privacy Policy
            </Text>
          </Checkbox>
        </Form.Item>

        <Form.Item style={{ marginBottom: '24px' }}>
          <Button 
            type="primary" 
            htmlType="submit"
            size="large"
            loading={loading}
            style={{ width: '100%' }}
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>

      {/* Sign In Link and Verify Account Link - Same Line */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginTop: '24px', 
        marginBottom: '24px' 
      }}>
        <Text style={{
          color: '#0C1421',
          fontFamily: 'Lato',
          fontSize: '14px'
        }}>
          Already a member?{' '}
          <Text
            onClick={onSignIn}
            style={{
              color: '#4D2EED',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Sign in
          </Text>
        </Text>
        
        <Text
          onClick={onVerifyAccount}
          style={{
            color: '#4D2EED',
            cursor: 'pointer',
            fontWeight: 500,
            fontFamily: 'Lato',
            fontSize: '14px'
          }}
        >
          Verify Account
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

export default SignUpForm;
