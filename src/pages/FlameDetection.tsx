import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Select,
  Input,
  message,
  Badge,
  Progress,
  Statistic,
  List,
  Alert,
  Empty,
  Spin,
  BackTop,
  Dropdown,
  Modal,
  Form,
  Descriptions,
  Tabs,
  Switch,
  Slider,
  Timeline,
  DatePicker,
  Tooltip,
  Popover,
  notification,
  Divider,
  Rate,
  Image
} from 'antd';
import {
  FireOutlined,
  SearchOutlined,
  ReloadOutlined,
  SettingOutlined,
  DownloadOutlined,
  ExportOutlined,
  MoreOutlined,
  EyeOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  EnvironmentOutlined,
  ThunderboltOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  BellOutlined,
  PhoneOutlined,
  WechatOutlined,
  MailOutlined,
  DashboardOutlined,
  LineChartOutlined,
  PieChartOutlined,
  FilterOutlined,
  ShareAltOutlined,
  PrinterOutlined,
  SyncOutlined,
  CloudOutlined,
  AlertOutlined,
  CompassOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  FullscreenOutlined,
  EditOutlined,
  DeleteOutlined,
  MessageOutlined,
  VideoCameraOutlined,
  CameraOutlined,
  MonitorOutlined,
  HeatMapOutlined,
  RiseOutlined,
  FallOutlined
} from '@ant-design/icons';
import { flameDetections, alerts, users, monitorDevices } from '../data/mockData';
import { Line, Pie } from '@ant-design/charts';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

// 模拟实时火焰检测数据（更平缓的变化）
let lastData = {
  currentTemperature: 120,
  flameIntensity: 35,
  detectionRadius: 500,
  windSpeed: 2.5,
  windDirection: '东风',
  humidity: 55,
  airPressure: 1013,
  visibility: 2000,
  riskLevel: 30,
  activeDetectors: 9,
  totalDetectors: 10
};

const generateRealTimeFlameData = () => {
  // 小幅度变化，而不是完全随机
  lastData.currentTemperature += (Math.random() - 0.5) * 10;
  lastData.currentTemperature = Math.max(50, Math.min(250, lastData.currentTemperature));
  
  lastData.flameIntensity += (Math.random() - 0.5) * 15;
  lastData.flameIntensity = Math.max(0, Math.min(100, lastData.flameIntensity));
  
  lastData.windSpeed = parseFloat((lastData.windSpeed + (Math.random() - 0.5) * 1).toFixed(1));
  lastData.windSpeed = Math.max(0.5, Math.min(12, lastData.windSpeed));
  
  lastData.humidity += (Math.random() - 0.5) * 5;
  lastData.humidity = Math.max(20, Math.min(80, lastData.humidity));
  
  lastData.riskLevel += (Math.random() - 0.5) * 8;
  lastData.riskLevel = Math.max(0, Math.min(100, lastData.riskLevel));
  
  // 偶尔改变风向
  if (Math.random() > 0.9) {
    const directions = ['北风', '东北风', '东风', '东南风', '南风', '西南风', '西风', '西北风'];
    lastData.windDirection = directions[Math.floor(Math.random() * directions.length)];
  }
  
  return {
    currentTemperature: Math.round(lastData.currentTemperature),
    flameIntensity: Math.round(lastData.flameIntensity),
    detectionRadius: Math.round(lastData.detectionRadius),
    windSpeed: lastData.windSpeed.toString(),
    windDirection: lastData.windDirection,
    humidity: Math.round(lastData.humidity),
    airPressure: Math.round(lastData.airPressure),
    visibility: Math.round(lastData.visibility),
    riskLevel: Math.round(lastData.riskLevel),
    activeDetectors: lastData.activeDetectors,
    totalDetectors: lastData.totalDetectors
  };
};

