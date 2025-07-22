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
  Progress,
  Statistic,
  Dropdown,
  Switch,
  Slider,
  Tooltip,
  Badge,
  List,
  Descriptions,
  Divider,
  Steps,
  Timeline,
  Image,
  Rate,
  Alert
} from 'antd';
import {
  CameraOutlined,
  RadarChartOutlined,
  ThunderboltOutlined,
  SettingOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  ReloadOutlined,
  WifiOutlined,
  ThunderboltFilled,
  WarningOutlined,
  CheckCircleOutlined,
  SoundOutlined,
  VideoCameraOutlined,
  CompassOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  ToolOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  UploadOutlined,
  CloudServerOutlined,
  SyncOutlined,
  MonitorOutlined,
  AimOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  RotateLeftOutlined,
  RotateRightOutlined
} from '@ant-design/icons';
import { monitorDevices, videoStreams } from '../data/mockData';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;
const { Step } = Steps;

const DeviceManagement: React.FC = () => {
  const [deviceList, setDeviceList] = useState(monitorDevices);
  const [streamList, setStreamList] = useState(videoStreams);
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showControlModal, setShowControlModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [form] = Form.useForm();

  // 实时时间更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 过滤设备数据
  const filteredDevices = deviceList.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = typeFilter === 'all' || device.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // 获取设备类型图标
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'camera': return <CameraOutlined />;
      case 'sensor': return <RadarChartOutlined />;
      case 'drone': return <ThunderboltOutlined />;
      case 'thermal': return <MonitorOutlined />;
      default: return <SettingOutlined />;
    }
  };

  // 获取设备类型名称
  const getDeviceTypeName = (type: string) => {
    switch (type) {
      case 'camera': return '摄像头';
      case 'sensor': return '传感器';
      case 'drone': return '无人机';
      case 'thermal': return '热成像';
      default: return type;
    }
  };

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'success';
      case 'offline': return 'error';
      case 'maintenance': return 'warning';
      case 'fault': return 'error';
      default: return 'default';
    }
  };

  // 获取状态文本
  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return '在线';
      case 'offline': return '离线';
      case 'maintenance': return '维护中';
      case 'fault': return '故障';
      default: return status;
    }
  };

  // 获取信号强度显示
  const getSignalColor = (signal: number) => {
    if (signal >= 80) return '#52c41a';
    if (signal >= 60) return '#faad14';
    if (signal >= 40) return '#fa8c16';
    return '#ff4d4f';
  };

  // 获取电池显示
  const getBatteryColor = (battery: number) => {
    if (battery >= 50) return '#52c41a';
    if (battery >= 20) return '#faad14';
    return '#ff4d4f';
  };

  // 刷新设备列表
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      message.success('设备列表已刷新');
      setLoading(false);
    }, 1000);
  };

  // 查看设备详情
  const handleViewDetail = (record: any) => {
    setSelectedDevice(record);
    setShowDetailModal(true);
  };

  // 设备控制
  const handleDeviceControl = (record: any) => {
    setSelectedDevice(record);
    setShowControlModal(true);
  };

  // 设备维护
  const handleMaintenance = (record: any) => {
    setSelectedDevice(record);
    setShowMaintenanceModal(true);
  };

  // 启动设备
  const handleStartDevice = (record: any) => {
    const newDevices = deviceList.map(device => 
      device.id === record.id 
        ? { ...device, status: 'online' as const }
        : device
    );
    setDeviceList(newDevices);
    message.success(`设备 ${record.name} 已启动`);
  };

  // 停止设备
  const handleStopDevice = (record: any) => {
    const newDevices = deviceList.map(device => 
      device.id === record.id 
        ? { ...device, status: 'offline' as const }
        : device
    );
    setDeviceList(newDevices);
    message.success(`设备 ${record.name} 已停止`);
  };

  // 重启设备
  const handleRestartDevice = (record: any) => {
    setLoading(true);
    setTimeout(() => {
      const newDevices = deviceList.map(device => 
        device.id === record.id 
          ? { ...device, status: 'online' as const, lastUpdate: new Date().toLocaleString() }
          : device
      );
      setDeviceList(newDevices);
      message.success(`设备 ${record.name} 已重启`);
      setLoading(false);
    }, 2000);
  };

  // 删除设备
  const handleDeleteDevice = (record: any) => {
    const newDevices = deviceList.filter(device => device.id !== record.id);
    setDeviceList(newDevices);
    message.success(`设备 ${record.name} 已删除`);
  };

  // 添加设备
  const handleAddDevice = (values: any) => {
    const newDevice = {
      id: `device_${Date.now()}`,
      name: values.name,
      type: values.type,
      status: 'online' as const,
      location: values.location,
      coordinates: {
        latitude: values.latitude || 35.4053,
        longitude: values.longitude || 116.9734
      },
      lastUpdate: new Date().toLocaleString(),
      ...(values.type === 'camera' && {
        resolution: values.resolution || 'HD',
        coverage: values.coverage || 300,
        height: values.height || 15,
        angle: values.angle || 120,
        signal: values.signal || 90
      }),
      ...(values.type === 'sensor' && {
        battery: values.battery || 80,
        signal: values.signal || 90
      }),
      ...(values.type === 'drone' && {
        battery: values.battery || 70,
        coverage: values.coverage || 2000,
        height: values.height || 100,
        signal: values.signal || 90
      }),
      ...(values.type === 'thermal' && {
        resolution: values.resolution || 'HD',
        coverage: values.coverage || 400,
        height: values.height || 20,
        angle: values.angle || 90,
        signal: values.signal || 90
      })
    };
    
    setDeviceList([...deviceList, newDevice]);
    setShowAddModal(false);
    form.resetFields();
    message.success(`设备 ${values.name} 添加成功`);
  };

  // 批量操作
  const handleBatchOperation = (operation: string, selectedIds: string[]) => {
    switch (operation) {
      case 'start':
        const startedDevices = deviceList.map(device => 
          selectedIds.includes(device.id) 
            ? { ...device, status: 'online' as const }
            : device
        );
        setDeviceList(startedDevices);
        message.success(`已批量启动 ${selectedIds.length} 个设备`);
        break;
      case 'stop':
        const stoppedDevices = deviceList.map(device => 
          selectedIds.includes(device.id) 
            ? { ...device, status: 'offline' as const }
            : device
        );
        setDeviceList(stoppedDevices);
        message.success(`已批量停止 ${selectedIds.length} 个设备`);
        break;
      case 'maintenance':
        const maintenanceDevices = deviceList.map(device => 
          selectedIds.includes(device.id) 
            ? { ...device, status: 'maintenance' as const }
            : device
        );
        setDeviceList(maintenanceDevices);
        message.success(`已批量设置 ${selectedIds.length} 个设备为维护状态`);
        break;
      case 'delete':
        const filteredDevices = deviceList.filter(device => !selectedIds.includes(device.id));
        setDeviceList(filteredDevices);
        message.success(`已批量删除 ${selectedIds.length} 个设备`);
        break;
    }
  };

  // 设备控制操作
  const handleControlOperation = (operation: string, value?: any) => {
    message.success(`${operation} 操作已执行${value ? `: ${value}` : ''}`);
    if (operation === '录像开始' || operation === '录像停止') {
      // 更新录像状态
    }
  };

  // 设备表格列
  const deviceColumns = [
    {
      title: '设备信息',
      key: 'info',
      width: 250,
      render: (record: any) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ fontSize: '24px', marginRight: '12px', color: '#1890ff' }}>
            {getDeviceIcon(record.type)}
          </div>
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.name}</div>
            <Tag color="blue">{getDeviceTypeName(record.type)}</Tag>
          </div>
        </div>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge 
          status={getStatusColor(status)} 
          text={getStatusText(status)} 
        />
      )
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
      ellipsis: true
    },
    {
      title: '信号强度',
      dataIndex: 'signal',
      key: 'signal',
      render: (signal: number) => signal ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Progress 
            percent={signal} 
            size="small" 
            strokeColor={getSignalColor(signal)}
            style={{ width: 80, marginRight: 8 }}
          />
          <WifiOutlined style={{ color: getSignalColor(signal) }} />
        </div>
      ) : '-'
    },
    {
      title: '电池电量',
      dataIndex: 'battery',
      key: 'battery',
      render: (battery: number) => battery ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Progress 
            percent={battery} 
            size="small" 
            strokeColor={getBatteryColor(battery)}
            style={{ width: 80, marginRight: 8 }}
          />
                     <ThunderboltFilled style={{ color: getBatteryColor(battery) }} />
        </div>
      ) : '-'
    },
    {
      title: '规格参数',
      key: 'specs',
      render: (record: any) => (
        <div>
          {record.resolution && <div>分辨率: {record.resolution}</div>}
          {record.coverage && <div>覆盖: {record.coverage}m</div>}
          {record.height && <div>高度: {record.height}m</div>}
          {record.angle && <div>角度: {record.angle}°</div>}
        </div>
      )
    },
    {
      title: '最后更新',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      render: (time: string) => new Date(time).toLocaleString()
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (record: any) => (
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
                  key: 'control',
                  icon: <SettingOutlined />,
                  label: '远程控制',
                  onClick: () => handleDeviceControl(record)
                },
                {
                  key: 'maintenance',
                  icon: <ToolOutlined />,
                  label: '维护管理',
                  onClick: () => handleMaintenance(record)
                },
                { type: 'divider' },
                {
                  key: 'start',
                  icon: <PlayCircleOutlined />,
                  label: '启动设备',
                  onClick: () => handleStartDevice(record),
                  disabled: record.status === 'online'
                },
                {
                  key: 'stop',
                  icon: <StopOutlined />,
                  label: '停止设备',
                  onClick: () => handleStopDevice(record),
                  disabled: record.status === 'offline'
                },
                {
                  key: 'restart',
                  icon: <SyncOutlined />,
                  label: '重启设备',
                  onClick: () => handleRestartDevice(record)
                },
                { type: 'divider' },
                {
                  key: 'delete',
                  icon: <DeleteOutlined />,
                  label: '删除设备',
                  danger: true,
                  onClick: () => handleDeleteDevice(record)
                }
              ]
            }}
          >
            <Button size="small" icon={<SettingOutlined />} />
          </Dropdown>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      {/* 顶部统计 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)', color: 'white' }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>在线设备</span>}
              value={deviceList.filter(d => d.status === 'online').length}
              suffix={`/ ${deviceList.length}`}
              valueStyle={{ color: 'white' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #ff4d4f 0%, #cf1322 100%)', color: 'white' }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>离线设备</span>}
              value={deviceList.filter(d => d.status === 'offline').length}
              valueStyle={{ color: 'white' }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #faad14 0%, #d48806 100%)', color: 'white' }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>维护设备</span>}
              value={deviceList.filter(d => d.status === 'maintenance').length}
              valueStyle={{ color: 'white' }}
              prefix={<ToolOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)', color: 'white' }}>
            <Statistic
              title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>在线率</span>}
              value={Math.round((deviceList.filter(d => d.status === 'online').length / deviceList.length) * 100)}
              suffix="%"
              valueStyle={{ color: 'white' }}
              prefix={<HeartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card style={{ borderRadius: '12px' }}>
        <div style={{ marginBottom: '16px' }}>
          <Row gutter={16} align="middle">
            <Col span={6}>
              <Search
                placeholder="搜索设备..."
                allowClear
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
              />
            </Col>
            <Col span={4}>
              <Select
                placeholder="设备类型"
                value={typeFilter}
                onChange={setTypeFilter}
                style={{ width: '100%' }}
              >
                <Option value="all">全部类型</Option>
                <Option value="camera">摄像头</Option>
                <Option value="sensor">传感器</Option>
                <Option value="drone">无人机</Option>
                <Option value="thermal">热成像</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select
                placeholder="设备状态"
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: '100%' }}
              >
                <Option value="all">全部状态</Option>
                <Option value="online">在线</Option>
                <Option value="offline">离线</Option>
                <Option value="maintenance">维护中</Option>
                <Option value="fault">故障</Option>
              </Select>
            </Col>
            <Col span={10}>
              <Space>
                <Button 
                  type="primary"
                  icon={<ReloadOutlined />}
                  onClick={handleRefresh}
                  loading={loading}
                >
                  刷新
                </Button>
                <Button 
                  type="primary"
                  icon={<CameraOutlined />}
                  onClick={() => setShowAddModal(true)}
                >
                  添加设备
                </Button>
                <Button icon={<DownloadOutlined />}>
                  导出
                </Button>
                <Button icon={<CloudServerOutlined />}>
                  批量管理
                </Button>
              </Space>
            </Col>
          </Row>
        </div>

        <Table
          columns={deviceColumns}
          dataSource={filteredDevices}
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
          }}
          scroll={{ x: 1400 }}
          rowSelection={{
            onChange: (selectedRowKeys) => {
              // 批量操作逻辑
            }
          }}
        />
      </Card>

      {/* 设备详情弹窗 */}
      <Modal
        title="设备详情"
        open={showDetailModal}
        onCancel={() => setShowDetailModal(false)}
        footer={[
          <Button key="close" onClick={() => setShowDetailModal(false)}>
            关闭
          </Button>,
          <Button key="control" type="primary" onClick={() => handleDeviceControl(selectedDevice)}>
            远程控制
          </Button>
        ]}
        width={900}
      >
        {selectedDevice && (
          <div>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="设备ID">{selectedDevice.id}</Descriptions.Item>
              <Descriptions.Item label="设备名称">{selectedDevice.name}</Descriptions.Item>
              <Descriptions.Item label="设备类型">
                <Space>
                  {getDeviceIcon(selectedDevice.type)}
                  <Tag color="blue">{getDeviceTypeName(selectedDevice.type)}</Tag>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="设备状态">
                <Badge 
                  status={getStatusColor(selectedDevice.status)} 
                  text={getStatusText(selectedDevice.status)} 
                />
              </Descriptions.Item>
              <Descriptions.Item label="安装位置">{selectedDevice.location}</Descriptions.Item>
              <Descriptions.Item label="地理坐标">
                {selectedDevice.coordinates.latitude}, {selectedDevice.coordinates.longitude}
              </Descriptions.Item>
              {selectedDevice.signal && (
                <Descriptions.Item label="信号强度">
                  <Progress 
                    percent={selectedDevice.signal} 
                    size="small" 
                    strokeColor={getSignalColor(selectedDevice.signal)}
                    style={{ width: 120 }}
                  />
                </Descriptions.Item>
              )}
              {selectedDevice.battery && (
                <Descriptions.Item label="电池电量">
                  <Progress 
                    percent={selectedDevice.battery} 
                    size="small" 
                    strokeColor={getBatteryColor(selectedDevice.battery)}
                    style={{ width: 120 }}
                  />
                </Descriptions.Item>
              )}
            </Descriptions>

            <Divider />

            <Title level={5}>技术规格</Title>
            <Row gutter={16}>
              {selectedDevice.resolution && (
                <Col span={8}>
                  <Statistic title="分辨率" value={selectedDevice.resolution} />
                </Col>
              )}
              {selectedDevice.coverage && (
                <Col span={8}>
                  <Statistic title="覆盖范围" value={selectedDevice.coverage} suffix="米" />
                </Col>
              )}
              {selectedDevice.height && (
                <Col span={8}>
                  <Statistic title="安装高度" value={selectedDevice.height} suffix="米" />
                </Col>
              )}
              {selectedDevice.angle && (
                <Col span={8}>
                  <Statistic title="监控角度" value={selectedDevice.angle} suffix="°" />
                </Col>
              )}
            </Row>

            <Divider />

            <Title level={5}>实时视频</Title>
            <div style={{ 
              background: '#000', 
              height: '300px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: '8px'
            }}>
              <div style={{ color: 'white', textAlign: 'center' }}>
                <VideoCameraOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                <div>设备视频流</div>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>
                  {selectedDevice.type === 'camera' || selectedDevice.type === 'thermal' ? 
                    '实时视频流播放区域' : '该设备类型不支持视频显示'}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* 设备控制弹窗 */}
      <Modal
        title="设备远程控制"
        open={showControlModal}
        onCancel={() => setShowControlModal(false)}
        footer={null}
        width={800}
      >
        {selectedDevice && (
          <div>
            <Alert 
              message="设备控制"
              description={`正在控制设备: ${selectedDevice.name}`}
              type="info"
              showIcon
              style={{ marginBottom: '16px' }}
            />

            {(selectedDevice.type === 'camera' || selectedDevice.type === 'thermal') && (
              <Card title="摄像头控制" style={{ marginBottom: '16px' }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong>镜头控制</Text>
                      <div style={{ marginTop: '8px' }}>
                        <Space>
                          <Button icon={<ZoomInOutlined />} onClick={() => handleControlOperation('放大')}>
                            放大
                          </Button>
                          <Button icon={<ZoomOutOutlined />} onClick={() => handleControlOperation('缩小')}>
                            缩小
                          </Button>
                          <Button icon={<AimOutlined />} onClick={() => handleControlOperation('聚焦')}>
                            聚焦
                          </Button>
                        </Space>
                      </div>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong>云台控制</Text>
                      <div style={{ marginTop: '8px' }}>
                        <Space>
                          <Button icon={<RotateLeftOutlined />} onClick={() => handleControlOperation('左转')}>
                            左转
                          </Button>
                          <Button icon={<RotateRightOutlined />} onClick={() => handleControlOperation('右转')}>
                            右转
                          </Button>
                        </Space>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong>录像控制</Text>
                      <div style={{ marginTop: '8px' }}>
                        <Space>
                          <Button 
                            type="primary" 
                            icon={<PlayCircleOutlined />}
                            onClick={() => handleControlOperation('录像开始')}
                          >
                            开始录像
                          </Button>
                          <Button 
                            icon={<PauseCircleOutlined />}
                            onClick={() => handleControlOperation('录像停止')}
                          >
                            停止录像
                          </Button>
                        </Space>
                      </div>
                    </div>
                    <div>
                      <Text strong>图像质量</Text>
                      <div style={{ marginTop: '8px' }}>
                        <Select defaultValue="HD" style={{ width: 120 }} onChange={(value) => handleControlOperation('设置质量', value)}>
                          <Option value="4K">4K</Option>
                          <Option value="HD">高清</Option>
                          <Option value="SD">标清</Option>
                        </Select>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            )}

            {selectedDevice.type === 'drone' && (
              <Card title="无人机控制" style={{ marginBottom: '16px' }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong>飞行控制</Text>
                      <div style={{ marginTop: '8px' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Button type="primary" icon={<ThunderboltOutlined />} onClick={() => handleControlOperation('起飞')}>
                            起飞
                          </Button>
                          <Button icon={<EnvironmentOutlined />} onClick={() => handleControlOperation('降落')}>
                            降落
                          </Button>
                          <Button icon={<CompassOutlined />} onClick={() => handleControlOperation('返航')}>
                            返航
                          </Button>
                        </Space>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong>飞行高度</Text>
                      <Slider 
                        min={10} 
                        max={150} 
                        defaultValue={selectedDevice.height || 100}
                        marks={{ 10: '10m', 50: '50m', 100: '100m', 150: '150m' }}
                        onChange={(value) => handleControlOperation('设置高度', `${value}m`)}
                      />
                    </div>
                    <div>
                      <Text strong>电池状态</Text>
                      <div style={{ marginTop: '8px' }}>
                        <Progress 
                          percent={selectedDevice.battery || 0} 
                          strokeColor={getBatteryColor(selectedDevice.battery || 0)}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            )}

            {selectedDevice.type === 'sensor' && (
              <Card title="传感器控制">
                <Row gutter={16}>
                  <Col span={12}>
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong>数据采集</Text>
                      <div style={{ marginTop: '8px' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Button type="primary" onClick={() => handleControlOperation('开始采集')}>
                            开始采集
                          </Button>
                          <Button onClick={() => handleControlOperation('停止采集')}>
                            停止采集
                          </Button>
                          <Button onClick={() => handleControlOperation('校准传感器')}>
                            校准传感器
                          </Button>
                        </Space>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div style={{ marginBottom: '16px' }}>
                      <Text strong>采集间隔</Text>
                      <div style={{ marginTop: '8px' }}>
                        <Select defaultValue="30" style={{ width: '100%' }} onChange={(value) => handleControlOperation('设置间隔', `${value}秒`)}>
                          <Option value="10">10秒</Option>
                          <Option value="30">30秒</Option>
                          <Option value="60">1分钟</Option>
                          <Option value="300">5分钟</Option>
                        </Select>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            )}
          </div>
        )}
      </Modal>

      {/* 维护管理弹窗 */}
      <Modal
        title="设备维护管理"
        open={showMaintenanceModal}
        onCancel={() => setShowMaintenanceModal(false)}
        footer={[
          <Button key="close" onClick={() => setShowMaintenanceModal(false)}>
            关闭
          </Button>,
          <Button key="maintenance" type="primary" onClick={() => message.success('维护计划已保存')}>
            保存维护计划
          </Button>
        ]}
        width={800}
      >
        {selectedDevice && (
          <div>
            <Card title="维护状态" style={{ marginBottom: '16px' }}>
              <Descriptions column={2}>
                <Descriptions.Item label="设备健康度">
                  <Rate disabled defaultValue={4} />
                </Descriptions.Item>
                <Descriptions.Item label="运行时长">365天</Descriptions.Item>
                <Descriptions.Item label="上次维护">2024-12-15</Descriptions.Item>
                <Descriptions.Item label="下次维护">2025-02-15</Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="维护历史" style={{ marginBottom: '16px' }}>
              <Timeline>
                <Timeline.Item color="green">
                  <div>2025-07-22</div>
                  <div>例行检查 - 设备运行正常</div>
                </Timeline.Item>
                <Timeline.Item color="blue">
                  <div>2024-12-15</div>
                  <div>软件更新 - 升级到最新版本</div>
                </Timeline.Item>
                <Timeline.Item color="red">
                  <div>2024-11-20</div>
                  <div>故障维修 - 更换信号模块</div>
                </Timeline.Item>
              </Timeline>
            </Card>

            <Card title="维护计划">
              <List
                dataSource={[
                  { task: '镜头清洁', frequency: '每周', nextDate: '2025-07-22' },
                  { task: '软件更新', frequency: '每月', nextDate: '2025-02-01' },
                  { task: '硬件检查', frequency: '每季度', nextDate: '2025-04-01' },
                  { task: '全面保养', frequency: '每年', nextDate: '2025-12-15' }
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.task}
                      description={`频率: ${item.frequency} | 下次: ${item.nextDate}`}
                    />
                    <Button size="small">编辑</Button>
                  </List.Item>
                )}
              />
            </Card>
          </div>
        )}
      </Modal>

      {/* 添加设备弹窗 */}
      <Modal
        title="添加新设备"
        open={showAddModal}
        onOk={() => form.submit()}
        onCancel={() => setShowAddModal(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddDevice}
        >
          <Form.Item
            name="name"
            label="设备名称"
            rules={[{ required: true, message: '请输入设备名称' }]}
          >
            <Input placeholder="请输入设备名称" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="设备类型"
            rules={[{ required: true, message: '请选择设备类型' }]}
          >
            <Select placeholder="请选择设备类型">
              <Option value="camera">摄像头</Option>
              <Option value="sensor">传感器</Option>
              <Option value="drone">无人机</Option>
              <Option value="thermal">热成像</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="location"
            label="安装位置"
            rules={[{ required: true, message: '请输入安装位置' }]}
          >
            <Input placeholder="请输入安装位置" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="latitude"
                label="纬度"
              >
                <Input type="number" placeholder="35.4053" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="longitude"
                label="经度"
              >
                <Input type="number" placeholder="116.9734" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
          >
            {({ getFieldValue }) => {
              const deviceType = getFieldValue('type');
              if (deviceType === 'camera' || deviceType === 'thermal') {
                return (
                  <>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item name="resolution" label="分辨率">
                          <Select defaultValue="HD">
                            <Option value="4K">4K</Option>
                            <Option value="HD">高清</Option>
                            <Option value="SD">标清</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="coverage" label="覆盖范围(米)">
                          <Input type="number" defaultValue="300" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item name="height" label="安装高度(米)">
                          <Input type="number" defaultValue="15" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="angle" label="监控角度(度)">
                          <Input type="number" defaultValue="120" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                );
              }
              if (deviceType === 'sensor') {
                return (
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item name="battery" label="电池电量(%)">
                        <Input type="number" defaultValue="80" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="signal" label="信号强度(%)">
                        <Input type="number" defaultValue="90" />
                      </Form.Item>
                    </Col>
                  </Row>
                );
              }
              if (deviceType === 'drone') {
                return (
                  <>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item name="battery" label="电池电量(%)">
                          <Input type="number" defaultValue="70" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="coverage" label="覆盖范围(米)">
                          <Input type="number" defaultValue="2000" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item name="height" label="飞行高度(米)">
                      <Input type="number" defaultValue="100" />
                    </Form.Item>
                  </>
                );
              }
              return null;
            }}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeviceManagement; 