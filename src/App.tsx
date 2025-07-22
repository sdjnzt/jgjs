import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, theme, Button, Avatar, Dropdown, Space, Typography } from 'antd';
import {
  DashboardOutlined,
  VideoCameraOutlined,
  EyeOutlined,
  FireOutlined,
  AlertOutlined,
  BarChartOutlined,
  SettingOutlined,
  AuditOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined as SettingIcon,
  BellOutlined,
  ClusterOutlined,
  MonitorOutlined,
  SecurityScanOutlined,
  GlobalOutlined,
  FileTextOutlined,
  FileSearchOutlined,
} from '@ant-design/icons';
import Dashboard from './pages/Dashboard';
import VideoMonitor from './pages/VideoMonitor';
import ImageRecognition from './pages/ImageRecognition';
import SmokeDetection from './pages/SmokeDetection';
import FlameDetection from './pages/FlameDetection';
import AlertManagement from './pages/AlertManagement';
import DataAnalysis from './pages/DataAnalysis';
import DeviceManagement from './pages/DeviceManagement';
import InspectionManagement from './pages/InspectionManagement';
import SystemSettings from './pages/SystemSettings';

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: '/',
    icon: <DashboardOutlined />,
    label: '总览仪表板',
  },
  {
    key: '/video-monitor',
    icon: <VideoCameraOutlined />,
    label: '视频监控',
  },
  {
    key: '/image-recognition',
    icon: <EyeOutlined />,
    label: '图像识别',
  },
  {
    key: '/smoke-detection',
    icon: <ClusterOutlined />,
    label: '烟雾检测',
  },
  {
    key: '/flame-detection',
    icon: <FireOutlined />,
    label: '火焰检测',
  },
  {
    key: '/alert-management',
    icon: <AlertOutlined />,
    label: '告警管理',
  },
  {
    key: '/data-analysis',
    icon: <BarChartOutlined />,
    label: '数据分析',
  },
  {
    key: '/device-management',
    icon: <MonitorOutlined />,
    label: '设备管理',
  },
  {
    key: '/inspection-management',
    icon: <AuditOutlined />,
    label: '巡检管理',
  },
  {
    key: '/system-settings',
    icon: <SettingOutlined />,
    label: '系统设置',
  },
];

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // 模拟通知数量
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 处理通知点击
  const handleNotificationClick = () => {
    console.log('查看系统通知');
    // 这里可以添加通知面板的逻辑
  };

  // 处理管理员菜单点击
  const handleAdminMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        console.log('查看个人资料');
        break;
      case 'settings':
        console.log('打开账户设置');
        break;
      case 'logout':
        console.log('用户退出登录');
        // 这里可以添加退出登录的逻辑
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          height: '100vh',
          zIndex: 1000,
          overflow: 'auto'
        }}
      >
        <div className="logo">
          {collapsed ? '秸秆监控' : '秸秆禁烧视频监控平台'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname === '/' ? '/' : location.pathname]}
          defaultSelectedKeys={['/']}
          items={menuItems}
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
        <Header style={{ 
          padding: '0 24px', 
          background: colorBgContainer,
          position: 'fixed',
          top: 0,
          right: 0,
          left: collapsed ? 80 : 200,
          zIndex: 999,
          transition: 'left 0.2s',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              秸秆禁烧视频监控平台
            </div>
          </div>
          
          {/* 管理员组件 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* 通知图标 */}
            <Button
              type="text"
              icon={<BellOutlined />}
              style={{ fontSize: '16px', position: 'relative' }}
              title="系统通知"
              onClick={handleNotificationClick}
            >
              {notificationCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  backgroundColor: '#ff4d4f',
                  color: 'white',
                  fontSize: '10px',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  minWidth: '16px',
                  textAlign: 'center',
                  lineHeight: 1
                }}>
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </Button>
            
            {/* 管理员下拉菜单 */}
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'profile',
                    icon: <UserOutlined />,
                    label: '个人资料',
                  },
                  {
                    key: 'settings',
                    icon: <SettingIcon />,
                    label: '账户设置',
                  },
                  {
                    type: 'divider',
                  },
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录',
                    danger: true,
                  },
                ],
                onClick: handleAdminMenuClick,
              }}
              placement="bottomRight"
            >
              <Space style={{ cursor: 'pointer', padding: '8px 12px', borderRadius: 6 }}>
                <Avatar 
                  size="small" 
                  icon={<UserOutlined />}
                  style={{ backgroundColor: '#1890ff' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography.Text strong style={{ fontSize: '14px', lineHeight: 1 }}>
                    系统管理员
                  </Typography.Text>
                </div>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '88px 16px 24px',
            padding: 0,
            minHeight: 'calc(100vh - 112px)',
            background: 'transparent',
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/video-monitor" element={<VideoMonitor />} />
            <Route path="/image-recognition" element={<ImageRecognition />} />
            <Route path="/smoke-detection" element={<SmokeDetection />} />
            <Route path="/flame-detection" element={<FlameDetection />} />
            <Route path="/alert-management" element={<AlertManagement />} />
            <Route path="/data-analysis" element={<DataAnalysis />} />
            <Route path="/device-management" element={<DeviceManagement />} />
            <Route path="/inspection-management" element={<InspectionManagement />} />
            <Route path="/system-settings" element={<SystemSettings />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App; 