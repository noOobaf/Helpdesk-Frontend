import React from "react";
import {
  Table,
  Card,
  Button,
  Pagination,
  Space,
  Typography,
  Input,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import { EyeOutlined } from "@ant-design/icons";
import { Ticket } from "../pages/auth/AuthPage"; // Assuming Dashboard.tsx is in pages

const { Search } = Input;
const { Text } = Typography;

interface TicketsTableProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  ticketData: Ticket[];
}

// Status Badge Component (no changes)
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColors = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return { background: "#0835A71A", border: "#4D5DF1", text: "#0835A7" };
      case "resolved":
        return { background: "#DAF8E6", border: "#1A8245", text: "#1A8245" };
      case "inprogress":
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

// Table columns definition (no changes)
const tableColumns: ColumnsType<Ticket> = [
  {
    title: "Docket No.",
    dataIndex: "docketNo",
    key: "docketNo",
    width: 140,
    filterIcon: <img src="tablesort.svg" />,
  },
  {
    title: "Task",
    dataIndex: "task",
    key: "task",
    width: 60,
    filterIcon: <img src="tablesort.svg" />,
  },
  {
    title: "Source",
    dataIndex: "source",
    key: "source",
    width: 80,
    filterIcon: <img src="tablesort.svg" />,
  },
  {
    title: "MT",
    dataIndex: "mt",
    key: "mt",
    width: 60,
    filterIcon: <img src="tablesort.svg" />,
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    width: 100,
    filterIcon: <img src="tablesort.svg" />,
  },
  {
    title: "Disposition",
    dataIndex: "disposition",
    key: "disposition",
    width: 120,
    filterIcon: <img src="tablesort.svg" />,
  },
  {
    title: "SubDisposition",
    dataIndex: "subDisposition",
    key: "subDisposition",
    width: 120,
    filterIcon: <img src="tablesort.svg" />,
  },
  {
    title: "Departments",
    dataIndex: "departments",
    key: "departments",
    width: 120,
    filterIcon: <img src="tablesort.svg" />,
  },
  {
    title: "Assign To",
    dataIndex: "assignTo",
    key: "assignTo",
    width: 120,
    filterIcon: <img src="tablesort.svg" />,
  },
  {
    title: "Ticket Status",
    dataIndex: "status",
    key: "status",
    width: 120,
    filterIcon: <img src="tablesort.svg" />,
    render: (status: string) => <StatusBadge status={status} />,
  },
  {
    title: "Person Name",
    dataIndex: "person",
    key: "person",
    width: 120,
    filterIcon: <img src="tablesort.svg" />,
  },
  {
    title: "Source Info",
    dataIndex: "sourceInfo",
    key: "sourceInfo",
    width: 120,
    filterIcon: <img src="tablesort.svg" />,
  },
  {
    title: "View",
    key: "view",
    width: 60,
    fixed: "right",
    render: () => <Button type="text" icon={<EyeOutlined />} size="small" />,
  },
];

const TicketsTable: React.FC<TicketsTableProps> = ({
  searchTerm,
  onSearchChange,
  ticketData,
}) => {
  return (
    <Card
      title={
        <div style={{ textAlign: "left", width: "100%" }}>
          <span
            style={{ fontSize: "16px", fontWeight: "600", color: "#1F2A37" }}
          >
            All Tickets
          </span>
        </div>
      }
      extra={
        <Space>
          <Search
            placeholder="Input search text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ width: 250 }}
          />
          <Button icon={<img src="reload.svg" alt="reload" />} />
          <Button icon={<img src="tabletop.svg" alt="table top" />} />
          <Button icon={<img src="tabletopmiddle.svg" alt="table middle" />} />
          <Button icon={<img src="tabletoplast.svg" alt="table last" />} />
        </Space>
      }
      style={{ marginBottom: "24px" }}
      headStyle={{ padding: "16px 24px", borderBottom: "1px solid #f0f0f0" }}
    >
      <Table<Ticket>
        columns={tableColumns}
        dataSource={ticketData} // This now receives the filtered data from Dashboard
        pagination={false}
        size="small"
        scroll={{ x: true }}
      />
      {/* Custom Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "16px",
          gap: "16px",
          padding: "12px 0",
        }}
      >
        <Text type="secondary" style={{ fontSize: "12px" }}>
          Total {ticketData.length} items
        </Text>
        <Space>
          <Pagination
            current={1} // You might want to manage this with state later
            total={ticketData.length}
            pageSize={10} // You can also manage this with state
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
          />
          <Text type="secondary" style={{ fontSize: "12px" }}>
            10 / page
          </Text>
        </Space>
      </div>
    </Card>
  );
};

export default TicketsTable;
