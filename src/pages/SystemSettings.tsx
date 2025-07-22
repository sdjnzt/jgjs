import React, { useState } from 'react';
import {
  Card,
  Form,
  Input,
  Switch,
  Button,
  Row,
  Col,
  Select,
  InputNumber,
  message
} from 'antd';
import { systemSettings } from '../data/mockData';

const { Option } = Select;

const SystemSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 初始化表单
  React.useEffect(() => {
    form.setFieldsValue(systemSettings);
  }, [form]);

  // 保存设置
  const handleSave = async () => {
    try {
      setLoading(true);
      await form.validateFields();
      // 模拟保存
      setTimeout(() => {
        setLoading(false);
        message.success('设置已保存');
      }, 1000);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card title="基础信息" style={{ marginBottom: 24 }}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="platformName" label="平台名称" rules={[{ required: true, message: '请输入平台名称' }]}> 
                <Input placeholder="请输入平台名称" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="adminContact" label="管理员联系方式" rules={[{ required: true, message: '请输入联系方式' }]}> 
                <Input placeholder="请输入联系方式" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="location" label="平台位置"> 
                <Input placeholder="请输入平台位置" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card title="告警设置" style={{ marginBottom: 24 }}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name={["alert", "smokeThreshold"]} label="烟雾告警阈值" rules={[{ required: true, message: '请输入烟雾阈值' }]}> 
                <InputNumber min={1} max={100} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={["alert", "flameThreshold"]} label="火焰告警阈值" rules={[{ required: true, message: '请输入火焰阈值' }]}> 
                <InputNumber min={1} max={100} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={["alert", "autoAlert"]} label="自动告警"> 
                <Switch checkedChildren="开启" unCheckedChildren="关闭" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card title="通知设置" style={{ marginBottom: 24 }}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name={["notification", "smsEnabled"]} label="短信通知"> 
                <Switch checkedChildren="开启" unCheckedChildren="关闭" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={["notification", "wechatEnabled"]} label="微信通知"> 
                <Switch checkedChildren="开启" unCheckedChildren="关闭" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={["notification", "recipients"]} label="通知接收人"> 
                <Select mode="tags" style={{ width: '100%' }} placeholder="请输入接收人" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card title="设备参数设置">
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name={["device", "heartbeatInterval"]} label="心跳间隔(秒)" rules={[{ required: true, message: '请输入心跳间隔' }]}> 
                <InputNumber min={1} max={3600} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={["device", "autoUpdate"]} label="设备自动更新"> 
                <Switch checkedChildren="开启" unCheckedChildren="关闭" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name={["device", "maxOfflineMinutes"]} label="最大离线时长(分钟)" rules={[{ required: true, message: '请输入最大离线时长' }]}> 
                <InputNumber min={1} max={1440} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div style={{ textAlign: 'right', marginTop: 24 }}>
          <Button type="primary" loading={loading} onClick={handleSave}>
            保存设置
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SystemSettings; 