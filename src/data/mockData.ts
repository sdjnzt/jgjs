// 秸秆禁烧视频监控平台模拟数据文件

// 监控设备接口
export interface MonitorDevice {
  id: string;
  name: string;
  type: 'camera' | 'sensor' | 'drone' | 'thermal';
  status: 'online' | 'offline' | 'maintenance' | 'fault';
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  lastUpdate: string;
  resolution?: string;
  coverage?: number; // 覆盖范围（米）
  height?: number; // 安装高度（米）
  angle?: number; // 监控角度
  battery?: number; // 电池电量（%）
  signal?: number; // 信号强度（%）
}

// 视频监控数据接口
export interface VideoStream {
  id: string;
  deviceId: string;
  deviceName: string;
  streamUrl: string;
  status: 'live' | 'recording' | 'offline';
  quality: 'HD' | 'SD' | '4K';
  timestamp: string;
  duration?: number; // 录像时长（秒）
  fileSize?: number; // 文件大小（MB）
}

// 图像识别结果接口
export interface RecognitionResult {
  id: string;
  deviceId: string;
  deviceName: string;
  timestamp: string;
  type: 'person' | 'vehicle' | 'machinery' | 'straw_pile' | 'burning';
  confidence: number; // 识别置信度
  location: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  details?: {
    personCount?: number;
    vehicleType?: string;
    machineryType?: string;
    strawVolume?: number;
  };
  imageUrl?: string;
}

// 烟雾检测数据接口
export interface SmokeDetection {
  id: string;
  deviceId: string;
  deviceName: string;
  timestamp: string;
  smokeLevel: number; // 烟雾浓度（0-100）
  smokeArea: number; // 烟雾面积（平方米）
  windDirection: string; // 风向
  windSpeed: number; // 风速（m/s）
  temperature: number; // 温度（℃）
  humidity: number; // 湿度（%）
  coordinates: {
    latitude: number;
    longitude: number;
  };
  status: 'normal' | 'warning' | 'alert' | 'critical';
}

// 火焰检测数据接口
export interface FlameDetection {
  id: string;
  deviceId: string;
  deviceName: string;
  timestamp: string;
  flameSize: number; // 火焰大小（平方米）
  flameIntensity: number; // 火焰强度（0-100）
  flameHeight: number; // 火焰高度（米）
  spreadSpeed: number; // 蔓延速度（m/min）
  temperature: number; // 检测温度（℃）
  humidity: number; // 环境湿度（%）
  detectionRadius: number; // 检测范围（米）
  windDirection: string; // 风向
  windSpeed: number; // 风速（m/s）
  lastUpdate: string; // 最后更新时间
  coordinates: {
    latitude: number;
    longitude: number;
  };
  status: 'detected' | 'spreading' | 'controlled' | 'extinguished';
  estimatedArea?: number; // 预估影响面积
}

// 告警信息接口
export interface Alert {
  id: string;
  type: 'smoke' | 'flame' | 'person' | 'vehicle' | 'machinery' | 'system';
  level: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  deviceId: string;
  deviceName: string;
  location: string;
  timestamp: string;
  status: 'pending' | 'processing' | 'resolved' | 'dismissed';
  assignedTo?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// 短信告警接口
export interface SMSAlert {
  id: string;
  alertId: string;
  phoneNumber: string;
  recipientName: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'failed' | 'pending';
  retryCount: number;
}

// 微信告警接口
export interface WeChatAlert {
  id: string;
  alertId: string;
  wechatId: string;
  recipientName: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'failed' | 'pending';
  messageType: 'text' | 'template' | 'card';
}

// 巡检记录接口
export interface InspectionRecord {
  id: string;
  inspector: string;
  area: string;
  scheduledDate: string;
  actualDate?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  description: string;
  findings?: string;
  issues?: string;
  photos?: string[];
  recommendations?: string;
}

// 区域信息接口
export interface Area {
  id: string;
  name: string;
  type: 'village' | 'farmland' | 'forest' | 'residential';
  coordinates: Array<{latitude: number; longitude: number}>;
  riskLevel: 'low' | 'medium' | 'high';
  deviceCount: number;
  population?: number;
  description?: string;
}

// 统计信息接口
export interface Statistics {
  totalDevices: number;
  onlineDevices: number;
  totalAlerts: number;
  activeAlerts: number;
  resolvedAlerts: number;
  falseAlarms: number;
  averageResponseTime: number; // 分钟
  detectionAccuracy: number; // 百分比
}

// 用户信息接口
export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'operator' | 'viewer';
  department: string;
  phone: string;
  email: string;
  lastLogin: string;
  status: 'active' | 'inactive';
  permissions: string[];
}

// 系统设置接口
export interface SystemSettings {
  platformName: string;
  monitoringMode: 'auto' | 'manual';
  alertThresholds: {
    smokeLevel: number;
    flameIntensity: number;
    temperatureHigh: number;
    temperatureLow: number;
  };
  notifications: {
    smsEnabled: boolean;
    wechatEnabled: boolean;
    emailEnabled: boolean;
    autoAlert: boolean;
  };
  deviceSettings: {
    defaultQuality: string;
    recordingDuration: number;
    storageLimit: number;
    autoCleanup: boolean;
  };
  systemMaintenance: {
    autoUpdate: boolean;
    backupFrequency: string;
    logRetention: number;
  };
}

// 生成更多监控设备数据
export const monitorDevices: MonitorDevice[] = [
  // 摄像头设备
  {
    id: 'cam001',
    name: '邹城北区监控点-01',
    type: 'camera',
    status: 'online',
    location: '邹城市北湖街道农田区域',
    coordinates: { latitude: 35.4053, longitude: 116.9734 },
    lastUpdate: '2025-07-22 14:30:00',
    resolution: '4K',
    coverage: 500,
    height: 15,
    angle: 120,
    signal: 95
  },
  {
    id: 'cam002',
    name: '邹城南区监控点-02',
    type: 'camera',
    status: 'online',
    location: '邹城市太平镇田间地头',
    coordinates: { latitude: 35.3845, longitude: 116.9823 },
    lastUpdate: '2025-07-22 14:28:00',
    resolution: 'HD',
    coverage: 350,
    height: 12,
    angle: 110,
    signal: 88
  },
  {
    id: 'cam003',
    name: '邹城东区监控点-03',
    type: 'camera',
    status: 'maintenance',
    location: '邹城市峄山镇农业园区',
    coordinates: { latitude: 35.4156, longitude: 117.0045 },
    lastUpdate: '2025-07-22 12:15:00',
    resolution: '4K',
    coverage: 450,
    height: 18,
    angle: 130,
    signal: 0
  },
  {
    id: 'cam004',
    name: '邹城西区监控点-04',
    type: 'camera',
    status: 'online',
    location: '邹城市城前镇麦田区域',
    coordinates: { latitude: 35.3967, longitude: 116.9456 },
    lastUpdate: '2025-07-22 14:32:00',
    resolution: 'HD',
    coverage: 380,
    height: 14,
    angle: 115,
    signal: 92
  },
  {
    id: 'cam005',
    name: '邹城中心区监控点-05',
    type: 'camera',
    status: 'online',
    location: '邹城市钢山街道农田中心',
    coordinates: { latitude: 35.4012, longitude: 116.9734 },
    lastUpdate: '2025-07-22 14:31:00',
    resolution: '4K',
    coverage: 520,
    height: 16,
    angle: 125,
    signal: 97
  },
  // 传感器设备
  {
    id: 'sensor001',
    name: '环境监测传感器-01',
    type: 'sensor',
    status: 'online',
    location: '邹城市北湖街道气象站',
    coordinates: { latitude: 35.4078, longitude: 116.9789 },
    lastUpdate: '2025-07-22 14:30:00',
    battery: 85,
    signal: 94
  },
  {
    id: 'sensor002',
    name: '环境监测传感器-02',
    type: 'sensor',
    status: 'online',
    location: '邹城市太平镇环境站',
    coordinates: { latitude: 35.3823, longitude: 116.9845 },
    lastUpdate: '2025-07-22 14:29:00',
    battery: 78,
    signal: 89
  },
  {
    id: 'sensor003',
    name: '环境监测传感器-03',
    type: 'sensor',
    status: 'fault',
    location: '邹城市峄山镇检测点',
    coordinates: { latitude: 35.4189, longitude: 117.0067 },
    lastUpdate: '2025-07-22 11:45:00',
    battery: 15,
    signal: 45
  },
  // 无人机设备
  {
    id: 'drone001',
    name: '巡检无人机-01',
    type: 'drone',
    status: 'online',
    location: '邹城市城前镇基站',
    coordinates: { latitude: 35.3945, longitude: 116.9478 },
    lastUpdate: '2025-07-22 14:25:00',
    battery: 68,
    coverage: 2000,
    height: 100,
    signal: 91
  },
  {
    id: 'drone002',
    name: '巡检无人机-02',
    type: 'drone',
    status: 'offline',
    location: '邹城市钢山街道基站',
    coordinates: { latitude: 35.4034, longitude: 116.9712 },
    lastUpdate: '2025-07-22 13:15:00',
    battery: 5,
    coverage: 2000,
    height: 100,
    signal: 0
  },
  // 热成像设备
  {
    id: 'thermal001',
    name: '红外热成像-01',
    type: 'thermal',
    status: 'online',
    location: '邹城市北湖街道重点区域',
    coordinates: { latitude: 35.4089, longitude: 116.9756 },
    lastUpdate: '2025-07-22 14:30:00',
    resolution: 'HD',
    coverage: 300,
    height: 20,
    angle: 90,
    signal: 93
  },
  {
    id: 'thermal002',
    name: '红外热成像-02',
    type: 'thermal',
    status: 'online',
    location: '邹城市太平镇森林边缘',
    coordinates: { latitude: 35.3867, longitude: 116.9867 },
    lastUpdate: '2025-07-22 14:28:00',
    resolution: '4K',
    coverage: 400,
    height: 25,
    angle: 95,
    signal: 96
  }
];

// 生成更多视频流数据
export const videoStreams: VideoStream[] = [
  {
    id: 'stream001',
    deviceId: 'cam001',
    deviceName: '邹城北区监控点-01',
    streamUrl: `${process.env.PUBLIC_URL}/images/jiankong/2.mp4`,
    status: 'live',
    quality: '4K',
    timestamp: '2025-07-22 14:30:00',
    duration: 0
  },
  {
    id: 'stream002',
    deviceId: 'cam002',
    deviceName: '邹城南区监控点-02',
    streamUrl: `${process.env.PUBLIC_URL}/images/jiankong/1.mp4`,
    status: 'live',
    quality: 'HD',
    timestamp: '2025-07-22 14:28:00',
    duration: 0
  },
  {
    id: 'stream003',
    deviceId: 'cam003',
    deviceName: '太平镇森林边缘-03',
    streamUrl: `${process.env.PUBLIC_URL}/images/jiankong/2.mp4`,
    status: 'recording',
    quality: '4K',
    timestamp: '2025-07-22 14:25:00',
    duration: 1800
  },
  {
    id: 'stream004',
    deviceId: 'cam004',
    deviceName: '峄山镇农业园区-04',
    streamUrl: `${process.env.PUBLIC_URL}/images/jiankong/1.mp4`,
    status: 'live',
    quality: 'HD',
    timestamp: '2025-07-22 14:20:00',
    duration: 0
  },
  {
    id: 'stream005',
    deviceId: 'cam005',
    deviceName: '城前镇田间监控-05',
    streamUrl: `${process.env.PUBLIC_URL}/images/jiankong/2.mp4`,
    status: 'live',
    quality: '4K',
    timestamp: '2025-07-22 14:18:00',
    duration: 0
  },
  {
    id: 'stream006',
    deviceId: 'cam006',
    deviceName: '大束镇农田区域-06',
    streamUrl: `${process.env.PUBLIC_URL}/images/jiankong/1.mp4`,
    status: 'offline',
    quality: 'HD',
    timestamp: '2025-07-22 14:15:00',
    duration: 0
  },
  {
    id: 'stream007',
    deviceId: 'cam007',
    deviceName: '石墙镇秸秆堆放点-07',
    streamUrl: `${process.env.PUBLIC_URL}/images/jiankong/2.mp4`,
    status: 'live',
    quality: '4K',
    timestamp: '2025-07-22 14:12:00',
    duration: 0
  },
  {
    id: 'stream008',
    deviceId: 'cam008',
    deviceName: '看庄镇重点区域-08',
    streamUrl: `${process.env.PUBLIC_URL}/images/jiankong/1.mp4`,
    status: 'recording',
    quality: 'HD',
    timestamp: '2025-07-22 14:10:00',
    duration: 3600
  },
  {
    id: 'stream009',
    deviceId: 'cam009',
    deviceName: '中心店镇农业基地-09',
    streamUrl: `${process.env.PUBLIC_URL}/images/jiankong/2.mp4`,
    status: 'live',
    quality: '4K',
    timestamp: '2025-07-22 14:08:00',
    duration: 0
  },
  {
    id: 'stream010',
    deviceId: 'cam010',
    deviceName: '香城镇森林防护-10',
    streamUrl: `${process.env.PUBLIC_URL}/images/jiankong/1.mp4`,
    status: 'live',
    quality: 'HD',
    timestamp: '2025-07-22 14:05:00',
    duration: 0
  },
  {
    id: 'stream011',
    deviceId: 'cam011',
    deviceName: '郭里镇农田监测-11',
    streamUrl: `${process.env.PUBLIC_URL}/images/jiankong/2.mp4`,
    status: 'live',
    quality: '4K',
    timestamp: '2025-07-22 14:02:00',
    duration: 0
  },
  {
    id: 'stream012',
    deviceId: 'cam012',
    deviceName: '田黄镇重点监控-12',
    streamUrl: `${process.env.PUBLIC_URL}/images/jiankong/1.mp4`,
    status: 'offline',
    quality: 'HD',
    timestamp: '2025-07-22 14:00:00',
    duration: 0
  },
  {
    id: 'stream013',
    deviceId: 'cam013',
    deviceName: '唐村镇秸秆收集点-13',
    streamUrl: `${process.env.PUBLIC_URL}/images/jiankong/2.mp4`,
    status: 'live',
    quality: '4K',
    timestamp: '2025-07-22 13:58:00',
    duration: 0
  },
  {
    id: 'stream014',
    deviceId: 'cam014',
    deviceName: '张庄镇农业示范区-14',
    streamUrl: `${process.env.PUBLIC_URL}/images/jiankong/1.mp4`,
    status: 'recording',
    quality: 'HD',
    timestamp: '2025-07-22 13:55:00',
    duration: 2400
  },
  {
    id: 'stream015',
    deviceId: 'cam015',
    deviceName: '北宿镇田野监控-15',
    streamUrl: `${process.env.PUBLIC_URL}/images/jiankong/2.mp4`,
    status: 'live',
    quality: '4K',
    timestamp: '2025-07-22 13:52:00',
    duration: 0
  },
  {
    id: 'stream016',
    deviceId: 'cam016',
    deviceName: '钢山街道城郊区-16',
    streamUrl: `${process.env.PUBLIC_URL}/images/jiankong/1.mp4`,
    status: 'live',
    quality: 'HD',
    timestamp: '2025-07-22 13:50:00',
    duration: 0
  }
];

