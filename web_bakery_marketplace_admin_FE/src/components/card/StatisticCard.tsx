import React from 'react';
import { Card, Statistic } from 'antd';

interface StatisticCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, icon }) => (
    <Card>
        <Statistic title={title} value={value} prefix={icon} />
    </Card>
);

export default StatisticCard;
