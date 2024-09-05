import React from 'react';
import { Card, Col, Row, Statistic, Table } from 'antd';
import { Line } from '@ant-design/plots';
import { motion } from 'framer-motion';

const { Meta } = Card;

const dashboardData = {
    cards: [
        { title: 'Total Revenue', value: '$25,000', icon: '💵' },
        { title: 'Total Orders', value: '1,200', icon: '📦' },
        { title: 'New Customers', value: '150', icon: '👥' },
        { title: 'Monthly Growth', value: '12%', icon: '📈' },
    ],
    tableData: [
        { key: '1', product: 'Cake', revenue: '$1,000', orders: '50' },
        { key: '2', product: 'Donut', revenue: '$500', orders: '30' },
        { key: '3', product: 'Cookie', revenue: '$750', orders: '40' },
        { key: '4', product: 'Bread', revenue: '$300', orders: '20' },
    ],
    chartData: [
        { date: '2024-01', value: 3000 },
        { date: '2024-02', value: 5000 },
        { date: '2024-03', value: 7000 },
        { date: '2024-04', value: 6000 },
        { date: '2024-05', value: 8000 },
    ],
};

const Dashboard = () => {
    const { cards, tableData, chartData } = dashboardData;

    const columns = [
        { title: 'Product', dataIndex: 'product', key: 'product' },
        { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
        { title: 'Orders', dataIndex: 'orders', key: 'orders' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ padding: '2rem' }}
        >
            <Row gutter={16}>
                {cards.map((card, index) => (
                    <Col span={6} key={index}>
                        <Card>
                            <Meta
                                title={card.title}
                                description={
                                    <div style={{ fontSize: '24px', display: 'flex', alignItems: 'center' }}>
                                        {card.icon} {card.value}
                                    </div>
                                }
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row gutter={16} style={{ marginTop: '2rem' }}>
                <Col span={12}>
                    <Card title="Revenue Over Time">
                        <Line
                            data={chartData}
                            xField="date"
                            yField="value"
                            title="Revenue"
                            height={400}
                            xAxis={{ title: { text: 'Month' } }}
                            yAxis={{ title: { text: 'Revenue ($)' } }}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Top Products">
                        <Table
                            dataSource={tableData}
                            columns={columns}
                            pagination={false}
                        />
                    </Card>
                </Col>
            </Row>
        </motion.div>
    );
};

export default Dashboard;
