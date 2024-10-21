import React, { useState } from 'react';
import { Tabs, Card, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import ManageProducts from '../manageProduct/ManageProducts';
import OrderManagement from '../manageOrder/OrderManagement';

const { TabPane } = Tabs;
const { Title } = Typography;

const BakeryManagement: React.FC = () => {
    const { bakeryId } = useParams<{ bakeryId: string }>();
    const [activeTab, setActiveTab] = useState('products');

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };

    return (
        <Card>
            <Title level={1}>Quản lí tiệm bánh</Title>
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
                <TabPane tab="Quản lí sản phẩm" key="products">
                    <ManageProducts bakeryId={bakeryId || ''} />
                </TabPane>
                <TabPane tab="Quản lí đơn hàng" key="orders">
                    <OrderManagement bakeryId={bakeryId || ''} />
                </TabPane>
            </Tabs>
        </Card>
    );
};

export default BakeryManagement;