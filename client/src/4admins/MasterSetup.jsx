import React, { useState } from 'react';
import { Form, Input, Button, Steps, Select, Upload, InputNumber, Switch, List, Card, message } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import './MasterSetup.css';

const { Step } = Steps;
const { Option } = Select;

const MasterSetup = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [servicesForm] = Form.useForm();
  const [masterForm] = Form.useForm();
  const [services, setServices] = useState([]);
  const [masters, setMasters] = useState([]);
  const [costType, setCostType] = useState('single');
  const [formValues, setFormValues] = useState({});

  const next = () => {
    form.validateFields().then(values => {
      setFormValues(prev => ({ ...prev, ...values }));
      setCurrent(current + 1);
    }).catch(() => {
      message.error('Please fill out all required fields');
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleFinish = () => {
    const allValues = { ...formValues, services, masters };
    console.log('Form Values:', allValues);
    // Submit form values to the server
  };

  const handleServiceFinish = (values) => {
    setServices([...services, values]);
    servicesForm.resetFields();
  };

  const handleMasterFinish = (values) => {
    setMasters([...masters, values]);
    masterForm.resetFields();
  };

  const handleCostTypeChange = (checked) => {
    setCostType(checked ? 'range' : 'single');
  };

  const removeService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const removeMaster = (index) => {
    setMasters(masters.filter((_, i) => i !== index));
  };

  const steps = [
    {
      title: 'Основная информация',
      content: (
        <Form form={form} layout="vertical">
          <Form.Item
            name="salonName"
            label="Salon Name"
            rules={[{ required: true, message: 'Please enter the salon name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="salonDescription"
            label="Salon Description"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="salonAddress"
            label="Salon Address"
            rules={[{ required: true, message: 'Please enter the salon address' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="salonPhone"
            label="Salon Phone"
            rules={[{ pattern: /^\d{10}$/, message: 'Please enter a valid phone number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="salonEmail"
            label="Salon Email"
            rules={[{ type: 'email', message: 'Please enter a valid email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="salonMainImage"
            label="Main Image"
          >
            <Upload listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Мастера',
      content: (
        <>
          <Form form={masterForm} layout="vertical" onFinish={handleMasterFinish}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ pattern: /^\d{10}$/, message: 'Please enter a valid phone number' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="occupation"
              label="Occupation"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Master
              </Button>
            </Form.Item>
          </Form>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={masters}
            renderItem={(master, index) => (
              <List.Item>
                <Card title={`${master.firstName} ${master.lastName}`} actions={[<DeleteOutlined onClick={() => removeMaster(index)} />]}>
                  <p>Phone: {master.phone}</p>
                  <p>Occupation: {master.occupation}</p>
                  <p>Address: {master.address}</p>
                </Card>
              </List.Item>
            )}
          />
        </>
      ),
    },
    {
      title: 'Services Information',
      content: (
        <>
          <Form form={servicesForm} layout="vertical" onFinish={handleServiceFinish}>
            <Form.Item
              name="serviceName"
              label="Service Name"
              rules={[{ required: true, message: 'Please enter the service name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="serviceDescription"
              label="Service Description"
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="servicePrice"
              label="Service Price"
              rules={[{ required: true, message: 'Please enter the service price' }]}
            >
              {costType === 'single' ? (
                <InputNumber min={0} />
              ) : (
                <Input.Group compact>
                  <Form.Item name={['servicePrice', 'min']} noStyle rules={[{ required: true, message: 'Please enter the minimum price' }]}>
                    <InputNumber style={{ width: '50%' }} min={0} placeholder="Min" />
                  </Form.Item>
                  <Form.Item name={['servicePrice', 'max']} noStyle rules={[{ required: true, message: 'Please enter the maximum price' }]}>
                    <InputNumber style={{ width: '50%' }} min={0} placeholder="Max" />
                  </Form.Item>
                </Input.Group>
              )}
            </Form.Item>
            <Form.Item
              name="serviceDuration"
              label="Service Duration (in minutes)"
              rules={[{ required: true, message: 'Please enter the service duration' }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name="serviceCategory"
              label="Service Category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Select>
                <Option value="nails">Nails</Option>
                <Option value="hair">Hair</Option>
                <Option value="makeup">Makeup</Option>
                <Option value="spa">Spa</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="serviceMainImage"
              label="Main Image"
            >
              <Upload listType="picture" maxCount={1}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Cost Type">
              <Switch checked={costType === 'range'} onChange={handleCostTypeChange} checkedChildren="Range" unCheckedChildren="Single" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Service
              </Button>
            </Form.Item>
          </Form>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={services}
            renderItem={(service, index) => (
              <List.Item>
                <Card title={service.serviceName} actions={[<DeleteOutlined onClick={() => removeService(index)} />]}>
                  <p>Description: {service.serviceDescription}</p>
                  <p>Price: {costType === 'single' ? `${service.servicePrice} ₽` : `${service.servicePrice.min} ₽ - ${service.servicePrice.max} ₽`}</p>
                  <p>Duration: {service.serviceDuration} minutes</p>
                  <p>Category: {service.serviceCategory}</p>
                </Card>
              </List.Item>
            )}
          />
        </>
      ),
    },
  ];

  return (
    <div className="master-setup-container">
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => form.validateFields().then(values => {
            setFormValues(prev => ({ ...prev, ...values }));
            handleFinish();
          }).catch(() => message.error('Please fill out all required fields'))}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default MasterSetup;
