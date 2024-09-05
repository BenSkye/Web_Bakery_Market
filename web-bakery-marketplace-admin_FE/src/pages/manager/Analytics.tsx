import React from 'react';
import { Card, Col, Row, Typography, Statistic, Descriptions } from 'antd';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

type SalesData = {
    date: string;
    sales: number;
};

const data: SalesData[] = [
    { date: '2024-09-01', sales: 120 },
    { date: '2024-09-02', sales: 200 },
    { date: '2024-09-03', sales: 150 },
    // Add more data points as needed
];

const Analytics: React.FC = () => {
    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Store Analytics</Title>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic title="Total Sales" value="$1,500" />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Total Orders" value={120} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Top Product" value="Chocolate Cake" />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: '24px' }}>
                <Col span={24}>
                    <Card title="Sales Trend">
                        <ResponsiveContainer width="100%" height={400}>
                            <AreaChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Analytics;
