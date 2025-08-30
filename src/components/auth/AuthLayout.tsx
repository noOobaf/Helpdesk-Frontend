import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh',
      background: '#FFF',
      overflow: 'hidden'
    }}>
      {/* Left Panel - Form Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        background: '#FFF',
        minHeight: '100vh'
      }}>
        {/* Centered Form Container with 209.5px spacing from top and bottom */}
        <div style={{
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          marginTop: '209.5px',
          marginBottom: '209.5px'
        }}>
          {children}
        </div>
      </div>

      {/* Right Panel - Hero Content */}
      <div style={{
        width: '50%',
        height: '100vh',
        background: 'linear-gradient(326deg, #1D115A 9.36%, #4D2EED 96.99%)',
        borderRadius: '0 0 0 150px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Main Content Container - Centered vertically and horizontally */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: '60px 40px',
          boxSizing: 'border-box',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          {/* Logo Section with Glow Effect */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '80px',
            position: 'relative'
          }}>
            {/* Glow effect container */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(216, 212, 255, 0.4) 0%, rgba(216, 212, 255, 0.2) 30%, rgba(216, 212, 255, 0.1) 60%, transparent 80%)',
              filter: 'blur(20px)',
              zIndex: 1
            }} />
            
            <img 
              src="/25b214107eea3383a1d5b2a155b1f7160e585d58.png" 
              alt="We Win Logo" 
              style={{ 
                width: '120px',
                height: 'auto',
                position: 'relative',
                zIndex: 2,
                filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))'
              }} 
            />
          </div>
          
          {/* Welcome Text Section */}
          <div style={{
            textAlign: 'center',
            color: '#FFFFFF',
            fontFamily: 'Lato'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 700,
              margin: '0 0 12px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              Welcome Back 👋
            </h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              maxWidth: '400px',
              margin: '0 auto'
            }}>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.5',
                margin: 0,
                opacity: 0.9
              }}>
                Today is a new day. It's your day. You shape it.
              </p>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.5',
                margin: 0,
                opacity: 0.9
              }}>
                Sign in to start managing your projects.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links - Positioned at bottom with exact measurements */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '142px',
          right: '431px',
          fontSize: '12px',
          color: '#FFFFFF',
          opacity: 0.8
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '62px',
            whiteSpace: 'nowrap'
          }}>
            <span>Support</span>
            <span>License</span>
            <span>Terms of Use</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
