import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../styles/erp-platform.css';

interface LoginFormData {
  username: string;
  password: string;
  captcha: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState('');

  // 生成验证码
  const generateCaptcha = () => {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptcha(result);
  };

  // 初始化验证码
  React.useEffect(() => {
    generateCaptcha();
  }, []);

  const onFinish = async (values: LoginFormData) => {
    if (values.captcha !== captcha) {
      message.error('验证码错误');
      generateCaptcha();
      form.setFieldValue('captcha', '');
      return;
    }

    setLoading(true);
    try {
      // TODO: 这里需要替换为实际的登录API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (values.username === 'admin' && values.password === 'admin123') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userInfo', JSON.stringify({
          username: values.username,
          role: 'admin'
        }));
        
        message.success('登录成功');
        navigate('/');
      } else {
        message.error('用户名或密码错误');
        generateCaptcha();
        form.setFieldValue('captcha', '');
      }
    } catch (error) {
      message.error('登录失败，请重试');
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-left-content">
          <h1>秸秆禁烧视频监控平台</h1>
          <p>
            基于人工智能和物联网技术，实现秸秆禁烧的智能监控和预警，
            助力农业环境保护和可持续发展。
          </p>
          <div className="login-features">
            <div className="feature-item">
              <h3>智能识别</h3>
              <p>采用深度学习算法，实时识别火点和烟雾，准确率高达95%以上</p>
            </div>
            <div className="feature-item">
              <h3>实时监控</h3>
              <p>24小时不间断监控，及时发现并预警潜在的秸秆焚烧行为</p>
            </div>
            <div className="feature-item">
              <h3>数据分析</h3>
              <p>智能分析历史数据，生成趋势报告，辅助决策和管理</p>
            </div>
            <div className="feature-item">
              <h3>移动管理</h3>
              <p>支持手机端实时查看和管理，随时随地掌握监控动态</p>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-header">
          <h2>系统登录</h2>
          <p>邹城市农业农村局</p>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              className="login-input"
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
              placeholder="用户名"
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              className="login-input"
              prefix={<LockOutlined style={{ color: '#1890ff' }} />}
              placeholder="密码"
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            name="captcha"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Row gutter={8}>
              <Col span={16}>
                <Input
                  className="login-input"
                  prefix={<SafetyCertificateOutlined style={{ color: '#1890ff' }} />}
                  placeholder="验证码"
                  autoComplete="off"
                />
              </Col>
              <Col span={8}>
                <div
                  className="captcha-container"
                  onClick={generateCaptcha}
                >
                  {captcha}
                </div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login; 