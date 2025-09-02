import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Typography,
  MenuProps,
} from 'antd';
import {
  BarChartOutlined,
  RightOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;
const { Title } = Typography;

interface WeWinSidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  selectedKey?: string;
  onMenuSelect?: (key: string) => void;
}

const WeWinSidebar: React.FC<WeWinSidebarProps> = ({ 
  selectedKey,
  onMenuSelect = () => {}
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [openKeys, setOpenKeys] = useState<string[]>(['master']); // Track which submenus are open
  const navigate = useNavigate();
  const location = useLocation();

  // Get current selected key from URL or props
  const getCurrentSelectedKey = () => {
    if (selectedKey) return selectedKey;
    
    const pathname = location.pathname;
    if (pathname.includes('/master/account-info')) return 'account-info';
    if (pathname.includes('/master/disposition-subdisposition')) return 'disposition-subdisposition';
    if (pathname.includes('/master/geography-settings')) return 'geography-settings';
    if (pathname.includes('/master/location-info')) return 'location-info';
    if (pathname.includes('/master/personnel-info')) return 'personnel-info';
    if (pathname.includes('/ticket/task-details')) return 'task-details';
    if (pathname.includes('/ticket/ticket-details')) return 'ticket-details';
    if (pathname.includes('/admin/users')) return 'admin-users';
    if (pathname.includes('/admin/roles')) return 'admin-roles';
    if (pathname.includes('/reports/other')) return 'other-reports';
    if (pathname.includes('/reports/ticket')) return 'ticket-reports';
    if (pathname.includes('/sla/config')) return 'sla-config';
    if (pathname.includes('/sla/reports')) return 'sla-reports';
    if (pathname === '/') return 'dashboard';
    
    return 'dashboard';
  };

  const handleMenuClick = (e: { key: string }) => {
    const key = e.key;
    
    // Call the parent callback
    onMenuSelect(key);
    
    // Handle routing based on menu key
    switch (key) {
      case 'dashboard':
        navigate('/');
        break;
      case 'task-details':
        navigate('/ticket/task-details');
        break;
      case 'ticket-details':
        navigate('/ticket/ticket-details');
        break;
      case 'admin-users':
        navigate('/admin/users');
        break;
      case 'admin-roles':
        navigate('/admin/roles');
        break;
      case 'templates':
        navigate('/mail-sms/templates');
        break;
      case 'campaigns':
        navigate('/mail-sms/campaigns');
        break;
      case 'general':
        navigate('/settings/general');
        break;
      case 'preferences':
        navigate('/settings/preferences');
        break;
      case 'account-info':
        navigate('/master/account-info');
        break;
      case 'disposition-subdisposition':
        navigate('/master/disposition-subdisposition');
        break;
      case 'geography-settings':
        navigate('/master/geography-settings');
        break;
      case 'location-info':
        navigate('/master/location-info');
        break;
      case 'master-bulk-upload':
        navigate('/master/bulk-upload');
        break;
      case 'personnel-info':
        navigate('/master/personnel-info');
        break;
      case 'ticket-lead-template':
        navigate('/master/ticket-lead-template');
        break;
      case 'users-master':
        navigate('/master/users');
        break;
      case 'other-reports':
        navigate('/reports/other');
        break;
      case 'ticket-reports':
        navigate('/reports/ticket');
        break;
      case 'sla-config':
        navigate('/sla/config');
        break;
      case 'sla-reports':
        navigate('/sla/reports');
        break;
      default:
        navigate('/');
        break;
    }
  };

  // Handle submenu open/close
  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  // Custom expand icon component
  const CustomExpandIcon = ({ isOpen }: { isOpen: boolean }) => (
    <span style={{ 
      transition: 'transform 0.2s ease',
      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: '10px',
      color: '#a0a0ff'
    }}>
      <RightOutlined />
    </span>
  );

  const menuItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      icon: <img src="/icon-1.svg" alt="Dashboard" style={{ width: '16px', height: '16px' }} />,
      label: 'Dashboard',
    },
    {
      key: 'ticket',
      icon: <img src="/Frame-5.svg" alt="Ticket" style={{ width: '16px', height: '16px' }} />,
      label: 'Ticket',
      expandIcon: ({ isOpen }) => <CustomExpandIcon isOpen={!!isOpen} />,
      children: [
        {
          key: 'task-details',
          label: 'Task Details',
        },
        {
          key: 'ticket-details',
          label: 'Ticket Details',
        },
      ],
    },
    {
      key: 'admin',
      icon: <img src="/Frame-3.svg" alt="Admin" style={{ width: '16px', height: '16px' }} />,
      label: 'Admin',
      expandIcon: ({ isOpen }) => <CustomExpandIcon isOpen={!!isOpen} />,
      children: [
        {
          key: 'admin-users',
          label: 'Users',
        },
        {
          key: 'admin-roles',
          label: 'Roles',
        },
      ],
    },
    {
      key: 'mail-sms',
      icon: <img src="/Frame-1.svg" alt="Mail" style={{ width: '16px', height: '16px' }} />,
      label: 'Mail SMS',
      expandIcon: ({ isOpen }) => <CustomExpandIcon isOpen={!!isOpen} />,
      children: [
        {
          key: 'templates',
          label: 'Templates',
        },
        {
          key: 'campaigns',
          label: 'Campaigns',
        },
      ],
    },
    {
      key: 'settings',
      icon: <img src="/Frame.svg" alt="Settings" style={{ width: '16px', height: '16px' }} />,
      label: 'Settings',
      expandIcon: ({ isOpen }) => <CustomExpandIcon isOpen={!!isOpen} />,
      children: [
        {
          key: 'general',
          label: 'General',
        },
        {
          key: 'preferences',
          label: 'Preferences',
        },
      ],
    },
    {
      key: 'master',
      icon: <img src="/Frame-4.svg" alt="Master" style={{ width: '16px', height: '16px' }} />,
      label: 'Master',
      expandIcon: ({ isOpen }) => <CustomExpandIcon isOpen={!!isOpen} />,
      children: [
        {
          key: 'account-info',
          label: 'Account Info',
        },
        {
          key: 'disposition-subdisposition',
          label: 'Disposition Subdisposition',
        },
        {
          key: 'geography-settings',
          label: 'Geography Settings',
        },
        {
          key: 'location-info',
          label: 'Location Info',
        },
        {
          key: 'master-bulk-upload',
          label: 'Master Bulk Upload',
        },
        {
          key: 'personnel-info',
          label: 'Personnel Info',
        },
        {
          key: 'ticket-lead-template',
          label: 'Ticket Lead Template',
        },
        {
          key: 'users-master',
          label: 'Users',
        }
      ],
    },
  ];

  const reportItems: MenuProps['items'] = [
    {
      key: 'reports',
      icon: <BarChartOutlined />,
      label: 'Reports',
      expandIcon: ({ isOpen }) => <CustomExpandIcon isOpen={!!isOpen} />,
      children: [
        {
          key: 'other-reports',
          label: 'Other Reports',
        },
        {
          key: 'ticket-reports',
          label: 'Ticket Reports',
        },
      ],
    },
  ];

  const slaItems: MenuProps['items'] = [
    {
      key: 'sla',
      icon: <img src="/Frame-2.svg" alt="SLA" style={{ width: '16px', height: '16px' }} />,
      label: 'SLA',
      expandIcon: ({ isOpen }) => <CustomExpandIcon isOpen={!!isOpen} />,
      children: [
        {
          key: 'sla-config',
          label: 'SLA Configuration',
        },
        {
          key: 'sla-reports',
          label: 'SLA Reports',
        },
      ],
    },
  ];

  return (
    <div>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={250}
        style={{ 
          background: '#0E082E',
          boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          zIndex: 100
        }}
      >
        {/* Logo Section */}
        <div style={{ 
          padding: '20px 16px', 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <img src="/winwin.png" alt="WeWin Logo" />
        </div>

        {/* Main Menu */}
        <Menu
          mode="inline"
          selectedKeys={[getCurrentSelectedKey()]}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          style={{
            borderRight: 0,
            background: 'transparent',
            color: 'white',
            fontSize: '14px'
          }}
          theme="dark"
          items={menuItems}
          inlineCollapsed={collapsed}
          onClick={handleMenuClick}
        />

        {/* Reports Section */}
        <div style={{ 
          marginTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '16px'
        }}>
          {!collapsed && (
            <div style={{ padding: '0 16px 8px' }}>
              <Title 
                level={5} 
                style={{ 
                  color: '#a0a0ff', 
                  marginBottom: '8px',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: '500'
                }}
              >
                Reports
              </Title>
            </div>
          )}
          <Menu
            mode="inline"
            selectedKeys={[getCurrentSelectedKey()]}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            style={{ 
              background: 'transparent', 
              border: 'none',
              fontSize: '14px'
            }}
            theme="dark"
            items={reportItems}
            inlineCollapsed={collapsed}
            onClick={handleMenuClick}
          />
        </div>

        {/* SLA Section */}
        <div style={{ marginTop: '8px' }}>
          <Menu
            mode="inline"
            selectedKeys={[getCurrentSelectedKey()]}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            style={{ 
              background: 'transparent', 
              border: 'none',
              fontSize: '14px'
            }}
            theme="dark"
            items={slaItems}
            inlineCollapsed={collapsed}
            onClick={handleMenuClick}
          />
        </div>
      </Sider>

      {/* Custom CSS for menu styling and reduced icon spacing */}
      <style>
        {`
          /* Selected menu item background */
          .ant-menu-dark .ant-menu-item-selected {
            background-color: #4D2EED !important;
          }
          
          /* Selected submenu background */
          .ant-menu-dark .ant-menu-submenu-selected .ant-menu-submenu-title {
            background-color: #4D2EED !important;
          }
          
          /* Hover effects */
          .ant-menu-dark .ant-menu-item:hover {
            background-color: rgba(77, 46, 237, 0.5) !important;
          }
          
          .ant-menu-dark .ant-menu-submenu-title:hover {
            background-color: rgba(77, 46, 237, 0.5) !important;
          }
          
          /* Selected item indicator */
          .ant-menu-dark .ant-menu-item-selected::after {
            border-right: 3px solid #4D2EED;
          }
          
          /* REDUCED ICON SPACING - Key improvement */
          .ant-menu-inline .ant-menu-item .ant-menu-item-icon,
          .ant-menu-inline .ant-menu-submenu-title .ant-menu-item-icon {
            margin-inline-end: 8px !important; /* Reduced from default 12px */
          }
          
          /* Additional spacing adjustments for better alignment */
          .ant-menu-item,
          .ant-menu-submenu-title {
            padding-left: 16px !important;
            padding-right: 16px !important;
            height: 40px !important;
            line-height: 40px !important;
          }
          
          /* Submenu item spacing */
          .ant-menu-submenu .ant-menu-item {
            padding-left: 40px !important;
            height: 36px !important;
            line-height: 36px !important;
          }
          
          /* Icon alignment */
          .ant-menu-item-icon {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          
          /* Smooth transitions */
          .ant-menu-item,
          .ant-menu-submenu-title {
            transition: all 0.2s ease;
          }
          
          /* Menu text alignment */
          .ant-menu-title-content {
            display: inline-flex;
            align-items: center;
          }

          /* Hide default expand icon */
          .ant-menu-submenu-expand-icon {
            display: none !important;
          }

          /* Custom expand icon positioning */
          .ant-menu-submenu-title {
            position: relative;
          }
        `}
      </style>
    </div>
  );
};

export default WeWinSidebar;