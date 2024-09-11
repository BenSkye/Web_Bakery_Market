// OtherStores.tsx
import React from 'react';
import { Card, Row, Col } from 'antd';

const otherStores = [
    { id: 1, name: "Tiệm bánh ngọt XYZ", address: "456 Đường Nguyễn Trãi, Quận 5, TP. Hồ Chí Minh", image: 'path/to/other-store-image.jpg' },
    { id: 2, name: "Tiệm bánh mì ABC", address: "789 Đường CMT8, Quận 10, TP. Hồ Chí Minh", image: 'path/to/other-store-image.jpg' },
    { id: 3, name: "Tiệm bánh quy DEF", address: "101 Đường Lê Duẩn, Quận 3, TP. Hồ Chí Minh", image: 'path/to/other-store-image.jpg' },
];

const OtherStores: React.FC = () => {
    const sectionTitleStyle: React.CSSProperties = {
        marginTop: '2rem',
        marginBottom: '1rem',
        fontSize: '20px',
        fontWeight: 'bold',
    };

    const cakeImageStyle: React.CSSProperties = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '10px',
    };

    return (
        <div>
            <div style={sectionTitleStyle}>Các cửa hàng khác</div>
            <Row gutter={[16, 16]}>
                {otherStores.map(store => (
                    <Col key={store.id} span={8}>
                        <Card className="card-hover" cover={<img src={store.image} alt={store.name} style={cakeImageStyle} />}>
                            <Card.Meta title={store.name} description={store.address} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default OtherStores;
