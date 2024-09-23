import React from 'react';
import { Form, Input, Button, Row, Col, Typography, message } from 'antd';
import { forgotPassword } from '../../services/authenService'; // Assuming this handles API request
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ForgotPassword: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            const response = await forgotPassword(values);
            console.log('Forgot password response:', response);


            messageApi.open({
                type: 'success',
                content: 'Reset password link has been sent to your email. Please check your inbox.',
            });

            // Optionally navigate to another page
            // navigate('/login'); 
        } catch (error) {
            console.error('Error in forgotPassword:', error);
            messageApi.open({
                type: 'error',
                content: 'Failed to send reset link. Please try again later.',
            });
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
                    <Title level={2} style={{ textAlign: 'center' }}>Forgot Password</Title>
                    <Form
                        name="forgotPassword"
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Send Reset Link
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default ForgotPassword;
