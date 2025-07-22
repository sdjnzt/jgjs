import React, { useState, useEffect } from 'react';
import { 
  Card,
  Row, 
  Col, 
  Statistic, 
  Table, 
  Tag, 
  Progress, 
  Space, 
  Typography,
  List,
  Avatar,
  Badge,
  Button,
  Select,
  Input,
  Alert,
  Divider,
  Tooltip,
  Timeline
} from 'antd';
import { 
  CameraOutlined,
  AlertOutlined,
  FireOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  BarChartOutlined,
  RiseOutlined,
  FallOutlined,
  ReloadOutlined,
  BellOutlined,
  SafetyOutlined,
  GlobalOutlined,
  MonitorOutlined
} from '@ant-design/icons';
import { statistics, monitorDevices, alerts, areas } from '../data/mockData';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Search } = Input;

const Dashboard: React.FC = () => {
  const [filteredDevices, setFilteredDevices] = useState(monitorDevices);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 实时时间更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 过滤设备
  useEffect(() => {
    let filtered = monitorDevices;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(device => device.status === statusFilter);
    }
    
    if (searchText) {
      filtered = filtered.filter(device => 
        device.name.toLowerCase().includes(searchText.toLowerCase()) ||
        device.location.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    setFilteredDevices(filtered);
  }, [searchText, statusFilter]);

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'green';
      case 'offline': return 'red';
      case 'maintenance': return 'orange';
      case 'fault': return 'red';
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
      default: return '未知';
    }
  };

  // 获取设备类型图标
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'camera': return <CameraOutlined />;
      case 'sensor': return <EyeOutlined />;
      case 'drone': return <EnvironmentOutlined />;
      case 'thermal': return <FireOutlined />;
      default: return <CameraOutlined />;
    }
  };

  // 计算系统健康度
  const systemHealth = Math.round((statistics.onlineDevices / statistics.totalDevices) * 100);
  const alertRate = Math.round((statistics.activeAlerts / statistics.totalAlerts) * 100);

  // 设备表格列
  const deviceColumns = [
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          {getTypeIcon(record.type)}
          <span>{text}</span>
        </Space>
      )
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color="blue">
          {type === 'camera' ? '摄像头' : 
           type === 'sensor' ? '传感器' : 
           type === 'drone' ? '无人机' : 
           type === 'thermal' ? '热成像' : type}
        </Tag>
      )
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge 
          status={status === 'online' ? 'success' : status === 'maintenance' ? 'warning' : 'error'} 
          text={getStatusText(status)} 
        />
      )
    },
    {
      title: '最后更新',
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      render: (date: string) => new Date(date).toLocaleString()
    }
  ];

  // 最新告警列表
  const recentAlerts = alerts.slice(0, 5).map(alert => ({
    ...alert,
    avatar: alert.type === 'smoke' ? <AlertOutlined style={{ color: '#ff7875' }} /> :
            alert.type === 'flame' ? <FireOutlined style={{ color: '#ff4d4f' }} /> :
            <ExclamationCircleOutlined style={{ color: '#faad14' }} />
  }));

  // 系统状态时间线
  const systemTimeline = [
    {
      color: 'green',
      children: '系统启动完成 - 所有设备连接正常',
      time: '09:00:00'
    },
    {
      color: 'blue',
      children: '例行巡检完成 - 发现2个潜在风险点',
      time: '10:30:00'
    },
    {
      color: 'orange',
      children: '烟雾检测告警 - 已自动处理',
      time: '11:15:00'
    },
    {
      color: 'green',
      children: '火焰检测系统校准完成',
      time: '12:00:00'
    }
  ];

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      {/* 顶部状态栏 */}
          <Alert
            message={
                <Space size="large">
                  <Space>
              <CheckCircleOutlined style={{ color: '#52c41a' }} />
              <Text strong>系统运行正常</Text>
                  </Space>
                  <Divider type="vertical" />
                  <Space>
              <ClockCircleOutlined />
              <Text>{currentTime.toLocaleString()}</Text>
                  </Space>
            <Divider type="vertical" />
                  <Space>
              <BellOutlined />
              <Text>未读告警: <Text strong style={{ color: '#ff4d4f' }}>{statistics.activeAlerts}</Text></Text>
                  </Space>
            <Divider type="vertical" />
                  <Space>
              <GlobalOutlined />
              <Text>在线设备: <Text strong style={{ color: '#52c41a' }}>{statistics.onlineDevices}/{statistics.totalDevices}</Text></Text>
                  </Space>
                </Space>
            }
            type="success"
        style={{ marginBottom: '24px', borderRadius: '8px' }}
      />

      {/* 核心统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
            <Card 
              style={{ 
                borderRadius: '12px',
              background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
              color: 'white'
            }}
            bodyStyle={{ padding: '24px' }}
          >
            <Statistic
              title={<Text style={{ color: 'white', fontSize: '16px' }}>设备总数</Text>}
              value={statistics.totalDevices}
              prefix={<CameraOutlined style={{ color: 'white' }} />}
              valueStyle={{ color: 'white', fontSize: '28px' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>监控设备</Text>
              </div>
            </Card>
          </Col>
        <Col xs={24} sm={12} lg={6}>
                     <Card 
            style={{ 
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)',
              color: 'white'
            }}
            bodyStyle={{ padding: '24px' }}
          >
            <Statistic
              title={<Text style={{ color: 'white', fontSize: '16px' }}>在线设备</Text>}
              value={statistics.onlineDevices}
              prefix={<CheckCircleOutlined style={{ color: 'white' }} />}
              valueStyle={{ color: 'white', fontSize: '28px' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>运行正常</Text>
             </div>
           </Card>
         </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            style={{ 
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ff4d4f 0%, #cf1322 100%)',
              color: 'white'
            }}
            bodyStyle={{ padding: '24px' }}
          >
            <Statistic
              title={<Text style={{ color: 'white', fontSize: '16px' }}>活跃告警</Text>}
              value={statistics.activeAlerts}
              prefix={<AlertOutlined style={{ color: 'white' }} />}
              valueStyle={{ color: 'white', fontSize: '28px' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>需要处理</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            style={{ 
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #722ed1 0%, #531dab 100%)',
              color: 'white'
            }}
            bodyStyle={{ padding: '24px' }}
          >
            <Statistic
              title={<Text style={{ color: 'white', fontSize: '16px' }}>系统健康度</Text>}
              value={systemHealth}
              suffix="%"
              prefix={<BarChartOutlined style={{ color: 'white' }} />}
              valueStyle={{ color: 'white', fontSize: '28px' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                {systemHealth > 90 ? '优秀' : systemHealth > 70 ? '良好' : '一般'}
              </Text>
                  </div>
          </Card>
        </Col>
      </Row>

      {/* 系统状态概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <SafetyOutlined style={{ color: '#1890ff' }} />
                <span>设备在线率</span>
              </Space>
            }
            style={{ borderRadius: '12px' }}
          >
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span>设备在线率</span>
                <span>{systemHealth}%</span>
                        </div>
              <Progress 
                percent={systemHealth} 
                status={systemHealth > 90 ? 'success' : systemHealth > 70 ? 'normal' : 'exception'}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
              />
            </div>
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ textAlign: 'center', padding: '16px', background: '#f6ffed', borderRadius: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>{statistics.onlineDevices}</div>
                  <div style={{ color: '#666' }}>在线设备</div>
                </div>
                  </Col>
              <Col span={12}>
                <div style={{ textAlign: 'center', padding: '16px', background: '#fff2f0', borderRadius: '8px' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4d4f' }}>{statistics.totalDevices - statistics.onlineDevices}</div>
                  <div style={{ color: '#666' }}>离线设备</div>
            </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <AlertOutlined style={{ color: '#ff4d4f' }} />
                <span>告警统计</span>
              </Space>
            }
            style={{ borderRadius: '12px' }}
          >
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span>告警处理率</span>
                <span>{Math.round((statistics.resolvedAlerts / statistics.totalAlerts) * 100)}%</span>
              </div>
              <Progress 
                percent={Math.round((statistics.resolvedAlerts / statistics.totalAlerts) * 100)} 
                status="success"
                strokeColor={{
                  '0%': '#ff7875',
                  '100%': '#52c41a',
                }}
              />
            </div>
            <Row gutter={16}>
              <Col span={8}>
                <div style={{ textAlign: 'center', padding: '12px', background: '#fff2f0', borderRadius: '8px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff4d4f' }}>{statistics.activeAlerts}</div>
                  <div style={{ color: '#666', fontSize: '12px' }}>待处理</div>
                </div>
              </Col>
              <Col span={8}>
                <div style={{ textAlign: 'center', padding: '12px', background: '#f6ffed', borderRadius: '8px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#52c41a' }}>{statistics.resolvedAlerts}</div>
                  <div style={{ color: '#666', fontSize: '12px' }}>已处理</div>
                </div>
              </Col>
              <Col span={8}>
                <div style={{ textAlign: 'center', padding: '12px', background: '#fff7e6', borderRadius: '8px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#faad14' }}>{statistics.falseAlarms}</div>
                  <div style={{ color: '#666', fontSize: '12px' }}>误报</div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* 设备管理和最新告警 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
      <Card 
        title={
            <Space>
              <MonitorOutlined style={{ color: '#1890ff' }} />
                <span>设备状态</span>
            </Space>
            }
            extra={
            <Space>
                <Search
                  placeholder="搜索设备"
                  allowClear
                  style={{ width: 200 }}
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                />
              <Select 
                placeholder="状态筛选"
                style={{ width: 120 }}
                  value={statusFilter}
                  onChange={setStatusFilter}
              >
                <Option value="all">全部状态</Option>
                <Option value="online">在线</Option>
                <Option value="offline">离线</Option>
                  <Option value="maintenance">维护中</Option>
                  <Option value="fault">故障</Option>
              </Select>
                <Button 
                  type="primary" 
                  icon={<ReloadOutlined />}
                size="small"
                >
                  刷新
                </Button>
            </Space>
        }
            style={{ borderRadius: '12px' }}
      >
        <Table
              columns={deviceColumns}
              dataSource={filteredDevices}
          rowKey="id"
              pagination={{ pageSize: 8 }}
          size="small"
              scroll={{ x: 800 }}
        />
      </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card 
            title={
              <Space>
                <BellOutlined style={{ color: '#ff4d4f' }} />
                <span>最新告警</span>
              </Space>
            }
            style={{ borderRadius: '12px' }}
      >
        <List
              itemLayout="horizontal"
              dataSource={recentAlerts}
              renderItem={(item) => (
                <List.Item style={{ padding: '12px 0' }}>
              <List.Item.Meta
                    avatar={<Avatar icon={item.avatar} />}
                title={
                      <Space>
                        <Text strong style={{ fontSize: '14px' }}>{item.title}</Text>
                        <Tag color={item.level === 'high' ? 'red' : item.level === 'medium' ? 'orange' : 'green'}>
                          {item.level === 'high' ? '高' : item.level === 'medium' ? '中' : '低'}
                        </Tag>
                      </Space>
                }
                description={
                      <Space direction="vertical" size={0}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>{item.location}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          <ClockCircleOutlined /> {new Date(item.timestamp).toLocaleString()}
                        </Text>
                      </Space>
                }
              />
            </List.Item>
          )}
        />
          </Card>
        </Col>
      </Row>

      {/* 系统状态时间线 */}
      <Row style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card 
            title={
              <Space>
                <ClockCircleOutlined style={{ color: '#1890ff' }} />
                <span>系统状态时间线</span>
              </Space>
            }
            style={{ borderRadius: '12px' }}
          >
            <Timeline
              items={systemTimeline.map(item => ({
                color: item.color,
                children: (
          <div>
                    <div style={{ fontWeight: 'bold' }}>{item.children}</div>
                    <div style={{ color: '#666', fontSize: '12px' }}>{item.time}</div>
                  </div>
                )
              }))}
            />
          </Card>
              </Col>
            </Row>
    </div>
  );
};

export default Dashboard; 