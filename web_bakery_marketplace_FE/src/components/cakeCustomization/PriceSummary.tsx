import { Typography, Row, Col } from 'antd';
import { convertToVND } from '../../utils';

const { Title } = Typography;

export const PriceSummary = ({ totalPrice }: { totalPrice: number }) => (
    <Row justify="space-between" align="middle">
        <Col>
            <Title level={4}>Tổng giá:</Title>
        </Col>
        <Col>
            <Title level={3} type="danger">{convertToVND(totalPrice)}</Title>
        </Col>
    </Row>
);