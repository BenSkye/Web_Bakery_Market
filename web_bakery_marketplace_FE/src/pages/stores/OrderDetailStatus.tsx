import React, { useState, useEffect } from 'react';
import { Card, Steps, List, Avatar, Row, Col } from 'antd';
import { CheckCircleOutlined, SyncOutlined, ShoppingCartOutlined, SmileOutlined, CarOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { getOrderProductById } from '../../services/orderProductService';

const { Step } = Steps;

const OrderDetailStatus = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<any>(null);
    const [currentStep, setCurrentStep] = useState(0); // Start at the first step

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orderResponse = await getOrderProductById(id);
                console.log('Order fetched:', orderResponse.metadata);
                setOrder(orderResponse.metadata);
                // Set current step based on the order status
                const statusToStep = {
                    success: 0,
                    processing: 1,
                    shipping: 2,
                    delivered: 3,
                };
                setCurrentStep(statusToStep[orderResponse.metadata.status] || 0);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        if (id) {
            fetchOrder();
        }
    }, [id]);

    const orderSteps = [
        {
            title: 'Đặt hàng thành công',
            icon: <ShoppingCartOutlined />,
            status: 'success'
        },
        {
            title: 'Đang chuẩn bị hàng',
            icon: <SyncOutlined spin />,
            status: 'processing'
        },
        {
            title: 'Đang giao hàng',
            icon: <CarOutlined />,
            status: 'shipping'
        },
        {
            title: 'Đã giao hàng',
            icon: <CheckCircleOutlined />,
            status: 'delivered'
        }
    ];

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '800px', width: '100%' }}>
                {/* Order Status Card */}
                <Card title="Trạng Thái Đơn Hàng" style={{ marginBottom: '20px' }}>
                    <Steps current={currentStep} style={{ marginBottom: '20px' }}>
                        {orderSteps.map((step, index) => (
                            <Step key={index} title={step.title} icon={step.icon} />
                        ))}
                    </Steps>

                    <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
                        <Col>
                            <h3>Mã đơn hàng:</h3>
                        </Col>
                        <Col>
                            <h3>{order?._id || 'Loading...'}</h3>
                        </Col>
                    </Row>
                </Card>

                {/* Order Items List */}
                <Card title="Sản Phẩm Trong Đơn Hàng" style={{ marginBottom: '20px' }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={order ? [order] : []} // Assuming the product is in order.product_id
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.product_id?.thumbnail} shape="square" size={64} />}
                                    title={item.product_id?.name}
                                    description={`Số lượng: ${item.quantity}`}
                                />
                                <div>₫{item.price?.toLocaleString()}</div>
                            </List.Item>
                        )}
                    />
                </Card>

                {/* Total Payment Info */}
                <Card>
                    <Row justify="space-between">
                        <Col>
                            <h3>Tổng số tiền:</h3>
                        </Col>
                        <Col>
                            <h3>₫{order?.price?.toLocaleString() || 'Loading...'}</h3>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default OrderDetailStatus;
