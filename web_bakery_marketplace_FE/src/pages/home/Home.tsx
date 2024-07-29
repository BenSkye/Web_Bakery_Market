// /pages/Home.tsx
import React, { useState } from 'react';
import { Carousel, Card, Button, Row, Col } from 'antd';
import { IoStorefrontOutline } from "react-icons/io5";
import { useSpring, animated } from '@react-spring/web';
import Map from '../../utils/mapbox/Map';
import banner1 from '../../assets/pexels-valeriya-827516.jpg';
import banner2 from '../../assets/pexels-marinautrabo-1729808.jpg';
import { StarOutlined } from '@ant-design/icons';





const HomePage: React.FC = () => {

    const [bakeries] = useState([
        {
            name: 'Bakery 1',
            address: '123 Main St, City, Country',
            rating: 4.5,
            image: 'https://cokhiviendong.com/wp-content/uploads/2018/11/kinh-nghi%E1%BB%87m-m%E1%BB%9F-ti%E1%BB%87m-b%C3%A1nh-ng%E1%BB%8Dt-6.jpg',
        },
        {
            name: 'Bakery 2',
            address: '456 Maple Ave, City, Country',
            rating: 3.8,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-fEQhM--ta4q80IHE5tx6YQcGh3-_8PYUOw&s',
        },
        {
            name: 'Bakery 3',
            address: '789 Oak Dr, City, Country',
            rating: 5.0,
            image: 'https://images.squarespace-cdn.com/content/v1/5b8bf301e2ccd13e972a0ab4/1571630216229-HQ565C57VA36KRVX9UAN/dessert-house-12.jpg',
        },
        {
            name: 'Bakery 4',
            address: '101 Pine Ln, City, Country',
            rating: 4.2,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu3wss3aa1ajyRXhJBe07k8wb__TVzMdJK2A&s',
        },
        // {
        //     name: 'Bakery 5',
        //     address: '101 Pine Ln, City, Country',
        //     rating: 4.2,
        //     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu3wss3aa1ajyRXhJBe07k8wb__TVzMdJK2A&s',
        // },
    ]);

    const homeContainerStyle: React.CSSProperties = {
        textAlign: 'center',
        position: 'relative', // Make the container relative for absolute positioning
    };

    const bannerCarouselStyle: React.CSSProperties = {
        width: '100%',
        height: '500px',
        overflow: 'hidden',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
    };

    const bannerImageStyle: React.CSSProperties = {
        width: '100%',
        height: '500px',
        objectFit: 'cover',
    };

    const overlayContainerStyle: React.CSSProperties = {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        textAlign: 'center',
        zIndex: 1,
    };

    const sloganStyle: React.CSSProperties = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '24px',
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontStyle: 'italic', // Italicize the text
    };

    const cardStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '18%',
        transform: 'translate(-50%, -80%)',
        zIndex: 2,
        width: '500px',
        height: '300px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        background: 'linear-gradient(to left, rgba(253, 222, 222, 0.5), rgba(253, 222, 222, 0.7))',
    };

    // Spring animation for the text
    const springPropsH1 = useSpring({
        from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
        to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
        config: { tension: 200, friction: 15 },
        delay: 200, // Delay for the h1
    });

    const springPropsH4 = useSpring({
        from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
        to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
        config: { tension: 200, friction: 15 },
        delay: 400, // Delay for the h4
    });

    const springPropsContainer = useSpring({
        from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
        to: { opacity: 1, transform: 'translate3d(0,0px,0)' },
        config: { tension: 200, friction: 15 },
        delay: 400, // Delay for the container
    });

    const buttonStyle: React.CSSProperties = {
        marginTop: '20px',
    };

    return (
        <div style={homeContainerStyle}>
            <animated.div style={{ ...overlayContainerStyle }}>
                <div style={sloganStyle}>
                    <animated.h1 style={springPropsH1}>TỰ DO SÁNG TẠO</animated.h1>
                    <animated.h4 style={springPropsH4}>Thiết kế chiếc bánh của bạn, chia sẽ yêu thương</animated.h4>
                </div>

                <Button type="primary" size="large" style={buttonStyle}>Thử ngay</Button>
            </animated.div>
            <Carousel autoplay style={bannerCarouselStyle}>
                <div>
                    <img src={banner2} alt="Banner 1" style={bannerImageStyle} />
                </div>
                <div>
                    <img src={banner1} alt="Banner 2" style={bannerImageStyle} />
                </div>
                <div>
                    <img src={banner1} alt="Banner 3" style={bannerImageStyle} />
                </div>
            </Carousel>
            <Card
                style={cardStyle}
            >
                <Map address="Hồ Chí Minh" />
            </Card>
            <Col style={{ marginTop: '6rem' }}>
                <animated.h1 style={{ textAlign: 'start', display: 'flex', alignItems: 'center', marginBottom: '0.5rem', ...springPropsContainer }}>Cửa hàng tại <span style={{ color: 'red', marginLeft: '8px' }}>Hồ Chí Minh</span>
                    <IoStorefrontOutline style={{ marginLeft: '8px' }} />
                </animated.h1>
                <Row gutter={[16, 16]} justify="center" >
                    {bakeries.map((bakery, index) => (
                        <Col key={index} xs={24} sm={12} md={8} lg={6} >
                            <Card
                                className="card-hover"
                                bordered={false}
                                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}
                                cover={<img alt={bakery.name} src={bakery.image} style={{ height: '200px', objectFit: 'cover' }} />}
                            >
                                <h3>{bakery.name}</h3>
                                <p>{bakery.address}</p>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <StarOutlined key={i} style={{ color: i < Math.round(bakery.rating) ? 'gold' : 'lightgray' }} />
                                    ))}
                                    <span style={{ marginLeft: '8px' }}>{bakery.rating}</span>
                                </div>
                                <Button type="primary">Ghé tiệm</Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>

        </div>
    );
}

export default HomePage;
