import React from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';

const { Title } = Typography;

const SignUp: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <Col xs={24} sm={16} md={12} lg={8}>
                <div style={{
                    padding: '24px',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                }}>
                    <Title level={2} style={{ textAlign: 'center' }}>Sign Up</Title>
                    <Form
                        name="signup"
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="Username" />
                        </Form.Item>

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
                            hasFeedback
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Confirm Password" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Sign Up
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Col>
        </Row>
    );
};

export default SignUp;
