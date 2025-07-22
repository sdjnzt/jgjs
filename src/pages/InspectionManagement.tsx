import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Input,
  Select,
  Modal,
  Form,
  DatePicker,
  message,
  Row,
  Col
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { inspectionRecords, areas } from '../data/mockData';
// Remove moment dependency, use native Date methods

const { Option } = Select;
const { RangePicker } = DatePicker;

const InspectionManagement: React.FC = () => {
  const [records, setRecords] = useState(inspectionRecords);
  const [searchText, setSearchText] = useState('');
  const [areaFilter, setAreaFilter] = useState('all');
  const [dateRange, setDateRange] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [form] = Form.useForm();

  // 过滤巡检记录
  const filteredRecords = records.filter(record => {
    const matchesSearch = record.inspector.toLowerCase().includes(searchText.toLowerCase()) ||
      record.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesArea = areaFilter === 'all' || record.area === areaFilter;
    const matchesDate = !dateRange || (
      new Date(record.scheduledDate) >= dateRange[0].startOf('day').toDate() &&
      new Date(record.scheduledDate) <= dateRange[1].endOf('day').toDate()
    );
    return matchesSearch && matchesArea && matchesDate;
  });

  // 新增巡检
  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 编辑巡检
  const handleEdit = (record: any) => {
    setEditingRecord(record);
    form.setFieldsValue({ ...record, date: record.scheduledDate ? new Date(record.scheduledDate) : null });
    setModalVisible(true);
  };

  // 删除巡检
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除该巡检记录吗？',
      onOk: () => {
        setRecords(records.filter(r => r.id !== id));
        message.success('已删除');
      }
    });
  };

  // 保存巡检
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const newRecord = {
        ...values,
        scheduledDate: values.scheduledDate.format('YYYY-MM-DD'),
        area: values.area,
        id: editingRecord ? editingRecord.id : `inspection_${Date.now()}`
      };
      if (editingRecord) {
        setRecords(records.map(r => r.id === editingRecord.id ? newRecord : r));
        message.success('已更新');
      } else {
        setRecords([newRecord, ...records]);
        message.success('已添加');
      }
      setModalVisible(false);
    } catch (e) {
      // ignore
    }
  };

  const columns = [
    {
      title: '巡检日期',
      dataIndex: 'scheduledDate',
      key: 'scheduledDate',
      render: (date: string) => date
    },
    {
      title: '区域',
      dataIndex: 'area',
      key: 'area'
    },
    {
      title: '巡检人',
      dataIndex: 'inspector',
      key: 'inspector'
    },
    {
      title: '内容',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'completed' ? 'green' : status === 'in_progress' ? 'orange' : status === 'overdue' ? 'red' : 'blue'}>
          {status === 'completed' ? '已完成' : status === 'in_progress' ? '进行中' : status === 'overdue' ? '逾期' : '已安排'}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
          <Card>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={8}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="搜索巡检人或内容"
              allowClear
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </Col>
          <Col span={8}>
            <Select
              value={areaFilter}
              onChange={setAreaFilter}
              style={{ width: '100%' }}
            >
              <Option value="all">全部区域</Option>
              {areas.map(area => (
                <Option key={area.id} value={area.id}>{area.name}</Option>
              ))}
              </Select>
          </Col>
          <Col span={8}>
            <RangePicker
              value={dateRange}
              onChange={setDateRange}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
        <div style={{ marginBottom: 16, textAlign: 'right' }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增巡检
                </Button>
        </div>
        <Table
          columns={columns}
          dataSource={filteredRecords}
          rowKey="id"
          pagination={{ showSizeChanger: true, showQuickJumper: true }}
        />
          </Card>
      <Modal
        title={editingRecord ? '编辑巡检' : '新增巡检'}
        open={modalVisible}
        onOk={handleSave}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="scheduledDate" label="巡检日期" rules={[{ required: true, message: '请选择日期' }]}> 
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="area" label="区域" rules={[{ required: true, message: '请选择区域' }]}> 
                <Select placeholder="请选择区域">
                  {areas.map(area => (
                    <Option key={area.id} value={area.name}>{area.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="inspector" label="巡检人" rules={[{ required: true, message: '请输入巡检人' }]}> 
                <Input placeholder="请输入巡检人" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}> 
                <Select>
                  <Option value="scheduled">已安排</Option>
                  <Option value="in_progress">进行中</Option>
                  <Option value="completed">已完成</Option>
                  <Option value="overdue">逾期</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="description" label="巡检内容" rules={[{ required: true, message: '请输入内容' }]}> 
            <Input.TextArea rows={3} placeholder="请输入巡检内容" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InspectionManagement; 