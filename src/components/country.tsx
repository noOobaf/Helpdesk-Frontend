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
  Form, // Import Form
  Popover,
  Dropdown,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import {
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  FilterOutlined,
  SettingOutlined,
  MoreOutlined,
} from "@ant-design/icons";

// Import components (you'll need to adjust paths based on your project structure)
import WeWinSidebar from "./sidebar";
import WeWinHeader from "./headers";
import CreateTicketModal from "./CreateTicketModal";
import { AddStatusModal, AddSubDispositionModal } from "./StatusModals";

const { Content } = Layout;
const { Search } = Input;
const { Text } = Typography;
const { confirm } = Modal;

// Interfaces
interface Country {
  key: string;
  countryName: string;
  description: string;
}

// Sample data
const sampleCountryData: Country[] = [
  { key: "1", countryName: "India", description: "-" },
  { key: "2", countryName: "Nepal", description: "-" },
  { key: "3", countryName: "Shri Lanka", description: "-" },
];

// Main Dashboard Component
const CountryInformationDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isPlusMenuVisible, setIsPlusMenuVisible] = useState(false);
  const [form] = Form.useForm(); // Use Ant Design Form instance

  // State for managing country data
  const [countryData, setCountryData] = useState<Country[]>(sampleCountryData);
  const [editingRecord, setEditingRecord] = useState<Country | null>(null);

  // State for Stats modals
  const [isCreateTicketModalVisible, setIsCreateTicketModalVisible] =
    useState(false);
  const [isAddStatusModalVisible, setIsAddStatusModalVisible] = useState(false);
  const [isAddSubDispositionModalVisible, setIsAddSubDispositionModalVisible] =
    useState(false);

  // Function to handle opening the modal for editing a record
  const handleEdit = (record: Country) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  // Function to handle deleting a record
  const handleDelete = (key: string) => {
    confirm({
      title: "Are you sure you want to delete this country?",
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, cancel",
      onOk() {
        setCountryData((prevData) =>
          prevData.filter((item) => item.key !== key)
        );
      },
    });
  };

  // Table columns definition moved inside the component
  const tableColumns: ColumnsType<Country> = [
    {
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Country Name
          <img src="/tablesort.svg" />
        </div>
      ),
      dataIndex: "countryName",
      key: "countryName",
      width: "40%",
    },
    {
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Description
          <img src="/tablesort.svg" />
        </div>
      ),
      dataIndex: "description",
      key: "description",
      width: "50%",
    },
    {
      title: "View",
      key: "view",
      width: "10%",
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
            onClick={() => handleEdit(record)}
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
            onClick={() => handleDelete(record.key)}
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

  // Filter data based on search term
  const filteredData = countryData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSearch = (value: string) => setSearchTerm(value);
  const handleTableSearch = (value: string) => setSearchTerm(value);
  const handleNotificationClick = () => console.log("Notification clicked");
  const handleUserMenuClick = (key: string) =>
    console.log("User menu clicked:", key);

  // Modal handlers
  const showModal = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingRecord) {
        // Update existing record
        setCountryData((prevData) =>
          prevData.map((item) =>
            item.key === editingRecord.key ? { ...item, ...values } : item
          )
        );
      } else {
        // Add new record
        const newRecord: Country = {
          key: Date.now().toString(),
          ...values,
        };
        setCountryData((prevData) => [...prevData, newRecord]);
      }
      handleCancel(); // Close and reset the modal
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const showCreateTicketModal = () => {
    setIsCreateTicketModalVisible(true);
    setIsPlusMenuVisible(false);
  };
  const handleCreateTicketModalClose = () =>
    setIsCreateTicketModalVisible(false);
  const handleCreateTicketSubmit = (values: any, tabKey: string) =>
    console.log("Create ticket values:", values, "Tab:", tabKey);
  const showAddStatusModal = () => {
    setIsAddStatusModalVisible(true);
    setIsPlusMenuVisible(false);
  };
  const handleAddStatusModalClose = () => setIsAddStatusModalVisible(false);
  const handleAddStatusSubmit = (values: any) =>
    console.log("Add Status values:", values);
  const showAddSubDispositionModal = () => {
    setIsAddSubDispositionModalVisible(true);
    setIsPlusMenuVisible(false);
  };
  const handleAddSubDispositionModalClose = () =>
    setIsAddSubDispositionModalVisible(false);
  const handleAddSubDispositionSubmit = (values: any) =>
    console.log("Add Sub Disposition values:", values);

  const filterContent = (
    <div style={{ width: 200, padding: 8 }}>
      <Text>No filters available for countries.</Text>
    </div>
  );

  const plusMenuItems = [
    { key: "add-country", label: "Add Country", onClick: showModal },
    { key: "add-ticket", label: "Add Ticket", onClick: showCreateTicketModal },
    { key: "add-status", label: "Add Status", onClick: showAddStatusModal },
    {
      key: "add-sub-disposition",
      label: "Add Sub Disposition",
      onClick: showAddSubDispositionModal,
    },
  ];

  const handlePlusMenuClick = ({ key }: { key: string }) => {
    if (key === "add-country") showModal();
    else if (key === "add-ticket") showCreateTicketModal();
    else if (key === "add-status") showAddStatusModal();
    else if (key === "add-sub-disposition") showAddSubDispositionModal();
    setIsPlusMenuVisible(false);
  };

  const getButtonStyle = (isActive: boolean) => ({
    color: isActive ? "white" : "#6B7280",
    borderRadius: "6px",
    background: isActive ? "#402EED" : "transparent",
    borderColor: isActive ? "#402EED" : "transparent",
  });

  return (
    <div style={{ minHeight: "100vh" }}>
      <WeWinHeader
        sidebarCollapsed={sidebarCollapsed}
        userName="Upendra V"
        onSearch={handleSearch}
        onNotificationClick={handleNotificationClick}
        onUserMenuClick={handleUserMenuClick}
      />
      <WeWinSidebar
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
      />
      <div
        style={{
          marginLeft: sidebarCollapsed ? "80px" : "250px",
          marginTop: "64px",
          transition: "margin-left 0.2s",
          minHeight: "calc(100vh - 64px)",
          background: "#f5f5f5",
        }}
      >
        <Content style={{ padding: "24px" }}>
          <div
            style={{
              marginBottom: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: "24px", fontWeight: "600", color: "#262626" }}
            >
              Master - Country Information
            </Text>
            <Space>
              <Button
                icon={<img src="/restart.svg" alt="restart" />}
                type="text"
                style={getButtonStyle(false)}
              />
              <Popover
                content={filterContent}
                title="Filter"
                trigger="click"
                open={isFilterVisible}
                onOpenChange={setIsFilterVisible}
                placement="bottomRight"
                overlayStyle={{ maxHeight: "80vh", overflow: "auto" }}
              >
                <Button
                  icon={<img src="/filter.svg" alt="filter" />}
                  type="text"
                  style={getButtonStyle(isFilterVisible)}
                />
              </Popover>
              <Dropdown
                menu={{ items: plusMenuItems, onClick: handlePlusMenuClick }}
                trigger={["click"]}
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
          <Card
            title={
              <Text style={{ fontSize: "16px", fontWeight: "500" }}>
                Countries
              </Text>
            }
            extra={
              <Space>
                <Search
                  placeholder="Input search text"
                  value={searchTerm}
                  onChange={(e) => handleTableSearch(e.target.value)}
                  style={{ width: 250 }}
                />
                <Button icon={<img src="/reload.svg" alt="reload" />} />
                <Button
                  icon={<img src="/tabletop.svg" alt="table-settings-1" />}
                />
                <Button
                  icon={
                    <img src="/tabletopmiddle.svg" alt="table-settings-2" />
                  }
                />
                <Button
                  icon={<img src="/tabletoplast.svg" alt="table-settings-3" />}
                />
                <Button
                  type="primary"
                  style={{ background: "#6366f1" }}
                  onClick={showModal}
                >
                  + Add Country
                </Button>
              </Space>
            }
            style={{ marginBottom: "24px" }}
            bodyStyle={{ padding: "0" }}
          >
            <Table<Country>
              columns={tableColumns}
              dataSource={filteredData}
              pagination={false}
              size="small"
              scroll={{ x: true }}
              style={{ marginBottom: "16px" }}
            />
          </Card>
          <Modal
            title={editingRecord ? "Edit Country" : "Add Country"}
            open={isModalVisible}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                style={{ background: "#6366f1" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>,
            ]}
            width={500}
            centered
            maskClosable={false}
          >
            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              style={{ marginTop: "20px" }}
            >
              <Form.Item
                label="Country Name"
                name="countryName"
                rules={[
                  { required: true, message: "Please enter country name!" },
                ]}
              >
                <Input placeholder="Enter country name" size="large" />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input.TextArea
                  placeholder="Enter description"
                  rows={4}
                  size="large"
                />
              </Form.Item>
            </Form>
          </Modal>

          {/* Stats Modals Integration */}
          <CreateTicketModal
            visible={isCreateTicketModalVisible}
            onClose={handleCreateTicketModalClose}
            onSubmit={handleCreateTicketSubmit}
          />
          <AddStatusModal
            visible={isAddStatusModalVisible}
            onClose={handleAddStatusModalClose}
            onSubmit={handleAddStatusSubmit}
          />
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

export default CountryInformationDashboard;
