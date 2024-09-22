// OtherStores.tsx
import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { getBakeries } from '../../services/bakeriesService';

const otherStores = [
    { id: 1, name: "Tiệm bánh ngọt XYZ", address: "456 Đường Nguyễn Trãi, Quận 5, TP. Hồ Chí Minh", image: 'path/to/other-store-image.jpg' },
    { id: 2, name: "Tiệm bánh mì ABC", address: "789 Đường CMT8, Quận 10, TP. Hồ Chí Minh", image: 'path/to/other-store-image.jpg' },
    { id: 3, name: "Tiệm bánh quy DEF", address: "101 Đường Lê Duẩn, Quận 3, TP. Hồ Chí Minh", image: 'path/to/other-store-image.jpg' },
];

const OtherStores: React.FC = ({ bakeryId }: { bakeryId: string }) => {


    const [bakeries, setBakeries] = useState([]);
    const [workshops, setWorkshops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBakeries = async () => {
            try {
                setLoading(true);
                const data = await getBakeries();
                console.log('data', data.metadata)
                console.log('bakeryId', bakeryId)
                const filteredBakeries = data.metadata.filter((bakery: any) => bakery._id !== bakeryId);
                const shuffled = filteredBakeries.sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 3);
                setBakeries(selected);
            } catch (error) {
                console.error("Failed to fetch bakeries:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBakeries();
    }, []);

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
                {bakeries.map((store: any) => (
                    <Col key={store._id} span={8}>
                        <Card className="card-hover" cover={<img src={store.image[0]} alt={store.name} style={cakeImageStyle} />}>
                            <Card.Meta title={store.name} description={store.address} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default OtherStores;
