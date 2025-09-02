import React, { useState, useMemo } from "react";
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
  message, // Added for feedback
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import {
  ReloadOutlined,
  FilterOutlined,
  MoreOutlined,
} from "@ant-design/icons";

// Import components (you'll need to adjust paths based on your project structure)
// Assuming these are in the same directory or correctly aliased
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
  key: string; // Ensure this is always unique and present
  ticketType: string;
  dispositionName: string;
  sourceType: string;
  dispositionAcronym: string;
  description: string;
  status: "Active" | "Inactive";
}

// Sample data
const sampleDispositionData: DispositionSubdisposition[] = [
  {
    key: "1",
    ticketType: "Query",
    dispositionName: "RefundStatus",
    sourceType: "TICKET",
    dispositionAcronym: "-",
    description: "Refund status for customer queries",
    status: "Active",
  },
  {
    key: "2",
    ticketType: "Suggestion",
    dispositionName: "Aarav Guar",
    sourceType: "TICKET",
    dispositionAcronym: "AG",
    description: "Customer suggestion from Aarav Guar",
    status: "Inactive",
  },
  {
    key: "3",
    ticketType: "Suggestion",
    dispositionName: "MoneyRefund",
    sourceType: "TICKET",
    dispositionAcronym: "MR",
    description: "Process for money refunds",
    status: "Active",
  },
  {
    key: "4",
    ticketType: "Query",
    dispositionName: "Guari Khan",
    sourceType: "TICKET",
    dispositionAcronym: "GK",
    description: "Specific query from Guari Khan",
    status: "Active",
  },
  {
    key: "5",
    ticketType: "Complaint",
    dispositionName: "Ramesh Yadav",
    sourceType: "TICKET",
    dispositionAcronym: "RY",
    description: "Complaint registered by Ramesh Yadav",
    status: "Active",
  },
];

// Dropdown options
const ticketTypes = ["Query", "Suggestion", "Complaint", "Request", "Feedback"];
const sourceTypes = ["TICKET", "EMAIL", "PHONE", "CHAT", "SOCIAL"];
const statusOptions = ["Active", "Inactive"];

// Status Badge Component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColors = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return { background: "#DAF8E6", border: "#1A8245", text: "#1A8245" };
      case "inactive":
        return { background: "#FFF0E9", border: "#E1580E", text: "#E1580E" }; // Corrected text color for inactive
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

