import { Avatar, Button, Card, Col, List, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { getPersonalOrderProduct } from '../../services/orderProductService';
import { Link } from 'react-router-dom';
import { convertToVND } from '../../utils';
import { EyeOutlined } from '@ant-design/icons';
const { Text } = Typography;

const status = {
    pending: 'Đang xử lý',
    confirmed: 'Đã được xác nhận',
    success: 'Đã Thanh Toán',
    shipping: 'Đang Giao Hàng',
    delivered: 'Đã Giao Hàng',
    canceled: 'Đã Hủy',
}

export default function OrderProduct() {

    const [orderProducts, setOrderProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchOrderProducts = async () => {
            try {
                const response = await getPersonalOrderProduct();
                console.log('response', response.metadata)
                setOrderProducts(response.metadata);
            } catch (error) {
                console.error('Error fetching order products:', error);
            }
        };
        fetchOrderProducts();
    }, []);

    return (
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
                                <Text>Ngày đặt: {new Date(order?.createdAt).toLocaleDateString()}</Text>
                            </Space>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Text strong>Số lượng: {order?.quantity}</Text>
                        </Col>
                    </Row>


                    <Row justify="end" align="middle">

                        <Col>
                            <h4>{convertToVND(order?.price)}</h4>
                        </Col>
                    </Row>
                    <Link to={`/orderdetailstatus/${order?._id}`}>
                        <Button
                            type="primary"
                            icon={<EyeOutlined />}
                            size="large"
                            style={{
                                borderRadius: '8px',
                                boxShadow: '0 2px 0 rgba(0, 0, 0, 0.045)',
                            }}
                        >
                            Xem Chi Tiết
                        </Button>
                    </Link>
                </Card>
            )}
        />
    )
}


