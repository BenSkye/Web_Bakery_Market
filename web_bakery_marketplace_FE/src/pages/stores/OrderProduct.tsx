import { Avatar, Button, Card, Col, List, Row, Space, Typography, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { getPersonalOrderProduct } from '../../services/orderProductService';
import { Link } from 'react-router-dom';
import { convertToVND } from '../../utils';
import { EyeOutlined, ClockCircleOutlined, CheckCircleOutlined, SyncOutlined, DollarCircleOutlined, CarOutlined, GiftOutlined, StopOutlined } from '@ant-design/icons';
const { Text, Title } = Typography;

const status = {
    pending: { text: 'Đang xử lý', color: 'orange', icon: <ClockCircleOutlined /> },
    confirmed: { text: 'Đã được xác nhận', color: 'cyan', icon: <CheckCircleOutlined /> },
    processing: { text: 'Đang làm', color: 'blue', icon: <SyncOutlined spin /> },
    success: { text: 'Đã Thanh Toán', color: 'green', icon: <DollarCircleOutlined /> },
    shipping: { text: 'Đang Giao Hàng', color: 'geekblue', icon: <CarOutlined /> },
    delivered: { text: 'Đã Giao Hàng', color: 'purple', icon: <GiftOutlined /> },
    canceled: { text: 'Đã Hủy', color: 'red', icon: <StopOutlined /> },
}

export default function OrderProduct() {
    const [orderProducts, setOrderProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchOrderProducts = async () => {
            try {
                const response = await getPersonalOrderProduct();
                setOrderProducts(response.metadata);
            } catch (error) {
                console.error('Error fetching order products:', error);
            }
        };
        fetchOrderProducts();
    }, []);

    return (
        <List
            itemLayout="vertical"
            dataSource={orderProducts}
            renderItem={order => (
                <Card
                    hoverable
                    style={{ marginBottom: '20px', borderRadius: '15px', overflow: 'hidden' }}
                    key={order?._id}
                >
                    <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
                        <Col>
                            <Title level={4} style={{ margin: 0 }}>Đơn hàng: {order?._id}</Title>
                        </Col>
                        <Col>
                            <Tag color={status[order?.status as keyof typeof status].color} icon={status[order?.status as keyof typeof status].icon}>
                                {status[order?.status as keyof typeof status].text}
                            </Tag>
                        </Col>
                    </Row>
                    <Row gutter={[24, 24]} align="middle">
                        <Col xs={24} sm={8} md={6} lg={4}>
                            <Avatar src={order?.product_id?.thumbnail} shape="square" size={120} style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />
                        </Col>
                        <Col xs={24} sm={16} md={12} lg={14}>
                            <Space direction="vertical" size="small" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Text strong style={{ fontSize: '18px' }}>{order?.product_id?.name}</Text>
                                <Text>Hình thức thanh toán: <Tag color="blue">{order?.payment_method}</Tag></Text>
                                <Text>Ngày đặt: {new Date(order?.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                            </Space>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Text strong style={{ fontSize: '16px' }}>Số lượng: {order?.quantity}</Text>
                            <Title level={3} style={{ margin: '10px 0' }}>{convertToVND(order?.price)}</Title>
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
                        </Col>
                    </Row>
                </Card>
            )}
        />
    )
}