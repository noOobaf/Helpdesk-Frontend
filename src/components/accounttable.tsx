import React, { useState } from "react";
import {
  Layout,
  Table,
  Card,
  Button,
  Space,
  Typography,
  Input,
  Modal,
  Form,
  Select,
  Popover,
  Dropdown,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
// Removed unused Ant Design icon imports

// Import components (you'll need to adjust paths based on your project structure)
import WeWinSidebar from './sidebar'; 
import WeWinHeader from './headers';
import CreateTicketModal from "./CreateTicketModal";
import { AddStatusModal, AddSubDispositionModal } from "./StatusModals";

const { Content } = Layout;
const { Search } = Input;
const { Text } = Typography;

// Interfaces
interface AccountInfo {
  key: string;
  accountName: string;
  internalAccountManager: string;
  accountEmail: string;
  accountPhone: string;
}

interface AccountInfoDashboardProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  accountData?: AccountInfo[];
}

// Sample data
const sampleAccountData: AccountInfo[] = [
  {
    key: "1",
    accountName: "Rajesh sharma",
    internalAccountManager: "Aarav Guar",
    accountEmail: "sharma.rajesh@yahoo.com",
    accountPhone: "94085 72135",
  },
  {
    key: "2",
    accountName: "Atul Trajan",
    internalAccountManager: "Aarav Guar",
    accountEmail: "atulsharma001@gmail.com",
    accountPhone: "78452 98562",
  },
  {
    key: "3",
    accountName: "Farhan Ansari",
    internalAccountManager: "Aarav Guar",
    accountEmail: "ansari007faran@gmail.com",
    accountPhone: "62584 21456",
  },
  {
    key: "4",
    accountName: "Harsh Jain",
    internalAccountManager: "Guari Khan",
    accountEmail: "jainharsh1981@gmail.com",
    accountPhone: "90004 45269",
  },
  {
    key: "5",
    accountName: "Gopal krishna Ayer",
    internalAccountManager: "Ramesh Yadav",
    accountEmail: "gopalayer1909@gmail.com",
    accountPhone: "70004 54698",
  },
];

// Account managers for dropdown
const accountManagers = [
  "Aarav Guar",
  "Guari Khan",
  "Ramesh Yadav",
  "Priya Sharma",
  "Amit Kumar",
];

// Table columns definition
const tableColumns: ColumnsType<AccountInfo> = [
  {
    title: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        Account Name
        <img src="/tablesort.svg" alt="sort" />
      </div>
    ),
    dataIndex: "accountName",
    key: "accountName",
    width: "20%",
  },
  {
    title: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        Internal Account Manager
        <img src="/tablesort.svg" alt="sort" />
      </div>
    ),
    dataIndex: "internalAccountManager",
    key: "internalAccountManager",
    width: "20%",
  },
  {
    title: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        Account E-mail
        <img src="/tablesort.svg" alt="sort" />
      </div>
    ),
    dataIndex: "accountEmail",
    key: "accountEmail",
    width: "25%",
  },
  {
    title: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        Account Phone
        <img src="/tablesort.svg" alt="sort" />
      </div>
    ),
    dataIndex: "accountPhone",
    key: "accountPhone",
    width: "20%",
  },
  {
    title: "View",
    key: "view",
    width: "15%",
    fixed: "right",
    render: (_, record) => (
      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "6px",
          padding: "4px 8px",
          display: "inline-flex",
          gap: "4px",
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Button 
          type="text" 
          icon={<img src="/edit.svg" alt="edit" />} 
          size="small"
          onClick={() => console.log('Edit account:', record.key)}
          style={{
            padding: "2px 6px",
            height: "24px",
            minWidth: "24px",
            border: "none",
            background: "transparent",
          }}
        />
        <div
          style={{
            width: "1px",
            backgroundColor: "#e5e5e5",
            margin: "2px 0",
          }}
        />
        <Button 
          type="text" 
          icon={<img src="/delete.svg" alt="delete" />} 
          size="small"
          onClick={() => console.log('Delete account:', record.key)}
          style={{
            padding: "2px 6px",
            height: "24px",
            minWidth: "24px",
            border: "none",
            background: "transparent",
          }}
        />
      </div>
    ),
  },
];

