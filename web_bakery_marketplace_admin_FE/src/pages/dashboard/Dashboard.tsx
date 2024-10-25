import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Select, Typography, Table, Divider } from 'antd';
import { UserOutlined, UserAddOutlined, CheckCircleOutlined, CloseCircleOutlined, DollarOutlined, ShoppingOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getStatisUser } from '../../services/userService';
import { getOrderProductStatisticsAndCashFlowBakeries } from '../../services/ordersProductService';

const { Title } = Typography;
const { Option } = Select;

interface UserStats {
    totalUsers: number;
    newUsersToday: number;
    newUsersThisWeek: number;
    newUsersThisMonth: number;
    activeUsers: number;
    inactiveUsers: number;
}

interface OrderStats {
    orderStatusStats: { _id: string; count: number; revenue: number }[];
    weeklyStats: { totalOrders: number; totalRevenue: number };
    monthlyStats: { totalOrders: number; totalRevenue: number };
    yearlyStats: { totalOrders: number; totalRevenue: number };
    topBakeries: { _id: string; totalOrders: number; totalRevenue: number; bakeryName: string }[];
    successfulOrdersRevenue: { totalRevenue: number };
    averageOrderValue: { avgValue: number };
    totalCustomers: { totalCustomers: number };
}

const Dashboard: React.FC = () => {
    const [userStats, setUserStats] = useState<UserStats | null>(null);
    const [orderStats, setOrderStats] = useState<OrderStats | null>(null);
    const [chartPeriod, setChartPeriod] = useState<'day' | 'week' | 'month'>('day');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userResponse = await getStatisUser();
                setUserStats(userResponse.metadata);

                const orderResponse = await getOrderProductStatisticsAndCashFlowBakeries();
                setOrderStats(orderResponse.metadata[0]);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
    }, []);

    if (!userStats || !orderStats) {
        return <Typography>Loading...</Typography>;
    }

    const chartData = [
        { name: 'Người dùng mới', value: userStats[`newUsers${chartPeriod === 'day' ? 'Today' : chartPeriod === 'week' ? 'ThisWeek' : 'ThisMonth'}`] },
        { name: 'Người dùng hoạt động', value: userStats.activeUsers },
        { name: 'Người dùng không hoạt động', value: userStats.inactiveUsers },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Bảng điều khiển</Title>

            <Card style={{ marginBottom: '24px' }}>
                <Title level={3}>Thống kê người dùng</Title>
                <Row gutter={16}>
                    <Col span={6}>
                        <Statistic title="Tổng người dùng" value={userStats.totalUsers} prefix={<UserOutlined />} />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Người dùng mới hôm nay" value={userStats.newUsersToday} prefix={<UserAddOutlined />} />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Người dùng hoạt động" value={userStats.activeUsers} prefix={<CheckCircleOutlined />} />
                    </Col>
                    <Col span={6}>
                        <Statistic title="Người dùng không hoạt động" value={userStats.inactiveUsers} prefix={<CloseCircleOutlined />} />
                    </Col>
                </Row>

                <Divider />

                <Select
                    defaultValue="day"
                    style={{ width: 120, marginBottom: '16px' }}
                    onChange={(value: 'day' | 'week' | 'month') => setChartPeriod(value)}
                >
                    <Option value="day">Hôm nay</Option>
                    <Option value="week">Tuần này</Option>
                    <Option value="month">Tháng này</Option>
                </Select>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#1890ff" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            <Card>
                <Title level={3}>Thống kê đơn hàng</Title>
                <OrderStatistics orderStats={orderStats} />
            </Card>
        </div>
    );
};

const OrderStatistics: React.FC<{ orderStats: OrderStats }> = ({ orderStats }) => {
    const columns = [
        { title: 'Trạng thái', dataIndex: '_id', key: '_id' },
        { title: 'Số lượng', dataIndex: 'count', key: 'count' },
        {
            title: 'Doanh thu',
            dataIndex: 'revenue',
            key: 'revenue',
            render: (value: number) => `${value.toLocaleString('vi-VN')} ₫`
        },
    ];

    const chartData = orderStats.orderStatusStats.map(stat => ({
        status: stat._id,
        count: stat.count,
        revenue: stat.revenue
    }));

    return (
        <>
            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Statistic title="Đơn hàng tuần này" value={orderStats.weeklyStats.totalOrders} prefix={<ShoppingOutlined />} />
                </Col>
                <Col span={6}>
                    <Statistic
                        title="Doanh thu tuần này"
                        value={orderStats.weeklyStats.totalRevenue}
                        prefix={<DollarOutlined />}
                        suffix="₫"
                        formatter={(value) => `${value.toLocaleString('vi-VN')}`}
                    />
                </Col>
                <Col span={6}>
                    <Statistic
                        title="Giá trị đơn hàng trung bình"
                        value={orderStats.averageOrderValue.avgValue}
                        prefix={<DollarOutlined />}
                        suffix="₫"
                        precision={2}
                        formatter={(value) => `${value.toLocaleString('vi-VN')}`}
                    />
                </Col>
                <Col span={6}>
                    <Statistic title="Tổng số khách hàng" value={orderStats.totalCustomers.totalCustomers} prefix={<UserOutlined />} />
                </Col>
            </Row>

            <Title level={4}>Trạng thái đơn hàng</Title>
            <Table dataSource={orderStats.orderStatusStats} columns={columns} pagination={false} />

            <Title level={4} style={{ marginTop: '24px' }}>Biểu đồ trạng thái đơn hàng</Title>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis yAxisId="left" orientation="left" stroke="#1890ff" />
                    <YAxis yAxisId="right" orientation="right" stroke="#52c41a" />
                    <Tooltip formatter={(value, name) => [
                        name === 'revenue' ? `${Number(value).toLocaleString('vi-VN')} ₫` : value,
                        name === 'revenue' ? 'Doanh thu' : 'Số lượng'
                    ]} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="count" fill="#1890ff" name="Số lượng" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#52c41a" name="Doanh thu" />
                </BarChart>
            </ResponsiveContainer>

            <Title level={4} style={{ marginTop: '24px' }}>Cửa hàng hàng đầu</Title>
            <Card>
                <Statistic
                    title={orderStats.topBakeries[0].bakeryName}
                    value={orderStats.topBakeries[0].totalRevenue}
                    prefix={<DollarOutlined />}
                    suffix={`₫ (${orderStats.topBakeries[0].totalOrders} đơn hàng)`}
                    formatter={(value) => `${value.toLocaleString('vi-VN')}`}
                />
            </Card>
        </>
    );
};

export default Dashboard;