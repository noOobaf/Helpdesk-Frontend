import React from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';

const Input: React.FC<AntInputProps> & {
  Password: typeof AntInput.Password;
} = ({ 
  className,
  ...props 
}) => {
  const getInputStyles = () => ({
    borderRadius: 12,
    background: '#F7FBFF',
    border: '1px solid #D4D7E3',
    fontFamily: 'Lato',
    fontSize: 16,
    padding: '8px 16px',
    transition: 'all 0.2s ease',
  });

  return (
    <AntInput
      style={getInputStyles()}
      className={className}
      {...props}
    />
  );
};

// Add Password subcomponent
Input.Password = AntInput.Password;

export default Input;
