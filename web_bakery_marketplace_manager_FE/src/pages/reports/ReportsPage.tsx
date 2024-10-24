import React, { useState, useEffect } from 'react';
import { Card, Row, Col, DatePicker, Button, Select, Space, Empty, Typography } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { getCashFlowByBakeryId } from '../../services/ordersProductService';
import { useAuth } from '../../stores/authContex';
import { getBakeryByUserId } from '../../services/bakeriesService';

const { RangePicker } = DatePicker;
const { Title } = Typography;

interface PaymentMethod {
    method: string | null;
    totalAmount: number;
    count: number;
}

interface CashFlowData {
    paymentMethods: PaymentMethod[];
    totalCashFlow: number;
}

interface Bakery {
    id: string;
    name: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ReportsPage: React.FC = () => {
    const [cashFlowData, setCashFlowData] = useState<CashFlowData | null>(null);
    const [dateRange, setDateRange] = useState<[string, string]>(['2024-01-01', '2024-12-31']);
    const [selectedBakery, setSelectedBakery] = useState<Bakery | null>(null);
    const [bakeries, setBakeries] = useState<Bakery[]>([]);

    const { user } = useAuth();

    const fetchBakeries = async () => {
        try {
            const data = await getBakeryByUserId(user?.userId || '');
            console.log('Raw bakeries data:', data.metadata);
            const validBakeries = data.metadata
                .filter(bakery => bakery && bakery._id)
                .map(bakery => ({
                    id: bakery._id,
                    name: bakery.name
                }));
            setBakeries(validBakeries);
            if (validBakeries.length > 0) {
                setSelectedBakery(validBakeries[0]);
            }
        } catch (error) {
            console.error('Error fetching bakeries:', error);
        }
    };

    const fetchCashFlowData = async () => {
        if (!selectedBakery || !selectedBakery.id) {
            console.error("No bakery selected or invalid bakery ID");
            return;
        }
        try {
            console.log("Fetching data for bakery ID:", selectedBakery.id);
            const response = await getCashFlowByBakeryId(selectedBakery.id, dateRange[0], dateRange[1]);
            console.log('Cash flow data response:', response.metadata[0]);
            if (response.metadata && response.metadata.length > 0) {
                setCashFlowData(response.metadata[0]);
            } else {
                console.error("No cash flow data received");
                setCashFlowData(null);
            }
        } catch (error) {
            console.error('Error fetching cash flow data:', error);
            setCashFlowData(null);
        }
    };

    useEffect(() => {
        fetchBakeries();
    }, []);

    useEffect(() => {
        if (selectedBakery && selectedBakery.id) {
            fetchCashFlowData();
        }
    }, [selectedBakery, dateRange]);

    const handleDateRangeChange = (_dates: any, dateStrings: [string, string]) => {
        setDateRange(dateStrings);
    };


    const handleBakeryChange = (value: string) => {
        console.log("Selected bakery value:", value);
        const bakery = bakeries.find(b => b.id === value);
        if (bakery) {
            console.log("Setting selected bakery:", bakery);
            setSelectedBakery(bakery);
        } else {
            console.error("Selected bakery not found");
            setSelectedBakery(null);
        }
    };

    const bakeryOptions = bakeries.map((bakery) => ({
        value: bakery.id,
        label: bakery.name || 'Unnamed Bakery'
    }));

    console.log("Select props:", {
        value: selectedBakery?.id,
        onChange: handleBakeryChange,
        options: bakeryOptions
    });

    const pieChartData = cashFlowData?.paymentMethods.map(method => ({
        name: method.method || 'Unknown',
        value: method.totalAmount,
    })) || [];

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Báo cáo dòng tiền</Title>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card>
                    <Space>
                        <Select
                            style={{ width: 200 }}
                            placeholder="Select a bakery"
                            onChange={handleBakeryChange}
                            value={selectedBakery?.id}
                            options={bakeryOptions}
                        />
                        <RangePicker onChange={handleDateRangeChange} />
                        <Button
                            onClick={fetchCashFlowData}
                            type="primary"
                            disabled={!selectedBakery}
                        >
                            Update Report
                        </Button>
                    </Space>
                </Card>

                {selectedBakery && (
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                            <Card>
                                <Title level={4}>Tổng tiền</Title>
                                {cashFlowData ? (
                                    <Title level={2}>{cashFlowData.totalCashFlow.toLocaleString()} VNĐ</Title>
                                ) : (
                                    <Empty description="No data available" />
                                )}
                            </Card>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Card title="Payment Methods">
                                {cashFlowData && pieChartData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={pieChartData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {pieChartData.map((_entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <Empty description="No payment method data available" />
                                )}
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title="Payment Method Details">
                                {cashFlowData && cashFlowData.paymentMethods.length > 0 ? (
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Method</th>
                                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total Amount</th>
                                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Count</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cashFlowData.paymentMethods.map((method, index) => (
                                                <tr key={index}>
                                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{method.method || 'Unknown'}</td>
                                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{method.totalAmount.toLocaleString()} VND</td>
                                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{method.count}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <Empty description="No payment method details available" />
                                )}
                            </Card>
                        </Col>
                    </Row>
                )}
                {!selectedBakery && (
                    <Card>
                        <Empty description="Please select a bakery to view the report" />
                    </Card>
                )}
            </Space>
        </div>
    );
};

export default ReportsPage;