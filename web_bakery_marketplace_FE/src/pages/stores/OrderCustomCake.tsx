import React, { useEffect, useState } from 'react'
import { getPersonalOrderCustomCake } from '../../services/orderProductService';
import { Button, Card, Col, List, message, Row, Space, Spin, Tooltip, Typography, Tag } from 'antd';
import { convertToVND } from '../../utils';
import { Link } from 'react-router-dom';
import CakeVisualization from '../3D/CakeVisualizationProps';
import { CreditCardOutlined, EyeOutlined, ClockCircleOutlined, CheckCircleOutlined, DollarCircleOutlined, CarOutlined, GiftOutlined, StopOutlined } from '@ant-design/icons';
import { checkOutCakeDesign } from '../../services/checkoutService';

const { Text, Title } = Typography;

const status = {
    pending: { text: 'Đang xử lý', color: 'orange', icon: <ClockCircleOutlined /> },
    confirmed: { text: 'Đã được xác nhận', color: 'cyan', icon: <CheckCircleOutlined /> },
    success: { text: 'Đã Thanh Toán', color: 'green', icon: <DollarCircleOutlined /> },
    shipping: { text: 'Đang Giao Hàng', color: 'blue', icon: <CarOutlined /> },
    delivered: { text: 'Đã Giao Hàng', color: 'purple', icon: <GiftOutlined /> },
    canceled: { text: 'Đã Hủy', color: 'red', icon: <StopOutlined /> },
};

export default function OrderCustomCake() {
    const [orderCustomCakes, setOrderCustomCakes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrderCustomCakes = async () => {
            try {
                const response = await getPersonalOrderCustomCake();
                setOrderCustomCakes(response.metadata);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching order custom cakes:', error);
                setLoading(false);
            }
        };

        fetchOrderCustomCakes();
    }, []);

    const checkselectedDecorations = (decorations: any[], value: string) => {
        return decorations.some(d => d.value === value);
    }

    const handleSubmit = async (orderProductId: any) => {
        try {
            const result = await checkOutCakeDesign(orderProductId);
            if (result.metadata && result.metadata.paymentUrl) {
                window.open(result.metadata.paymentUrl, '_blank');
            } else {
                message.error('Không thể tạo URL thanh toán');
            }
        } catch (error) {
            message.error('Đã xảy ra lỗi khi xử lý thanh toán');
        }
    }

    if (loading) {
        return <Spin size="large" />;
    }

    return (
        <List
            itemLayout="vertical"
            dataSource={orderCustomCakes}
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
                        <Col xs={24} sm={8} md={6} lg={6}>
                            <div style={{ height: '200px', width: '100%', overflow: 'hidden', borderRadius: '10px' }}>
                                <CakeVisualization
                                    cameraPosition={[0, 500, 500]}
                                    frostingColor={order?.customCake.frostingColor}
                                    selectedDripSauce={order?.customCake.selectedDripSauce}
                                    isCandle={checkselectedDecorations(order?.customCake.selectedDecorations, 'candle')}
                                    isWafer={checkselectedDecorations(order?.customCake.selectedDecorations, 'wafer')}
                                    isMacaron={checkselectedDecorations(order?.customCake.selectedDecorations, 'macaron')}
                                    isStrawberry={checkselectedDecorations(order?.customCake.selectedDecorations, 'strawberry')}
                                    isCream={checkselectedDecorations(order?.customCake.selectedDecorations, 'cream')}
                                    isCherry={checkselectedDecorations(order?.customCake.selectedDecorations, 'cherry')}
                                    isChocolate={order?.customCake.selectedDecorations?.some((decoration: any) => decoration.value === 'chocolate')}
                                    onObjectClick={() => { }}
                                    handleCanvasCreated={() => { }}
                                    style={{ height: '100%', width: '100%' }}
                                />
                            </div>
                        </Col>
                        <Col xs={24} sm={16} md={12} lg={12}>
                            <Space direction="vertical" size="small" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                {order?.payment_method && (
                                    <Text>Hình thức thanh toán: <Tag color="blue">{order?.payment_method}</Tag></Text>
                                )}
                                <Text>Cửa hàng: <Text strong>{order?.bakery_id?.name}</Text></Text>
                                <Text>Ngày đặt: {new Date(order?.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
                                <Text strong style={{ fontSize: '16px', marginTop: '10px' }}>Số lượng: {order?.quantity}</Text>
                            </Space>
                        </Col>
                        <Col xs={24} md={6} lg={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Title level={3} style={{ margin: '10px 0' }}>{convertToVND(order?.price)}</Title>
                            <Space size="middle" style={{ marginTop: '20px' }}>
                                <Link to={`/view-order-cake-design/${order?._id}`}>
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
                                {order?.status === 'confirmed' && (
                                    <Tooltip title="Thanh Toán để hoàn tất đơn hàng">
                                        <Button
                                            type="primary"
                                            icon={<CreditCardOutlined />}
                                            size="large"
                                            style={{
                                                backgroundColor: '#52c41a',
                                                borderColor: '#52c41a',
                                                borderRadius: '8px',
                                                boxShadow: '0 2px 0 rgba(0, 0, 0, 0.045)',
                                            }}
                                            onClick={() => handleSubmit(order?._id)}
                                        >
                                            Thanh Toán
                                        </Button>
                                    </Tooltip>
                                )}
                            </Space>
                        </Col>
                    </Row>
                </Card>
            )}
        />
    )
}