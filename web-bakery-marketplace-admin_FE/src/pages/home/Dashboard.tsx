import React from 'react';
import { Card, Col } from 'antd';

const { Meta } = Card;

interface DashboardCardProps {
    title: string;
    value: string;
    icon: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon }) => (
    <Col span={6}>
        <Card>
            <Meta
                title={title}
                description={
                    <div style={{ fontSize: '24px', display: 'flex', alignItems: 'center' }}>
                        {icon} {value}
                    </div>
                }
            />
        </Card>
    </Col>
);

export default DashboardCard;