// Main Dashboard Component
const DispositionSubdispositionDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isPlusMenuVisible, setIsPlusMenuVisible] = useState(false);
  const [form] = Form.useForm();

  const [dispositionData, setDispositionData] = useState<
    DispositionSubdisposition[]
  >(sampleDispositionData);
  const [editingRecord, setEditingRecord] =
    useState<DispositionSubdisposition | null>(null);

  const [isCreateTicketModalVisible, setIsCreateTicketModalVisible] =
    useState(false);
  const [isAddStatusModalVisible, setIsAddStatusModalVisible] = useState(false);
  const [isAddSubDispositionModalVisible, setIsAddSubDispositionModalVisible] =
    useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleEdit = (record: DispositionSubdisposition) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (key: string) => {
    confirm({
      title: "Are you sure you want to delete this disposition?",
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, cancel",
      onOk() {
        setDispositionData((prevData) => {
          const updatedData = prevData.filter((item) => item.key !== key);
          message.success("Disposition deleted successfully!"); // User feedback
          return updatedData;
        });
        // Optionally adjust pagination if the last item on a page was deleted
        if (
          filteredData.length % pageSize === 1 &&
          currentPage > 1 &&
          filteredData.length - 1 === (currentPage - 1) * pageSize
        ) {
          setCurrentPage(currentPage - 1);
        }
      },
      onCancel() {
        message.info("Deletion cancelled.");
      },
    });
  };

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
      width: "14%",
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
      width: "16%",
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
      width: "14%",
    },
    {
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          Disposition Acronym
          <img src="/tablesort.svg" alt="sort" />
        </div>
      ),
      dataIndex: "dispositionAcronym",
      key: "dispositionAcronym",
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
      width: "16%",
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
      width: "14%",
      render: (status: string) => <StatusBadge status={status} />,
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

  // Memoize filtered data to prevent unnecessary re-renders
  const filteredData = useMemo(() => {
    return dispositionData.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [dispositionData, searchTerm]);

  // Apply pagination to filtered data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, pageSize]);

  const handleSearch = (value: string) => setSearchTerm(value);
  const handleTableSearch = (value: string) => setSearchTerm(value);
  const handleNotificationClick = () => console.log("Notification clicked");
  const handleUserMenuClick = (key: string) =>
    console.log("User menu clicked:", key);

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
        setDispositionData((prevData) =>
          prevData.map((item) =>
            item.key === editingRecord.key ? { ...item, ...values } : item
          )
        );
        message.success("Disposition updated successfully!");
      } else {
        const newRecord: DispositionSubdisposition = {
          key: Date.now().toString(), // Ensure unique key for new entries
          ...values,
        };
        setDispositionData((prevData) => [...prevData, newRecord]);
        message.success("Disposition added successfully!");
      }
      handleCancel();
    } catch (error) {
      message.error("Failed to save disposition. Please check inputs."); // User feedback on error
      console.log("Validation failed:", error);
    }
  };

  const showCreateTicketModal = () => {
    setIsCreateTicketModalVisible(true);
    setIsPlusMenuVisible(false);
  };
  const handleCreateTicketModalClose = () =>
    setIsCreateTicketModalVisible(false);
  const handleCreateTicketSubmit = (values: any, tabKey: string) => {
    console.log("Create ticket values:", values, "Tab:", tabKey);
    message.success("Ticket created successfully!");
  };

  const showAddStatusModal = () => {
    setIsAddStatusModalVisible(true);
    setIsPlusMenuVisible(false);
  };
  const handleAddStatusModalClose = () => setIsAddStatusModalVisible(false);
  const handleAddStatusSubmit = (values: any) => {
    console.log("Add Status values:", values);
    message.success("Status added successfully!");
  };

  const showAddSubDispositionModal = () => {
    setIsAddSubDispositionModalVisible(true);
    setIsPlusMenuVisible(false);
  };
  const handleAddSubDispositionModalClose = () =>
    setIsAddSubDispositionModalVisible(false);
  const handleAddSubDispositionSubmit = (values: any) => {
    console.log("Add Sub Disposition values:", values);
    message.success("Sub Disposition added successfully!");
  };

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

  const plusMenuItems = [
    { key: "add-disposition", label: "Add Disposition", onClick: showModal },
    { key: "add-ticket", label: "Add Ticket", onClick: showCreateTicketModal },
    { key: "add-status", label: "Add Status", onClick: showAddStatusModal },
    {
      key: "add-sub-disposition",
      label: "Add Sub Disposition",
      onClick: showAddSubDispositionModal,
    },
  ];

  const handlePlusMenuClick = ({ key }: { key: string }) => {
    if (key === "add-disposition") showModal();
    else if (key === "add-ticket") showCreateTicketModal();
    else if (key === "add-status") showAddStatusModal();
    else if (key === "add-sub-disposition") showAddSubDispositionModal();
    setIsPlusMenuVisible(false); // Close dropdown after selection
  };

  const getButtonStyle = (isActive: boolean) => ({
    color: isActive ? "white" : "#6B7280",
    borderRadius: "6px",
    background: isActive ? "#402EED" : "transparent",
    borderColor: isActive ? "#402EED" : "transparent",
    display: "flex", // Align icon and text if present
    alignItems: "center",
    justifyContent: "center",
  });

  // Handle pagination changes
  const onPageChange = (page: number, current_pageSize?: number) => {
    setCurrentPage(page);
    if (current_pageSize && current_pageSize !== pageSize) {
      setPageSize(current_pageSize);
    }
  };

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
              Master - Disposition Subdisposition
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
                Disposition Subdisposition
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
                  + Add Disposition
                </Button>
              </Space>
            }
            style={{ marginBottom: "24px" }}
            bodyStyle={{ padding: "0" }}
          >
            <Table<DispositionSubdisposition>
              columns={tableColumns}
              dataSource={paginatedData} // Use paginatedData here
              pagination={false} // Ant Design's Pagination will be used externally
              size="small"
              scroll={{ x: true }}
              style={{ marginBottom: "16px" }}
              rowKey="key" // Explicitly define rowKey for robust updates
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "16px",
                gap: "16px",
                padding: "12px 24px",
                borderTop: "1px solid #f0f0f0",
              }}
            >
              <Text type="secondary" style={{ fontSize: "12px" }}>
                Total {filteredData.length} items
              </Text>
              <Space>
                <Pagination
                  current={currentPage}
                  total={filteredData.length} // Total items for pagination
                  pageSize={pageSize}
                  showSizeChanger={false} // If you want to allow changing page size, set to true
                  showQuickJumper
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`
                  }
                  onChange={onPageChange}
                  // pageSizeOptions={['10', '20', '50']} // Uncomment if showSizeChanger is true
                />
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {pageSize} / page
                </Text>
              </Space>
            </div>
          </Card>
          <Modal
            title={editingRecord ? "Edit Disposition" : "Add Disposition"}
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
                  label="Ticket Type"
                  name="ticketType"
                  style={{ flex: 1 }}
                  rules={[
                    { required: true, message: "Please select ticket type!" },
                  ]}
                >
                  <Select placeholder="Select" allowClear>
                    {ticketTypes.map((type) => (
                      <Select.Option key={type} value={type}>
                        {type}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Source Type"
                  name="sourceType"
                  style={{ flex: 1 }}
                  rules={[
                    { required: true, message: "Please select source type!" },
                  ]}
                >
                  <Select placeholder="Select" allowClear>
                    {sourceTypes.map((type) => (
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
                  <Input placeholder="Enter disposition name" />
                </Form.Item>
                <Form.Item
                  label="Disposition Acronym"
                  name="dispositionAcronym"
                  style={{ flex: 1 }}
                >
                  <Input placeholder="Enter acronym" />
                </Form.Item>
              </div>
              <div
                style={{ display: "flex", gap: "16px", marginBottom: "16px" }}
              >
                <Form.Item
                  label="Status"
                  name="status"
                  style={{ flex: 1 }}
                  rules={[{ required: true, message: "Please select status!" }]}
                >
                  <Select placeholder="Select" allowClear>
                    {statusOptions.map((status) => (
                      <Select.Option key={status} value={status}>
                        {status}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <div style={{ flex: 1 }}></div>
              </div>
              <Form.Item label="Description" name="description">
                <Input.TextArea
                  placeholder="Enter description"
                  rows={4}
                  style={{
                    borderRadius: "6px",
                    border: "1px solid #d9d9d9",
                    resize: "none",
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
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

export default DispositionSubdispositionDashboard;
