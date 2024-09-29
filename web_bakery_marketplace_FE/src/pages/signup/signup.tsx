import React from 'react';
import { Form, Input, Button, Row, Col, Typography, message } from 'antd';
import { signup } from '../../services/authenService';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Import your logo

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
                content: 'Đăng kí thành công',
            });
            navigate('/login');
        } else {
            messageApi.open({
                type: 'error',
                content: 'Đăng kí thất bại',
            });
        }
        console.log('Received values of form: ', values);
    };

    // Handle form failure
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f0f2f5",
            }}
        >
            {contextHolder}
            <Row style={{ height: "100vh", width: "100%" }}>
                {/* Left section with logo and welcome message */}
                <Col
                    span={8}
                    style={{
                        background: 'linear-gradient(to left, rgba(253, 222, 222, 1), rgba(253, 222, 222, 0.1))',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "2rem",
                    }}
                >
                    <div style={{ textAlign: "center", color: "#1e88e5" }}>
                        <h2 className="typing-effect" style={{ color: '#594b47', fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
                            Đăng ký để bắt đầu
                        </h2>
                        <p style={{ fontSize: "1rem", color: '#594b47' }}>
                            Chào mừng đến với Merci!
                        </p>
                        <img
                            src={logo}
                            alt="Logo"
                            style={{ width: "200px", marginBottom: "2rem", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}
                        />
                    </div>
                </Col>

                {/* Right section with signup form */}
                <Col
                    span={16}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                    }}
                >
                    <div
                        style={{
                            width: "80%",
                            padding: "2rem",
                            backgroundColor: "#fff",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                            borderRadius: "10px",
                        }}
                    >
                        <Title level={2} style={{ textAlign: "center", marginBottom: "1rem" }}>Đăng Ký</Title>
                        <Form
                            name="signup"
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
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
                                rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
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
                                <Button type="primary" htmlType="submit" block>
                                    Đăng Ký
                                </Button>
                            </Form.Item>

                            <Form.Item>
                                <div style={{ textAlign: 'center' }}>
                                    <span>Bạn đã có tài khoản? </span>
                                    <Link to="/login">Đăng nhập tại đây</Link>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default SignUp;
