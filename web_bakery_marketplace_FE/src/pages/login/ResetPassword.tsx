import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Typography, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/authenService';

const { Title } = Typography;

const ChangePassword: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Get token from the URL query parameter
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    // Redirect if token is missing
    useEffect(() => {
        if (!token) {
            message.error('Token is missing or invalid');
            navigate('/');  // Redirect to home if token is not present
        }
    }, [token, navigate]);

    // Handle form submission
    const onFinish = async (values: any) => {
        const { newPassword, confirmPassword } = values;

        if (newPassword !== confirmPassword) {
            messageApi.open({
                type: 'error',
                content: 'Passwords do not match!',
            });
            return;
        }

        setLoading(true); // Start loading state
        try {
            const response = await resetPassword(token, newPassword);
            console.log('Change Password Response: ', response);

            messageApi.open({
                type: 'success',
                content: 'Password changed successfully',
            });
            navigate('/login');  // Redirect to login after success
        } catch (error) {
            console.error('Error in changePassword:', error);
            messageApi.open({
                type: 'error',
                content: 'Failed to reset password. Please try again later.',
            });
        } finally {
            setLoading(false); // End loading state
        }
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            {contextHolder}
            <Col xs={24} sm={16} md={12} lg={8}>
                <div style={{
                    padding: '24px',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                }}>
                    <Title level={2} style={{ textAlign: 'center' }}>Change Password</Title>
                    <Form
                        name="changePassword"
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="newPassword"
                            label="New Password"
                            rules={[{ required: true, message: 'Please input your new password!' }]}
                        >
                            <Input.Password placeholder="New Password" />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label="Confirm Password"
                            rules={[{ required: true, message: 'Please confirm your password!' }]}
                        >
                            <Input.Password placeholder="Confirm Password" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>
                                Change Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default ChangePassword;
