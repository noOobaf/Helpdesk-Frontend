import React from "react";
import {
  Layout,
  Input,
  Button,
  Avatar,
  Space,
  Dropdown,
  Typography,
} from "antd";
import type { MenuProps } from "antd";
import {
  BellOutlined,
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Search } = Input;
const { Title, Text } = Typography;

interface WeWinHeaderProps {
  // Add any props you need here
  userName?: string;
  onSearch?: (value: string) => void;
  onNotificationClick?: () => void;
  onUserMenuClick?: (key: string) => void;
  sidebarCollapsed?: boolean; // Add this prop to know sidebar state
}

const WeWinHeader: React.FC<WeWinHeaderProps> = ({ 
  userName = "Upendra V",
  onSearch,
  onNotificationClick,
  onUserMenuClick,
  sidebarCollapsed = false
}) => {
  // User dropdown menu
  const userMenuItems: MenuProps["items"] = [
    { key: "profile", label: "Profile" },
    { key: "settings", label: "Settings" },
    { key: "logout", label: "Logout" },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (onUserMenuClick) {
      onUserMenuClick(key);
    }
  };

  return (
    <AntHeader
      style={{
        background: "#fff",
        padding: "0 24px",
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        width: `calc(100% - ${sidebarCollapsed ? '80px' : '250px'})`,
        zIndex: 1000,
        top: 0,
        left: sidebarCollapsed ? '80px' : '250px',
        transition: 'left 0.2s, width 0.2s',
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          
        </div>
        <Search
          placeholder="Discover it all"
          style={{ width: 320 }}
          allowClear
          onSearch={onSearch}
        />
      </div>
      <Space size="middle">
        <Button 
          type="text" 
          icon={<BellOutlined />} 
          onClick={onNotificationClick}
        />
        <Dropdown 
          menu={{ items: userMenuItems, onClick: handleMenuClick }} 
          placement="bottomRight"
        >
          <Space style={{ cursor: "pointer" }}>
            <Avatar style={{ backgroundColor: "#1890ff" }}>
              {userName.charAt(0).toUpperCase()}
            </Avatar>
            <Text>{userName}</Text>
          </Space>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default WeWinHeader;