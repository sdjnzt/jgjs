# 邹城市农业农村局秸秆禁烧视频监控平台建设项目

## 项目简介

本项目是邹城市农业农村局秸秆禁烧视频监控平台前端应用，基于React + TypeScript + Ant Design构建。该平台具备视频监控、图像识别、烟雾检测、火焰检测、短信告警、微信告警等功能，实现对辖区内农田、村庄等区域的秸秆禁烧行为进行智能监控和预警，提升秸秆禁烧监管效能。

## 核心功能

### 🎯 主要功能模块

1. **总览仪表板** - 系统整体状态监控和关键指标展示
2. **视频监控** - 实时视频监控和录像回放
3. **图像识别** - AI图像识别和异常行为检测
4. **烟雾检测** - 智能烟雾检测和预警
5. **火焰检测** - 火焰识别和火情预警
6. **告警管理** - 短信告警、微信告警管理
7. **数据分析** - 数据可视化分析和趋势预测
8. **设备管理** - 监控设备状态管理
9. **巡检管理** - 巡检计划和执行管理
10. **系统设置** - 系统配置和参数管理

### 🚀 技术特性

- **视频监控** - 高清视频实时监控和录像存储
- **AI识别** - 基于深度学习的图像识别技术
- **智能检测** - 烟雾、火焰智能检测算法
- **多渠道告警** - 短信、微信、系统内告警
- **数据分析** - 多维度数据分析和可视化
- **模块化设计** - 功能模块独立，易于维护

## 🚀 快速开始

### 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/jgjs.git
cd jgjs

# 安装依赖
npm install

# 启动开发服务器
npm start

# 访问 http://localhost:3000
```

### 部署到GitHub Pages

1. **Fork或克隆本项目到你的GitHub账户**

2. **启用GitHub Pages**：
   - 进入你的GitHub仓库
   - 点击 Settings → Pages
   - Source 选择 "GitHub Actions"

3. **自动部署**：
   - 推送代码到main/master分支会自动触发部署
   - 部署完成后可通过 `https://your-username.github.io/jgjs` 访问

### 手动部署

```bash
# 构建项目
npm run build

# 部署到GitHub Pages（需要安装gh-pages）
npm install -g gh-pages
gh-pages -d build
```

## 🌐 在线演示

- **GitHub Pages**: [https://sdjnzt.github.io/jgjs](https://sdjnzt.github.io/jgjs)
- **本地开发**: http://localhost:3000

## 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **UI组件库**: Ant Design 5
- **图表库**: @ant-design/plots
- **路由管理**: React Router DOM 6
- **构建工具**: Create React App
- **样式方案**: CSS + Ant Design主题

## 快速开始

### 环境要求

- Node.js 16+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

应用将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

### 运行测试

```bash
npm test
```

## 项目结构

```
src/
├── components/          # 公共组件
├── pages/              # 页面组件
│   ├── Dashboard.tsx          # 总览仪表板
│   ├── VideoMonitor.tsx       # 视频监控
│   ├── ImageRecognition.tsx   # 图像识别
│   ├── SmokeDetection.tsx     # 烟雾检测
│   ├── FlameDetection.tsx     # 火焰检测
│   ├── AlertManagement.tsx    # 告警管理
│   ├── DataAnalysis.tsx       # 数据分析
│   ├── DeviceManagement.tsx   # 设备管理
│   ├── InspectionManagement.tsx # 巡检管理
│   └── SystemSettings.tsx     # 系统设置
├── data/               # 模拟数据
│   └── mockData.ts           # 所有模拟数据
├── App.tsx             # 主应用组件
├── index.tsx           # 应用入口
└── index.css           # 全局样式
```

## 功能说明

### 视频监控系统
- 实时视频监控和录像回放
- 多路视频同时监控
- 视频质量调节和存储管理
- 视频标注和事件记录

### 图像识别系统
- AI图像识别和异常行为检测
- 人员、车辆、农机具识别
- 秸秆堆放识别
- 识别准确率统计

### 烟雾检测系统
- 智能烟雾检测算法
- 烟雾浓度实时监测
- 烟雾扩散趋势分析
- 检测灵敏度调节

### 火焰检测系统
- 火焰识别和火情预警
- 火焰大小和强度分析
- 火势蔓延预测
- 应急响应联动

### 告警管理系统
- 多渠道告警（短信、微信、系统内）
- 告警级别分类（紧急、高、中、低）
- 告警规则配置
- 告警历史记录

### 数据分析系统
- 多维度数据可视化分析
- 秸秆禁烧趋势分析
- 检测准确率统计
- 区域风险等级评估

### 设备管理系统
- 监控设备状态管理
- 设备维护和故障处理
- 设备覆盖范围统计
- 设备性能监控

### 巡检管理系统
- 巡检计划和执行管理
- 巡检路线规划
- 巡检报告生成
- 问题整改跟踪

## 数据模拟

项目使用完整的模拟数据，包括：

- 监控设备信息（摄像头、传感器等）
- 视频监控数据（实时视频流、录像文件）
- 图像识别结果（人员、车辆、农机具识别）
- 烟雾检测数据（烟雾浓度、检测时间等）
- 火焰检测数据（火焰大小、位置、强度等）
- 告警信息（短信、微信告警记录）
- 巡检记录（巡检计划、执行情况、问题记录）

## 浏览器支持

- Chrome 70+
- Firefox 70+
- Safari 12+
- Edge 79+

## 开发说明

### 添加新功能模块

1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `src/App.tsx` 中添加路由配置
3. 在 `src/data/mockData.ts` 中添加相应的模拟数据

### 自定义样式

项目使用 Ant Design 主题系统，可以通过修改 `src/index.css` 进行样式自定义。

### 数据接口

当前使用模拟数据，生产环境中需要替换为真实的API接口。接口规范请参考模拟数据的数据结构。

## 许可证

本项目为邹城市农业农村局内部使用，版权所有。

---

*邹城市农业农村局秸秆禁烧视频监控平台 - 让秸秆禁烧监管更智能，让环境更美好* 