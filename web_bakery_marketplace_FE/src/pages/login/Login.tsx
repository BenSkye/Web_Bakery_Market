import React from "react";
import { Form, Input, Button, Col, Row, Typography, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../stores/authContex";
import logo from "../../assets/logo.png";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title } = Typography;

// Styled components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const LoginCard = styled.div`
  width: 80%;
  max-width: 1000px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const LeftColumn = styled(Col)`
  background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  color: white;
`;

const RightColumn = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;

const StyledForm = styled(Form)`
  width: 100%;
  max-width: 400px;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
  border: none;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  &:hover {
    background: linear-gradient(45deg, #fad0c4 0%, #ff9a9e 99%, #ff9a9e 100%);
  }
`;

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

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <LoginContainer>
            {contextHolder}
            <LoginCard>
                <Row>
                    <LeftColumn span={10}>
                        <img
                            src={logo}
                            alt="Logo"
                            style={{ width: "150px", marginBottom: "2rem" }}
                        />
                        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem", textAlign: "center" }}>
                            Merci nơi bạn thỏa sức sáng tạo
                        </h2>
                        <p style={{ fontSize: "1.2rem", textAlign: "center" }}>
                            Chào mừng đến với Merci!
                        </p>
                    </LeftColumn>
                    <RightColumn span={14}>
                        <StyledForm
                            name="login"
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Title level={2} style={{ textAlign: "center", marginBottom: "2rem", color: "#ff9a9e" }}>Đăng Nhập</Title>
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: "Vui lòng nhập email!" }, { type: 'email', message: "Email không hợp lệ!" }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" size="large" />
                            </Form.Item>
                            <Form.Item>
                                <StyledButton type="primary" htmlType="submit" block>
                                    Đăng Nhập
                                </StyledButton>
                            </Form.Item>
                            <Form.Item>
                                <div style={{ textAlign: 'center' }}>
                                    <Link to="/forgot-password" style={{ color: "#ff9a9e" }}>Quên mật khẩu?</Link>
                                </div>
                            </Form.Item>
                            <Form.Item>
                                <div style={{ textAlign: 'center' }}>
                                    <span>Bạn chưa có tài khoản? </span>
                                    <Link to="/signup" style={{ color: "#ff9a9e", fontWeight: "bold" }}>Đăng ký tại đây</Link>
                                </div>
                            </Form.Item>
                        </StyledForm>
                    </RightColumn>
                </Row>
            </LoginCard>
        </LoginContainer>
    );
};

export default Login;