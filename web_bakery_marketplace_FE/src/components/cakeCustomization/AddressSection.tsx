import { EnvironmentOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal, Row, Col } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import React, { useState } from 'react';

interface AddressSectionProps {
    onAddressChange: (address: any) => void;
    initialAddress?: any;
}

const AddressSection = ({ onAddressChange, initialAddress }: AddressSectionProps) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(initialAddress || {});

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                setCurrentAddress(values);
                onAddressChange(values);
                setVisible(false);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Card style={{ width: '100%', marginBottom: 16 }}>
                <Row align="middle" justify="space-between">
                    <Col>
                        <h3><EnvironmentOutlined /> Địa Chỉ Nhận Hàng</h3>
                        <div style={{ marginTop: 8 }}>
                            {currentAddress.name && (
                                <span style={{ marginRight: 16 }}>
                                    {currentAddress.name} (+{currentAddress.phone})
                                </span>
                            )}
                            {currentAddress.address && <span>{currentAddress.address}</span>}
                        </div>
                    </Col>
                    <Col>
                        <Button
                            type="link"
                            onClick={() => setVisible(true)}
                            icon={<EditOutlined />}
                        >
                            Thay Đổi
                        </Button>
                    </Col>
                </Row>
            </Card>

            <Modal
                title="Thay Đổi Địa Chỉ"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical" initialValues={currentAddress}>
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
        </>
    );
};

export default AddressSection;