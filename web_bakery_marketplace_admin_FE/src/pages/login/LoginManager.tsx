import React from "react";
import { Form, Input, Button, Col, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../stores/authContex';

const LoginManager: React.FC = () => {
  const { login } = useAuth()
  const navigate = useNavigate();


  const onFinish = async (values: any) => {
    try {

      const data = {
        email: values.email,
        password: values.password,
      }
      const response = await login(data);


      if (response.status === 200) {
        message.success("Đăng nhập thành công!");
        navigate("/dashboard");
      } else if (response.error) {
        message.error("Chỉ tài khoản admin mới được phép đăng nhập.");
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error("Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau.");
    }
  };


  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ height: "100vh", background: "#fad0c4" }}>
      <Row style={{ height: "100%", width: "100%" }}>
        <Col
          span={12}
          style={{
            background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
        ><img style={{ boxShadow: '10px', borderRadius: '20px', width: '100px', height: '100px', marginBottom: '2rem' }} src={logo}></img>
          <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>Admin Dashboard</h1>
          <p style={{ color: 'white', fontSize: '1.2rem', textAlign: 'center', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
            Chào mừng đến với hệ thống quản lý Merci! <br />
            Đăng nhập để truy cập bảng điều khiển của bạn.
          </p>
        </Col>

        <Col
          span={12}
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
              padding: "3rem",
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "2rem", color: "#ff9a9e" }}>
              Đăng Nhập Quản Lý
            </h2>
            <Form
              name="login"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              size="large"
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              >
                <Input prefix={<UserOutlined style={{ color: '#ff9a9e' }} />} placeholder="Email quản lý" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password prefix={<LockOutlined style={{ color: '#ff9a9e' }} />} placeholder="Mật khẩu" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: "100%", height: "40px", backgroundColor: "#ff9a9e", borderColor: "#ff9a9e" }}>
                  Đăng Nhập
                </Button>
              </Form.Item>

              {/* <div style={{ textAlign: "center" }}>
                <Link to="/forgot-password" style={{ color: '#ff9a9e' }}>Quên mật khẩu?</Link>
              </div>
              <div style={{ textAlign: "center" }}>
                <Link to="/signup" style={{ color: '#ff9a9e' }}>Đăng kí tài khoản?</Link>
              </div> */}
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginManager;