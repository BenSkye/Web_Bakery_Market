import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import { motion } from 'framer-motion';
import { ShopOutlined, HeartOutlined, TeamOutlined } from '@ant-design/icons';
import aboutImage1 from '../../assets/_99ba4fdc-95a0-4dd8-8bb0-d8942d8ab671.jpg';
import aboutImage2 from '../../assets/_394e20f4-1a3d-47ea-aea9-b3dfb2e1bbc6.jpg';

const { Title, Paragraph } = Typography;

const AboutPage: React.FC = () => {
    const pageContainerStyle: React.CSSProperties = {
        backgroundColor: 'transparent',
    };

    const contentContainerStyle: React.CSSProperties = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
    };

    const sectionTitleStyle: React.CSSProperties = {
        textAlign: 'center',
        marginBottom: '40px',
    };

    const imageWrapperStyle: React.CSSProperties = {
        overflow: 'hidden',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    };

    const imageStyle: React.CSSProperties = {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
        transition: 'transform 0.3s ease',
    };

    const textContentStyle: React.CSSProperties = {
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    };

    const valueCardStyle: React.CSSProperties = {
        textAlign: 'center',
        height: '100%',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
    };

    const iconStyle: React.CSSProperties = {
        fontSize: 48,
        color: '#ff4d4f',
        marginTop: 20,
    };

    const fadeInUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const staggerChildren = {
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };
    return (
        <motion.div
            style={pageContainerStyle}
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
        >
            <div style={pageContainerStyle}>
                <div style={contentContainerStyle}>
                    <motion.div
                        variants={fadeInUpVariants}
                        transition={{ duration: 0.8 }}
                    >
                        <Title level={1} style={sectionTitleStyle}>Câu chuyện khởi nghiệp</Title>
                    </motion.div>

                    <Row gutter={[32, 32]} align="middle">
                        <Col xs={24} md={12}>
                            <motion.div
                                style={imageWrapperStyle}
                                variants={fadeInUpVariants}
                                transition={{ duration: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <img src={aboutImage1} alt="Bakery" style={imageStyle} />
                            </motion.div>
                        </Col>
                        <Col xs={24} md={12}>
                            <motion.div
                                style={textContentStyle}
                                variants={fadeInUpVariants}
                                transition={{ duration: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Title level={3}>Câu Chuyện Của Chúng Tôi</Title>
                                <Paragraph>
                                    Bắt nguồn từ niềm đam mê với nghệ thuật làm bánh, chúng tôi tin rằng mỗi chiếc bánh sinh nhật không chỉ đơn thuần là một món tráng miệng, mà còn là một tác phẩm nghệ thuật chứa đựng cảm xúc và sự sáng tạo. Tại đây, bạn có thể thiết kế những chiếc bánh sinh nhật độc đáo, từ việc chọn màu sắc, hương vị đến cách trang trí, tạo nên những chiếc bánh mang dấu ấn cá nhân.
                                </Paragraph>
                            </motion.div>
                        </Col>
                    </Row>

                    <Row gutter={[32, 32]} align="middle" style={{ marginTop: 50 }}>
                        <Col xs={24} md={12}>
                            <motion.div
                                style={textContentStyle}
                                variants={fadeInUpVariants}
                                transition={{ duration: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Title level={3}>Sứ Mệnh Của Chúng Tôi</Title>
                                <Paragraph>
                                    Chúng tôi hợp tác với các tiệm bánh uy tín để mang đến cho bạn sự đa dạng và chất lượng. Hãy cùng nhau biến mỗi chiếc bánh thành một tác phẩm nghệ thuật và một kỷ niệm đáng nhớ! Sứ mệnh của chúng tôi là cung cấp những chiếc bánh và bánh ngọt chất lượng nhất, được điều chỉnh theo sở thích cá nhân của bạn và được giao với dịch vụ khách hàng xuất sắc.
                                </Paragraph>
                            </motion.div>
                        </Col>
                        <Col xs={24} md={12}>
                            <motion.div
                                style={imageWrapperStyle}
                                variants={fadeInUpVariants}
                                transition={{ duration: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <img src={aboutImage2} alt="Our Mission" style={imageStyle} />
                            </motion.div>
                        </Col>
                    </Row>

                    <Title level={2} style={{ ...sectionTitleStyle, marginTop: 50 }}>Giá Trị Cốt Lõi</Title>
                    <Row gutter={[32, 32]}>
                        {[
                            { icon: <ShopOutlined style={iconStyle} />, title: "Sáng Tạo", description: "Chúng tôi mang đến những thiết kế và hương vị mới lạ cho mỗi chiếc bánh." },
                            { icon: <HeartOutlined style={iconStyle} />, title: "Đam Mê", description: "Chúng tôi đặt cả trái tim vào mỗi chiếc bánh chúng tôi tạo ra." },
                            { icon: <TeamOutlined style={iconStyle} />, title: "Hợp Tác", description: "Chúng tôi làm việc chặt chẽ với các tiệm bánh hàng đầu để đảm bảo chất lượng." }
                        ].map((value, index) => (
                            <Col xs={24} sm={8} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.2 }}
                                >
                                    <Card style={valueCardStyle} cover={value.icon}>
                                        <Card.Meta
                                            title={value.title}
                                            description={value.description}
                                        />
                                    </Card>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </motion.div>
    );
};

export default AboutPage;