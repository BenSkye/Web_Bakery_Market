// OtherStores.tsx
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { getBakeries } from '../../services/bakeriesService';
import StoreCard from '../../components/card/CardStore';


const OtherStores: React.FC<{ bakeryId: string }> = ({ bakeryId }) => {


    const [bakeries, setBakeries] = useState([]);
    const [, setLoading] = useState(true);

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


    return (
        <div>
            <div style={sectionTitleStyle}>Các cửa hàng khác</div>
            <Row gutter={[16, 16]}>
                {bakeries.map((store: any) => (
                    <Col key={store._id} span={8}>
                        <StoreCard bakery={store} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default OtherStores;
