// /pages/Home.tsx
import React, { useState, useRef } from 'react';
import { Carousel, Card, Button, Row, Col } from 'antd';
import { IoStorefrontOutline } from "react-icons/io5";
import { useSpring, animated } from '@react-spring/web';
import Map from '../../utils/mapbox/Map';
import banner1 from '../../assets/pexels-valeriya-827516.jpg';
import banner2 from '../../assets/pexels-marinautrabo-1729808.jpg';
import { LeftOutlined, RightOutlined, BulbOutlined, StarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import imgIntro from '../../assets/pexels-jill-wellington-1638660-433527.jpg'



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
        {
            name: 'Bakery 5',
            address: '101 Pine Ln, City, Country',
            rating: 4.2,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu3wss3aa1ajyRXhJBe07k8wb__TVzMdJK2A&s',
        },
        {
            name: 'Bakery 6',
            address: '101 Pine Ln, City, Country',
            rating: 4.2,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu3wss3aa1ajyRXhJBe07k8wb__TVzMdJK2A&s',
        },

    ]);

    const [workshops] = useState([
        {
            title: 'Creative Ideas Workshop',
            description: 'Join us for a workshop full of creative ideas and innovation!',
            date: '2024-08-15',
            image: 'https://ktmt.vnmediacdn.com/images/2023/07/15/30-1689423506-10.jpg',
        },
        {
            title: 'Technical Skills Workshop',
            description: 'Enhance your technical skills with our expert-led workshop.',
            date: '2024-09-10',
            image: 'https://www.phuhunglife.com/media/xfofwvla/img_2168.jpg',
        },
        {
            title: 'Art and Design Workshop',
            description: 'Explore your artistic side in our art and design workshop.',
            date: '2024-10-05',
            image: 'https://amcollege.edu.vn/wp-content/uploads/2022/12/Untitled-design-63-1.png',
        },
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
        position: 'absolute',
        top: '50%',
        left: '18%',
        transform: 'translate(-50%, -215%)',
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

    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -250, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 250, behavior: 'smooth' });
        }
    };

    const workshopBannerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300px',
        width: '100%',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    };

    const workshopImageStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
    };

    const workshopInfoStyle: React.CSSProperties = {
        position: 'relative',
        zIndex: 2,
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '10px',
    };

    const introductionContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        backgroundColor: '#f9f9f9',
    };

    const introductionTextStyle: React.CSSProperties = {
        flex: 9,
        padding: '2rem',
        textAlign: 'justify',
        fontSize: 18,
        fontFamily: 'revert-layer',
        lineHeight: 1.8
    };

    const introductionImageStyle: React.CSSProperties = {
        flex: 3,
        height: 250,
        borderRadius: '10px',
    };

    return (
        <div style={homeContainerStyle}>
            <div>
                <animated.div style={{ ...overlayContainerStyle }}>
                    <div style={sloganStyle}>
                        <animated.h1 style={springPropsH1}>TỰ DO SÁNG TẠO</animated.h1>
                        <animated.h4 style={springPropsH4}>Thiết kế chiếc bánh của bạn, chia sẽ yêu thương</animated.h4>
                    </div>

                    <Button type="primary" size="large" className="button-hover" style={buttonStyle}>Thử ngay</Button>
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
            </div>
            <Col style={{ marginTop: '4rem' }}>
                <animated.h1 style={{ textAlign: 'start', display: 'flex', alignItems: 'center', marginBottom: '0.5rem', ...springPropsContainer }}>Cửa hàng tại <span style={{ color: 'red', marginLeft: '8px' }}>Hồ Chí Minh</span>
                    <IoStorefrontOutline style={{ marginLeft: '8px' }} />
                </animated.h1>
                <Row gutter={[16, 16]} justify="center" >
                    <div className="scroll-container" ref={scrollRef}>
                        {bakeries.map((bakery, index) => (
                            <div key={index} className="card-wrapper">
                                <Card
                                    className="card-hover"
                                    bordered={false}
                                    style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}
                                    cover={<img alt={bakery.name} src={bakery.image} style={{ height: '200px', objectFit: 'cover' }} />}
                                >
                                    <h3 style={{ textAlign: 'start' }}>{bakery.name}</h3>
                                    <p style={{ textAlign: 'start' }}>{bakery.address}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <StarOutlined key={i} style={{ color: i < Math.round(bakery.rating) ? 'gold' : 'lightgray' }} />
                                        ))}
                                        <span style={{ marginLeft: '8px' }}>{bakery.rating}</span>
                                    </div>
                                    <Button type="primary" className="button-hover">Ghé tiệm</Button>
                                </Card>
                            </div>
                        ))}
                    </div>
                    <Button className="scroll-button left" onClick={scrollLeft}>
                        <LeftOutlined />
                    </Button>
                    <Button className="scroll-button right" onClick={scrollRight}>
                        <RightOutlined />
                    </Button>
                </Row>
            </Col>
            <Col style={{ marginTop: '2rem' }}>
                <animated.h1 style={{ textAlign: 'start', display: 'flex', alignItems: 'center', marginBottom: '0.5rem', ...springPropsContainer }}>
                    Workshop đang diễn ra
                    <BulbOutlined style={{ marginLeft: '8px' }} />
                </animated.h1>
                <Row gutter={[16, 16]} justify="center">
                    {workshops.map((workshop, index) => (
                        <Col span={8} key={index}>
                            <div style={workshopBannerStyle} className="card-hover">
                                <img src={workshop.image} alt={workshop.title} style={workshopImageStyle} />
                                <div style={workshopInfoStyle}>
                                    <h2>{workshop.title}</h2>
                                    <p>{workshop.description}</p>
                                    <p><strong>Date:</strong> {new Date(workshop.date).toLocaleDateString()}</p>
                                    <Button type="primary" className="button-hover">Đăng ký tham gia</Button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Col>

            <Col style={{ marginTop: '2rem' }}>
                <animated.h1 style={{ textAlign: 'start', display: 'flex', alignItems: 'center', marginBottom: '0.5rem', ...springPropsContainer }}>
                    Giới thiệu về chúng tôi
                    <ClockCircleOutlined style={{ marginLeft: '8px' }} />
                </animated.h1>
                <div style={introductionContainerStyle}>
                    <div style={introductionTextStyle}>
                        <p>Chào mừng bạn đến với trang web của chúng tôi! Được khởi nguồn từ niềm đam mê với nghệ thuật bánh ngọt, chúng tôi tin rằng mỗi chiếc bánh sinh nhật không chỉ là một món ăn mà còn là một tác phẩm nghệ thuật chứa đựng tình cảm và sáng tạo. Tại đây, bạn có thể tự tay thiết kế những chiếc bánh sinh nhật độc đáo, từ việc chọn màu sắc, hương vị đến trang trí, tạo nên những chiếc bánh mang dấu ấn cá nhân. Hợp tác với các tiệm bánh uy tín, chúng tôi mang đến cho bạn sự đa dạng và chất lượng. Hãy cùng chúng tôi biến mỗi chiếc bánh thành một kiệt tác và một kỷ niệm đáng nhớ!</p>
                    </div>
                    <img src={imgIntro} alt="" style={introductionImageStyle} />
                </div>
            </Col>

        </div>
    );
}

export default HomePage;
