import React from "react";
import { Modal, Form, Input, Select, Radio, Button, Space } from "antd";
const { Option } = Select;
const { TextArea } = Input;

// Form value types
interface AddStatusFormValues {
  status?: string;
  statusAcronym?: string;
  description?: string;
  leadTicketType?: string;
  statusColor?: string;
}

interface AddSubDispositionFormValues {
  subDisposition?: string;
}

// Add Status Modal Props
interface AddStatusModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: AddStatusFormValues) => void;
}

// Add Sub Disposition Modal Props
interface AddSubDispositionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: AddSubDispositionFormValues) => void;
}

// Add Status Modal Component
export const AddStatusModal: React.FC<AddStatusModalProps> = ({ 
  visible, 
  onClose, 
  onSubmit 
}) => {
  const [form] = Form.useForm<AddStatusFormValues>();

  const handleSubmit = (): void => {
    form.validateFields().then((values: AddStatusFormValues) => {
      console.log('Add Status values:', values);
      onSubmit(values);
      form.resetFields();
      onClose();
    }).catch((info: any) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleCancel = (): void => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add Status"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={400}
      centered
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
        onFinish={handleSubmit}
      >
        {/* Status Name */}
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please enter status name' }]}
          style={{ marginBottom: '16px' }}
        >
          <Input placeholder="" />
        </Form.Item>

        {/* Status Acronym */}
        <Form.Item
          label="Status Acronym"
          name="statusAcronym"
          style={{ marginBottom: '16px' }}
        >
          <Select placeholder="Select">
            <Option value="NEW">NEW</Option>
            <Option value="INP">INP</Option>
            <Option value="RES">RES</Option>
            <Option value="CLS">CLS</Option>
          </Select>
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          style={{ marginBottom: '16px' }}
        >
          <TextArea 
            rows={3}
            placeholder=""
          />
        </Form.Item>

        {/* Please Select Lead/Ticket Type or Both */}
        <Form.Item
          label="Please Select Lead/Ticket Type or Both"
          name="leadTicketType"
          style={{ marginBottom: '16px' }}
        >
          <Radio.Group>
            <Radio value="ticket">Ticket</Radio>
            <Radio value="lead">Lead</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Status Color */}
        <Form.Item
          label="Status Color"
          name="statusColor"
          style={{ marginBottom: '24px' }}
        >
          <Select placeholder="Color">
            <Option value="blue">Blue</Option>
            <Option value="green">Green</Option>
            <Option value="orange">Orange</Option>
            <Option value="red">Red</Option>
            <Option value="purple">Purple</Option>
            <Option value="gray">Gray</Option>
          </Select>
        </Form.Item>

        {/* Action Buttons */}
        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Space>
            <Button onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              style={{ 
                background: "#402EED",
                borderColor: "#402EED"
              }}
            >
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

// Add Sub Disposition Modal Component
export const AddSubDispositionModal: React.FC<AddSubDispositionModalProps> = ({ 
  visible, 
  onClose, 
  onSubmit 
}) => {
  const [form] = Form.useForm<AddSubDispositionFormValues>();

  const handleSubmit = (): void => {
    form.validateFields().then((values: AddSubDispositionFormValues) => {
      console.log('Add Sub Disposition values:', values);
      onSubmit(values);
      form.resetFields();
      onClose();
    }).catch((info: any) => {
      console.log('Validate Failed:', info);
    });
  };

  const handleCancel = (): void => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add Sub Disposition"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={400}
      centered
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
        onFinish={handleSubmit}
      >
        {/* Add Sub Disposition */}
        <Form.Item
          label="Add Sub Disposition"
          name="subDisposition"
          rules={[{ required: true, message: 'Please select a sub disposition' }]}
          style={{ marginBottom: '24px' }}
        >
          <Select placeholder="Select">
            <Option value="technical_issue">Technical Issue</Option>
            <Option value="billing_inquiry">Billing Inquiry</Option>
            <Option value="feature_request">Feature Request</Option>
            <Option value="general_inquiry">General Inquiry</Option>
            <Option value="account_setup">Account Setup</Option>
            <Option value="payment_issue">Payment Issue</Option>
            <Option value="service_request">Service Request</Option>
          </Select>
        </Form.Item>

        {/* Action Buttons */}
        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Space>
            <Button onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              style={{ 
                background: "#402EED",
                borderColor: "#402EED"
              }}
            >
              Submit
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};