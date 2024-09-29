import React from 'react';
import { Card, List, Avatar, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { CheckCircleOutlined, SyncOutlined, ShoppingCartOutlined, SmileOutlined } from '@ant-design/icons';

const orders = [
    {
        orderId: '#123456789',
        status: 'Đã giao hàng',
        statusStep: 2,
        items: [
            {
                title: 'Combo 10 Tất Vớ Nam Nữ Có Cổ Cao',
                img: 'https://trangmoon.com.vn/storage/el/xx/elxx28cx6yh96ztiu7w46hkvtom2_BKM28052_2.jpg',
                quantity: 1,
                price: '₫82,000',
            },
        ],
        totalAmount: '₫94,800',
    },
    {
        orderId: '#987654321',
        status: 'Đang xử lý',
        statusStep: 1,
        items: [
            {
                title: 'Áo Sơ Mi Nam Cổ Điển',
                img: 'https://example.com/shirt.jpg',
                quantity: 2,
                price: '₫150,000',
            },
        ],
        totalAmount: '₫300,000',
    },
    // Add more orders as needed
];

const OrderStatus = () => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', width: '100%' }}>
                <h2>Danh Sách Đơn Hàng</h2>
                <List
                    itemLayout="horizontal"
                    dataSource={orders}
                    renderItem={order => (
                        <Card style={{ marginBottom: '20px' }} key={order.orderId}>
                            <Row justify="space-between" align="middle">
                                <Col>
                                    <h3>{order.orderId}</h3>
                                </Col>
                                <Col>
                                    <h3>{order.status}</h3>
                                </Col>
                            </Row>
                            <List
                                itemLayout="horizontal"
                                dataSource={order.items}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.img} shape="square" size={64} />}
                                            title={item.title}
                                            description={`Số lượng: ${item.quantity}`}
                                        />
                                        <div>{item.price}</div>
                                    </List.Item>
                                )}
                            />
                            <Row justify="space-between" align="middle">
                                <Col>
                                    <h4>Tổng số tiền:</h4>
                                </Col>
                                <Col>
                                    <h4>{order.totalAmount}</h4>
                                </Col>
                            </Row>
                            <Link to='/orderdetailstatus'>
                                <Button type="primary" style={{ marginTop: '10px' }}>
                                    Xem Chi Tiết
                                </Button>
                            </Link>
                        </Card>
                    )}
                />
            </div>
        </div>
    );
};

export default OrderStatus;