// Main Dashboard Component
const AccountInformationDashboard: React.FC<AccountInfoDashboardProps> = ({
  searchTerm: propSearchTerm = "",
  onSearchChange = () => {},
  accountData = [],
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(propSearchTerm);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isPlusMenuVisible, setIsPlusMenuVisible] = useState(false);
  const [form] = Form.useForm();
  
  // New state for Stats modals
  const [isCreateTicketModalVisible, setIsCreateTicketModalVisible] = useState(false);
  const [isAddStatusModalVisible, setIsAddStatusModalVisible] = useState(false);
  const [isAddSubDispositionModalVisible, setIsAddSubDispositionModalVisible] = useState(false);

  // Use provided data or fall back to sample data
  const dataToUse = accountData.length > 0 ? accountData : sampleAccountData;

  // Filter data based on search term
  const filteredData = dataToUse.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handle search from header
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
    console.log('Global search:', value);
  };

  // Handle search from table
  const handleTableSearch = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
    console.log('Table search:', value);
  };

  // Handle notification click
  const handleNotificationClick = () => {
    console.log('Notification clicked');
  };

  // Handle user menu clicks
  const handleUserMenuClick = (key: string) => {
    console.log('User menu clicked:', key);
    // Add your logic here for profile, settings, logout
  };

  // Modal handlers
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);
      // Here you would typically call an API to save the data
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  // Stats Modal Handlers
  const showCreateTicketModal = () => {
    setIsCreateTicketModalVisible(true);
    setIsPlusMenuVisible(false);
  };

  const handleCreateTicketModalClose = () => {
    setIsCreateTicketModalVisible(false);
  };

  const handleCreateTicketSubmit = (values: any, tabKey: string) => {
    console.log('Create ticket values:', values, 'Tab:', tabKey);
    // Add your logic here based on the tab and form values
  };

  const showAddStatusModal = () => {
    setIsAddStatusModalVisible(true);
    setIsPlusMenuVisible(false);
  };

  const handleAddStatusModalClose = () => {
    setIsAddStatusModalVisible(false);
  };

  const handleAddStatusSubmit = (values: any) => {
    console.log('Add Status values:', values);
    // Add your logic here to handle status creation
  };

  const showAddSubDispositionModal = () => {
    setIsAddSubDispositionModalVisible(true);
    setIsPlusMenuVisible(false);
  };

  const handleAddSubDispositionModalClose = () => {
    setIsAddSubDispositionModalVisible(false);
  };

  const handleAddSubDispositionSubmit = (values: any) => {
    console.log('Add Sub Disposition values:', values);
    // Add your logic here to handle sub disposition creation
  };

  // Filter content for popover
  const filterContent = (
    <div style={{ width: 300 }}>
      <div style={{ marginBottom: 16 }}>
        <Text style={{ fontWeight: 500, marginBottom: 8, display: 'block' }}>Account Manager</Text>
        <Select
          placeholder="Select Account Manager"
          style={{ width: '100%' }}
          allowClear
        >
          {accountManagers.map(manager => (
            <Select.Option key={manager} value={manager}>
              {manager}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Text style={{ fontWeight: 500, marginBottom: 8, display: 'block' }}>Email Domain</Text>
        <Select
          placeholder="Select Email Domain"
          style={{ width: '100%' }}
          allowClear
        >
          <Select.Option value="gmail.com">gmail.com</Select.Option>
          <Select.Option value="yahoo.com">yahoo.com</Select.Option>
          <Select.Option value="outlook.com">outlook.com</Select.Option>
        </Select>
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button size="small">Clear</Button>
        <Button size="small" type="primary" style={{ background: "#402EED" }}>Apply</Button>
      </div>
    </div>
  );

  // Plus menu items - Updated with Stats modal options
  const plusMenuItems = [
    {
      key: 'add-account',
      label: 'Add Account',
      onClick: showModal,
    },
    {
      key: 'add-ticket',
      label: 'Add Ticket',
      onClick: showCreateTicketModal,
    },
    {
      key: 'add-status',
      label: 'Add Status',
      onClick: showAddStatusModal,
    },
    {
      key: 'add-sub-disposition',
      label: 'Add Sub Disposition',
      onClick: showAddSubDispositionModal,
    },
  ];

  // Handle plus menu clicks
  const handlePlusMenuClick = ({ key }: { key: string }) => {
    console.log('Plus menu clicked:', key);
    if (key === 'add-account') {
      showModal();
    } else if (key === 'add-ticket') {
      showCreateTicketModal();
    } else if (key === 'add-status') {
      showAddStatusModal();
    } else if (key === 'add-sub-disposition') {
      showAddSubDispositionModal();
    }
    setIsPlusMenuVisible(false);
  };

  // Button styling function
  const getButtonStyle = (isActive: boolean) => ({
    color: isActive ? "white" : "#6B7280",
    borderRadius: "6px",
    background: isActive ? "#402EED" : "transparent",
    borderColor: isActive ? "#402EED" : "transparent",
  });

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header Component - Fixed at top */}
      <WeWinHeader 
        sidebarCollapsed={sidebarCollapsed}
        userName="Upendra V"
        onSearch={handleSearch}
        onNotificationClick={handleNotificationClick}
        onUserMenuClick={handleUserMenuClick}
      />

      {/* Sidebar Component - Fixed at left */}
      <WeWinSidebar 
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
      />

      {/* Main Content - Positioned to avoid overlap */}
      <div
        style={{
          marginLeft: sidebarCollapsed ? '80px' : '250px',
          marginTop: '64px',
          transition: 'margin-left 0.2s',
          minHeight: 'calc(100vh - 64px)',
          background: '#f5f5f5'
        }}
      >
        <Content style={{ padding: "24px" }}>
          {/* Page Title */}
          <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontSize: "24px", fontWeight: "600", color: "#262626" }}>
              Master - Account Information
            </Text>
            <Space>
              <Button 
                icon={<img src="/restart.svg" alt="restart" />} 
                type="text" 
                style={getButtonStyle(false)}
              />
              
              {/* Filter Popover */}
              <Popover
                content={filterContent}
                title="Filter"
                trigger="click"
                open={isFilterVisible}
                onOpenChange={setIsFilterVisible}
                placement="bottomRight"
                overlayStyle={{ maxHeight: '80vh', overflow: 'auto' }}
              >
                <Button 
                  icon={<img src="/filter.svg" alt="filter" />} 
                  type="text" 
                  style={getButtonStyle(isFilterVisible)}
                />
              </Popover>

              {/* Plus Dropdown */}
              <Dropdown
                menu={{ 
                  items: plusMenuItems,
                  onClick: handlePlusMenuClick
                }}
                trigger={['click']}
                open={isPlusMenuVisible}
                onOpenChange={setIsPlusMenuVisible}
                placement="bottomRight"
              >
                <Button 
                  icon={<img src="/plus.svg" alt="plus" />} 
                  type="text"
                  style={getButtonStyle(isPlusMenuVisible)}
                />
              </Dropdown>
            </Space>
          </div>

          {/* Account Information Table Card */}
          <Card
            title={
              <Text style={{ fontSize: "16px", fontWeight: "500" }}>
                Account Information
              </Text>
            }
            extra={
              <Space>
                <Search
                  placeholder="Input search text"
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleTableSearch(e.target.value)
                  }
                  style={{ width: 250 }}
                />
                <Button icon={<img src="/reload.svg" alt="reload" />} />
                <Button icon={<img src="/tabletop.svg" alt="table-settings-1" />} />
                <Button icon={<img src="/tabletopmiddle.svg" alt="table-settings-2" />} />
                <Button icon={<img src="/tabletoplast.svg" alt="table-settings-3" />} />
                <Button 
                  type="primary" 
                  style={{ background: "#402EED" }}
                  onClick={showModal}
                >
                  Add New Account
                </Button>
              </Space>
            }
            style={{ marginBottom: "24px" }}
            bodyStyle={{ padding: "0" }}
          >
            <Table<AccountInfo>
              columns={tableColumns}
              dataSource={filteredData}
              pagination={false}
              size="small"
              scroll={{ x: true }}
              rowSelection={{
                type: "checkbox",
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log('Selected rows:', selectedRowKeys, selectedRows);
                },
              }}
              style={{ marginBottom: "16px" }}
            />

            {/* Custom Pagination */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 24px",
                borderTop: "1px solid #f0f0f0",
                background: "#fafafa"
              }}
            >
              <Text type="secondary" style={{ fontSize: "12px" }}>
                Total {filteredData.length} items
              </Text>
              <Space>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  1-{Math.min(10, filteredData.length)} of {filteredData.length} items
                </Text>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  10 / page
                </Text>
              </Space>
            </div>
          </Card>

          {/* Add Account Modal */}
          <Modal
            title="Add Account Information"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button 
                key="submit" 
                type="primary" 
                style={{ background: "#402EED" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>,
            ]}
            width={600}
            centered
            maskClosable={false}
          >
            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              style={{ marginTop: "20px" }}
            >
              <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <Form.Item
                  label="Account Name"
                  name="accountName"
                  style={{ flex: 1 }}
                  rules={[{ required: true, message: 'Please input account name!' }]}
                >
                  <Input 
                    placeholder="Enter account name" 
                    size="large"
                    style={{ 
                      borderRadius: "6px",
                      border: "1px solid #d9d9d9"
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Account Email"
                  name="accountEmail"
                  style={{ flex: 1 }}
                  rules={[
                    { required: true, message: 'Please input account email!' },
                    { type: 'email', message: 'Please enter a valid email!' }
                  ]}
                >
                  <Input 
                    placeholder="Enter account email" 
                    size="large"
                    style={{ 
                      borderRadius: "6px",
                      border: "1px solid #d9d9d9"
                    }}
                  />
                </Form.Item>
              </div>
              
              <div style={{ display: "flex", gap: "16px" }}>
                <Form.Item
                  label="Account Phone"
                  name="accountPhone"
                  style={{ flex: 1 }}
                  rules={[{ required: true, message: 'Please input account phone!' }]}
                >
                  <Input 
                    placeholder="Enter account phone" 
                    size="large"
                    style={{ 
                      borderRadius: "6px",
                      border: "1px solid #d9d9d9"
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Internal Account Manager"
                  name="internalAccountManager"
                  style={{ flex: 1 }}
                  rules={[{ required: true, message: 'Please select account manager!' }]}
                >
                  <Select 
                    placeholder="Select Account Manager" 
                    allowClear 
                    size="large"
                    style={{ 
                      borderRadius: "6px"
                    }}
                  >
                    {accountManagers.map(manager => (
                      <Select.Option key={manager} value={manager}>
                        {manager}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </Form>
          </Modal>

          {/* Stats Modals Integration */}
          {/* Create Ticket Modal */}
          <CreateTicketModal
            visible={isCreateTicketModalVisible}
            onClose={handleCreateTicketModalClose}
            onSubmit={handleCreateTicketSubmit}
          />

          {/* Add Status Modal */}
          <AddStatusModal
            visible={isAddStatusModalVisible}
            onClose={handleAddStatusModalClose}
            onSubmit={handleAddStatusSubmit}
          />

          {/* Add Sub Disposition Modal */}
          <AddSubDispositionModal
            visible={isAddSubDispositionModalVisible}
            onClose={handleAddSubDispositionModalClose}
            onSubmit={handleAddSubDispositionSubmit}
          />
        </Content>
      </div>
    </div>
  );
};

export default AccountInformationDashboard;