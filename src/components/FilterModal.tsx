import React from "react";
import { Modal, Form, Select, DatePicker, Input, Button, Row, Col } from "antd";

const { Option } = Select;

// Interface for FilterModal props
interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  // Handle filter form submission
  const handleFilterSubmit = (values: any) => {
    console.log('Filter values:', values);
    onSubmit(values);
    onClose();
  };

  // Handle clear filters
  const handleClearFilters = () => {
    form.resetFields();
  };

  return (
    <Modal
      title="Filter"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="clear" onClick={handleClearFilters}>
          Clear
        </Button>,
        <Button key="search" type="primary" onClick={() => form.submit()}>
          Search
        </Button>,
      ]}
      width={800}
      styles={{
        header: {
          borderBottom: '1px solid #f0f0f0',
          marginBottom: '20px'
        }
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFilterSubmit}
        style={{ maxHeight: '60vh', overflowY: 'auto' }}
      >
        {/* Two Column Layout */}
        <Row gutter={24}>
          {/* Left Column */}
          <Col span={12}>
            {/* Docket Number */}
            <Form.Item
              label="Docket Number"
              name="docketNumber"
              style={{ marginBottom: '16px' }}
            >
              <Input placeholder="" />
            </Form.Item>

            {/* Contact */}
            <Form.Item
              label="Contact"
              name="contact"
              style={{ marginBottom: '16px' }}
            >
              <Select placeholder="Phone/Email" defaultValue="Phone/Email">
                <Option value="phone_email">Phone/Email</Option>
                <Option value="email">Email Only</Option>
                <Option value="phone">Phone Only</Option>
              </Select>
            </Form.Item>

            {/* Ticket Status */}
            <Form.Item
              label="Ticket Status"
              name="ticketStatus"
              style={{ marginBottom: '16px' }}
            >
              <Select placeholder="Select">
                <Option value="new">New</Option>
                <Option value="inprogress">In Progress</Option>
                <Option value="resolved">Resolved</Option>
                <Option value="close">Close</Option>
              </Select>
            </Form.Item>

            {/* Disposition */}
            <Form.Item
              label="Disposition"
              name="disposition"
              style={{ marginBottom: '16px' }}
            >
              <Select placeholder="Select">
                <Option value="resolved">Resolved</Option>
                <Option value="not_refunded">Not Refunded</Option>
                <Option value="presales">Presales</Option>
                <Option value="complaint">Complaint</Option>
              </Select>
            </Form.Item>

            {/* Priority */}
            <Form.Item
              label="Priority"
              name="priority"
              style={{ marginBottom: '16px' }}
            >
              <Select placeholder="Select">
                <Option value="high">High</Option>
                <Option value="medium">Medium</Option>
                <Option value="low">Low</Option>
              </Select>
            </Form.Item>

            {/* Departments */}
            <Form.Item
              label="Departments"
              name="departments"
              style={{ marginBottom: '16px' }}
            >
              <Select placeholder="Select">
                <Option value="support">Support</Option>
                <Option value="sales">Sales</Option>
                <Option value="technical">Technical</Option>
                <Option value="billing">Billing</Option>
              </Select>
            </Form.Item>

            {/* Assigned Status */}
            <Form.Item
              label="Assigned Status"
              name="assignedStatus"
              style={{ marginBottom: '16px' }}
            >
              <Select placeholder="Select">
                <Option value="assigned">Assigned</Option>
                <Option value="unassigned">Unassigned</Option>
              </Select>
            </Form.Item>

            {/* Search On */}
            <Form.Item
              label="Search On"
              name="searchOn"
              style={{ marginBottom: '16px' }}
            >
              <Row gutter={8}>
                <Col span={12}>
                  <DatePicker 
                    placeholder="07/29/2025"
                    style={{ width: '100%' }}
                    format="MM/DD/YYYY"
                  />
                </Col>
                <Col span={12}>
                  <DatePicker 
                    placeholder="08/29/2025"
                    style={{ width: '100%' }}
                    format="MM/DD/YYYY"
                  />
                </Col>
              </Row>
            </Form.Item>
          </Col>

          {/* Right Column */}
          <Col span={12}>
            {/* Source Info */}
            <Form.Item
              label="Source Info"
              name="sourceInfo"
              style={{ marginBottom: '16px' }}
            >
              <Input placeholder="" />
            </Form.Item>

            {/* Person Name */}
            <Form.Item
              label="Person Name"
              name="personName"
              style={{ marginBottom: '16px' }}
            >
              <Input placeholder="" />
            </Form.Item>

            {/* Ticket Type */}
            <Form.Item
              label="Ticket Type"
              name="ticketType"
              style={{ marginBottom: '16px' }}
            >
              <Select placeholder="Select">
                <Option value="query">Query</Option>
                <Option value="complaint">Complaint</Option>
                <Option value="request">Request</Option>
                <Option value="incident">Incident</Option>
              </Select>
            </Form.Item>

            {/* Sub Disposition */}
            <Form.Item
              label="Sub Disposition"
              name="subDisposition"
              style={{ marginBottom: '16px' }}
            >
              <Select placeholder="Select">
                <Option value="technical_issue">Technical Issue</Option>
                <Option value="billing_inquiry">Billing Inquiry</Option>
                <Option value="feature_request">Feature Request</Option>
                <Option value="general_inquiry">General Inquiry</Option>
              </Select>
            </Form.Item>

            {/* Source */}
            <Form.Item
              label="Source"
              name="source"
              style={{ marginBottom: '16px' }}
            >
              <Select placeholder="Select">
                <Option value="internal">Internal</Option>
                <Option value="external">External</Option>
                <Option value="api">API</Option>
                <Option value="manual">Manual</Option>
              </Select>
            </Form.Item>

            {/* Assign To */}
            <Form.Item
              label="Assign To"
              name="assignTo"
              style={{ marginBottom: '16px' }}
            >
              <Select placeholder="Select">
                <Option value="agent1">Agent 1</Option>
                <Option value="agent2">Agent 2</Option>
                <Option value="supervisor">Supervisor</Option>
                <Option value="manager">Manager</Option>
              </Select>
            </Form.Item>

            {/* Bank Name */}
            <Form.Item
              label="Bank Name"
              name="bankName"
              style={{ marginBottom: '16px' }}
            >
              <Select placeholder="Select">
                <Option value="bank1">Bank of America</Option>
                <Option value="bank2">Wells Fargo</Option>
                <Option value="bank3">Chase Bank</Option>
                <Option value="bank4">Citibank</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FilterModal;