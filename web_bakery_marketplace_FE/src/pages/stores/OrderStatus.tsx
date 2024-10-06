import React, { useEffect, useState } from 'react';
import { Card, List, Avatar, Button, Row, Col, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { CheckCircleOutlined, SyncOutlined, ShoppingCartOutlined, SmileOutlined } from '@ant-design/icons';
import { getPersonalOrderProduct } from '../../services/orderProductService';
import { convertToVND } from '../../utils';
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

    const [orderProducts, setOrderProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchOrderProducts = async () => {
            try {
                const response = await getPersonalOrderProduct();
                console.log('responseeeeee', response.metadata)
                setOrderProducts(response.metadata);
            } catch (error) {
                console.error('Error fetching order products:', error);
            }
        };
        fetchOrderProducts();
    }, []);


    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', width: '100%' }}>
                <h2>Danh Sách Đơn Hàng</h2>
                <List
                    itemLayout="horizontal"
                    dataSource={orderProducts}
                    renderItem={order => (
                        <Card style={{ marginBottom: '20px' }} key={order?._id}>
                            <Row justify="space-between" align="middle">
                                <Col>
                                    <h3>{order?._id}</h3>
                                </Col>
                                <Col>
                                    <h3>{status[order?.status as keyof typeof status]}</h3>
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]} align="middle">
                                <Col xs={24} sm={8} md={6} lg={4}>
                                    <Avatar src={order?.product_id?.thumbnail} shape="square" size={96} />
                                </Col>
                                <Col xs={24} sm={16} md={12} lg={14}>
                                    <Space direction="vertical" size="small" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <Text strong>{order?.product_id?.name}</Text>
                                        <Text>Hình thức thanh toán: {order?.payment_method}</Text>
                                    </Space>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <Text strong>Số lượng: {order?.quantity}</Text>
                                </Col>
                            </Row>


                            <Row justify="space-between" align="middle">
                                <Col>
                                    <h4>Tổng số tiền:</h4>
                                </Col>
                                <Col>
                                    <h4>{convertToVND(order?.price)}</h4>
                                </Col>
                            </Row>
                            <Link to={`/orderdetailstatus/${order._id}`}>
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
