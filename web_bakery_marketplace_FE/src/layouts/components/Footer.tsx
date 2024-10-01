import React from 'react';
import { Layout, Row, Col } from 'antd';
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.png';
import '../../styles/layoutSyles/footerComponent.css'; // Thêm tệp CSS cho footer

const { Footer } = Layout;

const FooterComponent: React.FC = () => {
    return (
        <Footer style={{ backgroundColor: '#857777', color: '#fff', padding: '40px 0' }}>
            <Row gutter={16} justify="center">
                <Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
                    <h3>Chúng tôi</h3>
                    <p>Mô tả về công ty hoặc dự án của bạn.</p>
                    <img src={logo} alt="logo" style={{ width: 100, height: 100, borderRadius: 10 }} />
                </Col>
                <Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
                    <h3>Liên kết</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Facebook <FacebookOutlined /></a></li>
                        <li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Instagram <InstagramOutlined /></a></li>
                    </ul>
                </Col>
                <Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
                    <h3>Thông tin</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Về chúng tôi</a></li>
                        <li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Điều khoản dịch vụ</a></li>
                        <li><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Chính sách bảo mật</a></li>
                    </ul>
                </Col>
                <Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
                    <h3>Liên hệ</h3>
                    <p>Email: <a href="mailto:contact@example.com" style={{ color: '#fff', textDecoration: 'none' }}>contact@example.com</a></p>
                    <p>Điện thoại: <span style={{ color: '#fff' }}>+123 456 789</span></p>
                </Col>
            </Row>
            <p style={{ marginTop: 16, textAlign: 'center' }}>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </Footer>
    );
};

export default FooterComponent;
