<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Rate, Typography, Avatar, Button } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { IoStorefrontOutline } from "react-icons/io5";
=======
import React from 'react';
import { useEffect } from 'react';
import { Card, Row, Col, Rate, Button, Avatar, Typography } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { IoStorefrontOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
>>>>>>> 240b20ea89eaa0e2d2a41fb0c7a39837d7439162
import { motion } from 'framer-motion';

const { Title } = Typography;

const sampleAvatar = 'path/to/bakery-avatar.jpg'; // Replace with the actual path to the avatar image
const sampleCakeImage = 'path/to/cake-image.jpg'; // Replace with actual cake images
<<<<<<< HEAD
const otherStoreImage = 'path/to/other-store-image.jpg'; // Replace with actual store images

const allCakes = [
    { id: 1, name: "Bánh kem dâu", price: "100.000đ", type: "sweet", image: sampleCakeImage },
    { id: 2, name: "Bánh su kem", price: "50.000đ", type: "sweet", image: sampleCakeImage },
    { id: 3, name: "Bánh tart trứng", price: "60.000đ", type: "sweet", image: sampleCakeImage },
    { id: 4, name: "Bánh mì", price: "20.000đ", type: "bread", image: sampleCakeImage },
    { id: 5, name: "Bánh quy", price: "30.000đ", type: "cookie", image: sampleCakeImage },
    { id: 6, name: "Bánh donut", price: "40.000đ", type: "donut", image: sampleCakeImage },
    { id: 7, name: "Bánh pie", price: "70.000đ", type: "pie", image: sampleCakeImage },
];

const otherStores = [
    { id: 1, name: "Tiệm bánh ngọt XYZ", address: "456 Đường Nguyễn Trãi, Quận 5, TP. Hồ Chí Minh", image: otherStoreImage },
    { id: 2, name: "Tiệm bánh mì ABC", address: "789 Đường CMT8, Quận 10, TP. Hồ Chí Minh", image: otherStoreImage },
    { id: 3, name: "Tiệm bánh quy DEF", address: "101 Đường Lê Duẩn, Quận 3, TP. Hồ Chí Minh", image: otherStoreImage },
];

const Detail: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [filteredCakes, setFilteredCakes] = useState(allCakes);

    useEffect(() => {
        if (selectedFilter === 'all') {
            setFilteredCakes(allCakes);
        } else {
            setFilteredCakes(allCakes.filter(cake => cake.type === selectedFilter));
        }
    }, [selectedFilter]);
=======

const Detail: React.FC = () => {

>>>>>>> 240b20ea89eaa0e2d2a41fb0c7a39837d7439162

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
<<<<<<< HEAD

=======
>>>>>>> 240b20ea89eaa0e2d2a41fb0c7a39837d7439162
    const containerVariants = {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0 },
    };

    const cardStyle: React.CSSProperties = {
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
<<<<<<< HEAD
        background: '#FCDEDE', // Changed background color
=======
        background: '#f9f9f9',
>>>>>>> 240b20ea89eaa0e2d2a41fb0c7a39837d7439162
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

<<<<<<< HEAD
    const avatarStyle: React.CSSProperties = {
        width: '500px',
        height: '100px',
        borderRadius: '10px',
        objectFit: 'cover',
    };

    const addToCartButtonStyle: React.CSSProperties = {
        marginTop: '10px',
    };

    const separatorStyle: React.CSSProperties = {
        border: '0',
        borderTop: '2px solid #e0e0e0',
        margin: '2rem 0',
    };

    const filterStyle: React.CSSProperties = {
        margin: '1rem 0', // Margin for spacing above and below
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    };

    const buttonGroupStyle: React.CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0', // Remove gaps between buttons
    };

    const buttonStyle: React.CSSProperties = {
        margin: '0', // Remove margin from each button
        padding: '0.5rem 1rem', // Adjust padding to suit your design
        display: 'flex',
        alignItems: 'center', // Center content vertically
        justifyContent: 'center', // Center content horizontally
        backgroundColor: '#f06292', // Pink background color
        color: '#000', // Black text color
        border: 'none', // Remove border
        borderRadius: '4px', // Rounded corners for better look
        marginRight: '10px', // Space between buttons
        cursor: 'pointer', // Show pointer cursor on hover
        transition: 'background-color 0.3s, transform 0.1s', // Smooth transitions
    };

    const buttonActiveStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: '#c2185b', // Darker shade for active state
        transform: 'scale(0.98)', // Slightly shrink the button when pressed
    };

    const buttonHoverStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: '#f06292', // Original background color
    };

    const handleButtonClick = (type: string) => {
        setSelectedFilter(type);
    };

    const getButtonStyle = (type: string) => {
        if (selectedFilter === type) {
            return buttonActiveStyle;
        } else {
            return buttonHoverStyle;
        }
    };

