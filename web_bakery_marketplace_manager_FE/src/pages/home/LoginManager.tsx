import React from "react";
import { Form, Input, Button, Col, Row, message } from "antd";
import { login } from "../../services/authenService"; // Ensure this imports your login service correctly

const LoginManager: React.FC = () => {
  // Handle form submission
  const onFinish = async (values: any) => {
    try {
      // Call the login function to send login data to the backend
      const result = await login({
        email: values.email, // Use 'email' based on your service
        password: values.password,
      });

      // Check for success
      if (result?.metadata) {
        message.success("Đăng nhập thành công!");
        // Redirect or perform other actions after successful login
      } else {
        message.error(result?.message || "Đăng nhập thất bại, vui lòng thử lại.");
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
        backgroundColor: "#f0f2f5",
        height: "100vh",
      }}
    >
      <Row style={{ height: "100vh", width: "100%" }}>
        {/* 1/3 - Left section with logo and color theme */}
        <Col
          span={8}
          style={{
            backgroundColor: "#1e88e5",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            {/* Add your logo here */}
            <img
              src="/path-to-logo/logo.png"
              alt="Logo"
              style={{ width: "200px" }}
            />
          </div>
        </Col>

        {/* 2/3 - Right section with login form */}
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
                name="email" // Keep as username for form compatibility
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                ]}
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                  Đăng Nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginManager;
