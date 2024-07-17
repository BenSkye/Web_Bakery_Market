// /pages/Home.tsx
import React, { useState } from 'react';
import { Carousel, Card, Button, Row, Col } from 'antd';
import Map from '../../utils/mapbox/Map';
import banner1 from '../../assets/pexels-valeriya-827516.jpg';
import banner2 from '../../assets/pexels-marinautrabo-1729808.jpg';




const HomePage: React.FC = () => {

    const [bakeries] = useState([
        {
            name: 'Bakery 1',
            description: 'Delicious cakes and pastries made fresh daily.',
        },
        {
            name: 'Bakery 2',
            description: 'A variety of breads and sweets to choose from.',
        },
        {
            name: 'Bakery 3',
            description: 'Custom cakes for all occasions.',
        },
        {
            name: 'Bakery 4',
            description: 'Home of the best croissants in town.',
        },
        // Add more bakeries as needed
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
        top: '10%',
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
        top: '-10%',
        left: '20%',
        transform: 'translate(-50%, -90%)',
        zIndex: 1,
        width: '500px',
        height: '300px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        background: 'linear-gradient(to left, rgba(253, 222, 222, 0.5), rgba(253, 222, 222, 0.7))',
    };


    const buttonStyle: React.CSSProperties = {
        marginTop: '20px',
    };

    return (
        <div style={homeContainerStyle}>
            <div style={overlayContainerStyle}>
                <div style={sloganStyle}><h1>TỰ DO SÁNG TẠO</h1>
                    <h4>Thiết kế chiếc bánh của bạn, chia sẽ yêu thương</h4>
                </div>

                <Button type="primary" size="large" style={buttonStyle}>Thử ngay</Button>
            </div>
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
            <Card style={cardStyle}>
                <Map address="Hồ Chí Minh" />
            </Card>
            <Row gutter={[16, 16]} justify="center">
                {bakeries.map((bakery, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={6} >
                        <Card
                            title={bakery.name}
                            bordered={false}
                            style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}
                            actions={[
                                <Button type="primary">Xem thêm</Button>
                            ]}
                        >
                            {bakery.description}
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default HomePage;