=======
>>>>>>> 240b20ea89eaa0e2d2a41fb0c7a39837d7439162
    return (
        <div style={{ padding: '2rem' }}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
            >
<<<<<<< HEAD

                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <Avatar shape="square" src={sampleAvatar} style={avatarStyle} />
                    </Col>
                    <Col span={18}>
                        <Title level={2}>
                            Tiệm bánh ngọt ABC <IoStorefrontOutline style={{ marginLeft: '8px' }} />
                        </Title>
                        <p style={{ fontSize: '16px' }}>
                            <EnvironmentOutlined /> 123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh
                        </p>
                        <p style={{ fontSize: '16px' }}>
                            <ClockCircleOutlined /> Mở cửa: 08:00 AM - 08:00 PM
                        </p>
                        <div style={{ marginBottom: '10px' }}>
                            <Rate disabled value={4.5} />
                            <span style={{ marginLeft: '8px' }}>4.5</span>
                        </div>
                        <p>
                            Chúng tôi mang đến cho bạn những chiếc bánh ngọt tuyệt vời với hương vị phong phú và trang trí tinh tế.
                        </p>
                    </Col>
                </Row>

                {/* Cake Categories Section */}
                <div style={sectionTitleStyle}>Top bánh bán chạy</div>

                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Card className="card-hover" cover={<img src={sampleCakeImage} alt="Cake" style={cakeImageStyle} />}>
                            <Card.Meta title="Bánh kem dâu" description="Giá: 100.000đ" />
                            <Button className="button-hover" style={addToCartButtonStyle} type="primary">Thêm vào giỏ</Button>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className="card-hover" cover={<img src={sampleCakeImage} alt="Cake" style={cakeImageStyle} />}>
                            <Card.Meta title="Bánh su kem" description="Giá: 50.000đ" />
                            <Button className="button-hover" style={addToCartButtonStyle} type="primary">Thêm vào giỏ</Button>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card className="card-hover" cover={<img src={sampleCakeImage} alt="Cake" style={cakeImageStyle} />}>
                            <Card.Meta title="Bánh tart trứng" description="Giá: 60.000đ" />
                            <Button className="button-hover" style={addToCartButtonStyle} type="primary">Thêm vào giỏ</Button>
                        </Card>
                    </Col>
                </Row>
                <hr style={separatorStyle} />

                {/* Filter Section */}
                <div style={filterStyle}>
                    <Title level={4} style={{ margin: '0 0 1rem' }}>Lọc theo loại bánh</Title>
                    <div style={buttonGroupStyle}>
                        <button
                            className="button-hover"
                            style={getButtonStyle('all')}
                            onClick={() => handleButtonClick('all')}
                        >
                            Tất cả
                        </button>
                        <button
                            className="button-hover"
                            style={getButtonStyle('sweet')}
                            onClick={() => handleButtonClick('sweet')}
                        >
                            Bánh ngọt
                        </button>
                        <button
                            className="button-hover"
                            style={getButtonStyle('bread')}
                            onClick={() => handleButtonClick('bread')}
                        >
                            Bánh mì
                        </button>
                        <button
                            className="button-hover"
                            style={getButtonStyle('cookie')}
                            onClick={() => handleButtonClick('cookie')}
                        >
                            Bánh quy
                        </button>
                        <button
                            className="button-hover"
                            style={getButtonStyle('donut')}
                            onClick={() => handleButtonClick('donut')}
                        >
                            Bánh donut
                        </button>
                        <button
                            className="button-hover"
                            style={getButtonStyle('pie')}
                            onClick={() => handleButtonClick('pie')}
                        >
                            Bánh pie
                        </button>
                    </div>
                </div>
                <Row gutter={[16, 16]}>
                    {filteredCakes.map(cake => (
                        <Col key={cake.id} span={8}>
                            <Card className="card-hover" cover={<img src={cake.image} alt={cake.name} style={cakeImageStyle} />}>
                                <Card.Meta title={cake.name} description={`Giá: ${cake.price}`} />
                                <Button className="button-hover" style={addToCartButtonStyle} type="primary">Thêm vào giỏ</Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <hr style={separatorStyle} />

                {/* Other Stores Section */}
                <div style={sectionTitleStyle}>Các cửa hàng khác</div>
                <Row gutter={[16, 16]}>
                    {otherStores.map(store => (
                        <Col key={store.id} span={8}>
                            <Card className="card-hover" cover={<img src={store.image} alt={store.name} style={cakeImageStyle} />}>
                                <Card.Meta title={store.name} description={store.address} />
                            </Card>
                        </Col>
                    ))}
                </Row>

=======
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
>>>>>>> 240b20ea89eaa0e2d2a41fb0c7a39837d7439162
            </motion.div>
        </div>
    );
};

export default Detail;
