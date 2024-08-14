import React from 'react';
import { Row, Col, Card, Button, Typography } from 'antd';
import { motion } from 'framer-motion';
import workshopImage from '../../assets/384c76efd36e7480fcb3eb5fa0f8b3e2.jpg'; // Thay đổi đường dẫn hình ảnh nếu cần
import Meta from 'antd/es/card/Meta';

const { Title, Paragraph } = Typography;

const workshops = [
    {
        title: 'Workshop 1',
        description: 'A comprehensive workshop on modern web development techniques including React, Node.js, and more.',
        date: '2024-09-15',
    },
    {
        title: 'Workshop 2',
        description: 'An introduction to digital marketing strategies and tools for boosting your online presence.',
        date: '2024-10-10',
    },
    {
        title: 'Workshop 3',
        description: 'Learn the basics of graphic design and how to use popular design tools to create stunning visuals.',
        date: '2024-11-05',
    },
];

const WorkshopPage: React.FC = () => {
    return (
        <div style={{ padding: '50px', backgroundColor: '#f0f2f5' }}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ textAlign: 'center', marginBottom: '40px' }}
            >
                <Title level={1}>Our Workshops</Title>
            </motion.div>

            <Row gutter={[16, 16]} justify="center">
                {workshops.map((workshop, index) => (
                    <Col xs={24} sm={12} md={8} key={index}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                            <Card
                                hoverable
                                cover={<img alt={workshop.title} src={workshopImage} style={{ height: '200px', objectFit: 'cover' }} />}
                                actions={[
                                    <Button key="details" type="primary">
                                        View Details
                                    </Button>,
                                ]}
                                style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                            >
                                <Meta
                                    title={workshop.title}
                                    description={
                                        <Paragraph ellipsis={{ rows: 2, expandable: true }}>
                                            {workshop.description}
                                        </Paragraph>
                                    }
                                />
                            </Card>
                        </motion.div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default WorkshopPage;
