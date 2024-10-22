import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { useAuth } from '../../stores/authContex';
import { updateManagerProfile, getManagerProfile } from '../../services/authenService';

const { Title } = Typography;

interface ManagerProfile {
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
}

const ManageProfileManager: React.FC = () => {
    const [form] = Form.useForm<ManagerProfile>();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getManagerProfile(user?.userId);
                form.setFieldsValue(profile);
            } catch (error) {
                console.error('Lỗi khi tải thông tin hồ sơ:', error);
                message.error('Không thể tải thông tin hồ sơ. Vui lòng thử lại sau.');
            }
        };

        fetchProfile();
    }, [user?.userId, form]);

    const onFinish = async (values: ManagerProfile) => {
        setLoading(true);
        try {
            await updateManagerProfile(user?.userId, values);
            message.success('Cập nhật hồ sơ thành công!');
        } catch (error) {
            console.error('Lỗi khi cập nhật hồ sơ:', error);
            message.error('Có lỗi xảy ra khi cập nhật hồ sơ. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card style={{ maxWidth: 600, margin: '2rem auto' }}>
            <Title level={2}>Quản lý Hồ sơ Manager</Title>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email' },
                        { type: 'email', message: 'Email không hợp lệ' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                >
                    <Input.TextArea rows={3} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        {loading ? 'Đang cập nhật...' : 'Cập nhật Hồ sơ'}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ManageProfileManager;