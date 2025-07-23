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
  Badge,
  Typography,
  Tooltip,
  Modal,
  Progress,
  Divider,
  Alert,
  List,
  Avatar,
  Statistic,
  Descriptions
} from 'antd';
import {
  EyeOutlined,
  SearchOutlined,
  ReloadOutlined,
  SettingOutlined,
  CameraOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  BarChartOutlined,
  FireOutlined,
  AlertOutlined,
  SmileOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import { recognitionResults, monitorDevices } from '../data/mockData';
import burnImage from '../assets/33.png';

const { Title, Text } = Typography;
const { Option } = Select;
const { Search } = Input;

const ImageRecognition: React.FC = () => {
  const [selectedResult, setSelectedResult] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [confidenceFilter, setConfidenceFilter] = useState('all');
  const [showDetail, setShowDetail] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 实时时间更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 过滤识别结果
  const filteredResults = recognitionResults.filter(result => {
    const matchesSearch = result.deviceName.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = typeFilter === 'all' || result.type === typeFilter;
    const matchesDevice = deviceFilter === 'all' || result.deviceId === deviceFilter;
    const matchesConfidence = confidenceFilter === 'all' || 
      (confidenceFilter === 'high' && result.confidence >= 80) ||
      (confidenceFilter === 'medium' && result.confidence >= 60 && result.confidence < 80) ||
      (confidenceFilter === 'low' && result.confidence < 60);
    return matchesSearch && matchesType && matchesDevice && matchesConfidence;
  });

  // 获取类型颜色
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'burning': return 'red';
      case 'straw_pile': return 'orange';
      case 'person': return 'blue';
      case 'vehicle': return 'green';
      case 'machinery': return 'purple';
      default: return 'default';
    }
  };

  // 获取类型图标
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'burning': return <FireOutlined />;
      case 'straw_pile': return <AlertOutlined />;
      case 'person': return <SmileOutlined />;
      case 'vehicle': return <EnvironmentOutlined />;
      case 'machinery': return <TrophyOutlined />;
      default: return <EyeOutlined />;
    }
  };

  // 获取类型文本
  const getTypeText = (type: string) => {
    switch (type) {
      case 'burning': return '燃烧';
      case 'straw_pile': return '秸秆堆放';
      case 'person': return '人员';
      case 'vehicle': return '车辆';
      case 'machinery': return '农机具';
      default: return type;
    }
  };

  // 获取置信度颜色
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'green';
    if (confidence >= 60) return 'orange';
    return 'red';
  };

  // 获取置信度文本
  const getConfidenceText = (confidence: number) => {
    if (confidence >= 80) return '高';
    if (confidence >= 60) return '中';
    return '低';
  };

  // 识别结果表格列
  const resultColumns = [
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName',
      render: (text: string) => (
        <Space>
          <CameraOutlined style={{ color: '#1890ff' }} />
          <span>{text}</span>
        </Space>
      )
    },
    {
      title: '识别类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={getTypeColor(type)} icon={getTypeIcon(type)}>
          {getTypeText(type)}
        </Tag>
      )
    },
    {
      title: '置信度',
      dataIndex: 'confidence',
      key: 'confidence',
      render: (confidence: number) => (
        <Space direction="vertical" size={0}>
          <Progress 
            percent={confidence} 
            size="small" 
            status={confidence >= 80 ? 'success' : confidence >= 60 ? 'normal' : 'exception'}
            showInfo={false}
            strokeColor={getConfidenceColor(confidence)}
          />
          <Text style={{ fontSize: '12px' }}>
            {confidence}% ({getConfidenceText(confidence)})
          </Text>
        </Space>
      )
    },
    {
      title: '识别时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => new Date(timestamp).toLocaleString()
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button 
            type="primary" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedResult(record.id);
              setShowDetail(true);
            }}
          >
            详情
          </Button>
          <Button 
            size="small" 
            icon={<BarChartOutlined />}
          >
            分析
          </Button>
        </Space>
      )
    }
  ];

  // 统计信息
  const totalResults = recognitionResults.length;
  const highConfidenceResults = recognitionResults.filter(r => r.confidence >= 80).length;
  const burningResults = recognitionResults.filter(r => r.type === 'burning').length;
  const strawPileResults = recognitionResults.filter(r => r.type === 'straw_pile').length;
  const averageConfidence = Math.round(
    recognitionResults.reduce((sum, r) => sum + r.confidence, 0) / recognitionResults.length
  );

  // 实时识别状态
  const recentResults = recognitionResults.slice(0, 5).map(result => ({
    ...result,
    avatar: getTypeIcon(result.type)
  }));

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      {/* 顶部状态栏 */}
      <Alert
        message={
          <Space size="large">
            <Space>
              <EyeOutlined style={{ color: '#1890ff' }} />
              <Text strong>AI图像识别系统</Text>
            </Space>
            <Divider type="vertical" />
            <Space>
              <ClockCircleOutlined />
              <Text>{currentTime.toLocaleString()}</Text>
            </Space>
            <Divider type="vertical" />
            <Space>
              <CheckCircleOutlined />
              <Text>识别准确率: <Text strong style={{ color: '#52c41a' }}>{averageConfidence}%</Text></Text>
            </Space>
            <Divider type="vertical" />
            <Space>
              <BarChartOutlined />
              <Text>今日识别: <Text strong style={{ color: '#1890ff' }}>{totalResults}</Text></Text>
            </Space>
          </Space>
        }
        type="info"
        style={{ marginBottom: '24px', borderRadius: '8px' }}
      />

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '12px' }}>
            <Statistic
              title="总识别次数"
              value={totalResults}
              prefix={<EyeOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '12px' }}>
            <Statistic
              title="高置信度"
              value={highConfidenceResults}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '12px' }}>
            <Statistic
              title="燃烧检测"
              value={burningResults}
              prefix={<FireOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: '12px' }}>
            <Statistic
              title="秸秆堆放"
              value={strawPileResults}
              prefix={<AlertOutlined style={{ color: '#fa8c16' }} />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要识别区域 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card 
            title={
              <Space>
                <EyeOutlined style={{ color: '#1890ff' }} />
                <span>识别结果</span>
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
                  placeholder="类型筛选"
                  style={{ width: 120 }}
                  value={typeFilter}
                  onChange={setTypeFilter}
                >
                  <Option value="all">全部类型</Option>
                  <Option value="burning">燃烧</Option>
                  <Option value="straw_pile">秸秆堆放</Option>
                  <Option value="person">人员</Option>
                  <Option value="vehicle">车辆</Option>
                  <Option value="machinery">农机具</Option>
                </Select>
                <Select
                  placeholder="置信度"
                  style={{ width: 100 }}
                  value={confidenceFilter}
                  onChange={setConfidenceFilter}
                >
                  <Option value="all">全部</Option>
                  <Option value="high">高</Option>
                  <Option value="medium">中</Option>
                  <Option value="low">低</Option>
                </Select>
                <Button 
                  type="primary"
                  icon={<ReloadOutlined />}
                >
                  刷新
                </Button>
              </Space>
            }
            style={{ borderRadius: '12px' }}
          >
            <Table
              columns={resultColumns}
              dataSource={filteredResults}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              size="small"
              scroll={{ x: 800 }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card 
            title={
              <Space>
                <BarChartOutlined style={{ color: '#1890ff' }} />
                <span>实时识别</span>
              </Space>
            }
            style={{ borderRadius: '12px' }}
          >
            <List
              dataSource={recentResults}
              renderItem={(item) => (
                <List.Item style={{ padding: '8px 0' }}>
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        icon={item.avatar} 
                        style={{ 
                          backgroundColor: getTypeColor(item.type) === 'orange' ? '#fa8c16' :
                                          getTypeColor(item.type) === 'red' ? '#ff4d4f' :
                                          getTypeColor(item.type) === 'blue' ? '#1890ff' :
                                          getTypeColor(item.type) === 'green' ? '#52c41a' : '#722ed1'
                        }}
                      />
                    }
                    title={
                      <Space>
                        <Text strong style={{ fontSize: '14px' }}>
                          {getTypeText(item.type)}
                        </Text>
                        <Badge 
                          status={item.confidence >= 80 ? 'success' : 
                                  item.confidence >= 60 ? 'warning' : 'error'} 
                        />
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={0}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {item.deviceName} - {item.confidence}% 置信度
                        </Text>
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

      {/* 识别详情弹窗 */}
      <Modal
        title="识别详情"
        open={showDetail}
        onCancel={() => setShowDetail(false)}
        footer={null}
        width={800}
      >
        {selectedResult && (() => {
          const result = recognitionResults.find(r => r.id === selectedResult);
          if (!result) return null;
          
          return (
            <div>
              <Row gutter={16}>
                <Col span={14}>
                  <div style={{ 
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: '1px solid #d9d9d9',
                    position: 'relative',
                    paddingTop: '56.25%' // 16:9 宽高比
                  }}>
                    <img
                      src={burnImage}
                      alt="识别图像"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    {result.type === 'burning' && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          background: 'rgba(255, 77, 79, 0.9)',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <FireOutlined /> 火点检测
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
                    {result.type === 'burning' ? '检测到秸秆焚烧行为' : '检测到异常情况'}
                  </div>
                </Col>
                <Col span={10}>
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="设备名称">{result.deviceName}</Descriptions.Item>
                    <Descriptions.Item label="识别类型">
                      <Tag color={getTypeColor(result.type)} icon={getTypeIcon(result.type)}>
                        {getTypeText(result.type)}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="置信度">
                      <Space>
                        <Progress 
                          percent={result.confidence} 
                          size="small" 
                          status={result.confidence >= 80 ? 'success' : result.confidence >= 60 ? 'normal' : 'exception'}
                          showInfo={false}
                          strokeColor={getConfidenceColor(result.confidence)}
                          style={{ width: 100 }}
                        />
                        <Text>{result.confidence}%</Text>
                      </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="识别时间">{new Date(result.timestamp).toLocaleString()}</Descriptions.Item>
                    <Descriptions.Item label="地理位置">
                      <Space>
                        <EnvironmentOutlined />
                        <Text>邹城市某区域</Text>
                      </Space>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
              
              <Divider />
              
              <Title level={5}>识别分析</Title>
              <Row gutter={16}>
                <Col span={8}>
                  <Card size="small">
                    <Statistic
                      title="置信度评级"
                      value={getConfidenceText(result.confidence)}
                      valueStyle={{ color: getConfidenceColor(result.confidence) }}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size="small">
                    <Statistic
                      title="识别速度"
                      value="0.3"
                      suffix="秒"
                      valueStyle={{ color: '#52c41a' }}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size="small">
                    <Statistic
                      title="处理状态"
                      value="已完成"
                      valueStyle={{ color: '#1890ff' }}
                    />
                  </Card>
                </Col>
              </Row>

              <div style={{ marginTop: '16px' }}>
                <Alert
                  message="系统分析"
                  description={
                    <div>
                      <p>• 检测到明显的火焰特征，疑似秸秆焚烧行为</p>
                      <p>• 火焰面积约 2-3 平方米，处于初始阶段</p>
                      <p>• 建议立即派遣巡查人员前往现场处理</p>
                    </div>
                  }
                  type="warning"
                  showIcon
                />
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
};

export default ImageRecognition; 