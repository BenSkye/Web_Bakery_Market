import React from 'react';
import { Form, Input, Button, Row, Col, Typography, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom'; // Added Link for navigation to Forgot Password
import { useAuth } from '../../stores/authContex';

const { Title } = Typography;

const Login: React.FC = () => {
    const { login } = useAuth();

    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const data = {
            email: values.email,
            password: values.password,
        };
        const response = await login(data);
        console.log(response);
        if (response.status === 200) {
            messageApi.open({
                type: 'success',
                content: 'Đăng nhập thành công',
            });
            navigate('/');
        } else {
            messageApi.open({
                type: 'error',
                content: 'Đăng nhập thất bại',
            });
        }
        console.log('Received values of form: ', values);
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
                    <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
                    <Form
                        name="login"
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

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Login
                            </Button>
                        </Form.Item>

                        {/* Added Forgot Password link */}
                        <Form.Item>
                            <div style={{ textAlign: 'center' }}>
                                <Link to="/forgot-password">Forgot Password?</Link>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <div style={{ textAlign: 'center' }}>
                                <Link to="/signup">You don't have account, click here.</Link>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default Login;
