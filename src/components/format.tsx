import React, { useState } from "react";
import {
  Table,
  Card,
  Button,
  Space,
  Typography,
  Input,
  Pagination,
  Modal,
  Form,
  Select,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
// Removed unused Ant Design icon imports

const { Search } = Input;
const { Text } = Typography;

// Interfaces
interface PriorityMapping {
  key: string;
  ticketType: string;
  dispositionName: string;
  subDispositionName: string;
  priority: string;
  status: "Active" | "Inactive";
}

interface PriorityMappingTableProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  priorityData?: PriorityMapping[];
}

// Sample data based on the images
const samplePriorityData: PriorityMapping[] = [
  {
    key: "1",
    ticketType: "Query",
    dispositionName: "RefundStatus",
    subDispositionName: "NotInitiated",
    priority: "Semi Critical",
    status: "Active",
  },
  {
    key: "2",
    ticketType: "Suggestion",
    dispositionName: "Aarav Guar",
    subDispositionName: "Sub disp 1",
    priority: "Semi Critical",
    status: "Inactive",
  },
  {
    key: "3",
    ticketType: "Suggestion",
    dispositionName: "MoneyRefund",
    subDispositionName: "Not Refunded",
    priority: "Semi Critical",
    status: "Active",
  },
  {
    key: "4",
    ticketType: "Query",
    dispositionName: "Guari Khan",
    subDispositionName: "NotInitiated",
    priority: "Semi Critical",
    status: "Active",
  },
  {
    key: "5",
    ticketType: "Complaint",
    dispositionName: "Ramesh Yadav",
    subDispositionName: "NotInitiated",
    priority: "Semi Critical",
    status: "Active",
  },
];

// Dropdown options
const ticketTypes = ["Query", "Suggestion", "Complaint", "Request", "Feedback"];
const dispositionOptions = [
  "RefundStatus",
  "MoneyRefund",
  "Aarav Guar",
  "Guari Khan",
  "Ramesh Yadav",
];
const subDispositionOptions = [
  "NotInitiated",
  "Sub disp 1",
  "Not Refunded",
  "Pending",
  "Completed",
];
const priorityOptions = ["Critical", "Semi Critical", "High", "Medium", "Low"];
const statusOptions = ["Active", "Inactive"];

// Status Badge Component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColors = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return {
          background: "#DAF8E6",
          border: "#1A8245",
          text: "#1A8245",
        };
      case "inactive":
        return {
          background: "#FFF0E9",
          border: "#E1580E",
          text: "#E1580E",
        };
      default:
        return {
          background: "#f5f5f5",
          border: "#d9d9d9",
          text: "#666666",
        };
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

