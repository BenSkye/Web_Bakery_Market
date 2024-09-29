import React from "react";
import { Form, Input, Button, Col, Row, message } from "antd";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { login } from "../../services/authenService";
import logo from "../../assets/logo.png";

const LoginManager: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Handle form submission
  const onFinish = async (values: any) => {
    try {

      // Call the login function to send login data to the backend
      const result = await login({
        email: values.email,
        password: values.password,
      });

      // Check for success
      if (result?.metadata) {
        message.success("Đăng nhập thành công!");

        // Redirect to another page after successful login
        navigate("/statistics"); // Change '/dashboard' to the desired route
      } else {
        message.error(result?.message || "Đăng nhập thất bại, vui lòng thử lại.");
        navigate("/login"); // Redirect to the login page
      }
    } catch (error) {
      message.error("Đăng nhập thất bại, vui lòng thử lại.");
    }
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
      }}
    >
      <Row style={{ height: "100vh", width: "100%" }}>
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
            <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
              Đăng Nhập
            </h1>
            <Form
              name="login"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Vui lòng nhập email!" }]}
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

              {/* Add "Register" link */}
              <div style={{ textAlign: "center" }}>
                <span>Bạn chưa có tài khoản? </span>
                <Link to="/signup">Đăng ký tại đây</Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginManager;
