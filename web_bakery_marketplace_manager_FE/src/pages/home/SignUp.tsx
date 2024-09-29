import React from "react";
import { Form, Input, Button, Col, Row, notification } from "antd"; // Import notification
import { signup } from "../../services/authenService";
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';

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
      console.log("Signup Result:", result);

      if (result && result.status === 201) {
        notification.success({
          message: 'Đăng ký thành công!',
          description: 'Bạn đã đăng ký thành công. Hãy đăng nhập để tiếp tục.',
          placement: 'topRight', // Position of the notification
          duration: 3, // Duration in seconds
        });
      } else {
        notification.error({
          message: 'Đăng ký thất bại',
          description: result?.message || "Đăng ký thất bại, vui lòng thử lại.",
          placement: 'topRight',
          duration: 3,
        });
      }
    } catch (error) {
      notification.error({
        message: 'Đăng ký thất bại',
        description: "Đăng ký thất bại, vui lòng thử lại.",
        placement: 'topRight',
        duration: 3,
      });
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
            background: 'linear-gradient(to left, rgba(253, 222, 222, 1), rgba(253, 222, 222, 0.1))',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", color: "#1e88e5" }}>
            <h2 className="typing-effect" style={{ color: '#594b47', fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
              Đăng kí đối tác để bán hàng
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

              <div style={{ textAlign: "center" }}>
                <span>Bạn đã có tài khoản </span>
                <Link to="/login">Đăng nhập</Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