const FlameDetection: React.FC = () => {
  const [detectionList, setDetectionList] = useState(flameDetections);
  const [alertList, setAlertList] = useState(alerts.filter(a => a.type === 'flame'));
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<string>('all');
  const [intensityFilter, setIntensityFilter] = useState<string>('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showControlModal, setShowControlModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [selectedDetection, setSelectedDetection] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [realTimeData, setRealTimeData] = useState(generateRealTimeFlameData());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(10);
  const [temperatureThreshold, setTemperatureThreshold] = useState(150);
  const [intensityThreshold, setIntensityThreshold] = useState(80);
  const [monitoringMode, setMonitoringMode] = useState('auto');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTabKey, setActiveTabKey] = useState('realtime');
  const [chartsReady, setChartsReady] = useState(false);
  const [form] = Form.useForm();

  // Tab 切换时的图表渲染控制
  useEffect(() => {
    if (activeTabKey === 'statistics') {
      setChartsReady(false);
      const timer = setTimeout(() => {
        setChartsReady(true);
      }, 300); // 延迟300ms确保DOM准备好
      return () => clearTimeout(timer);
    } else {
      setChartsReady(false);
    }
  }, [activeTabKey]);

  // 实时数据更新
  useEffect(() => {
    if (autoRefresh) {
      const timer = setInterval(() => {
        setRealTimeData(generateRealTimeFlameData());
        setCurrentTime(new Date());
        
                 // 模拟新火焰检测数据（降低生成频率）
         if (Math.random() > 0.95) {
                     const newDetection = {
             id: `flame_${Date.now()}`,
             deviceId: `thermal00${Math.floor(Math.random() * 3) + 1}`,
             deviceName: `红外热成像仪-0${Math.floor(Math.random() * 3) + 1}`,
             timestamp: new Date().toLocaleString(),
             flameSize: Math.floor(Math.random() * 500) + 100,
             flameIntensity: Math.floor(Math.random() * 100),
             flameHeight: Math.floor(Math.random() * 20) + 5,
             spreadSpeed: Math.floor(Math.random() * 50) + 10,
             temperature: Math.floor(Math.random() * 150) + 50, // 50-200°C
             humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
             detectionRadius: Math.floor(Math.random() * 300) + 300, // 300-600m
             windDirection: ['北风', '东北风', '东风', '东南风', '南风', '西南风', '西风', '西北风'][Math.floor(Math.random() * 8)],
             windSpeed: Math.round((Math.random() * 5 + 1) * 10) / 10, // 1.0-6.0 m/s
             lastUpdate: new Date().toLocaleString(),
             coordinates: { 
               latitude: 35.4053 + (Math.random() - 0.5) * 0.1, 
               longitude: 116.9734 + (Math.random() - 0.5) * 0.1 
             },
             status: Math.random() > 0.4 ? 'extinguished' as const : Math.random() > 0.6 ? 'controlled' as const : 'detected' as const,
             estimatedArea: Math.floor(Math.random() * 1000) + 200
           };
          
          setDetectionList(prev => [newDetection, ...prev.slice(0, 19)]);
          
                     // 如果超过阈值，触发告警（仅记录，不弹出通知）
           if (newDetection.flameIntensity >= intensityThreshold || newDetection.flameHeight >= 15) {
             // 可以在这里记录日志或更新告警状态，但不弹出通知
             console.log(`火焰检测告警: ${newDetection.deviceName} 检测到${newDetection.flameHeight >= 15 ? `高火焰 ${newDetection.flameHeight}m` : `高强度火焰 ${newDetection.flameIntensity}%`}`);
           }
        }
      }, refreshInterval * 1000);
      return () => clearInterval(timer);
    }
  }, [autoRefresh, refreshInterval, temperatureThreshold, intensityThreshold]);

  // 过滤检测数据
  const filteredDetections = detectionList.filter(detection => {
    const matchesStatus = selectedStatus === 'all' || detection.status === selectedStatus;
    const matchesDevice = selectedDevice === 'all' || detection.deviceId === selectedDevice;
         const matchesSearch = detection.deviceName.toLowerCase().includes(searchText.toLowerCase());
    const matchesIntensity = intensityFilter === 'all' || 
                           (intensityFilter === 'high' && detection.flameIntensity >= 80) ||
                           (intensityFilter === 'medium' && detection.flameIntensity >= 50 && detection.flameIntensity < 80) ||
                           (intensityFilter === 'low' && detection.flameIntensity < 50);
    return matchesStatus && matchesDevice && matchesSearch && matchesIntensity;
  });

  // 获取火焰强度颜色
  const getFlameIntensityColor = (intensity: number) => {
    if (intensity >= 80) return '#ff4d4f';
    if (intensity >= 60) return '#fa8c16';
    if (intensity >= 40) return '#faad14';
    return '#52c41a';
  };

  // 获取温度颜色
  const getTemperatureColor = (temp: number) => {
    if (temp >= 200) return '#ff4d4f';
    if (temp >= 150) return '#fa8c16';
    if (temp >= 100) return '#faad14';
    return '#52c41a';
  };

     // 获取状态颜色
   const getStatusColor = (status: string) => {
     switch (status) {
       case 'detected': return 'error';
       case 'spreading': return 'error';
       case 'controlled': return 'warning';
       case 'extinguished': return 'success';
       default: return 'default';
     }
   };

   // 获取状态文本
   const getStatusText = (status: string) => {
     switch (status) {
       case 'detected': return '已检测';
       case 'spreading': return '蔓延中';
       case 'controlled': return '已控制';
       case 'extinguished': return '已扑灭';
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

  // 获取风险等级
  const getRiskLevel = () => {
    if (realTimeData.riskLevel >= 80) return { level: '极高', color: '#ff4d4f' };
    if (realTimeData.riskLevel >= 60) return { level: '高', color: '#fa8c16' };
    if (realTimeData.riskLevel >= 40) return { level: '中', color: '#faad14' };
    return { level: '低', color: '#52c41a' };
  };

  // 刷新数据
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setRealTimeData(generateRealTimeFlameData());
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



  // 导出数据
  const handleExport = (format: string) => {
    setLoading(true);
    setTimeout(() => {
      message.success(`火焰检测数据已导出为 ${format.toUpperCase()} 格式`);
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

  // 火焰检测表格列
  const detectionColumns = [
    {
      title: '设备信息',
      key: 'device',
      width: 200,
      render: (record: any) => (
        <div>
          <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <FireOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
            {record.deviceName}
          </div>
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.deviceId}</Text>
        </div>
      )
    },
    {
      title: '火焰强度',
      dataIndex: 'flameIntensity',
      key: 'flameIntensity',
      sorter: (a: any, b: any) => a.flameIntensity - b.flameIntensity,
      render: (intensity: number) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Progress
            percent={intensity}
            size="small"
            strokeColor={getFlameIntensityColor(intensity)}
            style={{ width: 80, marginRight: 8 }}
          />
          <Text strong style={{ color: getFlameIntensityColor(intensity) }}>{intensity}%</Text>
        </div>
      )
    },
         {
       title: '火焰高度',
       dataIndex: 'flameHeight',
       key: 'flameHeight',
       sorter: (a: any, b: any) => a.flameHeight - b.flameHeight,
       render: (height: number) => (
         <div style={{ display: 'flex', alignItems: 'center' }}>
           <Text strong style={{ color: getTemperatureColor(height * 50) }}>
             {height} m
           </Text>
           {height >= 4 && <FireOutlined style={{ color: '#ff4d4f', marginLeft: 4 }} />}
         </div>
       )
     },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: any) => (
        <div>
          <Badge status={getStatusColor(status)} text={getStatusText(status)} />
                     {status === 'detected' && (
             <div style={{ marginTop: 4 }}>
               <Tag color="red">紧急处理</Tag>
             </div>
           )}
        </div>
      )
    },
         {
       title: '火焰面积',
       dataIndex: 'flameSize',
       key: 'flameSize',
       render: (size: number) => `${size} m²`
     },
         {
       title: '蔓延速度',
       dataIndex: 'spreadSpeed',
       key: 'spreadSpeed',
       render: (speed: number) => (
         <div style={{ display: 'flex', alignItems: 'center' }}>
           <Text strong style={{ color: speed > 5 ? '#ff4d4f' : speed > 3 ? '#fa8c16' : '#52c41a' }}>
             {speed} m/min
           </Text>
           {speed > 5 && <WarningOutlined style={{ color: '#ff4d4f', marginLeft: 4 }} />}
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
      width: 160,
      fixed: 'right' as const,
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
                {
                  key: 'video',
                  icon: <VideoCameraOutlined />,
                  label: '查看视频',
                  onClick: () => message.info('正在加载视频...')
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
            <Button size="small" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      )
    }
  ];

  const riskLevel = getRiskLevel();

  // 统计分析图表数据准备
  const temperatureTrendData = flameDetections.slice(0, 10).map((item, idx) => ({
    time: item.timestamp.split(' ')[1] || `T${idx}`,
    temperature: Math.round(item.flameHeight * 50 + 100), // 用火焰高度模拟温度
  }));

  const intensityDistData = [
    { type: '低强度 (<40%)', value: flameDetections.filter(d => d.flameIntensity < 40).length },
    { type: '中强度 (40-80%)', value: flameDetections.filter(d => d.flameIntensity >= 40 && d.flameIntensity < 80).length },
    { type: '高强度 (>=80%)', value: flameDetections.filter(d => d.flameIntensity >= 80).length },
  ];

  const total = intensityDistData.reduce((sum, item) => sum + item.value, 0);

  const onlineDevices = 9;
  const totalDevices = 10;
  const efficiency = onlineDevices / totalDevices;
  const gaugeConfig = {
    percent: efficiency,
    range: { color: '#36cfc9' },
    indicator: { pointer: { style: { stroke: '#36cfc9' } }, pin: { style: { stroke: '#36cfc9' } } },
    axis: { label: { formatter: (v: string) => `${Math.round(Number(v) * 100)}%` } },
    statistic: {
      title: { style: { color: '#888', fontSize: 14 }, content: '在线率' },
      content: { style: { color: '#36cfc9', fontSize: 24 }, content: `${Math.round(efficiency * 100)}%` },
    },
    height: 180,
  };

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      {/* 实时监控面板 */}
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Space>
              <FireOutlined style={{ color: '#ff4d4f' }} />
              <span>火焰检测实时监控</span>
              <Badge 
                status={autoRefresh ? 'processing' : 'default'} 
                text={autoRefresh ? '实时监控中' : '已暂停'} 
              />
              <Tag color={riskLevel.color}>{riskLevel.level}风险</Tag>
            </Space>
            <Space>
              <Text type="secondary">{currentTime.toLocaleString()}</Text>
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
            <Card style={{ background: 'linear-gradient(135deg, #ff4757 0%, #c44569 100%)', color: 'white', borderRadius: '12px' }}>
              <Statistic
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>最高温度</span>}
                value={realTimeData.currentTemperature}
                suffix="°C"
                valueStyle={{ color: 'white', fontSize: '28px' }}
                prefix={<FireOutlined />}
              />
              <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
                {realTimeData.currentTemperature >= 200 ? '极度危险' : 
                 realTimeData.currentTemperature >= 150 ? '高度危险' : 
                 realTimeData.currentTemperature >= 100 ? '中度危险' : '安全范围'}
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: 'linear-gradient(135deg, #ff6348 0%, #e55039 100%)', color: 'white', borderRadius: '12px' }}>
              <Statistic
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>火焰强度</span>}
                value={realTimeData.flameIntensity}
                suffix="%"
                valueStyle={{ color: 'white', fontSize: '28px' }}
                prefix={<ThunderboltOutlined />}
              />
              <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
                检测半径 {realTimeData.detectionRadius}m
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: 'linear-gradient(135deg, #0abde3 0%, #006ba6 100%)', color: 'white', borderRadius: '12px' }}>
              <Statistic
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>设备状态</span>}
                value={realTimeData.activeDetectors}
                suffix={`/${realTimeData.totalDetectors}`}
                valueStyle={{ color: 'white', fontSize: '28px' }}
                prefix={<MonitorOutlined />}
              />
              <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
                在线率 {Math.round((realTimeData.activeDetectors / realTimeData.totalDetectors) * 100)}%
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ background: 'linear-gradient(135deg, #55a3ff 0%, #003d82 100%)', color: 'white', borderRadius: '12px' }}>
              <Statistic
                title={<span style={{ color: 'rgba(255,255,255,0.8)' }}>环境风速</span>}
                value={realTimeData.windSpeed}
                suffix="m/s"
                valueStyle={{ color: 'white', fontSize: '28px' }}
                prefix={getWindDirectionIcon(realTimeData.windDirection)}
              />
              <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
                {realTimeData.windDirection} | 湿度 {realTimeData.humidity}%
              </div>
            </Card>
          </Col>
        </Row>

                 {/* 高强度/高火焰告警条 */}
         {(realTimeData.flameIntensity >= intensityThreshold) && (
           <Alert
             message="火焰检测告警"
             description={`检测到高强度火焰 ${realTimeData.flameIntensity}%，超过阈值 ${intensityThreshold}%`}
             type="error"
             showIcon
             style={{ marginTop: '16px' }}
             action={
               <Space>
                 <Button size="small" type="primary" onClick={() => handleSendAlert('sms', null)}>
                   紧急通知
                 </Button>
               </Space>
             }
           />
         )}
      </Card>

      {/* 主要内容 */}
      <Card style={{ borderRadius: '12px' }}>
        {/* 公共操作区域 */}
        <div style={{ marginBottom: '16px', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
          <Row gutter={16} align="middle">
            <Col span={14}>
              <Space size="large">
                <Statistic
                  title="总检测次数"
                  value={detectionList.length}
                  prefix={<FireOutlined />}
                  valueStyle={{ color: '#ff4d4f' }}
                />
                <Statistic
                  title="高强度火焰"
                  value={detectionList.filter(d => d.flameIntensity > 80).length}
                  prefix={<WarningOutlined />}
                  valueStyle={{ color: '#faad14' }}
                />
                <Statistic
                  title="已控制"
                  value={detectionList.filter(d => d.status === 'controlled' || d.status === 'extinguished').length}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Space>
            </Col>
            <Col span={10}>
              <Space style={{ float: 'right' }}>
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
              </Space>
            </Col>
          </Row>
        </div>

        <Tabs 
          activeKey={activeTabKey}
          onChange={setActiveTabKey}
          defaultActiveKey="realtime"
        >
          <TabPane tab="实时检测" key="realtime">
            <div style={{ marginBottom: '16px' }}>
              <Row gutter={16} align="middle">
                <Col span={5}>
                  <Search
                    placeholder="搜索设备或风向..."
                    allowClear
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                  />
                </Col>
                <Col span={3}>
                                     <Select
                     placeholder="状态筛选"
                     value={selectedStatus}
                     onChange={setSelectedStatus}
                     style={{ width: '100%' }}
                   >
                     <Option value="all">全部状态</Option>
                     <Option value="detected">已检测</Option>
                     <Option value="spreading">蔓延中</Option>
                     <Option value="controlled">已控制</Option>
                     <Option value="extinguished">已扑灭</Option>
                   </Select>
                </Col>
                <Col span={3}>
                  <Select
                    placeholder="设备筛选"
                    value={selectedDevice}
                    onChange={setSelectedDevice}
                    style={{ width: '100%' }}
                  >
                    <Option value="all">全部设备</Option>
                    {monitorDevices.filter(d => d.type === 'thermal').map(device => (
                      <Option key={device.id} value={device.id}>{device.name}</Option>
                    ))}
                  </Select>
                </Col>
                <Col span={3}>
                  <Select
                    placeholder="强度等级"
                    value={intensityFilter}
                    onChange={setIntensityFilter}
                    style={{ width: '100%' }}
                  >
                    <Option value="all">全部强度</Option>
                    <Option value="low">低强度 (&lt;50%)</Option>
                    <Option value="medium">中强度 (50-80%)</Option>
                    <Option value="high">高强度 (&gt;80%)</Option>
                  </Select>
                </Col>
                <Col span={10}>
                  <Space style={{ float: 'right' }}>
                    <Button icon={<FilterOutlined />}>
                      高级筛选
                    </Button>
                    <Button icon={<ReloadOutlined />} onClick={() => setRealTimeData(generateRealTimeFlameData())}>
                      刷新
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
              scroll={{ x: 1300 }}
              loading={loading}
              rowClassName={(record) => 
                record.status === 'detected' ? 'ant-table-row-critical' : 
                record.status === 'spreading' ? 'ant-table-row-warning' : ''
              }
            />
          </TabPane>

          <TabPane tab="历史记录" key="history">
            <Table
              columns={[
                { title: '时间', dataIndex: 'timestamp', key: 'timestamp', width: 160 },
                { title: '设备名称', dataIndex: 'deviceName', key: 'deviceName', width: 140 },
                { title: '火焰强度', dataIndex: 'flameIntensity', key: 'flameIntensity', width: 110, render: (v: number) => <Tag color={v > 80 ? 'red' : v > 50 ? 'orange' : 'blue'}>{v}</Tag> },
                { title: '火焰高度(米)', dataIndex: 'flameHeight', key: 'flameHeight', width: 110 },
                { title: '火焰大小(㎡)', dataIndex: 'flameSize', key: 'flameSize', width: 110 },
                { title: '蔓延速度(m/min)', dataIndex: 'spreadSpeed', key: 'spreadSpeed', width: 120 },
                { title: '状态', dataIndex: 'status', key: 'status', width: 110, render: (s: string) => {
                  const map: any = { detected: '已检测', spreading: '蔓延中', controlled: '已控制', extinguished: '已扑灭' };
                  const color: any = { detected: 'red', spreading: 'orange', controlled: 'blue', extinguished: 'green' };
                  return <Tag color={color[s] || 'default'}>{map[s] || s}</Tag>;
                } },
                { title: '操作', key: 'action', width: 100, fixed: 'right' as const, render: (_: any, record: any) => (
                  <Button size="small" icon={<EyeOutlined />} onClick={() => handleViewDetail(record)}>详情</Button>
                ) }
              ]}
              dataSource={flameDetections}
              rowKey="id"
              pagination={{ pageSize: 10, showSizeChanger: true, showQuickJumper: true, showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条` }}
              scroll={{ x: 900 }}
            />
          </TabPane>

          <TabPane tab="风险评估" key="risk">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="火灾风险等级" style={{ textAlign: 'center' }}>
                  <div style={{ margin: '20px 0' }}>
                    <Progress
                      type="circle"
                      percent={realTimeData.riskLevel}
                      strokeColor={riskLevel.color}
                      width={120}
                      format={() => riskLevel.level}
                    />
                  </div>
                  <Text style={{ color: riskLevel.color, fontSize: '18px', fontWeight: 'bold' }}>
                    当前风险等级: {riskLevel.level}
                  </Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="风险因素分析">
                  <List
                    size="small"
                    dataSource={[
                      { factor: '环境温度', value: `${realTimeData.currentTemperature}°C`, risk: realTimeData.currentTemperature > 150 ? 'high' : 'medium' },
                      { factor: '风速条件', value: `${realTimeData.windSpeed}m/s`, risk: parseFloat(realTimeData.windSpeed) > 8 ? 'high' : 'low' },
                      { factor: '空气湿度', value: `${realTimeData.humidity}%`, risk: realTimeData.humidity < 40 ? 'high' : 'low' },
                      { factor: '能见度', value: `${realTimeData.visibility}m`, risk: realTimeData.visibility < 1000 ? 'medium' : 'low' },
                    ]}
                    renderItem={item => (
                      <List.Item>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span>{item.factor}</span>
                          <Space>
                            <span>{item.value}</span>
                            <Tag color={item.risk === 'high' ? 'red' : item.risk === 'medium' ? 'orange' : 'green'}>
                              {item.risk === 'high' ? '高风险' : item.risk === 'medium' ? '中风险' : '低风险'}
                            </Tag>
                          </Space>
                        </div>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
              <Col span={24}>
                <Card title="风险预警建议">
                  <Timeline>
                    <Timeline.Item color={realTimeData.currentTemperature > 200 ? 'red' : 'green'}>
                      <strong>温度监控</strong>
                      <p>当前温度 {realTimeData.currentTemperature}°C，{realTimeData.currentTemperature > 200 ? '建议立即启动消防预案' : '温度正常，继续监控'}</p>
                    </Timeline.Item>
                    <Timeline.Item color={parseFloat(realTimeData.windSpeed) > 8 ? 'red' : 'green'}>
                      <strong>风力条件</strong>
                      <p>当前风速 {realTimeData.windSpeed}m/s，{parseFloat(realTimeData.windSpeed) > 8 ? '大风天气，火灾蔓延风险较高' : '风力适中，有利于火情控制'}</p>
                    </Timeline.Item>
                    <Timeline.Item color={realTimeData.humidity < 40 ? 'orange' : 'green'}>
                      <strong>湿度条件</strong>
                      <p>当前湿度 {realTimeData.humidity}%，{realTimeData.humidity < 40 ? '湿度较低，注意防火' : '湿度适宜'}</p>
                    </Timeline.Item>
                  </Timeline>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* 详情弹窗 */}
      <Modal
        title="火焰检测详情"
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
        width={900}
      >
        {selectedDetection && (
          <div>
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ 
                  height: 300, 
                  background: '#000',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <video
                    src={`${process.env.PUBLIC_URL}/images/jiankong/3.mp4`}
                    autoPlay
                    muted
                    loop
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}>
                    <FireOutlined style={{ marginRight: '4px', color: '#ff4d4f' }} />
                    红外热成像监控
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '10px'
                  }}>
                    <span style={{ color: '#52c41a' }}>●</span> 实时
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <Descriptions column={1} bordered size="small">
                  <Descriptions.Item label="设备名称">{selectedDetection.deviceName}</Descriptions.Item>
                  <Descriptions.Item label="设备ID">{selectedDetection.deviceId}</Descriptions.Item>
                  <Descriptions.Item label="检测状态">
                    <Badge status={getStatusColor(selectedDetection.status)} text={getStatusText(selectedDetection.status)} />
                  </Descriptions.Item>
                  <Descriptions.Item label="火焰强度">
                    <Progress
                      percent={selectedDetection.flameIntensity}
                      strokeColor={getFlameIntensityColor(selectedDetection.flameIntensity)}
                      format={(percent) => `${percent}%`}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="检测温度">
                    <Text strong style={{ color: getTemperatureColor(selectedDetection.temperature) }}>
                      {selectedDetection.temperature}°C
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="检测范围">{selectedDetection.detectionRadius} m</Descriptions.Item>
                  <Descriptions.Item label="环境湿度">{selectedDetection.humidity}%</Descriptions.Item>
                  <Descriptions.Item label="风速风向">
                    <Space>
                      {getWindDirectionIcon(selectedDetection.windDirection)}
                      {selectedDetection.windDirection} {selectedDetection.windSpeed}m/s
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>


          </div>
        )}
      </Modal>

      {/* 设备控制弹窗 */}
      <Modal
        title="热成像设备控制"
        open={showControlModal}
        onCancel={() => setShowControlModal(false)}
        footer={null}
        width={700}
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

            <Row gutter={16}>
              <Col span={12}>
                <Card title="检测控制" size="small">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <Text strong>检测模式</Text>
                      <Select defaultValue={monitoringMode} style={{ width: '100%', marginTop: 8 }} onChange={setMonitoringMode}>
                        <Option value="auto">自动检测</Option>
                        <Option value="manual">手动检测</Option>
                        <Option value="scheduled">定时检测</Option>
                        <Option value="emergency">应急模式</Option>
                      </Select>
                    </div>
                    <div>
                      <Text strong>检测频率 ({refreshInterval}秒)</Text>
                                             <Slider
                         min={5}
                         max={60}
                         value={refreshInterval}
                         onChange={setRefreshInterval}
                         marks={{ 5: '5s', 15: '15s', 30: '30s', 60: '60s' }}
                        style={{ marginTop: 8 }}
                      />
                    </div>
                  </Space>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="阈值设置" size="small">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <Text strong>温度阈值 ({temperatureThreshold}°C)</Text>
                      <Slider
                        min={50}
                        max={300}
                        value={temperatureThreshold}
                        onChange={setTemperatureThreshold}
                        marks={{ 50: '50°C', 150: '150°C', 250: '250°C', 300: '300°C' }}
                        style={{ marginTop: 8 }}
                      />
                    </div>
                    <div>
                      <Text strong>强度阈值 ({intensityThreshold}%)</Text>
                      <Slider
                        min={10}
                        max={100}
                        value={intensityThreshold}
                        onChange={setIntensityThreshold}
                        marks={{ 10: '10%', 50: '50%', 80: '80%', 100: '100%' }}
                        style={{ marginTop: 8 }}
                      />
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>

            <Card title="设备操作" style={{ marginTop: 16 }}>
              <Row gutter={16}>
                <Col span={8}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Button type="primary" block onClick={() => handleControlOperation('开始检测')}>
                      <PlayCircleOutlined /> 开始检测
                    </Button>
                    <Button block onClick={() => handleControlOperation('暂停检测')}>
                      <PauseCircleOutlined /> 暂停检测
                    </Button>
                    <Button danger block onClick={() => handleControlOperation('停止检测')}>
                      <StopOutlined /> 停止检测
                    </Button>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Button block onClick={() => handleControlOperation('放大视野')}>
                      <ZoomInOutlined /> 放大视野
                    </Button>
                    <Button block onClick={() => handleControlOperation('缩小视野')}>
                      <ZoomOutOutlined /> 缩小视野
                    </Button>
                    <Button block onClick={() => handleControlOperation('全屏显示')}>
                      <FullscreenOutlined /> 全屏显示
                    </Button>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Button type="primary" block onClick={() => handleSendAlert('sms', selectedDetection)}>
                      <PhoneOutlined /> 发送短信
                    </Button>
                    <Button type="primary" block onClick={() => handleSendAlert('wechat', selectedDetection)}>
                      <WechatOutlined /> 发送微信
                    </Button>
                    <Button type="primary" block onClick={() => handleSendAlert('email', selectedDetection)}>
                      <MailOutlined /> 发送邮件
                    </Button>
                  </Space>
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
               min={5}
               max={60}
               value={refreshInterval}
               onChange={setRefreshInterval}
               marks={{ 5: '5秒', 15: '15秒', 30: '30秒', 60: '60秒' }}
             />
           </Form.Item>
          
          <Form.Item label="温度告警阈值">
            <Slider
              min={50}
              max={300}
              value={temperatureThreshold}
              onChange={setTemperatureThreshold}
              marks={{ 50: '50°C', 150: '150°C', 250: '250°C', 300: '300°C' }}
            />
          </Form.Item>

          <Form.Item label="强度告警阈值">
            <Slider
              min={10}
              max={100}
              value={intensityThreshold}
              onChange={setIntensityThreshold}
              marks={{ 10: '10%', 50: '50%', 80: '80%', 100: '100%' }}
            />
          </Form.Item>

          <Form.Item label="监控模式">
            <Select value={monitoringMode} onChange={setMonitoringMode} style={{ width: '100%' }}>
              <Option value="auto">自动监控</Option>
              <Option value="manual">手动监控</Option>
              <Option value="scheduled">定时监控</Option>
              <Option value="emergency">应急模式</Option>
            </Select>
          </Form.Item>

          <Form.Item label="自动刷新">
            <Switch checked={autoRefresh} onChange={setAutoRefresh} />
          </Form.Item>
        </Form>
      </Modal>



      <style>{`
        .ant-table-row-critical {
          background-color: #fff2f0 !important;
        }
        .ant-table-row-warning {
          background-color: #fffbe6 !important;
        }
      `}</style>
    </div>
  );
};

export default FlameDetection; 