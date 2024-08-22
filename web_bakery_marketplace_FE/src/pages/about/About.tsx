import React from 'react';
import { Row, Col } from 'antd';
import { motion } from 'framer-motion';
import aboutImage from '../../assets/colorful-tiered-cake-stockcake.jpg';

const AboutPage: React.FC = () => {
    const containerStyle: React.CSSProperties = {
        padding: '50px',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
    };

    const imageStyle: React.CSSProperties = {
        width: '100%',
        maxWidth: '300px',
        height: 'auto',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        marginBottom: '20px',
    };

    const textStyle: React.CSSProperties = {
        fontSize: '18px',
        lineHeight: '1.6',
        textAlign: 'justify',
    };

    const sectionStyle: React.CSSProperties = {
        marginBottom: '40px',
        paddingBottom: '20px',
        borderBottom: '2px solid rgba(0, 0, 0, 0.07) ',
    };

    return (
        <div style={containerStyle}>
            {/* Heading */}
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                About Us
            </motion.h1>

            {/* First Row */}
            <div style={sectionStyle}>
                <Row gutter={[16, 16]} justify="center" align="middle">
                    <Col xs={24} sm={12} md={8}>
                        <motion.img
                            src={aboutImage}
                            alt="About Us"
                            style={imageStyle}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={16}>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        >
                            <p style={textStyle}>
                                Chào mừng đến với trang web của chúng tôi! Được khởi nguồn từ niềm đam mê với nghệ thuật bánh ngọt,
                                chúng tôi tin rằng mỗi chiếc bánh sinh nhật không chỉ là một món ăn mà còn là một tác phẩm nghệ thuật
                                chứa đựng tình cảm và sáng tạo. Tại đây, bạn có thể tự tay thiết kế những chiếc bánh sinh nhật độc đáo,
                                từ việc chọn màu sắc, hương vị đến trang trí, tạo nên những chiếc bánh mang dấu ấn cá nhân.
                                Hợp tác với các tiệm bánh uy tín, chúng tôi mang đến cho bạn sự đa dạng và chất lượng.
                                Hãy cùng chúng tôi biến mỗi chiếc bánh thành một kiệt tác và một kỷ niệm đáng nhớ!
                            </p>
                        </motion.div>
                    </Col>
                </Row>
            </div>

            {/* Second Row */}
            <div style={sectionStyle}>
                <Row gutter={[16, 16]} justify="center" align="middle">
                    <Col xs={24} sm={12} md={16}>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        >
                            <p style={textStyle}>
                                Chào mừng đến với trang web của chúng tôi! Được khởi nguồn từ niềm đam mê với nghệ thuật bánh ngọt,
                                chúng tôi tin rằng mỗi chiếc bánh sinh nhật không chỉ là một món ăn mà còn là một tác phẩm nghệ thuật
                                chứa đựng tình cảm và sáng tạo. Tại đây, bạn có thể tự tay thiết kế những chiếc bánh sinh nhật độc đáo,
                                từ việc chọn màu sắc, hương vị đến trang trí, tạo nên những chiếc bánh mang dấu ấn cá nhân.
                                Hợp tác với các tiệm bánh uy tín, chúng tôi mang đến cho bạn sự đa dạng và chất lượng.
                                Hãy cùng chúng tôi biến mỗi chiếc bánh thành một kiệt tác và một kỷ niệm đáng nhớ!
                            </p>
                        </motion.div>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <motion.img
                            src={aboutImage}
                            alt="About Us"
                            style={imageStyle}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </Col>
                </Row>
            </div>

            {/* Third Row */}
            <div style={sectionStyle}>
                <Row gutter={[16, 16]} justify="center" align="middle">
                    <Col xs={24} sm={12} md={8}>
                        <motion.img
                            src={aboutImage}
                            alt="About Us"
                            style={imageStyle}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={16}>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        >
                            <p style={textStyle}>
                                Chào mừng đến với trang web của chúng tôi! Được khởi nguồn từ niềm đam mê với nghệ thuật bánh ngọt,
                                chúng tôi tin rằng mỗi chiếc bánh sinh nhật không chỉ là một món ăn mà còn là một tác phẩm nghệ thuật
                                chứa đựng tình cảm và sáng tạo. Tại đây, bạn có thể tự tay thiết kế những chiếc bánh sinh nhật độc đáo,
                                từ việc chọn màu sắc, hương vị đến trang trí, tạo nên những chiếc bánh mang dấu ấn cá nhân.
                                Hợp tác với các tiệm bánh uy tín, chúng tôi mang đến cho bạn sự đa dạng và chất lượng.
                                Hãy cùng chúng tôi biến mỗi chiếc bánh thành một kiệt tác và một kỷ niệm đáng nhớ!
                            </p>
                        </motion.div>
                    </Col>
                </Row>
            </div>

            {/* Additional Information */}
            <Row gutter={[16, 16]} justify="center" style={{ marginTop: '40px' }}>
                <Col xs={24} sm={12} md={6}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{
                            padding: '20px',
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h2>Our Mission</h2>
                        <p>Our mission is to provide the best quality cakes and pastries, tailored to your personal preferences and delivered with excellent customer service.</p>
                    </motion.div>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        style={{
                            padding: '20px',
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <h2>Our Values</h2>
                        <p>We believe in creativity, quality, and customer satisfaction. Every cake we create is a testament to our commitment to these core values.</p>
                    </motion.div>
                </Col>
            </Row>
        </div>
    );
};

export default AboutPage;
