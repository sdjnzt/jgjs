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
  Tabs,
  Divider,
  Badge,
  List,
  Alert,
  Descriptions,
  Switch,
  Slider,
  Timeline,
  Rate,
  Image,
  Dropdown,
  Menu,
  DatePicker,
  Spin,
  Empty,
  Tooltip,
  Popover,
  notification
} from 'antd';
import {
  DashboardOutlined,
  AlertOutlined,
  EnvironmentOutlined,
  ReloadOutlined,
  SettingOutlined,
  ExportOutlined,
  EyeOutlined,
  FireOutlined,
  CloudOutlined,
  BarChartOutlined,
  CompassOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  BellOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  FilterOutlined,
  LineChartOutlined,
  PieChartOutlined,
  DownloadOutlined,
  PrinterOutlined,
  ShareAltOutlined,
  FullscreenOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  SyncOutlined,
  MessageOutlined,
  PhoneOutlined,
  WechatOutlined,
  MailOutlined
} from '@ant-design/icons';
import { smokeDetections, alerts, users } from '../data/mockData';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

// 模拟实时数据生成
const generateRealTimeData = () => {
  return {
    currentLevel: Math.floor(Math.random() * 100),
    averageLevel: Math.floor(Math.random() * 50) + 20,
    peakLevel: Math.floor(Math.random() * 30) + 70,
    affectedArea: Math.floor(Math.random() * 500) + 100,
    windSpeed: (Math.random() * 5 + 1).toFixed(1),
    windDirection: ['北风', '东北风', '东风', '东南风', '南风', '西南风', '西风', '西北风'][Math.floor(Math.random() * 8)],
    temperature: Math.floor(Math.random() * 15) + 15,
    humidity: Math.floor(Math.random() * 40) + 40,
    airQuality: Math.floor(Math.random() * 100) + 50,
    visibility: Math.floor(Math.random() * 5000) + 1000
  };
};

