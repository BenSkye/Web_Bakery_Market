import React, { useEffect, useState } from 'react';
import { Card, List, Avatar, Button, Row, Col, Space, Typography, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { CheckCircleOutlined, SyncOutlined, ShoppingCartOutlined, SmileOutlined } from '@ant-design/icons';
import { getPersonalOrderProduct } from '../../services/orderProductService';
import { convertToVND } from '../../utils';
import OrderProduct from './OrderProduct';
import OrderCustomCake from './OrderCustomCake';


const { Text } = Typography;

//['pending', 'confirmed', 'success', 'shipping', 'delivered', 'canceled'],
const status = {
    pending: 'Đang xử lý',
    confirmed: 'Đã được xác nhận',
    success: 'Đã Thanh Toán',
    shipping: 'Đang Giao Hàng',
    delivered: 'Đã Giao Hàng',
    canceled: 'Đã Hủy',
}

const OrderStatus = () => {



    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', width: '100%' }}>
                <h2>Danh Sách Đơn Hàng</h2>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Đơn Hàng Sản Phẩm" key="1">
                        <OrderProduct />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Đơn Hàng Thiết Kế Bánh" key="2">
                        <OrderCustomCake />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default OrderStatus;
