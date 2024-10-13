import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Card, Spin, Typography, Carousel } from 'antd';
import { getWorkshops, Workshop } from '../../services/workshopsService';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const FeaturedWorkshopsSection = styled.div`
    padding: 20px 20px;
`;

const WorkshopCardSection = styled.div`
    padding: 60px 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

const StyledCard = styled(Card)`
    transition: all 0.3s ease-in-out;
    border-radius: 12px;
    overflow: hidden;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    }

    .ant-card-cover img {
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
    }
`;

const CarouselImageWrapper = styled.div`
    position: relative;
`;

const WorkshopTitleOverlay = styled.h3`
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    background: rgba(0, 0, 0, 0.6);
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 24px;
    text-align: center;
    z-index: 1;
`;

const WorkshopPage: React.FC = () => {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                const fetchedWorkshops = await getWorkshops();
                setWorkshops(fetchedWorkshops);
            } catch (err) {
                setError('Failed to load workshops.');
            } finally {
                setLoading(false);
            }
        };

        fetchWorkshops();
    }, []);

    if (loading) {
        return <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />;
    }

    if (error) {
        return <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>;
    }

    return (
        <>
            {/* Featured Workshops Carousel */}
            <FeaturedWorkshopsSection>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
                    Workshop Nổi Bật
                </Title>
                <Carousel autoplay>
                    {workshops.slice(0, 3).map((workshop) => (
                        <CarouselImageWrapper key={workshop.id}>
                            <img
                                src={workshop.image}
                                alt={workshop.title}
                                style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px' }}
                            />
                            <WorkshopTitleOverlay>{workshop.title}</WorkshopTitleOverlay>
                        </CarouselImageWrapper>
                    ))}
                </Carousel>
            </FeaturedWorkshopsSection>

            {/* Workshop Cards Section */}
            <WorkshopCardSection>
                <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
                    Tất cả Workshops
                </Title>
                <Row gutter={[24, 24]}>
                    {workshops.map((workshop) => (
                        <Col key={workshop.id} xs={24} sm={12} md={8}>
                            <StyledCard
                                hoverable
                                cover={<img alt={workshop.title} src={workshop.image} style={{ height: '200px', objectFit: 'cover' }} />}
                                actions={[
                                    <Button type="primary" icon={<ShoppingCartOutlined />} size="large">
                                        Đăng ký ngay
                                    </Button>,
                                ]}
                            >
                                <Card.Meta
                                    title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>{workshop.title}</span>}
                                    description={
                                        <>
                                            <Paragraph ellipsis={{ rows: 2 }}>{workshop.description}</Paragraph>
                                            <div style={{ marginTop: '10px' }}>
                                                <span style={{ fontWeight: 'bold', color: '#d32f2f' }}>Giá: </span> Free
                                            </div>
                                        </>
                                    }
                                />
                            </StyledCard>
                        </Col>
                    ))}
                </Row>
            </WorkshopCardSection>
        </>
    );
};

export default WorkshopPage;
