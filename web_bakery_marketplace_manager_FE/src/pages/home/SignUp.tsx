import React from "react";
import { Form, Input, Button, notification, Col, Row } from "antd"; // Import notification
import { signup } from "../../services/authenService";
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import { HomeOutlined, LockOutlined, MailOutlined, PhoneOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons';

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
        >
          <img src={logo} alt="logo" style={{ boxShadow: '10px', borderRadius: '20px', width: '100px', height: '100px', marginBottom: '2rem' }} />
          <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>Đăng Ký Đối Tác Merci</h1>
          <p style={{ color: 'white', fontSize: '1.2rem', textAlign: 'center', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
            Chào mừng bạn đến với Merci! <br />
            Đăng ký để trở thành đối tác của chúng tôi.
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
              Đăng Ký Đối Tác
            </h2>
            <Form
              name="signup"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              size="large"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}
              >
                <Input prefix={<UserOutlined style={{ color: '#ff9a9e' }} />} placeholder="Tên người dùng" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: 'email', message: "Email không hợp lệ!" },
                ]}
              >
                <Input prefix={<MailOutlined style={{ color: '#ff9a9e' }} />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password prefix={<LockOutlined style={{ color: '#ff9a9e' }} />} placeholder="Mật khẩu" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu!" },
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
                <Input.Password prefix={<LockOutlined style={{ color: '#ff9a9e' }} />} placeholder="Xác nhận mật khẩu" />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  { pattern: /^[0-9]*$/, message: "Số điện thoại phải là số!" },
                ]}
              >
                <Input prefix={<PhoneOutlined style={{ color: '#ff9a9e' }} />} placeholder="Số điện thoại" />
              </Form.Item>

              <Form.Item
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
              >
                <Input prefix={<HomeOutlined style={{ color: '#ff9a9e' }} />} placeholder="Địa chỉ" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: "100%", height: "40px", backgroundColor: "#ff9a9e", borderColor: "#ff9a9e" }}>
                  Đăng Ký
                </Button>
              </Form.Item>

              <div style={{ textAlign: "center" }}>
                <span>Bạn đã có tài khoản? </span>
                <Link to="/login" style={{ color: "#ff9a9e" }}>Đăng nhập</Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
