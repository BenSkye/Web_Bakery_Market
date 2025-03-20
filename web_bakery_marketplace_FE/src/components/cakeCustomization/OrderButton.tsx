import { Button, Row, Col } from 'antd';

interface OrderButtonProps {
    handleSubmitRequest: () => void;
}

export const OrderButton = ({ handleSubmitRequest }: OrderButtonProps) => {
    return (
        <Row justify="end" align="middle" style={{ marginTop: 16 }}>
            <Col>
                <Button
                    type="primary"
                    onClick={handleSubmitRequest}
                    style={{ width: 200, height: 40 }}
                >
                    Gửi yêu cầu
                </Button>
            </Col>
        </Row>
    );
};