// 生成更多图像识别结果
export const recognitionResults: RecognitionResult[] = [
  {
    id: 'rec001',
    deviceId: 'cam001',
    deviceName: '邹城北区监控点-01',
    timestamp: '2025-07-22 14:25:30',
    type: 'burning',
    confidence: 95,
    location: { x: 120, y: 80, width: 60, height: 40 },
    details: { strawVolume: 15.5 }
  },
  {
    id: 'rec002',
    deviceId: 'cam002',
    deviceName: '邹城南区监控点-02',
    timestamp: '2025-07-22 14:20:15',
    type: 'person',
    confidence: 88,
    location: { x: 200, y: 150, width: 30, height: 80 },
    details: { personCount: 2 }
  },
  {
    id: 'rec003',
    deviceId: 'cam004',
    deviceName: '邹城西区监控点-04',
    timestamp: '2025-07-22 14:18:45',
    type: 'vehicle',
    confidence: 92,
    location: { x: 300, y: 120, width: 80, height: 50 },
    details: { vehicleType: '农用拖拉机' }
  },
  {
    id: 'rec004',
    deviceId: 'cam005',
    deviceName: '邹城中心区监控点-05',
    timestamp: '2025-07-22 14:15:22',
    type: 'straw_pile',
    confidence: 84,
    location: { x: 150, y: 100, width: 120, height: 60 },
    details: { strawVolume: 28.3 }
  },
  {
    id: 'rec005',
    deviceId: 'thermal001',
    deviceName: '红外热成像-01',
    timestamp: '2025-07-22 14:12:10',
    type: 'burning',
    confidence: 98,
    location: { x: 80, y: 60, width: 40, height: 30 },
    details: { strawVolume: 8.7 }
  },
  {
    id: 'rec006',
    deviceId: 'cam001',
    deviceName: '邹城北区监控点-01',
    timestamp: '2025-07-22 14:10:35',
    type: 'machinery',
    confidence: 89,
    location: { x: 250, y: 180, width: 70, height: 45 },
    details: { machineryType: '收割机' }
  },
  {
    id: 'rec007',
    deviceId: 'cam002',
    deviceName: '邹城南区监控点-02',
    timestamp: '2025-07-22 14:08:18',
    type: 'person',
    confidence: 76,
    location: { x: 180, y: 140, width: 25, height: 70 },
    details: { personCount: 1 }
  },
  {
    id: 'rec008',
    deviceId: 'cam004',
    deviceName: '邹城西区监控点-04',
    timestamp: '2025-07-22 14:05:50',
    type: 'straw_pile',
    confidence: 91,
    location: { x: 220, y: 90, width: 100, height: 55 },
    details: { strawVolume: 22.1 }
  },
  {
    id: 'rec009',
    deviceId: 'thermal002',
    deviceName: '红外热成像-02',
    timestamp: '2025-07-22 14:03:25',
    type: 'burning',
    confidence: 87,
    location: { x: 100, y: 70, width: 50, height: 35 },
    details: { strawVolume: 12.4 }
  },
  {
    id: 'rec010',
    deviceId: 'cam005',
    deviceName: '邹城中心区监控点-05',
    timestamp: '2025-07-22 14:00:40',
    type: 'vehicle',
    confidence: 93,
    location: { x: 320, y: 160, width: 85, height: 55 },
    details: { vehicleType: '运输卡车' }
  },
  {
    id: 'rec011',
    deviceId: 'cam001',
    deviceName: '邹城北区监控点-01',
    timestamp: '2025-07-22 13:58:15',
    type: 'person',
    confidence: 82,
    location: { x: 160, y: 130, width: 28, height: 75 },
    details: { personCount: 3 }
  },
  {
    id: 'rec012',
    deviceId: 'cam002',
    deviceName: '邹城南区监控点-02',
    timestamp: '2025-07-22 13:55:30',
    type: 'machinery',
    confidence: 85,
    location: { x: 280, y: 200, width: 75, height: 50 },
    details: { machineryType: '播种机' }
  }
];

