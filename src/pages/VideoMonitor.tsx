import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Space,
  Select,
  Input,
  Tag,
  Typography,
  Alert,
  List,
  Statistic,
  Modal,
  Badge,
  Switch,
  Table,
  Tooltip,
  Progress,
  Divider
} from 'antd';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  SettingOutlined,
  CameraOutlined,
  VideoCameraOutlined,
  FullscreenOutlined,
  DownloadOutlined,
  BellOutlined,
  EyeOutlined,
  SecurityScanOutlined,
  MonitorOutlined,
  DashboardOutlined,
  AlertOutlined,
  GlobalOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  FireOutlined
} from '@ant-design/icons';
import { videoStreams, monitorDevices, alerts } from '../data/mockData';

const { Option } = Select;
const { Search } = Input;
const { Text, Title } = Typography;

const VideoMonitor: React.FC = () => {
  const [selectedStream, setSelectedStream] = useState<string>('stream001'); // 默认选择第一个，即2.mp4
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [layoutMode, setLayoutMode] = useState<'single' | 'four' | 'nine'>('single');

  // 实时更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 过滤视频流
  const filteredStreams = videoStreams.filter(stream => {
    const matchesSearch = stream.deviceName.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || stream.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 获取当前选中的视频流
  const currentStream = videoStreams.find(s => s.id === selectedStream);
  const currentDevice = monitorDevices.find(d => d.id === currentStream?.deviceId);

  // 获取活跃告警数量
  const activeAlerts = alerts.filter(alert => alert.status === 'pending' || alert.status === 'processing').length;

  // 统计数据
  const stats = {
    totalCameras: videoStreams.length,
    activeCameras: videoStreams.filter(s => s.status === 'live' || s.status === 'recording').length,
    onlineDevices: monitorDevices.filter(d => d.status === 'online').length,
    totalDevices: monitorDevices.length,
    alertsToday: activeAlerts
  };

  // 渲染主视频区域
  const renderMainVideo = () => {
    if (layoutMode === 'single') {
      return (
        <div style={{ 
          background: '#000', 
          borderRadius: '8px',
          position: 'relative',
          height: '480px',
          border: '1px solid #d9d9d9'
        }}>
          <video
            key={selectedStream}
            src={currentStream?.streamUrl}
            autoPlay
            muted
            loop
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            您的浏览器不支持视频播放
          </video>

          {/* 视频信息覆盖层 */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '14px'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              <CameraOutlined style={{ marginRight: '8px' }} />
              {currentStream?.deviceName}
            </div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>
              <EnvironmentOutlined style={{ marginRight: '4px' }} />
              {currentDevice?.location || '位置信息'}
            </div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>
              {currentStream?.status === 'live' ? 
                <><span style={{ color: '#52c41a' }}>●</span> 实时直播</> : 
                currentStream?.status === 'recording' ? 
                <><span style={{ color: '#1890ff' }}>●</span> 录制中</> : 
                <><span style={{ color: '#faad14' }}>●</span> 离线</>
              }
            </div>
          </div>

          {/* 质量和时间标签 */}
          <div style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px'
          }}>
            <div style={{ fontWeight: 'bold' }}>{currentStream?.quality}</div>
            <div style={{ marginTop: '4px', opacity: 0.8 }}>
              {currentTime.toLocaleTimeString()}
            </div>
          </div>

          {/* 控制按钮 */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            display: 'flex',
            gap: '8px'
          }}>
            <Button
              size="small"
              icon={<FullscreenOutlined />}
              onClick={() => setIsFullscreen(true)}
            >
              全屏
            </Button>
            <Button
              size="small"
              icon={<DownloadOutlined />}
            >
              下载
            </Button>
          </div>
        </div>
      );
    }

    // 多分割画面
    const splitCount = layoutMode === 'four' ? 4 : 9;
    const colSpan = layoutMode === 'four' ? 12 : 8;
    const displayStreams = filteredStreams.slice(0, splitCount);

    return (
      <Row gutter={[8, 8]} style={{ height: '480px' }}>
        {displayStreams.map((stream) => (
          <Col span={colSpan} key={stream.id}>
            <div
              style={{
                background: '#000',
                borderRadius: '6px',
                overflow: 'hidden',
                position: 'relative',
                height: layoutMode === 'four' ? '235px' : '150px',
                border: selectedStream === stream.id ? '2px solid #1890ff' : '1px solid #d9d9d9',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedStream(stream.id)}
            >
              <video
                src={stream.streamUrl}
                muted
                loop
                autoPlay
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                right: '8px',
                background: 'rgba(0,0,0,0.8)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                textAlign: 'center'
              }}>
                {stream.deviceName}
              </div>
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: stream.status === 'live' ? '#52c41a' : 
                           stream.status === 'recording' ? '#1890ff' : '#faad14'
              }} />
            </div>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      {/* 页面头部 */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, color: '#262626' }}>
          视频监控
        </Title>
        <Text type="secondary">
          实时监控秸秆禁烧情况，共 {stats.totalCameras} 个监控点
        </Text>
      </div>

      {/* 统计概览 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="监控设备总数"
              value={stats.totalCameras}
              prefix={<CameraOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="在线设备"
              value={stats.activeCameras}
              suffix={`/${stats.totalCameras}`}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="覆盖区域"
              value="16"
              suffix="个镇街"
              prefix={<GlobalOutlined style={{ color: '#722ed1' }} />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="活跃告警"
              value={stats.alertsToday}
              suffix="条"
              prefix={<AlertOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 告警提示 */}
      {activeAlerts > 0 && (
        <Alert
          message={`当前有 ${activeAlerts} 条活跃告警需要处理`}
          type="warning"
          showIcon
          style={{ marginBottom: '24px' }}
          action={
            <Button size="small" onClick={() => setAlertModalVisible(true)}>
              查看详情
            </Button>
          }
        />
      )}

      <Row gutter={16}>
        {/* 主视频播放区域 */}
        <Col span={18}>
          <Card 
            title={
              <Space>
                <VideoCameraOutlined />
                <span>监控画面</span>
                {currentStream && (
                  <Tag color={
                    currentStream.status === 'live' ? 'green' : 
                    currentStream.status === 'recording' ? 'blue' : 'orange'
                  }>
                    {currentStream.deviceName}
                  </Tag>
                )}
              </Space>
            }
            extra={
              <Space>
                <span style={{ fontSize: '12px', color: '#8c8c8c' }}>自动刷新</span>
                <Switch
                  checked={autoRefresh}
                  onChange={setAutoRefresh}
                  size="small"
                />
                <Select
                  value={layoutMode}
                  onChange={setLayoutMode}
                  size="small"
                  style={{ width: 80 }}
                >
                  <Option value="single">单画面</Option>
                  <Option value="four">四分割</Option>
                  <Option value="nine">九分割</Option>
                </Select>
                <Button 
                  icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                  type="primary"
                  size="small"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? '暂停' : '播放'}
                </Button>
              </Space>
            }
          >
            {renderMainVideo()}
          </Card>
        </Col>

        {/* 侧边栏 */}
        <Col span={6}>
          {/* 设备列表 */}
          <Card 
            title="监控设备列表"
            size="small"
            extra={
              <Button 
                icon={<ReloadOutlined />} 
                size="small"
                type="text"
              />
            }
            style={{ marginBottom: '16px' }}
          >
            {/* 搜索和筛选 */}
            <Space direction="vertical" style={{ width: '100%', marginBottom: '16px' }}>
              <Search
                placeholder="搜索设备名称"
                size="small"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                allowClear
              />
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                size="small"
                style={{ width: '100%' }}
                placeholder="筛选状态"
              >
                <Option value="all">全部状态</Option>
                <Option value="live">直播中</Option>
                <Option value="recording">录制中</Option>
                <Option value="offline">离线</Option>
              </Select>
            </Space>

                         {/* 设备列表 */}
             <List
               size="small"
               dataSource={filteredStreams.slice(0, 8)}
               renderItem={stream => {
                 return (
                   <List.Item
                     style={{
                       padding: '4px 8px',
                       cursor: 'pointer',
                       background: selectedStream === stream.id ? '#e6f7ff' : 'transparent',
                       borderRadius: '4px',
                       border: selectedStream === stream.id ? '1px solid #1890ff' : '1px solid transparent'
                     }}
                     onClick={() => setSelectedStream(stream.id)}
                   >
                     <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                       <Badge 
                         status={
                           stream.status === 'live' ? 'processing' : 
                           stream.status === 'recording' ? 'success' : 'error'
                         }
                         dot
                         style={{ marginRight: '8px' }}
                       />
                       <div style={{ flex: 1, minWidth: 0 }}>
                         <div style={{ 
                           fontSize: '12px', 
                           fontWeight: selectedStream === stream.id ? 'bold' : 'normal',
                           color: selectedStream === stream.id ? '#1890ff' : '#262626',
                           whiteSpace: 'nowrap',
                           overflow: 'hidden',
                           textOverflow: 'ellipsis'
                         }}>
                           {stream.deviceName}
                         </div>
                         <div style={{ 
                           fontSize: '10px', 
                           color: '#8c8c8c',
                           marginTop: '2px'
                         }}>
                           {stream.status === 'live' ? '直播' : 
                            stream.status === 'recording' ? '录制' : '离线'} · {stream.quality}
                         </div>
                       </div>
                     </div>
                   </List.Item>
                 );
               }}
             />
          </Card>

          {/* 快速操作 */}
          <Card title="快速操作" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button 
                block 
                size="small"
                icon={<BellOutlined />}
                onClick={() => setAlertModalVisible(true)}
                danger={activeAlerts > 0}
              >
                告警管理 {activeAlerts > 0 && `(${activeAlerts})`}
              </Button>
              <Button 
                block 
                size="small"
                icon={<DownloadOutlined />}
              >
                批量下载
              </Button>
              <Button 
                block 
                size="small"
                icon={<SettingOutlined />}
              >
                设备管理
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* 告警详情模态框 */}
      <Modal
        title="告警详情"
        open={alertModalVisible}
        onCancel={() => setAlertModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setAlertModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={600}
      >
        <List
          dataSource={alerts.filter(alert => alert.status === 'pending' || alert.status === 'processing')}
          renderItem={alert => (
            <List.Item>
              <List.Item.Meta
                avatar={<AlertOutlined style={{ color: '#ff4d4f' }} />}
                title={alert.title}
                description={
                  <div>
                    <div>{alert.description}</div>
                    <div style={{ marginTop: '4px', fontSize: '12px', color: '#8c8c8c' }}>
                      {alert.deviceName} · {alert.timestamp}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Modal>

      {/* 全屏视频模态框 */}
      <Modal
        title={null}
        open={isFullscreen}
        onCancel={() => setIsFullscreen(false)}
        footer={null}
        width="100vw"
        style={{ top: 0, padding: 0 }}
        styles={{ body: { padding: 0, height: '100vh' } }}
      >
        <video
          src={currentStream?.streamUrl}
          autoPlay
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            background: '#000'
          }}
        />
      </Modal>
    </div>
  );
};

export default VideoMonitor; 