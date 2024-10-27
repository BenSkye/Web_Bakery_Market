import React from 'react';
import { Form, Input, Button, Row, Col, Typography, message } from 'antd';
import { signup } from '../../services/authenService';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import '../../styles/signup/signup.css';

const { Title } = Typography;

const SignUp: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const data = {
            name: values.username,
            email: values.email,
            password: values.password,
        };
        const response = await signup(data);
        console.log(response);
        if (response.status === 201) {
            messageApi.open({
                type: 'success',
                content: 'Đăng kí thành công, vui lòng kiểm tra email để xác thực tài khoản!',
            });

        } else {
            messageApi.open({
                type: 'error',
                content: 'Đăng kí thất bại',
            });
        }
        console.log('Received values of form: ', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="signup-container">
            {contextHolder}
            <Row className="signup-row">
                <Col xs={24} md={12} className="left-section">
                    <div className="logo-container">
                        <img src={logo} alt="Logo" className="logo" />
                        <h2 className="welcome-text fade-in ">Đăng ký để bắt đầu</h2>
                        <p className="sub-text fade-in">Chào mừng đến với Merci!</p>
                    </div>
                </Col>

                <Col xs={24} md={12} className="right-section">
                    <div className="form-container">
                        <Title level={2} className="form-title">Đăng Ký</Title>
                        <Form
                            name="signup"
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            className="signup-form"
                        >
                            <Form.Item
                                name="username"
                                label="Tên đăng nhập"
                                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                            >
                                <Input placeholder="Tên đăng nhập" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email!' },
                                    { type: 'email', message: 'Email không hợp lệ!' }
                                ]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Mật khẩu"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                                hasFeedback
                            >
                                <Input.Password placeholder="Mật khẩu" />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="Xác nhận mật khẩu"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Xác nhận mật khẩu" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="submit-button">
                                    Đăng Ký
                                </Button>
                            </Form.Item>

                            <Form.Item className="login-link">
                                <span>Bạn đã có tài khoản? </span>
                                <Link to="/login">Đăng nhập tại đây</Link>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default SignUp;