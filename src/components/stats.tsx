import React from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Space,
  Dropdown,
  Popover,
  Form,
  Select,
  DatePicker,
  Input,
  MenuProps,
} from "antd";
import type { MenuProps as AntMenuProps } from "antd";
import CreateTicketModal from "./CreateTicketModal";
import { AddStatusModal, AddSubDispositionModal } from "./StatusModals";
import { Ticket } from "../pages/auth/AuthPage"; // Adjust path if needed

const { Option } = Select;

// Interfaces
interface StatsCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  backgroundColor: string;
  textColor: string;
  numberColor: string;
  iconColor: string;
}

interface StatsCardsProps {
  className?: string;
  style?: React.CSSProperties;
  onCreateTicket: (newTicket: Ticket) => void;
  onTabChange: (tab: string) => void;
  onFilterApply: (values: Partial<Ticket>) => void;
}

interface FilterFormValues {
  docketNo?: string;
  status?: "Inprogress" | "New" | "Resolved";
  departments?: string;
  assignTo?: string;
  person?: string;
  type?: "Query" | "Complaint" | "Request";
  disposition?: string;
  sourceInfo?: string;
}

interface CreateTicketFormValues {
  ticketType?: "Query" | "Complaint" | "Request";
  disposition?: string;
  subDisposition?: string;
  departments?: string;
  assignTo?: string;
  ticketStatus?: "Inprogress" | "New" | "Resolved";
  personName?: string;
  firstName?: string;
  lastName?: string;
}

