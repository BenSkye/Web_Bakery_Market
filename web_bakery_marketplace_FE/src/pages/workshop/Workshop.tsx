import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Card, Spin, Typography } from 'antd';
import { getWorkshops, Workshop } from '../../services/workshopsService';

const { Title } = Typography;

const WorkshopPage: React.FC = () => {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch workshops when the component mounts
    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                const fetchedWorkshops = await getWorkshops();
                console.log('Fetched workshops:', fetchedWorkshops);
                setWorkshops(fetchedWorkshops);
            } catch (err) {
                console.error('Error fetching workshops:', err);
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
            {/* Hero Section */}
            <div style={{ position: 'relative', textAlign: 'center', padding: '50px 20px', backgroundColor: '#f0f0f0' }}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXZ2QzKiiQBxfzizmtdKgqzF9v-mkrcXnXlg&s"
                    alt="Hero"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: -1,
                        opacity: 0.3,
                    }}
                />
                <Title level={1} style={{ position: 'relative', color: 'white' }}>
                    Workshop: Nơi kết nối những người có đam mê về bánh
                </Title>
            </div>

            {/* Workshop Cards Section */}
            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <Title level={2}>Tất cả Workshops</Title>
                <Row gutter={16}>
                    {workshops.map(workshop => (
                        <Col key={workshop.id} span={8}>
                            <Card
                                hoverable
                                cover={<img alt={workshop.title} src={workshop.image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
                                actions={[<Button type="primary">Đăng kí</Button>]}
                                style={{ height: '100%' }} // Make card full height
                            >
                                <Card.Meta
                                    title={workshop.title}
                                    description={workshop.description}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
};

export default WorkshopPage;
