import React from "react";
import {
  Modal,
  Tabs,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Table,
  Space,
} from "antd";
import { InfoCircleOutlined, EyeOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

// Interface for CreateTicketModal props
interface CreateTicketModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any, tabKey: string) => void;
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [activeTab, setActiveTab] = React.useState("create-ticket");
  const [addPersonForm] = Form.useForm();
  const [searchPersonForm] = Form.useForm();
  const [createTicketForm] = Form.useForm();

  // Handle form submission based on active tab
  const handleSubmit = (values: any) => {
    onSubmit(values, activeTab);
    onClose();
  };

  // Handle cancel
  const handleCancel = () => {
    // Reset all forms
    addPersonForm.resetFields();
    searchPersonForm.resetFields();
    createTicketForm.resetFields();
    onClose();
  };

  // Status Badge Component for Recent History
  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const getStatusColors = (status: string) => {
      switch (status.toLowerCase()) {
        case "new":
          return {
            background: "#0835A71A",
            border: "#4D5DF1",
            text: "#0835A7",
          };
        case "resolved":
          return { background: "#DAF8E6", border: "#1A8245", text: "#1A8245" };
        case "inprogress":
        case "assigned":
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

  const recentHistoryData = [
    {
      key: "1",
      docketNo: "T-250926-01026",
      task: "Support",
      source: "Notification",
      mt: "MT001",
      type: "Query",
      disposition: "Technical",
      subDisposition: "Hardware Issue",
      departments: "Presales",
      assignTo: "Akash",
      status: "Assigned",
      person: "John Doe",
      sourceInfo: "Phone Call",
    },
  ];

  const recentHistoryColumns = [
    { title: "Docket No.", dataIndex: "docketNo", key: "docketNo", width: 140 },
    { title: "Task", dataIndex: "task", key: "task", width: 60 },
    { title: "Source", dataIndex: "source", key: "source", width: 80 },
    { title: "MT", dataIndex: "mt", key: "mt", width: 60 },
    { title: "Type", dataIndex: "type", key: "type", width: 100 },
    {
      title: "Disposition",
      dataIndex: "disposition",
      key: "disposition",
      width: 120,
    },
    {
      title: "SubDisposition",
      dataIndex: "subDisposition",
      key: "subDisposition",
      width: 120,
    },
    {
      title: "Departments",
      dataIndex: "departments",
      key: "departments",
      width: 120,
    },
    { title: "Assign To", dataIndex: "assignTo", key: "assignTo", width: 120 },
    {
      title: "Ticket Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => <StatusBadge status={status} />,
    },
    { title: "Person Name", dataIndex: "person", key: "person", width: 120 },
    {
      title: "Source Info",
      dataIndex: "sourceInfo",
      key: "sourceInfo",
      width: 120,
    },
    {
      title: "View",
      key: "view",
      width: 60,
      render: () => <Button type="text" icon={<EyeOutlined />} size="small" />,
    },
  ];

  const tabItems = [
    {
      key: "add-person",
      label: (
        <span style={{ fontWeight: "400", fontSize: "15px" }}>Add Person</span>
      ),
      children: (
        <Form
          form={addPersonForm}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxHeight: "60vh", overflowY: "auto", fontWeight: "400" }}
        >
          {/* Add Person Form Fields... */}
        </Form>
      ),
    },
    {
      key: "create-ticket",
      label: (
        <span style={{ fontWeight: "400", fontSize: "15px" }}>
          Create Ticket
        </span>
      ),
      children: (
        <Form
          form={createTicketForm}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxHeight: "60vh", overflowY: "auto", fontWeight: "400" }}
        >
          <div style={{ marginBottom: "32px" }}>
            <h4
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#1F2A37",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Personal Detail{" "}
              <InfoCircleOutlined
                style={{ color: "#9CA3AF", fontSize: "16px" }}
              />
            </h4>
            <Row gutter={[24, 20]}>
              <Col span={6}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  style={{ marginBottom: "24px" }}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  style={{ marginBottom: "24px" }}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Person Name"
                  name="personName"
                  style={{ marginBottom: "24px" }}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={
                    <span>
                      Mobile <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="mobile"
                  rules={[{ required: true }]}
                  style={{ marginBottom: "24px" }}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  style={{ marginBottom: "24px" }}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Country"
                  name="country"
                  style={{ marginBottom: "24px" }}
                >
                  <Select placeholder="Select">
                    <Option value="india">India</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="State"
                  name="state"
                  style={{ marginBottom: "24px" }}
                >
                  <Select placeholder="Select">
                    <Option value="state1">State 1</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="City"
                  name="city"
                  style={{ marginBottom: "24px" }}
                >
                  <Select placeholder="Select">
                    <Option value="city1">City 1</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Account Name"
                  name="accountName"
                  style={{ marginBottom: "24px" }}
                >
                  <Select placeholder="Select">
                    <Option value="account1">Account 1</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Location Name"
                  name="locationName"
                  style={{ marginBottom: "24px" }}
                >
                  <Select placeholder="Select">
                    <Option value="location1">Location 1</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h4
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#1F2A37",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Ticket Details{" "}
              <InfoCircleOutlined
                style={{ color: "#9CA3AF", fontSize: "16px" }}
              />
            </h4>
            <Row gutter={[24, 20]}>
              <Col span={6}>
                <Form.Item
                  label="Ticket Type"
                  name="ticketType"
                  style={{ marginBottom: "24px" }}
                >
                  <Select placeholder="Select">
                    <Option value="query">Query</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={
                    <span>
                      Disposition <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="disposition"
                  rules={[{ required: true }]}
                  style={{ marginBottom: "24px" }}
                >
                  <Select placeholder="Select">
                    <Option value="resolved">Resolved</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={
                    <span>
                      Sub Disposition <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="subDisposition"
                  rules={[{ required: true }]}
                  style={{ marginBottom: "24px" }}
                >
                  <Select placeholder="Select">
                    <Option value="technical">Technical Issue</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Departments"
                  name="departments"
                  style={{ marginBottom: "24px" }}
                >
                  <Select placeholder="Select">
                    <Option value="support">Support</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Assign To"
                  name="assignTo"
                  style={{ marginBottom: "24px" }}
                >
                  <Select placeholder="Select">
                    <Option value="agent1">Akash</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Priority"
                  name="priority"
                  style={{ marginBottom: "24px" }}
                >
                  <Select placeholder="Select">
                    <Option value="high">High</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Ticket Status"
                  name="ticketStatus"
                  style={{ marginBottom: "24px" }}
                >
                  <Select placeholder="Select">
                    <Option value="new">New</Option>
                    <Option value="inprogress">Inprogress</Option>
                    <Option value="resolved">Resolved</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Bank Name"
                  name="bankName"
                  style={{ marginBottom: "24px" }}
                >
                  <Select placeholder="Select">
                    <Option value="sbi">State Bank of India</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Furniture"
                  name="furniture"
                  style={{ marginBottom: "24px" }}
                >
                  <Select placeholder="Select">
                    <Option value="desk">Desk</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <h4
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#1F2A37",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Remarks{" "}
              <InfoCircleOutlined
                style={{ color: "#9CA3AF", fontSize: "16px" }}
              />
            </h4>
            <Row gutter={[24, 20]}>
              <Col span={6}>
                <Form.Item
                  label={
                    <span>
                      Archive Required <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="archiveRequired"
                  rules={[{ required: true }]}
                  style={{ marginBottom: "24px" }}
                >
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Pre Defined Templates"
                  name="preDefinedTemplates"
                  style={{ marginBottom: "24px" }}
                >
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label={
                    <span>
                      Agent Remarks <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="agentRemarks"
                  rules={[{ required: true }]}
                  style={{ marginBottom: "24px" }}
                >
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Pre Defined Templates 2"
                  name="preDefinedTemplates2"
                  style={{ marginBottom: "24px" }}
                >
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      ),
    },
    {
      key: "recent-history",
      label: (
        <span style={{ fontWeight: "400", fontSize: "15px" }}>
          Recent History
        </span>
      ),
      children: (
        <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
          <Row gutter={16} style={{ marginBottom: "20px" }}>
            <Col span={18}>
              <Input placeholder="Docket Number" />
            </Col>
            <Col span={6}>
              <Space>
                <Button>Cancel</Button>
                <Button type="primary">Find</Button>
              </Space>
            </Col>
          </Row>
          <Table
            dataSource={recentHistoryData}
            columns={recentHistoryColumns}
            pagination={false}
            size="small"
            scroll={{ x: true }}
            rowSelection={{ type: "checkbox" }}
            style={{ marginBottom: "20px" }}
          />
        </div>
      ),
    },
    {
      key: "search-person-tab",
      label: (
        <span style={{ fontWeight: "400", fontSize: "15px" }}>
          Search Person Tab
        </span>
      ),
      children: (
        <div
          style={{ maxHeight: "60vh", overflowY: "auto", padding: "20px 0" }}
        >
          <Row gutter={16} style={{ marginBottom: "20px" }}>
            <Col span={18}>
              <Input placeholder="Mobile/Email" />
            </Col>
            <Col span={6}>
              <Space>
                <Button>Cancel</Button>
                <Button type="primary" style={{ background: "#402EED" }}>
                  Submit
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  return (
    <Modal
      title="Create Ticket"
      open={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          style={{ background: "#402EED" }}
          onClick={() => {
            if (activeTab === "create-ticket") createTicketForm.submit();
            else if (activeTab === "add-person") addPersonForm.submit();
            else if (activeTab === "search-person") searchPersonForm.submit();
          }}
        >
          Submit
        </Button>,
      ]}
      width={1400}
      styles={{
        header: { borderBottom: "1px solid #f0f0f0", marginBottom: "0px" },
        body: { paddingBottom: "40px" },
      }}
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        style={{ marginTop: "16px" }}
      />
    </Modal>
  );
};

export default CreateTicketModal;