// Individual Stats Card Component
const StatsCard: React.FC<StatsCardProps> = ({
  title,
  count,
  icon,
  backgroundColor,
  textColor,
  numberColor,
  iconColor,
}) => (
  <Card
    className="text-center"
    style={{
      background: backgroundColor,
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      height: "120px",
    }}
    styles={{
      body: {
        padding: "20px 8px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          color: textColor,
          fontWeight: 500,
          marginBottom: "4px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          color: numberColor,
          lineHeight: 1,
        }}
      >
        {count}
      </div>
    </div>
    <div
      style={{
        color: iconColor,
        fontSize: "28px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {icon}
    </div>
  </Card>
);

// Main Stats Cards Component
const StatsCards: React.FC<StatsCardsProps> = ({
  className,
  style,
  onCreateTicket,
  onTabChange,
  onFilterApply,
}) => {
  // All original UI state is restored
  const [activeTab, setActiveTab] = React.useState<string>("All Tickets");
  const [isFilterVisible, setIsFilterVisible] = React.useState<boolean>(false);
  const [isPlusMenuVisible, setIsPlusMenuVisible] = React.useState<boolean>(false);
  const [isCreateTicketModalVisible, setIsCreateTicketModalVisible] =
    React.useState<boolean>(false);
  const [isRestartActive, setIsRestartActive] = React.useState<boolean>(false);
  const [isFilterActive, setIsFilterActive] = React.useState<boolean>(false);
  const [isPlusActive, setIsPlusActive] = React.useState<boolean>(false);
  const [isAddStatusModalVisible, setIsAddStatusModalVisible] =
    React.useState<boolean>(false);
  const [isAddSubDispositionModalVisible, setIsAddSubDispositionModalVisible] =
    React.useState<boolean>(false);
  const [form] = Form.useForm<FilterFormValues>();

  const activeButtonStyle: React.CSSProperties = {
    color: "white",
    borderRadius: "6px",
    background: "#402EED",
    borderColor: "#10B981",
  };

  // This function now updates both internal state and notifies the parent
  const handleTabClick = (tabName: string): void => {
    setActiveTab(tabName);
    onTabChange(tabName);
  };

  const handleFilterSubmit = (values: FilterFormValues): void => {
    onFilterApply(values); // Notify parent of applied filters
    setIsFilterVisible(false);
    setIsFilterActive(false);
  };

  const handleClearFilters = (): void => {
    form.resetFields();
    onFilterApply({}); // Notify parent that filters are cleared
  };

  const handleRestartClick = (): void => {
    setIsRestartActive(!isRestartActive);
    handleClearFilters();
    handleTabClick("All Tickets");
    // This could also be used to reset search term in parent if needed
    console.log("Restart clicked");
  };

  const handleFilterClick = (visible: boolean): void => {
    setIsFilterVisible(visible);
    setIsFilterActive(visible);
  };

  const handlePlusClick = (visible: boolean): void => {
    setIsPlusMenuVisible(visible);
    setIsPlusActive(visible);
  };

  const showCreateTicketModal = (): void => {
    setIsCreateTicketModalVisible(true);
    setIsPlusMenuVisible(false);
    setIsPlusActive(false);
  };

  const handleCreateTicketModalClose = (): void => {
    setIsCreateTicketModalVisible(false);
  };

  const handleCreateTicketSubmit = (values: CreateTicketFormValues, tabKey: string): void => {
    if (tabKey === "create-ticket") {
      const newTicket: Ticket = {
        key: Date.now().toString(),
        docketNo: `T-${Date.now().toString().slice(-8)}`,
        task: "0",
        source: "Manual",
        mt: "0",
        type: (values.ticketType as "Query" | "Complaint" | "Request") || "Query",
        disposition: values.disposition || "N/A",
        subDisposition: values.subDisposition || "N/A",
        departments: values.departments || "Unassigned",
        assignTo: values.assignTo || "Unassigned",
        status: (values.ticketStatus as "Inprogress" | "New" | "Resolved") || "New",
        person:
          values.personName ||
          `${values.firstName || ""} ${values.lastName || ""}`.trim() ||
          "N/A",
        sourceInfo: "Web Form",
      };
      onCreateTicket(newTicket);
    }
  };

  const showAddStatusModal = (): void => {
    setIsAddStatusModalVisible(true);
    setIsPlusMenuVisible(false);
    setIsPlusActive(false);
  };

  const handleAddStatusModalClose = (): void => setIsAddStatusModalVisible(false);

  const handleAddStatusSubmit = (values: any): void =>
    console.log("Add Status values:", values);

  const showAddSubDispositionModal = (): void => {
    setIsAddSubDispositionModalVisible(true);
    setIsPlusMenuVisible(false);
    setIsPlusActive(false);
  };

  const handleAddSubDispositionModalClose = (): void =>
    setIsAddSubDispositionModalVisible(false);

  const handleAddSubDispositionSubmit = (values: any): void =>
    console.log("Add Sub Disposition values:", values);

  const plusMenuItems: AntMenuProps['items'] = [
    { key: "add-ticket", label: "Add Ticket" },
    { key: "add-status", label: "Add Status" },
    { key: "add-sub-disposition", label: "Add Sub Disposition" },
    { key: "add-disposition", label: "Add Disposition" },
  ];

  const handlePlusMenuClick: AntMenuProps['onClick'] = ({ key }): void => {
    if (key === "add-ticket") showCreateTicketModal();
    else if (key === "add-status") showAddStatusModal();
    else if (key === "add-sub-disposition") showAddSubDispositionModal();
    setIsPlusMenuVisible(false);
    setIsPlusActive(false);
  };

  const filterContent = (
    <div style={{ width: "700px", padding: "16px" }}>
      <Form form={form} layout="vertical" onFinish={handleFilterSubmit}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Docket Number"
              name="docketNo"
              style={{ marginBottom: "16px" }}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              label="Ticket Status"
              name="status"
              style={{ marginBottom: "16px" }}
            >
              <Select allowClear>
                <Option value="New">New</Option>
                <Option value="Inprogress">In Progress</Option>
                <Option value="Resolved">Resolved</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Departments"
              name="departments"
              style={{ marginBottom: "16px" }}
            >
              <Select allowClear>
                <Option value="Presales">Presales</Option>
                <Option value="Support">Support</Option>
                <Option value="South Region">South Region</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Assign To"
              name="assignTo"
              style={{ marginBottom: "16px" }}
            >
              <Select allowClear>
                <Option value="Upendra V">Upendra V</Option>
                <Option value="Akash">Akash</Option>
                <Option value="Priya">Priya</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Person Name"
              name="person"
              style={{ marginBottom: "16px" }}
            >
              <Input allowClear />
            </Form.Item>
            <Form.Item
              label="Ticket Type"
              name="type"
              style={{ marginBottom: "16px" }}
            >
              <Select allowClear>
                <Option value="Query">Query</Option>
                <Option value="Complaint">Complaint</Option>
                <Option value="Request">Request</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Disposition"
              name="disposition"
              style={{ marginBottom: "16px" }}
            >
              <Select allowClear>
                <Option value="MoneyRefund">MoneyRefund</Option>
                <Option value="Service">Service</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Source Info"
              name="sourceInfo"
              style={{ marginBottom: "16px" }}
            >
              <Input allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Row
          justify="end"
          style={{
            marginTop: "20px",
            borderTop: "1px solid #f0f0f0",
            paddingTop: "16px",
          }}
        >
          <Space>
            <Button onClick={handleClearFilters}>Clear</Button>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Space>
        </Row>
      </Form>
    </div>
  );

  const statsData: StatsCardProps[] = [
    {
      title: "Close",
      count: 3,
      icon: <img src="purple.svg" alt="close" />,
      backgroundColor: "#2558DB14",
      textColor: "#4D5DF1",
      numberColor: "#4D5DF1",
      iconColor: "#0835A7",
    },
    {
      title: "Inprogress",
      count: 12,
      icon: <img src="orange.svg" alt="inprogress" />,
      backgroundColor: "#FBBC041A",
      textColor: "#1F2A37",
      numberColor: "#E64F2D",
      iconColor: "#E64F2D",
    },
    {
      title: "New",
      count: 10,
      icon: <img src="blue.svg" alt="new" />,
      backgroundColor: "#4D2EED0D",
      textColor: "#4A2DDA",
      numberColor: "#4A2DDA",
      iconColor: "#4D2EED",
    },
    {
      title: "Resolved",
      count: 2,
      icon: <img src="green.svg" alt="resolved" />,
      backgroundColor: "#34A8531A",
      textColor: "#1F2A37",
      numberColor: "#14B8A6",
      iconColor: "#14B8A6",
    },
    {
      title: "Total",
      count: 27,
      icon: <img src="gray.svg" alt="total" />,
      backgroundColor: "#4D4E5114",
      textColor: "#1F2A37",
      numberColor: "#191127",
      iconColor: "#122B31",
    },
  ];

  return (
    <div className={className} style={style}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          padding: "16px 0px",
        }}
      >
        <h3
          style={{
            fontSize: "22px",
            fontWeight: "600",
            color: "#1F2A37",
            margin: 0,
          }}
        >
          Ticket Information - (My Ticket)
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "2px",
              background: "#CFD8DC",
              borderRadius: "8px",
              padding: "4px",
            }}
          >
            <div
              style={{
                borderRadius: "6px",
                background:
                  activeTab === "All Tickets" ? "white" : "transparent",
                padding: "8px 16px",
                cursor: "pointer",
              }}
              onClick={() => handleTabClick("All Tickets")}
            >
              <span style={{ fontWeight: "500", fontSize: "14px" }}>
                All Tickets
              </span>
            </div>
            <div
              style={{
                borderRadius: "6px",
                background:
                  activeTab === "My Tickets" ? "white" : "transparent",
                padding: "8px 16px",
                cursor: "pointer",
              }}
              onClick={() => handleTabClick("My Tickets")}
            >
              <span style={{ fontWeight: "500", fontSize: "14px" }}>
                My Tickets
              </span>
            </div>
            <div
              style={{
                borderRadius: "6px",
                background:
                  activeTab === "Department Tickets" ? "white" : "transparent",
                padding: "8px 16px",
                cursor: "pointer",
              }}
              onClick={() => handleTabClick("Department Tickets")}
            >
              <span style={{ fontWeight: "500", fontSize: "14px" }}>
                Department Tickets
              </span>
            </div>
          </div>
          <Space>
            <Button
              icon={
                <img
                  src="restart.svg"
                  alt="restart"
                  style={{
                    filter: isRestartActive
                      ? "brightness(0) invert(1)"
                      : "none",
                  }}
                />
              }
              type="text"
              style={isRestartActive ? activeButtonStyle : { color: "#6B7280" }}
              onClick={handleRestartClick}
            />
            <Popover
              content={filterContent}
              title="Filter"
              trigger="click"
              open={isFilterVisible}
              onOpenChange={handleFilterClick}
              placement="bottomRight"
              overlayStyle={{ maxHeight: "80vh", overflow: "auto" }}
            >
              <Button
                icon={
                  <img
                    src="filter.svg"
                    alt="filter"
                    style={{
                      filter: isFilterActive
                        ? "brightness(0) invert(1)"
                        : "none",
                    }}
                  />
                }
                type="text"
                style={
                  isFilterActive ? activeButtonStyle : { color: "#6B7280" }
                }
              />
            </Popover>
            <Dropdown
              menu={{ items: plusMenuItems, onClick: handlePlusMenuClick }}
              trigger={["click"]}
              open={isPlusMenuVisible}
              onOpenChange={handlePlusClick}
              placement="bottomRight"
            >
              <Button
                icon={
                  <img
                    src="plus.svg"
                    alt="plus"
                    style={{
                      filter: isPlusActive ? "brightness(0) invert(1)" : "none",
                    }}
                  />
                }
                type="text"
                style={isPlusActive ? activeButtonStyle : { color: "#6B7280" }}
              />
            </Dropdown>
          </Space>
        </div>
      </div>
      <Row gutter={[16, 24]}>
        {statsData.map((stat, index) => (
          <Col flex="1" key={index}>
            <StatsCard {...stat} />
          </Col>
        ))}
      </Row>
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
    </div>
  );
};

export default StatsCards;