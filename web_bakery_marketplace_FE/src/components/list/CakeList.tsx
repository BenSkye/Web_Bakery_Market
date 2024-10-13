import React from 'react';
import { Row, Col } from 'antd';
import CakeCard from '../card/CakeCard';

interface CakeListProps {
    filteredCakes: Array<{
        _id: string;
        id: string;
        name: string;
        price: string;
        image: string[];
    }>;
}

const CakeList: React.FC<CakeListProps> = ({ filteredCakes }) => {
    return (
        <Row gutter={[16, 16]}>
            {filteredCakes.map(cake => (
                <Col key={cake.id} span={8}>
                    <CakeCard cake={cake} />
                </Col>
            ))}
        </Row>
    );
};

export default CakeList;