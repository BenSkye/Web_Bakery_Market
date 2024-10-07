import React, { useEffect, useState } from 'react'
import { getPersonalOrderCustomCake } from '../../services/orderProductService';
import { Button, Card, Col, List, message, Row, Space, Spin, Tooltip, Typography } from 'antd';
import { convertToVND } from '../../utils';
import { Link } from 'react-router-dom';
import ViewCustomCake from '../3D/ViewCustomCake';
import CakeVisualization from '../3D/CakeVisualizationProps';
import { CreditCardOutlined, EyeOutlined } from '@ant-design/icons';
import { checkOutCakeDesign } from '../../services/checkoutService';
const { Text } = Typography;

const status = {
    pending: 'Đang xử lý',
    confirmed: 'Đã được xác nhận',
    success: 'Đã Thanh Toán',
    shipping: 'Đang Giao Hàng',
    delivered: 'Đã Giao Hàng',
    canceled: 'Đã Hủy',
}


export default function OrderCustomCake() {
    const [orderCustomCakes, setOrderCustomCakes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const fetchOrderCustomCakes = async () => {
            try {
                const response = await getPersonalOrderCustomCake();
                console.log('response', response);
                setOrderCustomCakes(response.metadata);
            } catch (error) {
                console.error('Error fetching order custom cakes:', error);
            }
        };

        fetchOrderCustomCakes();
        setLoading(false);
    }, []);
    const checkselectedDecorations = (decorations: any[], value: string) => {
        return decorations.some(d => d.value === value);
    }
    const handleSubmit = async (orderProductId: any) => {
        const result = await checkOutCakeDesign(orderProductId)
        console.log('result', result)
        if (result.metadata && result.metadata.paymentUrl) {
            window.open(result.metadata.paymentUrl, '_blank');
        } else {
            message.error('Không thể tạo URL thanh toán');
        }
        console.log('order', orderProductId)

    }


    if (loading) {
        return <Spin />;
    }
    return (
        <List
            itemLayout="horizontal"
            dataSource={orderCustomCakes}
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
                        <Col xs={24} sm={6} md={6} lg={6} >
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
                                isChocolate={order?.customCake.selectedDecorations?.map((decoration: any) => decoration.value === 'chocolate')}
                                onObjectClick={() => { }}
                                handleCanvasCreated={() => { }}
                                style={{ height: '50%' }}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <Space direction="vertical" size="small" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                {order?.payment_method
                                    ? <Text>Hình thức thanh toán: {order?.payment_method}</Text>
                                    : <></>
                                }
                                <Text>Cửa hàng: <Text strong> {order?.bakery_id?.name}</Text></Text>
                            </Space>
                        </Col>
                        <Col xs={24} sm={6} md={6} lg={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Text strong>Số lượng: {order?.quantity}</Text>
                        </Col>
                    </Row>


                    <Row justify="end" align="middle">

                        <Col>
                            <h4>{convertToVND(order?.price)}</h4>
                        </Col>
                    </Row>

                    <Space size="middle" style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
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
                </Card>
            )}
        />
    )
}