// Table columns definition
const tableColumns: ColumnsType<PriorityMapping> = [
  {
    title: "Ticket Type",
    dataIndex: "ticketType",
    key: "ticketType",
    width: 120,
    filterIcon: <img src="/tablesort.svg" alt="sort" />,
    filterDropdown: () => (
      <div style={{ padding: "8px" }}>Filter content here</div>
    ),
  },
  {
    title: "Disposition Name",
    dataIndex: "dispositionName",
    key: "dispositionName",
    width: 150,
    filterIcon: <img src="/tablesort.svg" alt="sort" />,
    filterDropdown: () => (
      <div style={{ padding: "8px" }}>Filter content here</div>
    ),
  },
  {
    title: "Sub Disposition Name",
    dataIndex: "subDispositionName",
    key: "subDispositionName",
    width: 170,
    filterIcon: <img src="/tablesort.svg" alt="sort" />,
    filterDropdown: () => (
      <div style={{ padding: "8px" }}>Filter content here</div>
    ),
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    width: 120,
    filterIcon: <img src="/tablesort.svg" alt="sort" />,
    filterDropdown: () => (
      <div style={{ padding: "8px" }}>Filter content here</div>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 100,
    filterIcon: <img src="/tablesort.svg" />,
    filterDropdown: () => (
      <div style={{ padding: "8px" }}>Filter content here</div>
    ),
    render: (status: string) => <StatusBadge status={status} />,
  },
  {
    title: "View",
    key: "view",
    width: 80,
    fixed: "right",
    render: (_, record) => (
      <Space size="small">
        <Button
          type="text"
          icon={<img src="/edit.svg" alt="edit" />}
          size="small"
          onClick={() => console.log("Edit priority mapping:", record.key)}
        />
        <Button
          type="text"
          icon={<img src="/delete.svg" alt="delete" />}
          size="small"
          onClick={() => console.log("Delete priority mapping:", record.key)}
        />
      </Space>
    ),
  },
];

const PriorityMappingTable: React.FC<PriorityMappingTableProps> = ({
  searchTerm = "",
  onSearchChange = () => {},
  priorityData = [],
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    ticketType: "",
    dispositionName: "",
    subDispositionName: "",
    priority: "",
    status: "",
  });

  const form = {
    getFieldValue: (field: string) => formData[field as keyof typeof formData],
    setFieldsValue: (values: Partial<typeof formData>) => {
      setFormData((prev) => ({ ...prev, ...values }));
    },
    resetFields: () => {
      setFormData({
        ticketType: "",
        dispositionName: "",
        subDispositionName: "",
        priority: "",
        status: "",
      });
    },
    validateFields: async () => {
      const errors = [];
      if (!formData.ticketType) errors.push("Ticket Type is required");
      if (!formData.dispositionName)
        errors.push("Disposition Name is required");
      if (!formData.subDispositionName)
        errors.push("Sub Disposition Name is required");
      if (!formData.priority) errors.push("Priority is required");
      if (!formData.status) errors.push("Status is required");

      if (errors.length > 0) {
        throw new Error(errors.join(", "));
      }
      return formData;
    },
  };

  const [currentPage, setCurrentPage] = useState(6);
  const [pageSize, setPageSize] = useState(10);

  // Use provided data or fall back to sample data
  const dataToUse = priorityData.length > 0 ? priorityData : samplePriorityData;

  // Filter data based on search term
  const filteredData = dataToUse.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
      console.log("Form values:", values);
      // Here you would typically call an API to save the data
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  return (
    <div style={{ padding: "24px", background: "#f5f5f7", minHeight: "100vh" }}>
    
      <div style={{ marginBottom: "24px" }}>
        <Text style={{ fontSize: "24px", fontWeight: "600", color: "#262626" }}>
          Master - Priority Mapping Information
        </Text>
      </div>

      <Card
        title={
          <Text style={{ fontSize: "16px", fontWeight: "500" }}>
            Priority Mapping
          </Text>
        }
        extra={
          <Space>
            <Search
              placeholder="Input search text"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onSearchChange(e.target.value)
              }
              style={{ width: 250 }}
            />
            <Button icon={<img src="/reload.svg" alt="reload" />} />
            <Button icon={<img src="/tabletop.svg" alt="table-settings-1" />} />
            <Button
              icon={<img src="/tabletopmiddle.svg" alt="table-settings-2" />}
            />
            <Button
              icon={<img src="/tabletoplast.svg" alt="table-settings-3" />}
            />
            <Button
              type="primary"
              style={{ background: "#6366f1" }}
              onClick={showModal}
            >
              + Add Priority Mapping
            </Button>
          </Space>
        }
        style={{ marginBottom: "24px" }}
        bodyStyle={{ padding: "0" }}
      >
        <Table<PriorityMapping>
          columns={tableColumns}
          dataSource={filteredData}
          pagination={false}
          size="small"
          scroll={{ x: true }}
          rowSelection={{
            type: "checkbox",
            onChange: (selectedRowKeys, selectedRows) => {
              console.log("Selected rows:", selectedRowKeys, selectedRows);
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
          }}
        >
          <Text type="secondary" style={{ fontSize: "14px" }}>
            Total 85 items
          </Text>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Pagination
              current={currentPage}
              total={85}
              pageSize={pageSize}
              showSizeChanger={false}
              showQuickJumper
              onChange={(page) => setCurrentPage(page)}
              showTotal={(total: number, range: [number, number]) =>
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

      {/* Add Priority Mapping Modal */}
      <Modal
        title="Add Priority Mapping"
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
        <div style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <div style={{ flex: 1 }}>
              <Text
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500",
                  color: "#262626",
                }}
              >
                Ticket Type *
              </Text>
              <Select
                placeholder="Select"
                allowClear
                size="large"
                style={{ width: "100%", fontWeight: "300" }}
                value={form.getFieldValue("ticketType")}
                onChange={(value) => form.setFieldsValue({ ticketType: value })}
              >
                {ticketTypes.map((type) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div style={{ flex: 1 }}>
              <Text
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500",
                  color: "#262626",
                }}
              >
                Disposition *
              </Text>
              <Select
                placeholder="Select"
                allowClear
                size="large"
                style={{ width: "100%", fontWeight: "300" }}
                value={form.getFieldValue("dispositionName")}
                onChange={(value) =>
                  form.setFieldsValue({ dispositionName: value })
                }
              >
                {dispositionOptions.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <div style={{ flex: 1 }}>
              <Text
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500",
                  color: "#262626",
                }}
              >
                Sub Disposition *
              </Text>
              <Select
                placeholder="Select"
                allowClear
                size="large"
                style={{ width: "100%", fontWeight: "300" }}
                value={form.getFieldValue("subDispositionName")}
                onChange={(value) =>
                  form.setFieldsValue({ subDispositionName: value })
                }
              >
                {subDispositionOptions.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div style={{ flex: 1 }}>
              <Text
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500",
                  color: "#262626",
                }}
              >
                Priority *
              </Text>
              <Select
                placeholder="Select"
                allowClear
                size="large"
                style={{ width: "100%", fontWeight: "300" }}
                value={form.getFieldValue("priority")}
                onChange={(value) => form.setFieldsValue({ priority: value })}
              >
                {priorityOptions.map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <Text
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#262626",
              }}
            >
              Status *
            </Text>
            <Select
              placeholder="Select"
              allowClear
              size="large"
              style={{ width: "100%", fontWeight: "300" }}
              value={form.getFieldValue("status")}
              onChange={(value) => form.setFieldsValue({ status: value })}
            >
              {statusOptions.map((option) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PriorityMappingTable;
