import React, { useState } from 'react';
import { Card, Avatar, Button, Form, Input, Row, Col, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();

    const userData = {
        name: 'Trần Minh Quang',
        email: 'quang@example.com',
        phone: '(+84) 589953258',
        address: 'Cc Bộ Đội Biên Phòng, Nguyễn Văn Công, Phường 3, Quận Gò Vấp, TP. Hồ Chí Minh',
        avatar: 'https://example.com/user-avatar.jpg' // Replace with actual URL
    };

    const handleEdit = () => {
        setIsEditing(true);
        form.setFieldsValue(userData);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            // Here you can send the updated values to your backend
            console.log('Updated User Data:', values);
            message.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.log('Validation Failed:', error);
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center' }}>
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <Card>
                    <Row justify="center" style={{ marginBottom: '20px' }}>
                        <Avatar src={userData.avatar} size={100} />
                    </Row>
                    <Form form={form} layout="vertical">
                        <Form.Item
                            label="Họ và Tên"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                        >
                            <Input disabled={!isEditing} />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ' }]}
                        >
                            <Input disabled={!isEditing} />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                        >
                            <Input disabled={!isEditing} />
                        </Form.Item>
                        <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                        >
                            <Input.TextArea disabled={!isEditing} rows={4} />
                        </Form.Item>
                    </Form>
                    <Row justify="end">
                        {isEditing ? (
                            <Button type="primary" onClick={handleSave}>
                                Lưu
                            </Button>
                        ) : (
                            <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
                                Chỉnh sửa
                            </Button>
                        )}
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
