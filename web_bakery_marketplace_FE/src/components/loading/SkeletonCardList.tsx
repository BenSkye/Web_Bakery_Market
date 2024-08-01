import React from 'react';
import { Skeleton, Card, Row, Col } from 'antd';

const SkeletonCardList: React.FC<{ count: number }> = ({ count }) => {
    return (
        <Row gutter={[16, 16]} justify="center">
            {Array.from({ length: count }).map((_, index) => (
                <Col span={8} key={index}>
                    <Card
                        bordered={false}
                        style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', width: '100%' }}
                    >
                        <Skeleton active>
                            <Skeleton.Image style={{ height: '200px', objectFit: 'cover', marginBottom: 16 }} />
                            <Skeleton.Input style={{ width: '80%', marginBottom: 16 }} active />
                            <Skeleton.Input style={{ width: '60%', marginBottom: 16 }} active />
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <Skeleton.Button style={{ marginRight: '8px' }} active />
                                <Skeleton.Input style={{ width: '30%' }} active />
                            </div>
                        </Skeleton>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default SkeletonCardList;