// 生成更多烟雾检测数据
export const smokeDetections: SmokeDetection[] = [
  {
    id: 'smoke001',
    deviceId: 'sensor001',
    deviceName: '环境监测传感器-01',
    timestamp: '2025-07-22 14:25:00',
    smokeLevel: 25,
    smokeArea: 120,
    windDirection: '东北风',
    windSpeed: 3.2,
    temperature: 22,
    humidity: 65,
    coordinates: { latitude: 35.4078, longitude: 116.9789 },
    status: 'normal'
  },
  {
    id: 'smoke002',
    deviceId: 'sensor002',
    deviceName: '环境监测传感器-02',
    timestamp: '2025-07-22 14:20:00',
    smokeLevel: 68,
    smokeArea: 350,
    windDirection: '西南风',
    windSpeed: 2.8,
    temperature: 24,
    humidity: 58,
    coordinates: { latitude: 35.3823, longitude: 116.9845 },
    status: 'warning'
  },
  {
    id: 'smoke003',
    deviceId: 'thermal001',
    deviceName: '红外热成像-01',
    timestamp: '2025-07-22 14:15:00',
    smokeLevel: 85,
    smokeArea: 520,
    windDirection: '北风',
    windSpeed: 4.1,
    temperature: 26,
    humidity: 52,
    coordinates: { latitude: 35.4089, longitude: 116.9756 },
    status: 'alert'
  },
  {
    id: 'smoke004',
    deviceId: 'cam001',
    deviceName: '邹城北区监控点-01',
    timestamp: '2025-07-22 14:10:00',
    smokeLevel: 42,
    smokeArea: 210,
    windDirection: '东风',
    windSpeed: 2.5,
    temperature: 23,
    humidity: 61,
    coordinates: { latitude: 35.4053, longitude: 116.9734 },
    status: 'normal'
  },
  {
    id: 'smoke005',
    deviceId: 'thermal002',
    deviceName: '红外热成像-02',
    timestamp: '2025-07-22 14:05:00',
    smokeLevel: 92,
    smokeArea: 680,
    windDirection: '西北风',
    windSpeed: 5.2,
    temperature: 28,
    humidity: 48,
    coordinates: { latitude: 35.3867, longitude: 116.9867 },
    status: 'critical'
  },
  {
    id: 'smoke006',
    deviceId: 'sensor001',
    deviceName: '环境监测传感器-01',
    timestamp: '2025-07-22 14:00:00',
    smokeLevel: 15,
    smokeArea: 80,
    windDirection: '南风',
    windSpeed: 1.8,
    temperature: 21,
    humidity: 68,
    coordinates: { latitude: 35.4078, longitude: 116.9789 },
    status: 'normal'
  },
  {
    id: 'smoke007',
    deviceId: 'cam004',
    deviceName: '邹城西区监控点-04',
    timestamp: '2025-07-22 13:55:00',
    smokeLevel: 58,
    smokeArea: 290,
    windDirection: '东南风',
    windSpeed: 3.7,
    temperature: 25,
    humidity: 55,
    coordinates: { latitude: 35.3967, longitude: 116.9456 },
    status: 'warning'
  },
  {
    id: 'smoke008',
    deviceId: 'cam005',
    deviceName: '邹城中心区监控点-05',
    timestamp: '2025-07-22 13:50:00',
    smokeLevel: 73,
    smokeArea: 420,
    windDirection: '北风',
    windSpeed: 4.5,
    temperature: 27,
    humidity: 49,
    coordinates: { latitude: 35.4012, longitude: 116.9734 },
    status: 'alert'
  }
];

// 生成更多火焰检测数据
export const flameDetections: FlameDetection[] = [
  {
    id: 'flame001',
    deviceId: 'thermal001',
    deviceName: '红外热成像-01',
    timestamp: '2025-07-22 14:25:30',
    flameSize: 15.5,
    flameIntensity: 78,
    flameHeight: 2.8,
    spreadSpeed: 3.2,
    temperature: 156,
    humidity: 42,
    detectionRadius: 500,
    windDirection: '东北风',
    windSpeed: 3.2,
    lastUpdate: '2025-07-22 14:25:30',
    coordinates: { latitude: 35.4089, longitude: 116.9756 },
    status: 'detected',
    estimatedArea: 180
  },
  {
    id: 'flame002',
    deviceId: 'thermal002',
    deviceName: '红外热成像-02',
    timestamp: '2025-07-22 14:18:45',
    flameSize: 28.3,
    flameIntensity: 92,
    flameHeight: 4.2,
    spreadSpeed: 5.8,
    temperature: 203,
    humidity: 38,
    detectionRadius: 600,
    windDirection: '西南风',
    windSpeed: 4.5,
    lastUpdate: '2025-07-22 14:18:45',
    coordinates: { latitude: 35.3867, longitude: 116.9867 },
    status: 'spreading',
    estimatedArea: 420
  },
  {
    id: 'flame003',
    deviceId: 'cam001',
    deviceName: '邹城北区监控点-01',
    timestamp: '2025-07-22 14:12:10',
    flameSize: 8.7,
    flameIntensity: 65,
    flameHeight: 1.5,
    spreadSpeed: 2.1,
    temperature: 98,
    humidity: 55,
    detectionRadius: 300,
    windDirection: '北风',
    windSpeed: 2.8,
    lastUpdate: '2025-07-22 14:12:10',
    coordinates: { latitude: 35.4053, longitude: 116.9734 },
    status: 'controlled',
    estimatedArea: 95
  },
  {
    id: 'flame004',
    deviceId: 'cam005',
    deviceName: '邹城中心区监控点-05',
    timestamp: '2025-07-22 14:05:25',
    flameSize: 35.2,
    flameIntensity: 88,
    flameHeight: 5.1,
    spreadSpeed: 7.3,
    temperature: 187,
    humidity: 41,
    detectionRadius: 750,
    windDirection: '东风',
    windSpeed: 5.2,
    lastUpdate: '2025-07-22 14:05:25',
    coordinates: { latitude: 35.4012, longitude: 116.9734 },
    status: 'spreading',
    estimatedArea: 650
  },
  {
    id: 'flame005',
    deviceId: 'thermal001',
    deviceName: '红外热成像-01',
    timestamp: '2025-07-22 13:58:40',
    flameSize: 12.1,
    flameIntensity: 45,
    flameHeight: 1.2,
    spreadSpeed: 0.8,
    temperature: 76,
    humidity: 62,
    detectionRadius: 500,
    windDirection: '南风',
    windSpeed: 1.5,
    lastUpdate: '2025-07-22 13:58:40',
    coordinates: { latitude: 35.4089, longitude: 116.9756 },
    status: 'extinguished',
    estimatedArea: 0
  },
  {
    id: 'flame006',
    deviceId: 'cam002',
    deviceName: '邹城南区监控点-02',
    timestamp: '2025-07-22 13:52:15',
    flameSize: 22.8,
    flameIntensity: 82,
    flameHeight: 3.6,
    spreadSpeed: 4.5,
    temperature: 168,
    humidity: 46,
    detectionRadius: 450,
    windDirection: '西北风',
    windSpeed: 3.8,
    lastUpdate: '2025-07-22 13:52:15',
    coordinates: { latitude: 35.3845, longitude: 116.9823 },
    status: 'detected',
    estimatedArea: 320
  }
];

