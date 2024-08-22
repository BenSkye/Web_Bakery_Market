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
                Our Stores
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
                            cover={<img alt="Store" src={storeImage} style={{ height: '200px', objectFit: 'cover' }} />}
                            actions={[
                                <ViewButton
                                    key="view"
                                    type="primary"
                                    onClick={() => handleViewStore('Store Name 1')}
                                >
                                    View Store
                                </ViewButton>
                            ]}
                        >
                            <Meta
                                title="Store Name 1"
                                description="This is a description of Store 1. It has a variety of products and services."
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
                            cover={<img alt="Store" src={storeImage} style={{ height: '200px', objectFit: 'cover' }} />}
                            actions={[
                                <ViewButton
                                    key="view"
                                    type="primary"
                                    onClick={() => handleViewStore('Store Name 2')}
                                >
                                    View Store
                                </ViewButton>
                            ]}
                        >
                            <Meta
                                title="Store Name 2"
                                description="This is a description of Store 2. It specializes in unique items and personalized services."
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
                            cover={<img alt="Store" src={storeImage} style={{ height: '200px', objectFit: 'cover' }} />}
                            actions={[
                                <ViewButton
                                    key="view"
                                    type="primary"
                                    onClick={() => handleViewStore('Store Name 3')}
                                >
                                    View Store
                                </ViewButton>
                            ]}
                        >
                            <Meta
                                title="Store Name 3"
                                description="This is a description of Store 3. It offers a wide range of products with great deals."
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
                <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>More About Our Stores</h2>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
                    Our stores are dedicated to providing the best shopping experience. From high-quality products to exceptional customer service, we ensure that every visit is memorable. Explore our stores to find a variety of products tailored to your needs.
                </p>
            </motion.div>
        </Container>
    );
};

export default StoresPage;
