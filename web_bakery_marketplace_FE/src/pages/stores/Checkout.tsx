import React, { useState } from 'react';
import { Row, Col, Input, Button, Checkbox, Card, List, Avatar, Divider, Modal, Form, Radio } from 'antd';
import { EnvironmentOutlined, EditOutlined, DollarOutlined } from '@ant-design/icons';

const Checkout: React.FC = () => {
    const [newAddressVisible, setNewAddressVisible] = useState(false);
    const [form] = Form.useForm(); // Ant Design form hook

    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                console.log('New Address:', values);
                setNewAddressVisible(false);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setNewAddressVisible(false);
    };

    const [paymentMethod, setPaymentMethod] = useState('momo');

    const handlePaymentChange = e => {
        setPaymentMethod(e.target.value);
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '1500px', width: '100%' }}>
                {/* Address Section */}
                <Card>
                    <Row>
                        <Col>
                            <h3>
                                <EnvironmentOutlined /> Địa Chỉ Nhận Hàng
                            </h3>
                        </Col>
                    </Row>
                    <Row align="middle" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
                        <Col>
                            <span style={{ marginRight: '10px' }}>Trần Minh Quang (+84) 589953258</span>
                            <span>Cc Bộ Đội Biên Phòng, Nguyễn Văn Công, Phường 3, Quận Gò Vấp, TP. Hồ Chí Minh</span>
                        </Col>
                        <Col>
                            <Button type="link" onClick={() => setNewAddressVisible(true)} style={{ paddingLeft: '10px' }}>
                                <EditOutlined /> Thay Đổi
                            </Button>
                        </Col>
                    </Row>
                </Card>

                {/* Modal for changing the address */}
                <Modal
                    title="Thay Đổi Địa Chỉ"
                    visible={newAddressVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="Lưu"
                    cancelText="Hủy"
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            label="Họ và Tên"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                        >
                            <Input placeholder="Nhập họ và tên" />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                        >
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                        >
                            <Input placeholder="Nhập địa chỉ" />
                        </Form.Item>
                    </Form>
                </Modal>

                <Divider />

                {/* Product Section */}
                <Card>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Avatar
                            src="https://trangmoon.com.vn/storage/el/xx/elxx28cx6yh96ztiu7w46hkvtom2_BKM28052_2.jpg"
                            shape="square"
                            size={64}
                            style={{ marginRight: '10px' }}
                        />
                        <div style={{ flex: 2, textAlign: 'left' }}>
                            <a href="https://www.example.com" style={{ fontWeight: 'bold' }}>
                                Combo 10 Tất Vớ Nam Nữ Có Cổ Cao
                            </a>
                        </div>
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <span>Số lượng: 1</span>
                        </div>
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <span>Đơn giá: ₫82,000</span>
                        </div>
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <span>Thành tiền: ₫82,000</span>
                        </div>
                    </div>
                </Card>

                <Divider />

                {/* Payment Section */}
                <Card>
                    <h3>Hình thức thanh toán</h3>
                    <Row justify="center" align="middle" style={{ marginTop: '20px' }}>
                        <Radio.Group onChange={handlePaymentChange} value={paymentMethod}>
                            <Radio value="momo">
                                {/* Momo Icon */}
                                <Avatar
                                    src="data:image/png;base64,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"
                                    shape="square"
                                    size={32}  // Adjust size as necessary
                                    style={{ marginRight: '10px' }}
                                />
                            </Radio>
                            <Radio value="cash">Tiền mặt <DollarOutlined /></Radio>
                        </Radio.Group>
                    </Row>
                </Card>


                <Divider />

                <Row justify="space-between" align="middle">
                    <Col>
                        <h3>Tổng số tiền (1 sản phẩm):</h3>
                    </Col>
                    <Col>
                        <h3>₫94,800</h3>
                    </Col>
                </Row>

                <Button type="primary" block style={{ marginTop: '20px' }}>
                    Thanh Toán
                </Button>
            </div>
        </div>
    );
};

export default Checkout;
