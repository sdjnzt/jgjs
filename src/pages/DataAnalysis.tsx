import React, { useState, useEffect } from 'react';
import { 
  Card,
  Row, 
  Col, 
  Statistic,
  Select, 
  DatePicker, 
  Button, 
  Space,
  Table,
  Progress,
  Tag,
  Tabs,
  List,
  Avatar,
  Typography
} from 'antd';
import ReactECharts from 'echarts-for-react';
import { 
  FireOutlined,
  AlertOutlined,
  EyeOutlined,
  CameraOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  BarChartOutlined,
  DownloadOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { alerts, smokeDetections, flameDetections, recognitionResults, areas } from '../data/mockData';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const DataAnalysis: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('7d');
  const [dateRange, setDateRange] = useState<[string, string]>(['', '']);
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [chartsReady, setChartsReady] = useState(false);

  // 延迟渲染图表
  useEffect(() => {
    const timer = setTimeout(() => {
      setChartsReady(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);
  
  // 实时监控数据
  const realTimeData = [
    { time: '00:00', alerts: 2, smoke: 1, flame: 0 },
    { time: '02:00', alerts: 1, smoke: 0, flame: 1 },
    { time: '04:00', alerts: 3, smoke: 2, flame: 1 },
    { time: '06:00', alerts: 0, smoke: 0, flame: 0 },
    { time: '08:00', alerts: 5, smoke: 3, flame: 2 },
    { time: '10:00', alerts: 8, smoke: 4, flame: 3 },
    { time: '12:00', alerts: 12, smoke: 6, flame: 4 },
    { time: '14:00', alerts: 15, smoke: 8, flame: 5 },
    { time: '16:00', alerts: 10, smoke: 5, flame: 3 },
    { time: '18:00', alerts: 6, smoke: 3, flame: 2 },
    { time: '20:00', alerts: 4, smoke: 2, flame: 1 },
    { time: '22:00', alerts: 2, smoke: 1, flame: 0 }
  ];

  // 告警类型分布数据
  const alertTypeData = [
    { name: '烟雾告警', value: 45, color: '#ff7875' },
    { name: '火焰告警', value: 30, color: '#ff4d4f' },
    { name: '人员告警', value: 15, color: '#faad14' },
    { name: '车辆告警', value: 8, color: '#52c41a' },
    { name: '机械告警', value: 2, color: '#1890ff' }
  ];

  // 月度趋势数据
  const monthlyTrendData = [
    { month: '1月', alerts: 120, smoke: 80, flame: 40 },
    { month: '2月', alerts: 150, smoke: 100, flame: 50 },
    { month: '3月', alerts: 180, smoke: 120, flame: 60 },
    { month: '4月', alerts: 200, smoke: 140, flame: 70 },
    { month: '5月', alerts: 250, smoke: 180, flame: 90 },
    { month: '6月', alerts: 300, smoke: 220, flame: 110 },
    { month: '7月', alerts: 280, smoke: 200, flame: 100 },
    { month: '8月', alerts: 320, smoke: 240, flame: 120 },
    { month: '9月', alerts: 350, smoke: 260, flame: 130 },
    { month: '10月', alerts: 400, smoke: 300, flame: 150 },
    { month: '11月', alerts: 380, smoke: 280, flame: 140 },
    { month: '12月', alerts: 420, smoke: 320, flame: 160 }
  ];

  // 设备状态分布
  const deviceStatusData = [
    { name: '在线', value: 85, color: '#52c41a' },
    { name: '离线', value: 10, color: '#ff4d4f' },
    { name: '故障', value: 5, color: '#faad14' }
  ];

  // 区域风险等级数据
  const areaRiskData = areas.map(area => ({
    name: area.name,
    riskLevel: area.riskLevel,
    deviceCount: area.deviceCount || Math.floor(Math.random() * 10) + 1,
    alertCount: Math.floor(Math.random() * 20) + 1
  }));

  // 实时监控折线图配置
  const getLineChartOption = () => ({
    title: {
      text: '24小时告警趋势',
      left: 'center',
      textStyle: {
        fontSize: 16,
        color: '#666'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.8)',
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      data: ['告警数', '烟雾检测', '火焰检测'],
      bottom: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: realTimeData.map(item => item.time),
      axisLabel: {
        color: '#666'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#666'
      }
    },
    series: [
      {
        name: '告警数',
        type: 'line',
        data: realTimeData.map(item => item.alerts),
        smooth: true,
        lineStyle: {
          color: '#ff4d4f',
          width: 3
        },
        itemStyle: {
          color: '#ff4d4f'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255,77,79,0.3)' },
              { offset: 1, color: 'rgba(255,77,79,0.1)' }
            ]
          }
        }
      },
      {
        name: '烟雾检测',
        type: 'line',
        data: realTimeData.map(item => item.smoke),
        smooth: true,
        lineStyle: {
          color: '#ff7875',
          width: 2
        },
        itemStyle: {
          color: '#ff7875'
        }
      },
      {
        name: '火焰检测',
        type: 'line',
        data: realTimeData.map(item => item.flame),
        smooth: true,
        lineStyle: {
          color: '#fa8c16',
          width: 2
        },
        itemStyle: {
          color: '#fa8c16'
        }
      }
    ]
  });

  // 告警类型饼图配置
  const getPieChartOption = () => ({
    title: {
      text: '告警类型分布',
      left: 'center',
      textStyle: {
        fontSize: 16,
        color: '#666'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}% ({d}%)',
      backgroundColor: 'rgba(0,0,0,0.8)',
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      bottom: 10,
      left: 'center'
    },
    series: [
      {
        name: '告警类型',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        data: alertTypeData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          show: true,
          formatter: '{b}: {c}%'
        },
        labelLine: {
          show: true
        }
      }
    ]
  });

  // 月度趋势柱状图配置
  const getColumnChartOption = () => ({
    title: {
      text: '月度数据趋势',
      left: 'center',
      textStyle: {
        fontSize: 16,
        color: '#666'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(0,0,0,0.8)',
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      data: ['告警数', '烟雾检测', '火焰检测'],
      bottom: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: monthlyTrendData.map(item => item.month),
      axisLabel: {
        color: '#666'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#666'
      }
    },
    series: [
      {
        name: '告警数',
        type: 'bar',
        data: monthlyTrendData.map(item => item.alerts),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#ff4d4f' },
              { offset: 1, color: '#ff7875' }
            ]
          }
        }
      },
      {
        name: '烟雾检测',
        type: 'bar',
        data: monthlyTrendData.map(item => item.smoke),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#ff7875' },
              { offset: 1, color: '#ffa39e' }
            ]
          }
        }
      },
      {
        name: '火焰检测',
        type: 'bar',
        data: monthlyTrendData.map(item => item.flame),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#fa8c16' },
              { offset: 1, color: '#ffc53d' }
            ]
          }
        }
      }
    ]
  });

  // 区域风险分布图配置
  const getAreaRiskChartOption = () => ({
    title: {
      text: '区域风险分布',
      left: 'center',
      textStyle: {
        fontSize: 16,
        color: '#666'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(0,0,0,0.8)',
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      data: ['告警次数', '设备数量'],
      bottom: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: areaRiskData.map(item => item.name.length > 6 ? item.name.substring(0, 6) + '...' : item.name),
      axisLabel: {
        color: '#666',
        interval: 0,
        rotate: 30
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#666'
      }
    },
    series: [
      {
        name: '告警次数',
        type: 'bar',
        data: areaRiskData.map(item => item.alertCount),
        itemStyle: {
          color: '#ff4d4f'
        }
      },
      {
        name: '设备数量',
        type: 'bar',
        data: areaRiskData.map(item => item.deviceCount),
        itemStyle: {
          color: '#1890ff'
        }
      }
    ]
  });

  // 设备状态饼图配置
  const getDeviceStatusOption = () => ({
    title: {
      text: '设备状态分布',
      left: 'center',
      textStyle: {
        fontSize: 16,
        color: '#666'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}% ({d}%)',
      backgroundColor: 'rgba(0,0,0,0.8)',
      textStyle: {
        color: '#fff'
      }
    },
    legend: {
      bottom: 10,
      left: 'center'
    },
    series: [
      {
        name: '设备状态',
        type: 'pie',
        radius: ['30%', '60%'],
        center: ['50%', '45%'],
        data: deviceStatusData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          show: true,
          formatter: '{b}: {c}%'
        }
      }
    ]
  });



  // 统计数据
  const totalAlerts = alerts.length;
  const totalSmokeDetections = smokeDetections.length;
  const totalFlameDetections = flameDetections.length;
  const totalRecognitionEvents = recognitionResults.length;
  const highRiskAreas = areas.filter(area => area.riskLevel === 'high').length;

  // 获取风险等级颜色
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return '#ff4d4f';
      case 'medium': return '#faad14';
      case 'low': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  // 获取风险等级文本
  const getRiskText = (level: string) => {
    switch (level) {
      case 'high': return '高风险';
      case 'medium': return '中风险';
      case 'low': return '低风险';
      default: return '未知';
    }
  };

  // 处理时间范围变化
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  // 处理日期范围变化
  const handleDateRangeChange = (dates: any) => {
    if (dates) {
      setDateRange([dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]);
    } else {
      setDateRange(['', '']);
    }
  };

  // 处理区域选择
  const handleAreaChange = (value: string) => {
    setSelectedArea(value);
  };

  // 导出数据
  const handleExport = () => {
    // 模拟导出功能
    console.log('导出数据');
  };

  // 刷新数据
  const handleRefresh = () => {
    // 模拟刷新功能
    console.log('刷新数据');
  };

  // 区域风险表格列
  const areaColumns = [
    {
      title: '区域名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '风险等级',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      render: (level: string) => (
        <Tag color={getRiskColor(level)}>{getRiskText(level)}</Tag>
      )
    },
    {
      title: '设备数量',
      dataIndex: 'deviceCount',
      key: 'deviceCount'
    },
    {
      title: '告警次数',
      dataIndex: 'alertCount',
      key: 'alertCount'
    },
    {
      title: '告警率',
      key: 'alertRate',
      render: (_: any, record: any) => (
        <Progress 
          percent={Math.round((record.alertCount / (record.deviceCount * 10)) * 100)} 
          size="small" 
          status={record.alertCount > 10 ? 'exception' : 'normal'}
        />
      )
    }
  ];

  // 最新告警列表
  const recentAlerts = alerts.slice(0, 10).map(alert => ({
    ...alert,
    avatar: alert.type === 'smoke' ? <AlertOutlined style={{ color: '#ff7875' }} /> :
            alert.type === 'flame' ? <FireOutlined style={{ color: '#ff4d4f' }} /> :
            <ExclamationCircleOutlined style={{ color: '#faad14' }} />
  }));

  return (
    <div style={{ padding: '24px' }}>
      {/* 统计卡片 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总告警数"
              value={totalAlerts}
              prefix={<AlertOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="烟雾检测"
              value={totalSmokeDetections}
              prefix={<EyeOutlined style={{ color: '#ff7875' }} />}
              valueStyle={{ color: '#ff7875' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="火焰检测"
              value={totalFlameDetections}
              prefix={<FireOutlined style={{ color: '#ff4d4f' }} />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="高风险区域"
              value={highRiskAreas}
              prefix={<EnvironmentOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 控制面板 */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Title level={4} style={{ margin: 0 }}>
            <BarChartOutlined /> 数据分析
          </Title>
          <Space>
            <Select
              value={timeRange}
              onChange={handleTimeRangeChange}
              style={{ width: 120 }}
            >
              <Option value="1d">今日</Option>
              <Option value="7d">近7天</Option>
              <Option value="30d">近30天</Option>
              <Option value="90d">近90天</Option>
            </Select>
            <RangePicker onChange={handleDateRangeChange} />
            <Select
              value={selectedArea}
              onChange={handleAreaChange}
              style={{ width: 150 }}
              placeholder="选择区域"
            >
              <Option value="all">全部区域</Option>
              {areas.map(area => (
                <Option key={area.id} value={area.id}>{area.name}</Option>
              ))}
            </Select>
            <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
              刷新
            </Button>
            <Button type="primary" icon={<DownloadOutlined />} onClick={handleExport}>
              导出
            </Button>
          </Space>
        </div>
      </Card>

      {/* 图表区域 */}
      <Tabs defaultActiveKey="1">
        <TabPane tab="实时监控" key="1">
          <Row gutter={16}>
            <Col span={16}>
              <Card title="告警趋势" style={{ marginBottom: '16px' }}>
                <div style={{ height: 350 }}>
                  {chartsReady ? (
                    <ReactECharts option={getLineChartOption()} />
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      加载中...
                    </div>
                  )}
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="告警类型分布" style={{ marginBottom: '16px' }}>
                <div style={{ height: 350 }}>
                  {chartsReady ? (
                    <ReactECharts option={getPieChartOption()} />
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      加载中...
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="趋势分析" key="2">
          <Row gutter={16}>
            <Col span={24}>
              <Card title="月度趋势分析" style={{ marginBottom: '16px' }}>
                <div style={{ height: 400 }}>
                  {chartsReady ? (
                    <ReactECharts option={getColumnChartOption()} />
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      加载中...
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="区域分析" key="3">
          <Row gutter={16}>
            <Col span={12}>
              <Card title="区域风险分布" style={{ marginBottom: '16px' }}>
                <div style={{ height: 350 }}>
                  {chartsReady ? (
                    <ReactECharts option={getAreaRiskChartOption()} />
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      加载中...
                    </div>
                  )}
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="设备状态分布" style={{ marginBottom: '16px' }}>
                <div style={{ height: 350 }}>
                  {chartsReady ? (
                    <ReactECharts option={getDeviceStatusOption()} />
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      加载中...
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          </Row>
          <Card title="区域风险详情">
            <Table
              columns={areaColumns}
              dataSource={areaRiskData}
              rowKey="name"
              pagination={false}
            />
          </Card>
        </TabPane>

        <TabPane tab="告警记录" key="4">
          <Row gutter={16}>
            <Col span={24}>
              <Card title="最新告警">
                <List
                  itemLayout="horizontal"
                  dataSource={recentAlerts}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={item.avatar} />}
                        title={
                          <Space>
                            <Text strong>{item.title}</Text>
                            <Tag color={item.level === 'high' ? 'red' : item.level === 'medium' ? 'orange' : 'green'}>
                              {item.level === 'high' ? '高' : item.level === 'medium' ? '中' : '低'}
                            </Tag>
                          </Space>
                        }
                        description={
                          <Space direction="vertical" size={0}>
                            <Text type="secondary">{item.location}</Text>
                            <Text type="secondary">
                              <ClockCircleOutlined /> {new Date(item.timestamp).toLocaleString()}
                            </Text>
                          </Space>
                        }
                      />
                      <div>
                        <Tag color={item.status === 'resolved' ? 'green' : item.status === 'processing' ? 'orange' : 'red'}>
                          {item.status === 'resolved' ? '已处理' : item.status === 'processing' ? '处理中' : '未处理'}
                        </Tag>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DataAnalysis; 