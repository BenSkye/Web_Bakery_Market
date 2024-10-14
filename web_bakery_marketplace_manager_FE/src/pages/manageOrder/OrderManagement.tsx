import React, { useState, useEffect } from 'react';
import { Table, Select, message, Tabs, Spin, Card, Space, Typography, Input, Tag, Row, Col, Statistic } from 'antd';
import { getOrdersProductByBakeryId, changeStatusOrderProduct } from '../../services/ordersProductService';
import { useParams } from 'react-router-dom';
import { formatCurrency } from '../../utils/format/formatCurrency';
import { SearchOutlined, ClockCircleOutlined, SyncOutlined, CheckCircleOutlined, CloseCircleOutlined, CarOutlined, GiftOutlined, StopOutlined, DollarCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;
const { Title } = Typography;

const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const { bakeryId } = useParams();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrdersProductByBakeryId(bakeryId as string);
                setOrders(data.metadata);
                setLoading(false);
            } catch (err) {
                message.error('Failed to fetch orders');
                setLoading(false);
            }
        };

        fetchOrders();
    }, [bakeryId]);

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            await changeStatusOrderProduct(orderId, newStatus);
            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            ));
            message.success('Order status updated successfully');
        } catch (err) {
            message.error('Failed to update order status');
        }
    };

    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'pending':
                return { color: 'orange', icon: <ClockCircleOutlined />, text: 'Pending' };
            case 'processing':
                return { color: 'blue', icon: <SyncOutlined spin />, text: 'Processing' };
            case 'success':
                return { color: 'green', icon: <CheckCircleOutlined />, text: 'Success' };
            case 'confirmed':
                return { color: 'cyan', icon: <CheckCircleOutlined />, text: 'Confirmed' };
            case 'rejected':
                return { color: 'red', icon: <CloseCircleOutlined />, text: 'Rejected' };
            case 'shipping':
                return { color: 'geekblue', icon: <CarOutlined />, text: 'Shipping' };
            case 'delivered':
                return { color: 'purple', icon: <GiftOutlined />, text: 'Delivered' };
            case 'canceled':
                return { color: 'magenta', icon: <StopOutlined />, text: 'Canceled' };
            default:
                return { color: 'default', icon: <ClockCircleOutlined />, text: 'Unknown' };
        }
    };

    const getDashboardStats = () => {
        const pendingOrders = orders.filter(order => order.status === 'pending').length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);
        const totalOrders = orders.length;
        const completedOrders = orders.filter(order => ['success', 'delivered'].includes(order.status)).length;

        return { pendingOrders, totalRevenue, totalOrders, completedOrders };
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: '_id',
            key: '_id',
            render: (text: string) => <a href={`/order/${text}`}>{text}</a>,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => formatCurrency(price),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const { color, icon, text } = getStatusInfo(status);
                return (
                    <Tag color={color} icon={icon}>
                        {text}
                    </Tag>
                );
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: string, record: any) => (
                <Select
                    defaultValue={record.status}
                    style={{ width: 120 }}
                    onChange={(value) => handleStatusChange(record._id, value)}
                >
                    <Option value="pending">Pending</Option>
                    <Option value="processing">Processing</Option>
                    <Option value="success">Success</Option>
                    <Option value="confirmed">Confirmed</Option>
                    <Option value="rejected">Rejected</Option>
                    <Option value="shipping">Shipping</Option>
                    <Option value="delivered">Delivered</Option>
                    <Option value="canceled">Canceled</Option>
                </Select>
            ),
        },
    ];

    const filteredOrders = orders.filter(order =>
        order._id.toLowerCase().includes(searchText.toLowerCase()) ||
        order.status.toLowerCase().includes(searchText.toLowerCase())
    );

    const renderOrderTable = (isCustom: boolean) => (
        <Table
            dataSource={filteredOrders.filter(order => order.isCustomCake === isCustom)}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
        />
    );

    if (loading) return <Spin size="large" />;

    const { pendingOrders, totalRevenue, totalOrders, completedOrders } = getDashboardStats();

    return (
        <Card style={{ margin: '24px' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Title level={2}>Order Management</Title>

                <Row gutter={16}>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Pending Orders"
                                value={pendingOrders}
                                prefix={<ClockCircleOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Total Revenue"
                                value={formatCurrency(totalRevenue)}
                                prefix={<DollarCircleOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Total Orders"
                                value={totalOrders}
                                prefix={<ShoppingCartOutlined />}
                            />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Statistic
                                title="Completed Orders"
                                value={completedOrders}
                                prefix={<CheckCircleOutlined />}
                            />
                        </Card>
                    </Col>
                </Row>

                <Input
                    placeholder="Search orders..."
                    prefix={<SearchOutlined />}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: 300 }}
                />

                <Tabs defaultActiveKey="1">
                    <TabPane tab="Custom Cake Orders" key="1">
                        {renderOrderTable(true)}
                    </TabPane>
                    <TabPane tab="Regular Product Orders" key="2">
                        {renderOrderTable(false)}
                    </TabPane>
                </Tabs>
            </Space>
        </Card>
    );
};

export default OrderManagement;