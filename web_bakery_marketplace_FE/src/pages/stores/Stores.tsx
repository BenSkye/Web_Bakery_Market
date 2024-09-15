import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Card, Button } from 'antd';
import { motion } from 'framer-motion';
import { getBakeries } from '../../services/bakeriesService';
import { Bakery } from '../../services/bakeriesService';

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
    const [bakeries, setBakeries] = useState<Bakery[]>([]);

    useEffect(() => {
        const fetchBakeries = async () => {
            try {
                const response = await getBakeries();
                console.log('Bakeries:', response.data);
                setBakeries(response.metadata);
            } catch (error) {
                console.error('Error fetching bakeries:', error);
            }
        };

        fetchBakeries();
    }, []);

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
                {bakeries.map(bakery => (
                    <Col xs={24} sm={12} md={8} key={bakery._id}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <StyledCard
                                hoverable
                                cover={<img alt={bakery.name} src={bakery.image[0]} style={{ height: '200px', objectFit: 'cover' }} />}
                                actions={[
                                    <Link to={`/detail/${bakery._id}`}>
                                        <ViewButton
                                            key="view"
                                            type="primary"

                                        >
                                            Xem Cửa Hàng
                                        </ViewButton>
                                    </Link>
                                ]}
                            >
                                <Meta
                                    title={bakery.name}
                                    description={bakery.address}
                                />
                            </StyledCard>
                        </motion.div>
                    </Col>
                ))}
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