// 生成更多告警数据
export const alerts: Alert[] = [
  {
    id: 'alert001',
    type: 'flame',
    level: 'critical',
    title: '紧急火焰告警',
    description: '红外热成像-02检测到大面积火焰，火势正在蔓延',
    deviceId: 'thermal002',
    deviceName: '红外热成像-02',
    location: '邹城市太平镇森林边缘',
    timestamp: '2025-07-22 14:18:45',
    status: 'processing',
    assignedTo: '刘建国',
    coordinates: { latitude: 35.3867, longitude: 116.9867 }
  },
  {
    id: 'alert002',
    type: 'smoke',
    level: 'high',
    title: '烟雾浓度异常',
    description: '红外热成像-02监测到烟雾浓度达到92%，需立即处理',
    deviceId: 'thermal002',
    deviceName: '红外热成像-02',
    location: '邹城市太平镇森林边缘',
    timestamp: '2025-07-22 14:05:00',
    status: 'processing',
    assignedTo: '陈志华',
    coordinates: { latitude: 35.3867, longitude: 116.9867 }
  },
  {
    id: 'alert003',
    type: 'flame',
    level: 'high',
    title: '火焰检测告警',
    description: '邹城中心区监控点-05发现大面积火焰，火势较大',
    deviceId: 'cam005',
    deviceName: '邹城中心区监控点-05',
    location: '邹城市钢山街道农田中心',
    timestamp: '2025-07-22 14:05:25',
    status: 'processing',
    assignedTo: '王德明',
    coordinates: { latitude: 35.4012, longitude: 116.9734 }
  },
  {
    id: 'alert004',
    type: 'smoke',
    level: 'medium',
    title: '烟雾预警',
    description: '红外热成像-01检测到烟雾浓度85%，需要关注',
    deviceId: 'thermal001',
    deviceName: '红外热成像-01',
    location: '邹城市北湖街道重点区域',
    timestamp: '2025-07-22 14:15:00',
    status: 'resolved',
    assignedTo: '李秀芳',
    coordinates: { latitude: 35.4089, longitude: 116.9756 }
  },
  {
    id: 'alert005',
    type: 'person',
    level: 'low',
    title: '人员活动监测',
    description: '邹城北区监控点-01发现3人在农田活动',
    deviceId: 'cam001',
    deviceName: '邹城北区监控点-01',
    location: '邹城市北湖街道农田区域',
    timestamp: '2025-07-22 13:58:15',
    status: 'dismissed',
    coordinates: { latitude: 35.4053, longitude: 116.9734 }
  },
  {
    id: 'alert006',
    type: 'system',
    level: 'medium',
    title: '设备维护提醒',
    description: '邹城东区监控点-03需要进行例行维护',
    deviceId: 'cam003',
    deviceName: '邹城东区监控点-03',
    location: '邹城市峄山镇农业园区',
    timestamp: '2025-07-22 12:15:00',
    status: 'pending',
    coordinates: { latitude: 35.4156, longitude: 117.0045 }
  },
  {
    id: 'alert007',
    type: 'vehicle',
    level: 'low',
    title: '车辆通行记录',
    description: '邹城中心区监控点-05发现运输卡车通行',
    deviceId: 'cam005',
    deviceName: '邹城中心区监控点-05',
    location: '邹城市钢山街道农田中心',
    timestamp: '2025-07-22 14:00:40',
    status: 'resolved',
    coordinates: { latitude: 35.4012, longitude: 116.9734 }
  },
  {
    id: 'alert008',
    type: 'machinery',
    level: 'low',
    title: '农机具作业监测',
    description: '邹城南区监控点-02发现播种机正在作业',
    deviceId: 'cam002',
    deviceName: '邹城南区监控点-02',
    location: '邹城市太平镇田间地头',
    timestamp: '2025-07-22 13:55:30',
    status: 'resolved',
    coordinates: { latitude: 35.3845, longitude: 116.9823 }
  },
  {
    id: 'alert009',
    type: 'smoke',
    level: 'high',
    title: '烟雾浓度告警',
    description: '邹城中心区监控点-05烟雾浓度达到73%',
    deviceId: 'cam005',
    deviceName: '邹城中心区监控点-05',
    location: '邹城市钢山街道农田中心',
    timestamp: '2025-07-22 13:50:00',
    status: 'processing',
    assignedTo: '张国庆',
    coordinates: { latitude: 35.4012, longitude: 116.9734 }
  },
  {
    id: 'alert010',
    type: 'flame',
    level: 'medium',
    title: '火焰监测告警',
    description: '邹城南区监控点-02发现火焰，火势可控',
    deviceId: 'cam002',
    deviceName: '邹城南区监控点-02',
    location: '邹城市太平镇田间地头',
    timestamp: '2025-07-22 13:52:15',
    status: 'resolved',
    assignedTo: '马建军',
    coordinates: { latitude: 35.3845, longitude: 116.9823 }
  }
];

