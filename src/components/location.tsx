import React, { useState } from "react";
import {
  Table,
  Card,
  Button,
  Space,
  Typography,
  Input,
  Modal,
  Select,
} from "antd";
import type { ColumnsType } from "antd/lib/table";
import {
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const { Search } = Input;
const { Text } = Typography;

// Interfaces
interface City {
  key: string;
  countryName: string;
  stateName: string;
  cityName: string;
  description: string;
}

interface CityTableProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  cityData?: City[];
}

// Sample data based on the images
const sampleCityData: City[] = [
  {
    key: "1",
    countryName: "India",
    stateName: "Madhya Pradesh",
    cityName: "Bhopal",
    description: "-",
  },
  {
    key: "2",
    countryName: "India",
    stateName: "Madhya Pradesh",
    cityName: "Gwalior",
    description: "-",
  },
  {
    key: "3",
    countryName: "India",
    stateName: "Himachal",
    cityName: "Shimla",
    description: "-",
  },
];

// Dropdown options
const countryOptions = ["India", "Nepal", "Shri Lanka", "Bangladesh"];
const stateOptions = ["Madhya Pradesh", "Uttar Pradesh", "Himachal", "Bihar", "Gujarat"];

// Table columns definition
const tableColumns: ColumnsType<City> = [
  {
    title: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        Country Name
        <FilterOutlined style={{ fontSize: "12px", color: "#8c8c8c" }} />
      </div>
    ),
    dataIndex: "countryName",
    key: "countryName",
    width: 150,
  },
  {
    title: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        State Name
        <FilterOutlined style={{ fontSize: "12px", color: "#8c8c8c" }} />
      </div>
    ),
    dataIndex: "stateName",
    key: "stateName",
    width: 150,
  },
  {
    title: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        City Name
        <FilterOutlined style={{ fontSize: "12px", color: "#8c8c8c" }} />
      </div>
    ),
    dataIndex: "cityName",
    key: "cityName",
    width: 150,
  },
  {
    title: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        Description
        <FilterOutlined style={{ fontSize: "12px", color: "#8c8c8c" }} />
      </div>
    ),
    dataIndex: "description",
    key: "description",
    // No width specified - will take remaining space
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
          icon={<EditOutlined />} 
          size="small"
          onClick={() => console.log('Edit city:', record.key)}
        />
        <Button 
          type="text" 
          icon={<DeleteOutlined />} 
          size="small"
          onClick={() => console.log('Delete city:', record.key)}
        />
      </Space>
    ),
  },
];

const CityInformationTable: React.FC<CityTableProps> = ({
  searchTerm = "",
  onSearchChange = () => {},
  cityData = [],
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    countryName: '',
    stateName: '',
    cityName: '',
    description: ''
  });

  // Use provided data or fall back to sample data
  const dataToUse = cityData.length > 0 ? cityData : sampleCityData;

  // Filter data based on search term
  const filteredData = dataToUse.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Modal handlers
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFormData({ countryName: '', stateName: '', cityName: '', description: '' });
  };

  const handleSubmit = () => {
    if (!formData.countryName.trim() || !formData.stateName.trim() || !formData.cityName.trim()) {
      alert('Please fill all required fields');
      return;
    }
    
    console.log('Form values:', formData);
    // Here you would typically call an API to save the data
    setIsModalVisible(false);
    setFormData({ countryName: '', stateName: '', cityName: '', description: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={{ padding: "24px", background: "#f5f5f7", minHeight: "100vh" }}>
      <div style={{ marginBottom: "24px" }}>
        <Text style={{ fontSize: "24px", fontWeight: "600", color: "#262626" }}>
          Master - City Information
        </Text>
      </div>

      <Card
        title={
          <Text style={{ fontSize: "16px", fontWeight: "500" }}>
            Cities
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
            <Button icon={<ReloadOutlined />} />
            <Button icon={<FilterOutlined />} />
            <Button 
              type="primary" 
              style={{ background: "#6366f1" }}
              onClick={showModal}
            >
              + Add City
            </Button>
          </Space>
        }
        style={{ marginBottom: "24px" }}
        bodyStyle={{ padding: "0" }}
      >
        <Table<City>
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
      </Card>

      {/* Add City Modal */}
      <Modal
        title="Add City"
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
          <div style={{ marginBottom: "20px" }}>
            <Text style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontWeight: "500",
              color: "#262626" 
            }}>
              Country City *
            </Text>
            <Select 
              placeholder="Select" 
              allowClear 
              size="large" 
              style={{ width: "100%", fontWeight: "300" }}
              value={formData.countryName}
              onChange={(value) => handleInputChange('countryName', value)}
            >
              {countryOptions.map(country => (
                <Select.Option key={country} value={country}>
                  {country}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Text style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontWeight: "500",
              color: "#262626" 
            }}>
              State Name *
            </Text>
            <Select 
              placeholder="Select" 
              allowClear 
              size="large" 
              style={{ width: "100%", fontWeight: "300" }}
              value={formData.stateName}
              onChange={(value) => handleInputChange('stateName', value)}
            >
              {stateOptions.map(state => (
                <Select.Option key={state} value={state}>
                  {state}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Text style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontWeight: "500",
              color: "#262626" 
            }}>
              City Name *
            </Text>
            <Input 
              placeholder="Enter city name" 
              size="large"
              value={formData.cityName}
              onChange={(e) => handleInputChange('cityName', e.target.value)}
              style={{ 
                borderRadius: "6px",
                border: "1px solid #d9d9d9"
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <Text style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontWeight: "500",
              color: "#262626" 
            }}>
              Description
            </Text>
            <Input.TextArea 
              placeholder="Enter description" 
              rows={4}
              size="large"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              style={{ 
                borderRadius: "6px",
                border: "1px solid #d9d9d9",
                resize: "none"
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CityInformationTable;