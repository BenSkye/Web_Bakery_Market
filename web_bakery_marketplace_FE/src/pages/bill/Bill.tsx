import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Typography, Row, Col, Divider, Layout } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;

const Bill: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const billData = [
        { label: 'Số Tiền', value: `${parseInt(queryParams.get('vnp_Amount') || '0') / 100} VND` },
        { label: 'Mã Ngân Hàng', value: queryParams.get('vnp_BankCode') },
        { label: 'Thông Tin Đơn Hàng', value: queryParams.get('vnp_OrderInfo') },
        { label: 'Ngày Thanh Toán', value: queryParams.get('vnp_PayDate') },
        { label: 'Trạng Thái Giao Dịch', value: queryParams.get('vnp_TransactionStatus') },
        { label: 'Mã Đơn Hàng', value: queryParams.get('vnp_TxnRef') },
    ];

    const isSuccessful = queryParams.get('vnp_ResponseCode') === '00';

    return (
        <Layout>
            <Content style={{ padding: '50px', maxWidth: '800px', margin: '0 auto' }}>
                <Card
                    title={<Title level={2}>Hóa Đơn Thanh Toán</Title>}
                    extra={isSuccessful ?
                        <CheckCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} /> :
                        <CloseCircleOutlined style={{ fontSize: '24px', color: '#f5222d' }} />
                    }
                    headStyle={{ backgroundColor: '#f0f2f5', textAlign: 'center' }}
                    bodyStyle={{ backgroundColor: '#ffffff' }}
                >
                    <Divider />
                    <Row gutter={[16, 16]}>
                        {billData.map((item, index) => (
                            <React.Fragment key={index}>
                                <Col span={12}>
                                    <Text strong>{item.label}:</Text>
                                </Col>
                                <Col span={12}>
                                    <Text>{item.value || 'N/A'}</Text>
                                </Col>
                                {index < billData.length - 1 && <Divider style={{ margin: '12px 0' }} />}
                            </React.Fragment>
                        ))}
                    </Row>
                </Card>
            </Content>
        </Layout>
    );
};

export default Bill;