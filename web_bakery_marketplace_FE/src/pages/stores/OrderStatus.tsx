import React, { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import OrderProduct from './OrderProduct';
import OrderCustomCake from './OrderCustomCake';

const { TabPane } = Tabs;

const OrderStatus = () => {


    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Đơn hàng sản phẩm',
            children: <OrderProduct />,
        },
        {
            key: '2',
            label: 'Đơn hàng thiết kế',
            children: <OrderCustomCake />,
        },
    ]

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', width: '100%' }}>
                <h2>Danh Sách Đơn Hàng</h2>
                <Tabs defaultActiveKey="1" items={items} />;
            </div>
        </div>
    );
};

export default OrderStatus;