import React from "react";
import { Form, Input, Button, Col, Row, message } from "antd";
import { signup } from "../../services/authenService";

const SignUp: React.FC = () => {
  // Handle form submission
  const onFinish = async (values: any) => {
    try {
      const result = await signup({
        name: values.username,
        email: values.email,
        password: values.password,
        phone: values.phone,
        address: values.address,
        role: "shop", // Default role for signup
      });

      if (result && result.success) {
        message.success("Đăng ký thành công!");
      } else {
        message.error(result?.message || "Đăng ký thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      message.error("Đăng ký thất bại, vui lòng thử lại.");
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
            <img
              src="/path-to-logo/logo.png"
              alt="Logo"
              style={{ width: "200px" }}
            />
          </div>
        </Col>

        {/* 2/3 - Right section with signup form */}
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
              Đăng Ký Đối Tác
            </h1>
            <Form
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Tên người dùng"
                name="username"
                rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
              >
                <Input placeholder="Nhập tên người dùng" />
              </Form.Item>

              {/* Password */}
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>

              {/* Email with format validation */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: 'email', message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>

              {/* Phone with numeric validation */}
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  { pattern: /^[0-9]*$/, message: "Số điện thoại phải là số!" },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>

              {/* Address */}
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                  Đăng Ký
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
