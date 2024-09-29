import React, { useState } from 'react';
import { Card, Steps, Button, List, Avatar, Row, Col } from 'antd';
import { CheckCircleOutlined, SyncOutlined, ShoppingCartOutlined, SmileOutlined } from '@ant-design/icons';

const { Step } = Steps;

const OrderDetailStatus = () => {
    const [currentStep, setCurrentStep] = useState(2); // Current order status step (for example, 2 means 'Shipped')

    const orderSteps = [
        {
            title: 'Đặt hàng thành công',
            icon: <ShoppingCartOutlined />,
        },
        {
            title: 'Đang xử lý',
            icon: <SyncOutlined />,
        },
        {
            title: 'Đã giao hàng',
            icon: <CheckCircleOutlined />,
        },
        {
            title: 'Hoàn thành',
            icon: <SmileOutlined />,
        },
    ];

    const orderItems = [
        {
            title: 'Combo 10 Tất Vớ Nam Nữ Có Cổ Cao',
            img: 'https://trangmoon.com.vn/storage/el/xx/elxx28cx6yh96ztiu7w46hkvtom2_BKM28052_2.jpg',
            quantity: 1,
            price: '₫82,000',
        },
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
                            <h3>#123456789</h3>
                        </Col>
                    </Row>


                </Card>

                {/* Order Items List */}
                <Card title="Sản Phẩm Trong Đơn Hàng" style={{ marginBottom: '20px' }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={orderItems}
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
                </Card>

                {/* Total Payment Info */}
                <Card>
                    <Row justify="space-between">
                        <Col>
                            <h3>Tổng số tiền:</h3>
                        </Col>
                        <Col>
                            <h3>₫94,800</h3>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default OrderDetailStatus;