const SmokeDetection: React.FC = () => {
  const [detectionList, setDetectionList] = useState(smokeDetections);
  const [alertList, setAlertList] = useState(alerts.filter(a => a.type === 'smoke'));
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showControlModal, setShowControlModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedDetection, setSelectedDetection] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [realTimeData, setRealTimeData] = useState(generateRealTimeData());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [alertThreshold, setAlertThreshold] = useState(70);
  const [monitoringMode, setMonitoringMode] = useState('auto');
  const [form] = Form.useForm();

  // 实时数据更新
  useEffect(() => {
    if (autoRefresh) {
      const timer = setInterval(() => {
        setRealTimeData(generateRealTimeData());
        // 模拟新检测数据
        if (Math.random() > 0.7) {
          const newDetection = {
            id: `smoke_${Date.now()}`,
            deviceId: `sensor00${Math.floor(Math.random() * 3) + 1}`,
            deviceName: `环境监测传感器-0${Math.floor(Math.random() * 3) + 1}`,
            timestamp: new Date().toLocaleString(),
            smokeLevel: Math.floor(Math.random() * 100),
            smokeArea: Math.floor(Math.random() * 500) + 100,
            windDirection: ['北风', '东北风', '东风', '东南风'][Math.floor(Math.random() * 4)],
            windSpeed: parseFloat((Math.random() * 5 + 1).toFixed(1)),
            temperature: Math.floor(Math.random() * 15) + 15,
            humidity: Math.floor(Math.random() * 40) + 40,
            coordinates: { 
              latitude: 35.4053 + (Math.random() - 0.5) * 0.1, 
              longitude: 116.9734 + (Math.random() - 0.5) * 0.1 
            },
                         status: Math.random() > 0.3 ? 'normal' as const : Math.random() > 0.5 ? 'warning' as const : 'alert' as const
          };
          
          setDetectionList(prev => [newDetection, ...prev.slice(0, 19)]);
          
          // 如果超过阈值，触发告警
          if (newDetection.smokeLevel >= alertThreshold) {
            notification.warning({
              message: '烟雾浓度告警',
              description: `${newDetection.deviceName} 检测到烟雾浓度 ${newDetection.smokeLevel}%，超过阈值 ${alertThreshold}%`,
              placement: 'topRight',
              duration: 0
            });
          }
        }
      }, refreshInterval * 1000);
      return () => clearInterval(timer);
    }
  }, [autoRefresh, refreshInterval, alertThreshold]);

  // 过滤检测数据
  const filteredDetections = detectionList.filter(detection => {
    const matchesSearch = detection.deviceName.toLowerCase().includes(searchText.toLowerCase()) ||
                         detection.windDirection.includes(searchText);
    const matchesStatus = statusFilter === 'all' || detection.status === statusFilter;
    const matchesLevel = levelFilter === 'all' || 
                        (levelFilter === 'high' && detection.smokeLevel >= 70) ||
                        (levelFilter === 'medium' && detection.smokeLevel >= 40 && detection.smokeLevel < 70) ||
                        (levelFilter === 'low' && detection.smokeLevel < 40);
    return matchesSearch && matchesStatus && matchesLevel;
  });

  // 获取烟雾等级颜色
  const getSmokeLevelColor = (level: number) => {
    if (level >= 80) return '#ff4d4f';
    if (level >= 60) return '#fa8c16';
    if (level >= 40) return '#faad14';
    return '#52c41a';
  };

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'error';
      case 'alert': return 'error';
      case 'warning': return 'warning';
      case 'normal': return 'success';
      default: return 'default';
    }
  };

  // 获取状态文本
  const getStatusText = (status: string) => {
    switch (status) {
      case 'critical': return '严重';
      case 'alert': return '告警';
      case 'warning': return '警告';
      case 'normal': return '正常';
      default: return status;
    }
  };

  // 获取风向图标
  const getWindDirectionIcon = (direction: string) => {
    return <CompassOutlined style={{ transform: `rotate(${getWindDirectionAngle(direction)}deg)` }} />;
  };

  const getWindDirectionAngle = (direction: string) => {
    const angles: { [key: string]: number } = {
      '北风': 0, '东北风': 45, '东风': 90, '东南风': 135,
      '南风': 180, '西南风': 225, '西风': 270, '西北风': 315
    };
    return angles[direction] || 0;
  };

  // 刷新数据
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setRealTimeData(generateRealTimeData());
      message.success('数据已刷新');
      setLoading(false);
    }, 1000);
  };

  // 查看详情
  const handleViewDetail = (record: any) => {
    setSelectedDetection(record);
    setShowDetailModal(true);
  };

  // 设备控制
  const handleDeviceControl = (record: any) => {
    setSelectedDetection(record);
    setShowControlModal(true);
  };

  // 查看地图
  const handleViewMap = () => {
    setShowMapModal(true);
  };

  // 导出数据
  const handleExport = (format: string) => {
    setLoading(true);
    setTimeout(() => {
      message.success(`烟雾检测数据已导出为 ${format.toUpperCase()} 格式`);
      setLoading(false);
    }, 2000);
  };

  // 发送告警
  const handleSendAlert = (type: string, record: any) => {
    message.success(`${type === 'sms' ? '短信' : type === 'wechat' ? '微信' : '邮件'}告警已发送`);
  };

  // 控制操作
  const handleControlOperation = (operation: string, value?: any) => {
    message.success(`${operation} 操作已执行${value ? `: ${value}` : ''}`);
  };

  // 烟雾检测表格列
  const detectionColumns = [
    {
      title: '设备信息',
      key: 'device',
      width: 200,
      render: (record: any) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.deviceName}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.deviceId}</Text>
        </div>
      )
    },
    {
      title: '烟雾浓度',
      dataIndex: 'smokeLevel',
      key: 'smokeLevel',
      sorter: (a: any, b: any) => a.smokeLevel - b.smokeLevel,
      render: (level: number) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Progress
            percent={level}
            size="small"
            strokeColor={getSmokeLevelColor(level)}
            style={{ width: 80, marginRight: 8 }}
          />
          <Text strong style={{ color: getSmokeLevelColor(level) }}>{level}%</Text>
        </div>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge status={getStatusColor(status)} text={getStatusText(status)} />
      )
    },
    {
      title: '影响面积',
      dataIndex: 'smokeArea',
      key: 'smokeArea',
      render: (area: number) => `${area} m²`
    },
    {
      title: '环境数据',
      key: 'environment',
      render: (record: any) => (
        <div>
          <div><EnvironmentOutlined style={{ color: '#ff4d4f', marginRight: '4px' }} /> {record.temperature}°C</div>
          <div><CloudOutlined style={{ color: '#1890ff', marginRight: '4px' }} /> {record.humidity}%</div>
          <div>{getWindDirectionIcon(record.windDirection)} {record.windSpeed}m/s</div>
        </div>
      )
    },
    {
      title: '检测时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      sorter: (a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      render: (time: string) => (
        <div>
          <div>{new Date(time).toLocaleDateString()}</div>
          <Text type="secondary">{new Date(time).toLocaleTimeString()}</Text>
        </div>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (record: any) => (
        <Space direction="vertical" size="small">
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
                  label: '设备控制',
                  onClick: () => handleDeviceControl(record)
                },
                { type: 'divider' },
                {
                  key: 'sms',
                  icon: <PhoneOutlined />,
                  label: '发送短信',
                  onClick: () => handleSendAlert('sms', record)
                },
                {
                  key: 'wechat',
                  icon: <WechatOutlined />,
                  label: '发送微信',
                  onClick: () => handleSendAlert('wechat', record)
                },
                {
                  key: 'email',
                  icon: <MailOutlined />,
                  label: '发送邮件',
                  onClick: () => handleSendAlert('email', record)
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
      {/* 实时监控面板 */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Space>
              <CloudOutlined style={{ color: '#1890ff' }} />
              <span>烟雾检测实时监控</span>
              <Badge 
                status={autoRefresh ? 'processing' : 'default'} 
                text={autoRefresh ? '实时更新中' : '已暂停'} 
              />
            </Space>
            <Space>
              <Switch 
                checked={autoRefresh}
                onChange={setAutoRefresh}
                checkedChildren="自动"
                unCheckedChildren="手动"
              />
              <Button 
                icon={<ReloadOutlined />} 
                onClick={handleRefresh}
                loading={loading}
              >
                刷新
              </Button>
              <Button 
                icon={<SettingOutlined />}
                onClick={() => setShowSettingsModal(true)}
              >
                设置
              </Button>
            </Space>
          </div>
        }
        style={{ marginBottom: '24px', borderRadius: '12px' }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)', color: 'white', borderRadius: '12px' }}>
              <Statistic
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>当前烟雾浓度</span>}
                value={realTimeData.currentLevel}
                suffix="%"
                valueStyle={{ color: 'white', fontSize: '28px' }}
                prefix={<CloudOutlined />}
              />
              <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
                {realTimeData.currentLevel >= 80 ? '严重污染' : 
                 realTimeData.currentLevel >= 60 ? '重度污染' : 
                 realTimeData.currentLevel >= 40 ? '中度污染' : '轻度污染'}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)', color: 'white', borderRadius: '12px' }}>
              <Statistic
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>影响面积</span>}
                value={realTimeData.affectedArea}
                suffix="m²"
                valueStyle={{ color: 'white', fontSize: '28px' }}
                prefix={<EnvironmentOutlined />}
              />
              <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
                覆盖范围约 {Math.round(realTimeData.affectedArea / 100)} 个足球场
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: 'linear-gradient(135deg, #48dbfb 0%, #0abde3 100%)', color: 'white', borderRadius: '12px' }}>
              <Statistic
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>环境温度</span>}
                value={realTimeData.temperature}
                suffix="°C"
                valueStyle={{ color: 'white', fontSize: '28px' }}
                                 prefix={<BarChartOutlined />}
              />
              <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
                湿度 {realTimeData.humidity}% | 能见度 {realTimeData.visibility}m
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: 'linear-gradient(135deg, #55a3ff 0%, #003d82 100%)', color: 'white', borderRadius: '12px' }}>
              <Statistic
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>风速风向</span>}
                value={realTimeData.windSpeed}
                suffix="m/s"
                valueStyle={{ color: 'white', fontSize: '28px' }}
                prefix={getWindDirectionIcon(realTimeData.windDirection)}
              />
              <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
                {realTimeData.windDirection} | 空气质量 {realTimeData.airQuality}
              </div>
            </Card>
          </Col>
        </Row>

        {/* 告警条 */}
        {realTimeData.currentLevel >= alertThreshold && (
          <Alert
            message="烟雾浓度告警"
            description={`当前烟雾浓度 ${realTimeData.currentLevel}% 超过阈值 ${alertThreshold}%，请立即处理！`}
            type="error"
            showIcon
            style={{ marginTop: '16px' }}
            action={
              <Space>
                <Button size="small" type="primary" onClick={() => handleSendAlert('sms', null)}>
                  发送告警
                </Button>
                <Button size="small" onClick={handleViewMap}>
                  查看位置
                </Button>
              </Space>
            }
          />
        )}
      </Card>

      {/* 主要内容 */}
      <Card style={{ borderRadius: '12px' }}>
        <Tabs defaultActiveKey="realtime">
          <TabPane tab="实时检测" key="realtime">
            <div style={{ marginBottom: '16px' }}>
              <Row gutter={16} align="middle">
                <Col span={6}>
                  <Search
                    placeholder="搜索设备或风向..."
                    allowClear
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                  />
                </Col>
                <Col span={4}>
                  <Select
                    placeholder="状态筛选"
                    value={statusFilter}
                    onChange={setStatusFilter}
                    style={{ width: '100%' }}
                  >
                    <Option value="all">全部状态</Option>
                    <Option value="normal">正常</Option>
                    <Option value="warning">警告</Option>
                    <Option value="alert">告警</Option>
                    <Option value="critical">严重</Option>
                  </Select>
                </Col>
                <Col span={4}>
                  <Select
                    placeholder="浓度等级"
                    value={levelFilter}
                    onChange={setLevelFilter}
                    style={{ width: '100%' }}
                  >
                    <Option value="all">全部等级</Option>
                    <Option value="low">低浓度 (&lt;40%)</Option>
                    <Option value="medium">中浓度 (40-70%)</Option>
                    <Option value="high">高浓度 (&gt;70%)</Option>
                  </Select>
                </Col>
                <Col span={10}>
                  <Space>
                    <Button icon={<LineChartOutlined />} onClick={handleViewMap}>
                      分布图
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
                            key: 'image',
                            icon: <ShareAltOutlined />,
                            label: '导出图片',
                            onClick: () => handleExport('image')
                          }
                        ]
                      }}
                    >
                      <Button icon={<ExportOutlined />}>
                        导出数据
                      </Button>
                    </Dropdown>
                    <Button icon={<FilterOutlined />}>
                      高级筛选
                    </Button>
                  </Space>
                </Col>
              </Row>
            </div>

            <Table
              columns={detectionColumns}
              dataSource={filteredDetections}
              rowKey="id"
              pagination={{ 
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
              }}
              scroll={{ x: 1200 }}
              loading={loading}
              rowClassName={(record) => 
                record.smokeLevel >= 80 ? 'ant-table-row-danger' : 
                record.smokeLevel >= 60 ? 'ant-table-row-warning' : ''
              }
            />
          </TabPane>

          <TabPane tab="历史数据" key="history">
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="历史数据分析功能开发中..."
              />
            </div>
          </TabPane>

          <TabPane tab="统计分析" key="analysis">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="浓度趋势" style={{ height: 300 }}>
                  <div style={{ 
                    height: 200, 
                    background: '#f5f5f5', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <LineChartOutlined style={{ fontSize: 48, color: '#ccc' }} />
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="区域分布" style={{ height: 300 }}>
                  <div style={{ 
                    height: 200, 
                    background: '#f5f5f5', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <PieChartOutlined style={{ fontSize: 48, color: '#ccc' }} />
                  </div>
                </Card>
              </Col>
              <Col span={24}>
                <Card title="设备状态统计">
                  <Row gutter={16}>
                    <Col span={6}>
                      <Statistic title="在线设备" value={8} suffix="/ 10" valueStyle={{ color: '#3f8600' }} />
                    </Col>
                    <Col span={6}>
                      <Statistic title="今日检测" value={1234} suffix="次" />
                    </Col>
                    <Col span={6}>
                      <Statistic title="告警次数" value={12} valueStyle={{ color: '#cf1322' }} />
                    </Col>
                    <Col span={6}>
                      <Statistic title="处理率" value={95.6} suffix="%" valueStyle={{ color: '#1890ff' }} />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* 详情弹窗 */}
      <Modal
        title="烟雾检测详情"
        open={showDetailModal}
        onCancel={() => setShowDetailModal(false)}
        footer={[
          <Button key="close" onClick={() => setShowDetailModal(false)}>
            关闭
          </Button>,
          <Button key="control" type="primary" onClick={() => handleDeviceControl(selectedDetection)}>
            设备控制
          </Button>
        ]}
        width={800}
      >
        {selectedDetection && (
          <div>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="设备名称">{selectedDetection.deviceName}</Descriptions.Item>
              <Descriptions.Item label="设备ID">{selectedDetection.deviceId}</Descriptions.Item>
              <Descriptions.Item label="检测时间">{selectedDetection.timestamp}</Descriptions.Item>
              <Descriptions.Item label="检测状态">
                <Badge status={getStatusColor(selectedDetection.status)} text={getStatusText(selectedDetection.status)} />
              </Descriptions.Item>
              <Descriptions.Item label="烟雾浓度">
                <Progress
                  percent={selectedDetection.smokeLevel}
                  strokeColor={getSmokeLevelColor(selectedDetection.smokeLevel)}
                  format={(percent) => `${percent}%`}
                />
              </Descriptions.Item>
              <Descriptions.Item label="影响面积">{selectedDetection.smokeArea} m²</Descriptions.Item>
              <Descriptions.Item label="环境温度">{selectedDetection.temperature}°C</Descriptions.Item>
              <Descriptions.Item label="空气湿度">{selectedDetection.humidity}%</Descriptions.Item>
              <Descriptions.Item label="风速">{selectedDetection.windSpeed} m/s</Descriptions.Item>
              <Descriptions.Item label="风向">
                <Space>
                  {getWindDirectionIcon(selectedDetection.windDirection)}
                  {selectedDetection.windDirection}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="地理坐标" span={2}>
                {selectedDetection.coordinates.latitude}, {selectedDetection.coordinates.longitude}
              </Descriptions.Item>
            </Descriptions>


          </div>
        )}
      </Modal>

      {/* 设备控制弹窗 */}
      <Modal
        title="传感器控制"
        open={showControlModal}
        onCancel={() => setShowControlModal(false)}
        footer={null}
        width={600}
      >
        {selectedDetection && (
          <div>
            <Alert 
              message="设备控制"
              description={`正在控制设备: ${selectedDetection.deviceName}`}
              type="info"
              showIcon
              style={{ marginBottom: '16px' }}
            />

            <Card title="检测控制" style={{ marginBottom: '16px' }}>
              <Row gutter={16}>
                <Col span={12}>
                  <div style={{ marginBottom: '16px' }}>
                    <Text strong>检测模式</Text>
                    <div style={{ marginTop: '8px' }}>
                      <Select defaultValue={monitoringMode} style={{ width: '100%' }} onChange={setMonitoringMode}>
                        <Option value="auto">自动检测</Option>
                        <Option value="manual">手动检测</Option>
                        <Option value="scheduled">定时检测</Option>
                      </Select>
                    </div>
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    <Text strong>检测频率</Text>
                    <div style={{ marginTop: '8px' }}>
                      <Slider
                        min={1}
                        max={60}
                        value={refreshInterval}
                        onChange={setRefreshInterval}
                        marks={{ 1: '1s', 15: '15s', 30: '30s', 60: '60s' }}
                      />
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ marginBottom: '16px' }}>
                    <Text strong>告警阈值</Text>
                    <div style={{ marginTop: '8px' }}>
                      <Slider
                        min={10}
                        max={100}
                        value={alertThreshold}
                        onChange={setAlertThreshold}
                        marks={{ 10: '10%', 50: '50%', 80: '80%', 100: '100%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <Text strong>设备状态</Text>
                    <div style={{ marginTop: '8px' }}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Button type="primary" onClick={() => handleControlOperation('开始检测')}>
                          开始检测
                        </Button>
                        <Button onClick={() => handleControlOperation('停止检测')}>
                          停止检测
                        </Button>
                        <Button onClick={() => handleControlOperation('校准传感器')}>
                          校准传感器
                        </Button>
                      </Space>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>

            <Card title="通知设置">
              <Row gutter={16}>
                <Col span={8}>
                  <div style={{ textAlign: 'center' }}>
                    <Button 
                      type="primary" 
                      icon={<PhoneOutlined />}
                      onClick={() => handleSendAlert('sms', selectedDetection)}
                      style={{ width: '100%', marginBottom: '8px' }}
                    >
                      发送短信
                    </Button>
                    <Text type="secondary">立即发送短信告警</Text>
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ textAlign: 'center' }}>
                    <Button 
                      type="primary" 
                      icon={<WechatOutlined />}
                      onClick={() => handleSendAlert('wechat', selectedDetection)}
                      style={{ width: '100%', marginBottom: '8px' }}
                    >
                      发送微信
                    </Button>
                    <Text type="secondary">发送微信群消息</Text>
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ textAlign: 'center' }}>
                    <Button 
                      type="primary" 
                      icon={<MailOutlined />}
                      onClick={() => handleSendAlert('email', selectedDetection)}
                      style={{ width: '100%', marginBottom: '8px' }}
                    >
                      发送邮件
                    </Button>
                    <Text type="secondary">发送邮件报告</Text>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        )}
      </Modal>

      {/* 设置弹窗 */}
      <Modal
        title="系统设置"
        open={showSettingsModal}
        onCancel={() => setShowSettingsModal(false)}
        footer={[
          <Button key="close" onClick={() => setShowSettingsModal(false)}>
            取消
          </Button>,
          <Button key="save" type="primary" onClick={() => {
            setShowSettingsModal(false);
            message.success('设置已保存');
          }}>
            保存设置
          </Button>
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="自动刷新间隔">
            <Slider
              min={1}
              max={60}
              value={refreshInterval}
              onChange={setRefreshInterval}
              marks={{ 1: '1秒', 15: '15秒', 30: '30秒', 60: '1分钟' }}
            />
          </Form.Item>
          
          <Form.Item label="告警阈值设置">
            <Slider
              min={10}
              max={100}
              value={alertThreshold}
              onChange={setAlertThreshold}
              marks={{ 30: '30%', 50: '50%', 70: '70%', 90: '90%' }}
            />
          </Form.Item>

          <Form.Item label="监控模式">
            <Select value={monitoringMode} onChange={setMonitoringMode} style={{ width: '100%' }}>
              <Option value="auto">自动监控</Option>
              <Option value="manual">手动监控</Option>
              <Option value="scheduled">定时监控</Option>
            </Select>
          </Form.Item>

          <Form.Item label="自动刷新">
            <Switch checked={autoRefresh} onChange={setAutoRefresh} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 地图弹窗 */}
      <Modal
        title="烟雾分布地图"
        open={showMapModal}
        onCancel={() => setShowMapModal(false)}
        footer={null}
        width={1000}
      >
        <div style={{ 
          height: 500, 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderRadius: '8px',
          color: 'white'
        }}>
          <div style={{ textAlign: 'center' }}>
            <EnvironmentOutlined style={{ fontSize: 64, marginBottom: 16 }} />
            <Title level={3} style={{ color: 'white' }}>邹城市烟雾检测分布图</Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
              实时显示各检测点烟雾浓度分布情况
            </Text>
          </div>
        </div>
      </Modal>

      <style>{`
        .ant-table-row-danger {
          background-color: #fff2f0 !important;
        }
        .ant-table-row-warning {
          background-color: #fffbe6 !important;
        }
      `}</style>
    </div>
  );
};

export default SmokeDetection; 