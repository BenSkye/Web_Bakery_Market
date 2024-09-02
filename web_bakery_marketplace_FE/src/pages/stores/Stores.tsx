import React from 'react';
import styled from 'styled-components';
import { Row, Col, Card, Button } from 'antd';
import { motion } from 'framer-motion';
import storeImage from '../../assets/384c76efd36e7480fcb3eb5fa0f8b3e2.jpg'; // Thay đổi đường dẫn nếu cần

const { Meta } = Card;

const Container = styled.div`
    padding: 50px;
    background-color: #f5f5f5;
    text-align: center;
`;

const StyledCard = styled(Card)`
    max-width: 300px;
    margin: auto;
    margin-bottom: 20px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    
    &:hover {
        transform: scale(1.05);
    }
`;

const ViewButton = styled(Button)`
    margin-top: 10px;
`;

const StoresPage: React.FC = () => {
    const handleViewStore = (storeName: string) => {
        // Thay đổi URL hoặc điều hướng đến trang chi tiết của cửa hàng
        alert(`Xem cửa hàng: ${storeName}`);
    };

    return (
        <Container>
            <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ fontSize: '2.5rem', marginBottom: '40px' }}
            >
                Các Cửa Hàng Của Chúng Tôi
            </motion.h1>

            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12} md={8}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <StyledCard
                            hoverable
                            cover={<img alt="Cửa Hàng" src={storeImage} style={{ height: '200px', objectFit: 'cover' }} />}
                            actions={[
                                <ViewButton
                                    key="view"
                                    type="primary"
                                    onClick={() => handleViewStore('Cửa Hàng 1')}
                                >
                                    Xem Cửa Hàng
                                </ViewButton>
                            ]}
                        >
                            <Meta
                                title="Cửa Hàng 1"
                                description="Đây là mô tả về Cửa Hàng 1. Cửa hàng có nhiều sản phẩm và dịch vụ đa dạng."
                            />
                        </StyledCard>
                    </motion.div>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <StyledCard
                            hoverable
                            cover={<img alt="Cửa Hàng" src={storeImage} style={{ height: '200px', objectFit: 'cover' }} />}
                            actions={[
                                <ViewButton
                                    key="view"
                                    type="primary"
                                    onClick={() => handleViewStore('Cửa Hàng 2')}
                                >
                                    Xem Cửa Hàng
                                </ViewButton>
                            ]}
                        >
                            <Meta
                                title="Cửa Hàng 2"
                                description="Đây là mô tả về Cửa Hàng 2. Cửa hàng chuyên về các sản phẩm độc đáo và dịch vụ cá nhân hóa."
                            />
                        </StyledCard>
                    </motion.div>
                </Col>

                <Col xs={24} sm={12} md={8}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <StyledCard
                            hoverable
                            cover={<img alt="Cửa Hàng" src={storeImage} style={{ height: '200px', objectFit: 'cover' }} />}
                            actions={[
                                <ViewButton
                                    key="view"
                                    type="primary"
                                    onClick={() => handleViewStore('Cửa Hàng 3')}
                                >
                                    Xem Cửa Hàng
                                </ViewButton>
                            ]}
                        >
                            <Meta
                                title="Cửa Hàng 3"
                                description="Đây là mô tả về Cửa Hàng 3. Cửa hàng cung cấp đa dạng các sản phẩm với nhiều ưu đãi hấp dẫn."
                            />
                        </StyledCard>
                    </motion.div>
                </Col>
            </Row>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{ marginTop: '40px', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
            >
                <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Tìm Hiểu Thêm Về Các Cửa Hàng Của Chúng Tôi</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
                    Các cửa hàng của chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất. Từ những sản phẩm chất lượng cao đến dịch vụ khách hàng tuyệt vời, chúng tôi đảm bảo rằng mỗi lần ghé thăm của bạn sẽ là một kỷ niệm đáng nhớ. Hãy khám phá các cửa hàng của chúng tôi để tìm thấy những sản phẩm phù hợp với nhu cầu của bạn.
                </p>
            </motion.div>
        </Container>
    );
};

export default StoresPage;
