import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Space,
  Select,
  Input,
  Table,
  Tag,
  Typography,
  Modal,
  Form,
  message,
  Tabs,
  Divider,
  Descriptions,
  Timeline,
  Dropdown,
  Menu,
  Popconfirm,
  DatePicker,
  Upload,
  Progress
} from 'antd';
import {
  AlertOutlined,
  SearchOutlined,
  ReloadOutlined,
  SettingOutlined,
  ExportOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
  UserOutlined,
  PhoneOutlined,
  MessageOutlined,
  WechatOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
  PrinterOutlined,
  SendOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { alerts, smsAlerts, wechatAlerts, users, Alert } from '../data/mockData';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const AlertManagement: React.FC = () => {
  const [alertList, setAlertList] = useState(alerts);
  const [smsList, setSmsList] = useState(smsAlerts);
  const [wechatList, setWechatList] = useState(wechatAlerts);
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // 实时时间更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 过滤告警数据
  const filteredAlerts = alertList.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchText.toLowerCase()) ||
                         alert.deviceName.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    const matchesLevel = levelFilter === 'all' || alert.level === levelFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesSearch && matchesType && matchesLevel && matchesStatus;
  });

  // 获取告警类型颜色
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'flame': return 'red';
      case 'smoke': return 'orange';
      case 'person': return 'blue';
      case 'vehicle': return 'green';
      case 'machinery': return 'purple';
      case 'system': return 'gray';
      default: return 'default';
    }
  };

  // 获取告警等级颜色
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'volcano';
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'default';
    }
  };

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'success';
      case 'processing': return 'processing';
      case 'pending': return 'warning';
      case 'dismissed': return 'default';
      default: return 'default';
    }
  };

  // 获取状态文本
  const getStatusText = (status: string) => {
    switch (status) {
      case 'resolved': return '已解决';
      case 'processing': return '处理中';
      case 'pending': return '待处理';
      case 'dismissed': return '已忽略';
      default: return status;
    }
  };

  // 刷新数据
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      message.success('数据已刷新');
      setLoading(false);
    }, 1000);
  };

  // 查看详情
  const handleViewDetail = (record: any) => {
    setSelectedAlert(record);
    setShowDetailModal(true);
  };

  // 分配告警
  const handleAssign = (record: any) => {
    setSelectedAlert(record);
    setShowAssignModal(true);
  };

  // 处理告警
  const handleProcess = (record: any) => {
    const newAlerts = alertList.map(alert => 
      alert.id === record.id 
        ? { ...alert, status: 'processing' as const }
        : alert
    );
    setAlertList(newAlerts);
    message.success('告警已开始处理');
  };

  // 解决告警
  const handleResolve = (record: any) => {
    setSelectedAlert(record);
    setShowResolveModal(true);
  };

  // 忽略告警
  const handleDismiss = (record: any) => {
    const newAlerts = alertList.map(alert => 
      alert.id === record.id 
        ? { ...alert, status: 'dismissed' as const }
        : alert
    );
    setAlertList(newAlerts);
    message.success('告警已忽略');
  };

  // 删除告警
  const handleDelete = (record: any) => {
    const newAlerts = alertList.filter(alert => alert.id !== record.id);
    setAlertList(newAlerts);
    message.success('告警已删除');
  };

  // 批量操作
  const handleBatchOperation = (operation: string, selectedIds: string[]) => {
    switch (operation) {
      case 'process':
        const processedAlerts = alertList.map(alert => 
          selectedIds.includes(alert.id) 
            ? { ...alert, status: 'processing' as const }
            : alert
        );
        setAlertList(processedAlerts);
        message.success(`已批量处理 ${selectedIds.length} 个告警`);
        break;
      case 'resolve':
        const resolvedAlerts = alertList.map(alert => 
          selectedIds.includes(alert.id) 
            ? { ...alert, status: 'resolved' as const }
            : alert
        );
        setAlertList(resolvedAlerts);
        message.success(`已批量解决 ${selectedIds.length} 个告警`);
        break;
      case 'dismiss':
        const dismissedAlerts = alertList.map(alert => 
          selectedIds.includes(alert.id) 
            ? { ...alert, status: 'dismissed' as const }
            : alert
        );
        setAlertList(dismissedAlerts);
        message.success(`已批量忽略 ${selectedIds.length} 个告警`);
        break;
      case 'delete':
        const filteredAlerts = alertList.filter(alert => !selectedIds.includes(alert.id));
        setAlertList(filteredAlerts);
        message.success(`已批量删除 ${selectedIds.length} 个告警`);
        break;
    }
  };

  // 导出数据
  const handleExport = (format: string) => {
    setLoading(true);
    setTimeout(() => {
      message.success(`告警数据已导出为 ${format.toUpperCase()} 格式`);
      setLoading(false);
    }, 2000);
  };

  // 发送通知
  const handleSendNotification = (type: string, record: any) => {
    setLoading(true);
    setTimeout(() => {
      message.success(`${type === 'sms' ? '短信' : '微信'}通知已发送`);
      setLoading(false);
    }, 1000);
  };

  // 分配确认
  const handleAssignConfirm = (values: any) => {
    const newAlerts = alertList.map(alert => 
      alert.id === selectedAlert.id 
        ? { 
            ...alert, 
            assignedTo: values.assignedTo,
            status: 'processing' as const
          }
        : alert
    );
    setAlertList(newAlerts);
    setShowAssignModal(false);
    message.success('告警已分配');
  };

  // 解决确认
  const handleResolveConfirm = (values: any) => {
    const newAlerts = alertList.map(alert => 
      alert.id === selectedAlert.id 
        ? { 
            ...alert, 
            status: 'resolved' as const
          }
        : alert
    );
    setAlertList(newAlerts);
    setShowResolveModal(false);
    message.success('告警已解决');
  };

  // 告警表格列
  const alertColumns = [
    {
      title: '告警类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={getTypeColor(type)}>
          {type === 'flame' ? '火焰' : 
           type === 'smoke' ? '烟雾' : 
           type === 'person' ? '人员' : 
           type === 'vehicle' ? '车辆' : 
           type === 'machinery' ? '农机具' : 
           type === 'system' ? '系统' : type}
        </Tag>
      )
    },
    {
      title: '告警等级',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => (
        <Tag color={getLevelColor(level)}>
          {level === 'critical' ? '严重' : 
           level === 'high' ? '高' : 
           level === 'medium' ? '中' : 
           level === 'low' ? '低' : level}
        </Tag>
      )
    },
    {
      title: '告警标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName'
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      ellipsis: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      )
    },
    {
      title: '负责人',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      render: (assignedTo: string) => assignedTo || '未分配'
    },
    {
      title: '告警时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => new Date(timestamp).toLocaleString()
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: any) => (
        <Space>
          <Button 
            type="primary" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            详情
          </Button>
          <Dropdown
            menu={{
              items: [
                {
                  key: 'assign',
                  icon: <UserOutlined />,
                  label: '分配',
                  onClick: () => handleAssign(record)
                },
                {
                  key: 'process',
                  icon: <EditOutlined />,
                  label: '处理',
                  onClick: () => handleProcess(record),
                  disabled: record.status === 'resolved'
                },
                {
                  key: 'resolve',
                  icon: <CheckCircleOutlined />,
                  label: '解决',
                  onClick: () => handleResolve(record),
                  disabled: record.status === 'resolved'
                },
                { type: 'divider' },
                {
                  key: 'sms',
                  icon: <PhoneOutlined />,
                  label: '发送短信',
                  onClick: () => handleSendNotification('sms', record)
                },
                {
                  key: 'wechat',
                  icon: <WechatOutlined />,
                  label: '发送微信',
                  onClick: () => handleSendNotification('wechat', record)
                },
                { type: 'divider' },
                {
                  key: 'dismiss',
                  icon: <CloseCircleOutlined />,
                  label: '忽略',
                  onClick: () => handleDismiss(record)
                },
                {
                  key: 'delete',
                  icon: <DeleteOutlined />,
                  label: '删除',
                  danger: true,
                  onClick: () => handleDelete(record)
                }
              ]
            }}
          >
            <Button size="small" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      )
    }
  ];

  // 短信告警表格列
  const smsColumns = [
    {
      title: '接收人',
      dataIndex: 'recipientName',
      key: 'recipientName'
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: '短信内容',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true
    },
    {
      title: '发送状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'delivered' ? 'green' : status === 'sent' ? 'blue' : status === 'failed' ? 'red' : 'orange'}>
          {status === 'delivered' ? '已送达' : 
           status === 'sent' ? '已发送' : 
           status === 'failed' ? '发送失败' : '等待发送'}
        </Tag>
      )
    },
    {
      title: '重试次数',
      dataIndex: 'retryCount',
      key: 'retryCount'
    },
    {
      title: '发送时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => new Date(timestamp).toLocaleString()
    }
  ];

  // 微信告警表格列
  const wechatColumns = [
    {
      title: '接收人',
      dataIndex: 'recipientName',
      key: 'recipientName'
    },
    {
      title: '微信ID',
      dataIndex: 'wechatId',
      key: 'wechatId'
    },
    {
      title: '消息类型',
      dataIndex: 'messageType',
      key: 'messageType',
      render: (type: string) => (
        <Tag color="blue">
          {type === 'template' ? '模板消息' : 
           type === 'card' ? '卡片消息' : '文本消息'}
        </Tag>
      )
    },
    {
      title: '发送状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'delivered' ? 'green' : status === 'sent' ? 'blue' : status === 'failed' ? 'red' : 'orange'}>
          {status === 'delivered' ? '已送达' : 
           status === 'sent' ? '已发送' : 
           status === 'failed' ? '发送失败' : '等待发送'}
        </Tag>
      )
    },
    {
      title: '发送时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => new Date(timestamp).toLocaleString()
    }
  ];

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      {/* 顶部统计 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #ff4d4f 0%, #cf1322 100%)', color: 'white' }}>
            <div style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: 'white', margin: 0 }}>{alertList.filter(a => a.status === 'pending').length}</Title>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>待处理告警</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)', color: 'white' }}>
            <div style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: 'white', margin: 0 }}>{alertList.filter(a => a.status === 'processing').length}</Title>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>处理中告警</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)', color: 'white' }}>
            <div style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: 'white', margin: 0 }}>{alertList.filter(a => a.status === 'resolved').length}</Title>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>已解决告警</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #faad14 0%, #d48806 100%)', color: 'white' }}>
            <div style={{ textAlign: 'center' }}>
              <Title level={2} style={{ color: 'white', margin: 0 }}>{Math.round((alertList.filter(a => a.status === 'resolved').length / alertList.length) * 100)}</Title>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>处理率(%)</Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card style={{ borderRadius: '12px' }}>
        <Tabs defaultActiveKey="alerts">
          <TabPane tab="告警管理" key="alerts">
            <div style={{ marginBottom: '16px' }}>
              <Row gutter={16} align="middle">
                <Col span={6}>
                  <Search
                    placeholder="搜索告警..."
                    allowClear
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                  />
                </Col>
                <Col span={4}>
                  <Select
                    placeholder="告警类型"
                    value={typeFilter}
                    onChange={setTypeFilter}
                    style={{ width: '100%' }}
                  >
                    <Option value="all">全部类型</Option>
                    <Option value="flame">火焰</Option>
                    <Option value="smoke">烟雾</Option>
                    <Option value="person">人员</Option>
                    <Option value="vehicle">车辆</Option>
                    <Option value="machinery">农机具</Option>
                    <Option value="system">系统</Option>
                  </Select>
                </Col>
                <Col span={4}>
                  <Select
                    placeholder="告警等级"
                    value={levelFilter}
                    onChange={setLevelFilter}
                    style={{ width: '100%' }}
                  >
                    <Option value="all">全部等级</Option>
                    <Option value="critical">严重</Option>
                    <Option value="high">高</Option>
                    <Option value="medium">中</Option>
                    <Option value="low">低</Option>
                  </Select>
                </Col>
                <Col span={4}>
                  <Select
                    placeholder="处理状态"
                    value={statusFilter}
                    onChange={setStatusFilter}
                    style={{ width: '100%' }}
                  >
                    <Option value="all">全部状态</Option>
                    <Option value="pending">待处理</Option>
                    <Option value="processing">处理中</Option>
                    <Option value="resolved">已解决</Option>
                    <Option value="dismissed">已忽略</Option>
                  </Select>
                </Col>
                <Col span={6}>
                  <Space>
                    <Button 
                      type="primary"
                      icon={<ReloadOutlined />}
                      onClick={handleRefresh}
                      loading={loading}
                    >
                      刷新
                    </Button>
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: 'excel',
                            icon: <DownloadOutlined />,
                            label: '导出Excel',
                            onClick: () => handleExport('excel')
                          },
                          {
                            key: 'pdf',
                            icon: <PrinterOutlined />,
                            label: '导出PDF',
                            onClick: () => handleExport('pdf')
                          },
                          {
                            key: 'csv',
                            icon: <ExportOutlined />,
                            label: '导出CSV',
                            onClick: () => handleExport('csv')
                          }
                        ]
                      }}
                    >
                      <Button icon={<ExportOutlined />}>
                        导出数据
                      </Button>
                    </Dropdown>
                    <Button icon={<SettingOutlined />}>
                      设置
                    </Button>
                  </Space>
                </Col>
              </Row>
            </div>

            <Table
              columns={alertColumns}
              dataSource={filteredAlerts}
              rowKey="id"
              pagination={{ 
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
              }}
              scroll={{ x: 1200 }}
              rowSelection={{
                onChange: (selectedRowKeys) => {
                  // 批量操作逻辑
                }
              }}
            />
          </TabPane>

          <TabPane tab="短信告警" key="sms">
            <Table
              columns={smsColumns}
              dataSource={smsList}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>

          <TabPane tab="微信告警" key="wechat">
            <Table
              columns={wechatColumns}
              dataSource={wechatList}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* 详情弹窗 */}
      <Modal
        title="告警详情"
        open={showDetailModal}
        onCancel={() => setShowDetailModal(false)}
        footer={[
          <Button key="close" onClick={() => setShowDetailModal(false)}>
            关闭
          </Button>,
          <Button key="process" type="primary" onClick={() => handleProcess(selectedAlert)}>
            立即处理
          </Button>
        ]}
        width={800}
      >
        {selectedAlert && (
          <div>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="告警ID">{selectedAlert.id}</Descriptions.Item>
              <Descriptions.Item label="告警类型">
                <Tag color={getTypeColor(selectedAlert.type)}>
                  {selectedAlert.type === 'flame' ? '火焰' : 
                   selectedAlert.type === 'smoke' ? '烟雾' : 
                   selectedAlert.type === 'person' ? '人员' : 
                   selectedAlert.type === 'vehicle' ? '车辆' : 
                   selectedAlert.type === 'machinery' ? '农机具' : 
                   selectedAlert.type === 'system' ? '系统' : selectedAlert.type}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="告警等级">
                <Tag color={getLevelColor(selectedAlert.level)}>
                  {selectedAlert.level === 'critical' ? '严重' : 
                   selectedAlert.level === 'high' ? '高' : 
                   selectedAlert.level === 'medium' ? '中' : 
                   selectedAlert.level === 'low' ? '低' : selectedAlert.level}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="处理状态">
                <Tag color={getStatusColor(selectedAlert.status)}>
                  {getStatusText(selectedAlert.status)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="设备名称">{selectedAlert.deviceName}</Descriptions.Item>
              <Descriptions.Item label="设备位置">{selectedAlert.location}</Descriptions.Item>
              <Descriptions.Item label="负责人">{selectedAlert.assignedTo || '未分配'}</Descriptions.Item>
              <Descriptions.Item label="告警时间">{new Date(selectedAlert.timestamp).toLocaleString()}</Descriptions.Item>
            </Descriptions>
            
            <Divider />
            
            <div>
              <Title level={5}>告警描述</Title>
              <Text>{selectedAlert.description}</Text>
            </div>

            <div style={{ marginTop: '16px' }}>
              <Title level={5}>地理位置</Title>
              <Text>
                经纬度: {selectedAlert.coordinates.latitude}, {selectedAlert.coordinates.longitude}
              </Text>
            </div>
          </div>
        )}
      </Modal>

      {/* 分配弹窗 */}
      <Modal
        title="分配告警"
        open={showAssignModal}
        onOk={() => form.submit()}
        onCancel={() => setShowAssignModal(false)}
      >
        <Form
          form={form}
          onFinish={handleAssignConfirm}
          layout="vertical"
        >
          <Form.Item
            name="assignedTo"
            label="分配给"
            rules={[{ required: true, message: '请选择负责人' }]}
          >
            <Select placeholder="选择负责人">
              {users.filter(u => u.role !== 'viewer').map(user => (
                <Option key={user.id} value={user.name}>{user.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="notes"
            label="备注"
          >
            <Input.TextArea rows={3} placeholder="请输入分配说明..." />
          </Form.Item>
        </Form>
      </Modal>

      {/* 解决弹窗 */}
      <Modal
        title="解决告警"
        open={showResolveModal}
        onOk={() => form.submit()}
        onCancel={() => setShowResolveModal(false)}
      >
        <Form
          form={form}
          onFinish={handleResolveConfirm}
          layout="vertical"
        >
          <Form.Item
            name="resolution"
            label="解决方案"
            rules={[{ required: true, message: '请输入解决方案' }]}
          >
            <Input.TextArea rows={4} placeholder="请描述如何解决了这个告警..." />
          </Form.Item>
          <Form.Item
            name="attachments"
            label="上传附件"
          >
            <Upload>
              <Button icon={<UploadOutlined />}>上传文件</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AlertManagement; 