// 生成短信告警数据
export const smsAlerts: SMSAlert[] = [
  {
    id: 'sms001',
    alertId: 'alert001',
    phoneNumber: '15965432187',
    recipientName: '刘建国',
    message: '【邹城秸秆监控】紧急火焰告警：红外热成像-02检测到大面积火焰，火势正在蔓延。位置：邹城市太平镇森林边缘。请立即处理！',
    timestamp: '2025-07-22 14:18:50',
    status: 'delivered',
    retryCount: 0
  },
  {
    id: 'sms002',
    alertId: 'alert002',
    phoneNumber: '18653947621',
    recipientName: '陈志华',
    message: '【邹城秸秆监控】烟雾浓度异常：红外热成像-02监测到烟雾浓度达到92%。位置：邹城市太平镇森林边缘。请立即处理！',
    timestamp: '2025-07-22 14:05:05',
    status: 'delivered',
    retryCount: 0
  },
  {
    id: 'sms003',
    alertId: 'alert003',
    phoneNumber: '13754268391',
    recipientName: '王德明',
    message: '【邹城秸秆监控】火焰检测告警：邹城中心区监控点-05发现大面积火焰。位置：邹城市钢山街道农田中心。请立即处理！',
    timestamp: '2025-07-22 14:05:30',
    status: 'sent',
    retryCount: 0
  },
  {
    id: 'sms004',
    alertId: 'alert006',
    phoneNumber: '15847962534',
    recipientName: '李秀芳',
    message: '【邹城秸秆监控】设备维护提醒：邹城东区监控点-03需要进行例行维护。位置：邹城市峄山镇农业园区。',
    timestamp: '2025-07-22 12:15:05',
    status: 'failed',
    retryCount: 2
  }
];

// 生成微信告警数据
export const wechatAlerts: WeChatAlert[] = [
  {
    id: 'wechat001',
    alertId: 'alert001',
    wechatId: 'wx_liujianguo',
    recipientName: '刘建国',
    message: '🔥紧急火焰告警\n设备：红外热成像-02\n位置：邹城市太平镇森林边缘\n状况：检测到大面积火焰，火势正在蔓延\n时间：2025-07-22 14:18:45\n请立即处理！',
    timestamp: '2025-07-22 14:18:48',
    status: 'delivered',
    messageType: 'template'
  },
  {
    id: 'wechat002',
    alertId: 'alert002',
    wechatId: 'wx_chenzhihua',
    recipientName: '陈志华',
    message: '💨烟雾浓度异常\n设备：红外热成像-02\n位置：邹城市太平镇森林边缘\n状况：烟雾浓度达到92%\n时间：2025-07-22 14:05:00\n请立即处理！',
    timestamp: '2025-07-22 14:05:03',
    status: 'delivered',
    messageType: 'template'
  },
  {
    id: 'wechat003',
    alertId: 'alert003',
    wechatId: 'wx_wangdeming',
    recipientName: '王德明',
    message: '🔥火焰检测告警\n设备：邹城中心区监控点-05\n位置：邹城市钢山街道农田中心\n状况：发现大面积火焰，火势较大\n时间：2025-07-22 14:05:25\n请立即处理！',
    timestamp: '2025-07-22 14:05:28',
    status: 'sent',
    messageType: 'card'
  }
];

// 生成更多巡检记录
export const inspectionRecords: InspectionRecord[] = [
  {
    id: 'inspect001',
    inspector: '孙德胜',
    area: '北湖街道农田区域',
    scheduledDate: '2025-07-22',
    actualDate: '2025-07-22',
    status: 'completed',
    description: '例行巡检，检查设备运行状态和环境情况',
    findings: '所有设备运行正常，未发现异常情况',
    issues: '无',
    recommendations: '建议继续保持当前监控密度'
  },
  {
    id: 'inspect002',
    inspector: '赵文斌',
    area: '太平镇田间地头',
    scheduledDate: '2025-07-22',
    actualDate: '2025-07-22',
    status: 'completed',
    description: '重点区域安全检查，关注秸秆处理情况',
    findings: '发现少量秸秆堆积，已通知农户清理',
    issues: '部分农户对禁烧政策理解不够',
    recommendations: '加强宣传教育，定期回访检查'
  },
  {
    id: 'inspect003',
    inspector: '侯立新',
    area: '峄山镇农业园区',
    scheduledDate: '2025-07-22',
    status: 'in-progress',
    description: '设备维护检查，重点检查cam003设备状态',
    findings: '设备需要更换部分零件',
    issues: '设备老化，信号不稳定',
    recommendations: '尽快更换设备或进行大修'
  },
  {
    id: 'inspect004',
    inspector: '田志远',
    area: '城前镇麦田区域',
    scheduledDate: '2025-07-16',
    status: 'pending',
    description: '春季准备工作检查，评估设备覆盖情况',
    findings: '',
    issues: '',
    recommendations: ''
  },
  {
    id: 'inspect005',
    inspector: '牛建华',
    area: '钢山街道农田中心',
    scheduledDate: '2025-07-14',
    actualDate: '2025-07-14',
    status: 'completed',
    description: '夜间巡检，检查红外设备工作状态',
    findings: '红外设备工作正常，夜视效果良好',
    issues: '部分区域照明不足',
    recommendations: '考虑增加辅助照明设备'
  },
  {
    id: 'inspect006',
    inspector: '赵磊',
    area: '北湖街道重点区域',
    scheduledDate: '2025-07-13',
    status: 'overdue',
    description: '环境监测检查，关注空气质量变化',
    findings: '',
    issues: '',
    recommendations: ''
  }
];

