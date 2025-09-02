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
  Pagination,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import type { MenuProps } from "antd";
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
interface DispositionSubdisposition {
  key: string;
  ticketType: string;
  dispositionName: string;
  subDispositionName: string;
  sourceType: string;
  subDispositionAcronym: string;
  description: string;
  mappingStatus: string;
  status: "Active" | "Inactive";
}

interface DispositionFormValues {
  ticketType?: string;
  dispositionName?: string;
  subDispositionName?: string;
  sourceType?: string;
  subDispositionAcronym?: string;
  description?: string;
  status?: "Active" | "Inactive";
}

interface CreateTicketFormValues {
  [key: string]: any;
}

interface StatusFormValues {
  [key: string]: any;
}

interface SubDispositionFormValues {
  [key: string]: any;
}

// Sample data matching the image
const sampleDispositionData: DispositionSubdisposition[] = [
  {
    key: "1",
    ticketType: "Query",
    dispositionName: "RefundStatus",
    subDispositionName: "NotInitiated",
    sourceType: "TICKET",
    subDispositionAcronym: "-",
    description: "-",
    mappingStatus: "mapped",
    status: "Active",
  },
  {
    key: "2",
    ticketType: "Suggestion",
    dispositionName: "Aarav Guar",
    subDispositionName: "Sub disp 1",
    sourceType: "TICKET",
    subDispositionAcronym: "-",
    description: "-",
    mappingStatus: "unmapped",
    status: "Inactive",
  },
  {
    key: "3",
    ticketType: "Suggestion",
    dispositionName: "MoneyRefund",
    subDispositionName: "Not Refunded",
    sourceType: "TICKET",
    subDispositionAcronym: "-",
    description: "-",
    mappingStatus: "mapped",
    status: "Active",
  },
  {
    key: "4",
    ticketType: "Query",
    dispositionName: "Guari Khan",
    subDispositionName: "NotInitiated",
    sourceType: "TICKET",
    subDispositionAcronym: "-",
    description: "-",
    mappingStatus: "mapped",
    status: "Active",
  },
  {
    key: "5",
    ticketType: "Complaint",
    dispositionName: "Ramesh Yadav",
    subDispositionName: "NotInitiated",
    sourceType: "TICKET",
    subDispositionAcronym: "-",
    description: "-",
    mappingStatus: "mapped",
    status: "Active",
  },
];

// Dropdown options
const ticketTypes: string[] = [
  "Query",
  "Suggestion",
  "Complaint",
  "Request",
  "Feedback",
];
const sourceTypes: string[] = ["TICKET", "EMAIL", "PHONE", "CHAT", "SOCIAL"];
const statusOptions: ("Active" | "Inactive")[] = ["Active", "Inactive"];

// Status Badge Component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColors = (
    status: string
  ): { background: string; border: string; text: string } => {
    switch (status.toLowerCase()) {
      case "active":
        return { background: "#DAF8E6", border: "#1A8245", text: "#1A8245" };
      case "inactive":
        return { background: "#FFF0E9", border: "#E1580E", text: "#E1580E" };
      default:
        return { background: "#f5f5f5", border: "#d9d9d9", text: "#666666" };
    }
  };
  const colors = getStatusColors(status);
  return (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        padding: "4px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "500",
        textAlign: "center",
        display: "inline-block",
        minWidth: "70px",
      }}
    >
      {status}
    </div>
  );
};

// Mapping Status Component
const MappingStatusIndicator: React.FC<{ status: string }> = ({ status }) => {
  const isMapped = status === "mapped";
  return (
    <div>
      {isMapped ? (
        <img src="/right.svg" alt="Mapped" />
      ) : (
        <img src="/wrong.svg" alt="Unmapped" />
      )}
    </div>
  );
};

