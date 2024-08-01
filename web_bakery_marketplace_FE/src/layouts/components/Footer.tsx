import React from 'react';
import { Layout, Row, Col } from 'antd';
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.png';

const { Footer } = Layout;

const FooterComponent: React.FC = () => {
    return (
        <Footer style={{ textAlign: 'center', backgroundColor: '#857777', color: '#fff' }}>
            <Row gutter={16} justify="center">
                <Col span={6}>
                    <h3>Chúng tôi</h3>
                    <p>Mô tả về công ty hoặc dự án của bạn.</p>
                    <img src={logo} alt="logo" style={{ width: 100, height: 100, borderRadius: 10 }} />
                </Col>
                <Col span={6}>
                    <h3>Liên kết</h3>
                    <ul style={{ listStyleType: 'none', padding: 0, justifyContent: 'start' }}>
                        <li><a href="#">Facebook <FacebookOutlined /></a></li>
                        <li><a href="#">Instagram <InstagramOutlined /></a></li>
                    </ul>
                </Col>
                <Col span={6}>
                    <h3>Thông tin</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li><a href="#">Về chúng tôi</a></li>
                        <li><a href="#">Điều khoản dịch vụ</a></li>
                        <li><a href="#">Chính sách bảo mật</a></li>
                    </ul>
                </Col>
                <Col span={6}>
                    <h3>Liên hệ</h3>
                    <p>Email: contact@example.com</p>
                    <p>Điện thoại: +123 456 789</p>
                </Col>
            </Row>
            <p style={{ marginTop: 16 }}>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </Footer>
    );
};

export default FooterComponent;