// 区域数据
export const areas: Area[] = [
  {
    id: 'area001',
    name: '北湖街道农田区域',
    type: 'farmland',
    coordinates: [
      { latitude: 35.4053, longitude: 116.9734 },
      { latitude: 35.4078, longitude: 116.9789 },
      { latitude: 35.4089, longitude: 116.9756 }
    ],
    riskLevel: 'medium',
    deviceCount: 3,
    description: '主要农田作物区域，需要重点监控秸秆处理情况'
  },
  {
    id: 'area002',
    name: '太平镇田间地头',
    type: 'farmland',
    coordinates: [
      { latitude: 35.3845, longitude: 116.9823 },
      { latitude: 35.3823, longitude: 116.9845 },
      { latitude: 35.3867, longitude: 116.9867 }
    ],
    riskLevel: 'high',
    deviceCount: 3,
    description: '森林边缘农田，火灾风险较高'
  },
  {
    id: 'area003',
    name: '峄山镇农业园区',
    type: 'farmland',
    coordinates: [
      { latitude: 35.4156, longitude: 117.0045 },
      { latitude: 35.4189, longitude: 117.0067 }
    ],
    riskLevel: 'low',
    deviceCount: 2,
    description: '现代化农业园区，设施完善'
  },
  {
    id: 'area004',
    name: '城前镇麦田区域',
    type: 'farmland',
    coordinates: [
      { latitude: 35.3967, longitude: 116.9456 },
      { latitude: 35.3945, longitude: 116.9478 }
    ],
    riskLevel: 'medium',
    deviceCount: 2,
    description: '传统农业区域，需要加强监管'
  },
  {
    id: 'area005',
    name: '钢山街道农田中心',
    type: 'farmland',
    coordinates: [
      { latitude: 35.4012, longitude: 116.9734 },
      { latitude: 35.4034, longitude: 116.9712 }
    ],
    riskLevel: 'medium',
    deviceCount: 2,
    description: '中心农田区域，交通便利但监管难度大'
  }
];

// 统计信息
export const statistics: Statistics = {
  totalDevices: 12,
  onlineDevices: 9,
  totalAlerts: 32,
  activeAlerts: 6,
  resolvedAlerts: 22,
  falseAlarms: 4,
  averageResponseTime: 15,
  detectionAccuracy: 94
};

// 用户数据
export const users: User[] = [
  {
    id: 'user001',
    username: 'admin',
    name: '系统管理员',
    role: 'admin',
    department: '信息中心',
    phone: '15965432187',
    email: 'admin@zoucheng.gov.cn',
    lastLogin: '2025-07-22 14:30:00',
    status: 'active',
    permissions: ['all']
  },
  {
    id: 'user002',
    username: 'operator1',
    name: '刘建国',
    role: 'operator',
    department: '监控中心',
    phone: '15965432187',
    email: 'liujianguo@zoucheng.gov.cn',
    lastLogin: '2025-07-22 14:25:00',
    status: 'active',
    permissions: ['monitor', 'alert', 'inspection']
  },
  {
    id: 'user003',
    username: 'operator2',
    name: '陈志华',
    role: 'operator',
    department: '监控中心',
    phone: '18653947621',
    email: 'chenzhihua@zoucheng.gov.cn',
    lastLogin: '2025-07-22 14:20:00',
    status: 'active',
    permissions: ['monitor', 'alert', 'inspection']
  },
  {
    id: 'user004',
    username: 'viewer1',
    name: '王德明',
    role: 'viewer',
    department: '农业农村局',
    phone: '13754268391',
    email: 'wangdeming@zoucheng.gov.cn',
    lastLogin: '2025-07-22 14:15:00',
    status: 'active',
    permissions: ['view']
  }
];

// 系统设置
export const systemSettings: SystemSettings = {
  platformName: '邹城市农业农村局秸秆禁烧视频监控平台',
  monitoringMode: 'auto',
  alertThresholds: {
    smokeLevel: 70,
    flameIntensity: 80,
    temperatureHigh: 40,
    temperatureLow: -10
  },
  notifications: {
    smsEnabled: true,
    wechatEnabled: true,
    emailEnabled: true,
    autoAlert: true
  },
  deviceSettings: {
    defaultQuality: 'HD',
    recordingDuration: 30,
    storageLimit: 1000,
    autoCleanup: true
  },
  systemMaintenance: {
    autoUpdate: true,
    backupFrequency: 'daily',
    logRetention: 30
  }
}; 