// Main Dashboard Component
const SubDispositionDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
  const [isPlusMenuVisible, setIsPlusMenuVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [form] = Form.useForm<DispositionFormValues>();

  // State for managing sub-disposition data
  const [dispositionData, setDispositionData] = useState<
    DispositionSubdisposition[]
  >(sampleDispositionData);
  const [editingRecord, setEditingRecord] =
    useState<DispositionSubdisposition | null>(null);

  // New state for Stats modals
  const [isCreateTicketModalVisible, setIsCreateTicketModalVisible] =
    useState<boolean>(false);
  const [isAddStatusModalVisible, setIsAddStatusModalVisible] =
    useState<boolean>(false);
  const [isAddSubDispositionModalVisible, setIsAddSubDispositionModalVisible] =
    useState<boolean>(false);

  // Function to handle opening the modal for editing a record
  const handleEdit = (record: DispositionSubdisposition): void => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  // Function to handle deleting a record
  const handleDelete = (key: string): void => {
    confirm({
      title: "Are you sure you want to delete this sub disposition?",
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, cancel",
      onOk() {
        setDispositionData((prevData) =>
          prevData.filter((item) => item.key !== key)
        );
      },
    });
  };

  // Table columns definition with equal spacing, moved inside the component
  const tableColumns: ColumnsType<DispositionSubdisposition> = [
    {
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Ticket Type
          <img src="/tablesort.svg" alt="sort" />
        </div>
      ),
      dataIndex: "ticketType",
      key: "ticketType",
      width: "11%",
    },
    {
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Disposition Name
          <img src="/tablesort.svg" alt="sort" />
        </div>
      ),
      dataIndex: "dispositionName",
      key: "dispositionName",
      width: "13%",
    },
    {
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Sub Disposition Name
          <img src="/tablesort.svg" alt="sort" />
        </div>
      ),
      dataIndex: "subDispositionName",
      key: "subDispositionName",
      width: "15%",
    },
    {
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Source Type
          <img src="/tablesort.svg" alt="sort" />
        </div>
      ),
      dataIndex: "sourceType",
      key: "sourceType",
      width: "11%",
    },
    {
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Sub Disposition Acronym
          <img src="/tablesort.svg" alt="sort" />
        </div>
      ),
      dataIndex: "subDispositionAcronym",
      key: "subDispositionAcronym",
      width: "16%",
    },
    {
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Description
          <img src="/tablesort.svg" alt="sort" />
        </div>
      ),
      dataIndex: "description",
      key: "description",
      width: "11%",
    },
    {
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Mapping Status
          <img src="/tablesort.svg" alt="sort" />
        </div>
      ),
      dataIndex: "mappingStatus",
      key: "mappingStatus",
      width: "12%",
      render: (status: string) => <MappingStatusIndicator status={status} />,
    },
    {
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Status
          <img src="/tablesort.svg" alt="sort" />
        </div>
      ),
      dataIndex: "status",
      key: "status",
      width: "11%",
      render: (status: string) => <StatusBadge status={status} />,
    },
    {
      title: "View",
      key: "view",
      width: "10%",
      fixed: "right",
      render: (_, record: DispositionSubdisposition) => (
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

  const filteredData = dispositionData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSearch = (value: string): void => setSearchTerm(value);
  const handleTableSearch = (value: string): void => setSearchTerm(value);
  const handleNotificationClick = (): void =>
    console.log("Notification clicked");
  const handleUserMenuClick = (key: string): void =>
    console.log("User menu clicked:", key);

  const showModal = (): void => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCancel = (): void => {
    setIsModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      if (editingRecord) {
        // Update existing record
        setDispositionData((prevData) =>
          prevData.map((item) =>
            item.key === editingRecord.key ? { ...item, ...values } : item
          )
        );
      } else {
        // Add new record
        const newRecord: DispositionSubdisposition = {
          key: Date.now().toString(),
          mappingStatus: "unmapped", // Default mapping status for new entries
          ticketType: values.ticketType || "",
          dispositionName: values.dispositionName || "",
          subDispositionName: values.subDispositionName || "",
          sourceType: values.sourceType || "",
          subDispositionAcronym: values.subDispositionAcronym || "",
          description: values.description || "",
          status: values.status || "Active",
        };
        setDispositionData((prevData) => [...prevData, newRecord]);
      }
      handleCancel(); // Close and reset the modal
    } catch (error) {
      console.log("Validation Failed:", error);
    }
  };

  const showCreateTicketModal = (): void => {
    setIsCreateTicketModalVisible(true);
    setIsPlusMenuVisible(false);
  };

  const handleCreateTicketModalClose = (): void =>
    setIsCreateTicketModalVisible(false);

  const handleCreateTicketSubmit = (
    values: CreateTicketFormValues,
    tabKey: string
  ): void => console.log("Create ticket values:", values, "Tab:", tabKey);

  const showAddStatusModal = (): void => {
    setIsAddStatusModalVisible(true);
    setIsPlusMenuVisible(false);
  };

  const handleAddStatusModalClose = (): void =>
    setIsAddStatusModalVisible(false);

  const handleAddStatusSubmit = (values: StatusFormValues): void =>
    console.log("Add Status values:", values);

  const showAddSubDispositionModal = (): void => {
    setIsAddSubDispositionModalVisible(true);
    setIsPlusMenuVisible(false);
  };

  const handleAddSubDispositionModalClose = (): void =>
    setIsAddSubDispositionModalVisible(false);

  const handleAddSubDispositionSubmit = (
    values: SubDispositionFormValues
  ): void => console.log("Add Sub Disposition values:", values);

  const filterContent = (
    <div style={{ width: 300 }}>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Ticket Type</Text>
        <Select
          placeholder="Select Ticket Type"
          style={{ width: "100%", marginTop: 4 }}
          allowClear
        >
          {ticketTypes.map((type) => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Source Type</Text>
        <Select
          placeholder="Select Source Type"
          style={{ width: "100%", marginTop: 4 }}
          allowClear
        >
          {sourceTypes.map((type) => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Text strong>Status</Text>
        <Select
          placeholder="Select Status"
          style={{ width: "100%", marginTop: 4 }}
          allowClear
        >
          {statusOptions.map((status) => (
            <Select.Option key={status} value={status}>
              {status}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Button size="small">Clear</Button>
        <Button size="small" type="primary">
          Apply
        </Button>
      </div>
    </div>
  );

  const plusMenuItems: MenuProps["items"] = [
    {
      key: "add-subdisposition",
      label: "Add Sub Disposition",
    },
    {
      key: "add-ticket",
      label: "Add Ticket",
    },
    {
      key: "add-status",
      label: "Add Status",
    },
    {
      key: "add-disposition",
      label: "Add Disposition",
    },
  ];

  const handlePlusMenuClick: MenuProps["onClick"] = ({ key }): void => {
    if (key === "add-subdisposition") showModal();
    else if (key === "add-ticket") showCreateTicketModal();
    else if (key === "add-status") showAddStatusModal();
    else if (key === "add-disposition") showAddSubDispositionModal();
    setIsPlusMenuVisible(false);
  };

  const getButtonStyle = (isActive: boolean): React.CSSProperties => ({
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
              Master - Sub Disposition Information
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
                Sub Disposition
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
                  + Add Sub Disposition
                </Button>
              </Space>
            }
            style={{ marginBottom: "24px" }}
            bodyStyle={{ padding: "0" }}
          >
            <Table<DispositionSubdisposition>
              columns={tableColumns}
              dataSource={filteredData}
              pagination={false}
              size="small"
              scroll={{ x: true }}
              style={{ marginBottom: "16px" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 24px",
                borderTop: "1px solid #f0f0f0",
              }}
            >
              <Text type="secondary" style={{ fontSize: "14px" }}>
                Total {filteredData.length} items
              </Text>
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <Pagination
                  current={currentPage}
                  total={filteredData.length}
                  pageSize={pageSize}
                  showSizeChanger={false}
                  showQuickJumper
                  onChange={(page) => setCurrentPage(page)}
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                  }
                  size="small"
                />
                <Text type="secondary" style={{ fontSize: "14px" }}>
                  {pageSize} / page
                </Text>
                <Button size="small">Go to</Button>
              </div>
            </div>
          </Card>
          <Modal
            title={
              editingRecord ? "Edit Sub Disposition" : "Add Sub Disposition"
            }
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
              <div
                style={{ display: "flex", gap: "16px", marginBottom: "16px" }}
              >
                <Form.Item
                  label="Source Type"
                  name="sourceType"
                  style={{ flex: 1 }}
                  rules={[
                    { required: true, message: "Please select source type!" },
                  ]}
                >
                  <Select placeholder="Select" allowClear size="large">
                    {sourceTypes.map((type) => (
                      <Select.Option key={type} value={type}>
                        {type}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Ticket Type"
                  name="ticketType"
                  style={{ flex: 1 }}
                  rules={[
                    { required: true, message: "Please select ticket type!" },
                  ]}
                >
                  <Select placeholder="Select" allowClear size="large">
                    {ticketTypes.map((type) => (
                      <Select.Option key={type} value={type}>
                        {type}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div
                style={{ display: "flex", gap: "16px", marginBottom: "16px" }}
              >
                <Form.Item
                  label="Disposition Name"
                  name="dispositionName"
                  style={{ flex: 1 }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter disposition name!",
                    },
                  ]}
                >
                  <Input placeholder="Enter disposition name" size="large" />
                </Form.Item>
                <Form.Item
                  label="Sub Disposition Name"
                  name="subDispositionName"
                  style={{ flex: 1 }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter sub disposition name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter sub disposition name"
                    size="large"
                  />
                </Form.Item>
              </div>
              <div
                style={{ display: "flex", gap: "16px", marginBottom: "16px" }}
              >
                <Form.Item
                  label="Sub Disposition Acronym"
                  name="subDispositionAcronym"
                  style={{ flex: 1 }}
                >
                  <Input placeholder="Enter acronym" size="large" />
                </Form.Item>
                <Form.Item
                  label="Status"
                  name="status"
                  style={{ flex: 1 }}
                  rules={[{ required: true, message: "Please select status!" }]}
                >
                  <Select placeholder="Select" allowClear size="large">
                    {statusOptions.map((status) => (
                      <Select.Option key={status} value={status}>
                        {status}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
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

export default SubDispositionDashboard;
