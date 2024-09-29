import React from "react";
import { Form, Input, Button, Col, Row, Typography, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../stores/authContex";
import logo from "../../assets/logo.png"; // Import the logo

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
                content: 'Đăng nhập thành công!',
            });
            navigate('/'); // Navigate to home page
        } else {
            messageApi.open({
                type: 'error',
                content: 'Đăng nhập thất bại!',
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
                            Đăng nhập để vào shop của bạn
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

                {/* Right section with login form */}
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
                        <Title level={2} style={{ textAlign: "center", marginBottom: "1rem" }}>Đăng Nhập</Title>
                        <Form
                            name="login"
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, message: "Vui lòng nhập email!" }, { type: 'email', message: "Email không hợp lệ!" }]}
                            >
                                <Input placeholder="Nhập email" />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                            >
                                <Input.Password placeholder="Nhập mật khẩu" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                    Đăng Nhập
                                </Button>
                            </Form.Item>

                            {/* Added Forgot Password link */}
                            <Form.Item>
                                <div style={{ textAlign: 'center' }}>
                                    <Link to="/forgot-password">Quên mật khẩu?</Link>
                                </div>
                            </Form.Item>
                            <Form.Item>
                                <div style={{ textAlign: 'center' }}>
                                    <span>Bạn chưa có tài khoản? </span>
                                    <Link to="/signup">Đăng ký tại đây</Link>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
