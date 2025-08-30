import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';

interface ButtonProps extends Omit<AntButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  className,
  ...props 
}) => {
  const getButtonStyles = () => {
    const baseStyles = {
      height: size === 'small' ? 32 : size === 'large' ? 48 : 40,
      borderRadius: 12,
      fontFamily: 'Lato',
      fontWeight: 500,
      border: 'none',
      transition: 'all 0.2s ease',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          background: '#4D2EED',
          color: '#FFFFFF',
        };
      case 'secondary':
        return {
          ...baseStyles,
          background: '#F7FBFF',
          color: '#0C1421',
          border: '1px solid #D4D7E3',
        };
      case 'outline':
        return {
          ...baseStyles,
          background: 'transparent',
          color: '#4D2EED',
          border: '1px solid #4D2EED',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <AntButton
      style={getButtonStyles()}
      className={className}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button;
