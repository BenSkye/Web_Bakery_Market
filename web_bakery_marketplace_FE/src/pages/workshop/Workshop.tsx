import React from 'react';
import { Button, Row, Col, Card } from 'antd';

const WorkshopPage: React.FC = () => {
    return (
        <>
            {/* Hero Section */}
            <div style={{ position: 'relative', textAlign: 'center', padding: '50px 20px', backgroundColor: '#f0f0f0' }}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXZ2QzKiiQBxfzizmtdKgqzF9v-mkrcXnXlg&s" // Replace with actual image URL
                    alt="Hero"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: -1, // Ensure the image is behind the text
                        opacity: 0.3, // Adjust opacity to ensure text readability
                    }}
                />
                <h1 style={{ position: 'relative', color: 'white', fontSize: '36px', margin: 0 }}>
                    Workshop: Nơi kết nối những người có đam mê về bánh
                </h1>
            </div>

            {/* Workshop Cards Section */}
            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{ marginBottom: '20px' }}>
                    Workshop <span style={{ color: 'red' }}>đang</span> diễn ra
                </h2>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt="workshop1"
                                    src="https://example.com/ongoing_workshop_image1_url" // Replace with actual image URL
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            }
                            actions={[
                                <Button type="primary">Đăng kí</Button>,
                            ]}
                        >
                            <Card.Meta
                                title="Workshop làm bánh riêng tư"
                                description="Mỗi ngày 8:00 - 15:00"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt="workshop2"
                                    src="https://example.com/ongoing_workshop_image2_url" // Replace with actual image URL
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            }
                            actions={[
                                <Button type="primary">Đăng kí</Button>,
                            ]}
                        >
                            <Card.Meta
                                title="Workshop làm bánh riêng tư"
                                description="27, 28, 29, 30/4 & 01/5"
                            />
                        </Card>
                    </Col>
                </Row>

                <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>
                    Workshop <span style={{ color: 'orange' }}>sắp</span> diễn ra
                </h2>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt="upcoming_workshop"
                                    src="https://example.com/upcoming_workshop_image_url" // Replace with actual image URL
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            }
                            actions={[
                                <Button type="primary">Đăng kí</Button>,
                            ]}
                        >
                            <Card.Meta
                                title="Workshop làm bánh sắp diễn ra"
                                description="Sắp tới vào tháng 9"
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default WorkshopPage;
