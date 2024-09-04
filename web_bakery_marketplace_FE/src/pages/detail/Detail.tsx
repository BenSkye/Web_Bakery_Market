import React from 'react';
import { useEffect } from 'react';
import { Card, Row, Col, Rate, Button, Avatar, Typography } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { IoStorefrontOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const { Title } = Typography;

const sampleAvatar = 'path/to/bakery-avatar.jpg'; // Replace with the actual path to the avatar image
const sampleCakeImage = 'path/to/cake-image.jpg'; // Replace with actual cake images

const Detail: React.FC = () => {


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const containerVariants = {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0 },
    };

    const cardStyle: React.CSSProperties = {
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        background: '#f9f9f9',
        padding: '2rem',
    };

    const sectionTitleStyle: React.CSSProperties = {
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '20px',
        fontWeight: 'bold',
    };

    const cakeImageStyle: React.CSSProperties = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '10px',
    };

    return (
        <div style={{ padding: '2rem' }}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
            >
                <Card style={cardStyle}>
                    <Row gutter={[16, 16]}>
                        <Col span={4}>
                            <Avatar size={100} src={sampleAvatar} />
                        </Col>
                        <Col span={20}>
                            <Title level={2}>
                                Tiệm bánh ngọt ABC <IoStorefrontOutline style={{ marginLeft: '8px' }} />
                            </Title>
                            <p style={{ fontSize: '16px' }}>
                                <EnvironmentOutlined /> 123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh
                            </p>
                            <p style={{ fontSize: '16px' }}>
                                <ClockCircleOutlined /> Mở cửa: 08:00 AM - 08:00 PM
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <Rate disabled value={4.5} />
                                <span style={{ marginLeft: '8px' }}>4.5</span>
                            </div>
                            <p>
                                Chúng tôi mang đến cho bạn những chiếc bánh ngọt tuyệt vời với hương vị phong phú và trang trí tinh tế.
                            </p>
                        </Col>
                    </Row>

                    {/* Cake Categories Section */}
                    <div style={sectionTitleStyle}>Các loại bánh bày bán</div>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Card cover={<img src={sampleCakeImage} alt="Cake" style={cakeImageStyle} />}>
                                <Card.Meta title="Bánh kem dâu" description="Giá: 100.000đ" />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card cover={<img src={sampleCakeImage} alt="Cake" style={cakeImageStyle} />}>
                                <Card.Meta title="Bánh su kem" description="Giá: 50.000đ" />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card cover={<img src={sampleCakeImage} alt="Cake" style={cakeImageStyle} />}>
                                <Card.Meta title="Bánh tart trứng" description="Giá: 60.000đ" />
                            </Card>
                        </Col>
                    </Row>

                    {/* Bestselling Cakes Section */}
                    <div style={sectionTitleStyle}>Các loại bánh bán chạy</div>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Card cover={<img src={sampleCakeImage} alt="Cake" style={cakeImageStyle} />}>
                                <Card.Meta title="Bánh tiramisu" description="Giá: 120.000đ" />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card cover={<img src={sampleCakeImage} alt="Cake" style={cakeImageStyle} />}>
                                <Card.Meta title="Bánh socola" description="Giá: 110.000đ" />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card cover={<img src={sampleCakeImage} alt="Cake" style={cakeImageStyle} />}>
                                <Card.Meta title="Bánh mousse chanh dây" description="Giá: 130.000đ" />
                            </Card>
                        </Col>
                    </Row>

                    {/* New Cakes Section */}
                    <div style={sectionTitleStyle}>Các loại bánh mới</div>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Card cover={<img src={sampleCakeImage} alt="Cake" style={cakeImageStyle} />}>
                                <Card.Meta title="Bánh phô mai Nhật" description="Giá: 150.000đ" />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card cover={<img src={sampleCakeImage} alt="Cake" style={cakeImageStyle} />}>
                                <Card.Meta title="Bánh matcha" description="Giá: 140.000đ" />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card cover={<img src={sampleCakeImage} alt="Cake" style={cakeImageStyle} />}>
                                <Card.Meta title="Bánh red velvet" description="Giá: 160.000đ" />
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </motion.div>
        </div>
    );
};

export default Detail;
