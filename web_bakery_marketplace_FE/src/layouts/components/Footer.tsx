import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import { FacebookOutlined, InstagramOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.png';
import '../../styles/layoutSyles/footerComponent.css';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const FooterComponent: React.FC = () => {
    return (
        <Footer className="custom-footer">
            <Row gutter={[32, 32]} justify="center">
                <Col xs={24} sm={12} md={6}>
                    <div className="footer-section">
                        <Title level={4}>Chúng tôi</Title>
                        {/* <Text>Mô tả về công ty hoặc dự án của bạn.</Text> */}
                        <img src={logo} alt="logo" className="footer-logo" />
                    </div>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <div className="footer-section">
                        <Title level={4}>Liên kết</Title>
                        <ul className="footer-links">
                            <li><Link href="#"><FacebookOutlined /> Facebook</Link></li>
                            <li><Link href="#"><InstagramOutlined /> Instagram</Link></li>
                        </ul>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <div className="footer-section">
                        <Title level={4}>Thông tin</Title>
                        <ul className="footer-links">
                            <li><Link href="#">Về chúng tôi</Link></li>
                            <li><Link href="#">Điều khoản dịch vụ</Link></li>
                            <li><Link href="#">Chính sách bảo mật</Link></li>
                        </ul>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <div className="footer-section">
                        <Title level={4}>Liên hệ</Title>
                        <p><MailOutlined /> <Link href="mailto:contact@example.com">contact@example.com</Link></p>
                        <p><PhoneOutlined /> <Text>+123 456 789</Text></p>
                    </div>
                </Col>
            </Row>
            <div className="footer-bottom">
                <Text>© {new Date().getFullYear()} Your Company. All rights reserved.</Text>
            </div>
        </Footer>
    );
};

export default FooterComponent; 