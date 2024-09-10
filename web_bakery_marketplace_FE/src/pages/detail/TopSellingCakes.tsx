// TopSellingCakes.tsx
import React from 'react';
import { Card, Row, Col, Button } from 'antd';




const sampleCakeImage = 'path/to/cake-image.jpg';

const TopSellingCakes: React.FC = () => {
    const addToCartButtonStyle: React.CSSProperties = {
        marginTop: '10px',
    };
    const cakeImageStyle: React.CSSProperties = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '10px',
    };




    return (
        <div>
            <div style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '20px', fontWeight: 'bold' }}>
                Top bánh bán chạy
            </div>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card className="card-hover" cover={<img src={sampleCakeImage} alt="Cake" style={cakeImageStyle} />}>
                        <Card.Meta title="Bánh kem dâu" description="Giá: 100.000đ" />
                        <Button className="button-hover" style={addToCartButtonStyle} type="primary">Thêm vào giỏ</Button>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="card-hover" cover={<img src={sampleCakeImage} alt="Cake" style={cakeImageStyle} />}>
                        <Card.Meta title="Bánh su kem" description="Giá: 50.000đ" />
                        <Button className="button-hover" style={addToCartButtonStyle} type="primary">Thêm vào giỏ</Button>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card className="card-hover" cover={<img src={sampleCakeImage} alt="Cake" style={cakeImageStyle} />}>
                        <Card.Meta title="Bánh tart trứng" description="Giá: 60.000đ" />
                        <Button className="button-hover" style={addToCartButtonStyle} type="primary">Thêm vào giỏ</Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default TopSellingCakes;
