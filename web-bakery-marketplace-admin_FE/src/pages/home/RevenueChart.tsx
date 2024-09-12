import React from 'react';
import { Card } from 'antd';
import { Line } from '@ant-design/plots';

interface RevenueChartProps {
    chartData: Array<{ date: string; value: number }>;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ chartData }) => (
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
);

export default RevenueChart;
