import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  variant = 'dark' 
}) => {
  const getLogoStyles = () => {
    const sizes = {
      small: { width: 24, height: 24 },
      medium: { width: 32, height: 32 },
      large: { width: 48, height: 48 },
    };

    return {
      ...sizes[size],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      background: variant === 'light' ? '#FFFFFF' : '#4D2EED',
      color: variant === 'light' ? '#4D2EED' : '#FFFFFF',
      fontFamily: 'Lato',
      fontWeight: 700,
      fontSize: size === 'small' ? 12 : size === 'large' ? 20 : 16,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    };
  };

  return (
    <div style={getLogoStyles()}>
      WW
    </div>
  );
};

export default Logo;


