import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

const Bill: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Extract relevant information from the query parameters
    const amount = queryParams.get('vnp_Amount');
    const bankCode = queryParams.get('vnp_BankCode');
    const bankTranNo = queryParams.get('vnp_BankTranNo');
    const cardType = queryParams.get('vnp_CardType');
    const orderInfo = queryParams.get('vnp_OrderInfo');
    const payDate = queryParams.get('vnp_PayDate');
    const responseCode = queryParams.get('vnp_ResponseCode');
    const tmnCode = queryParams.get('vnp_TmnCode');
    const transactionNo = queryParams.get('vnp_TransactionNo');
    const transactionStatus = queryParams.get('vnp_TransactionStatus');
    const txnRef = queryParams.get('vnp_TxnRef');

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Hóa Đơn</Title>
            <Card>
                <Text strong>Thông Tin Giao Dịch:</Text>
                <div>
                    <Text> - Số Tiền: {amount} VND</Text><br />
                    <Text> - Mã Ngân Hàng: {bankCode}</Text><br />
                    <Text> - Số Giao Dịch Ngân Hàng: {bankTranNo}</Text><br />
                    <Text> - Loại Thẻ: {cardType}</Text><br />
                    <Text> - Thông Tin Đơn Hàng: {orderInfo}</Text><br />
                    <Text> - Ngày Thanh Toán: {payDate}</Text><br />
                    <Text> - Mã Phản Hồi: {responseCode}</Text><br />
                    <Text> - Mã Tmn: {tmnCode}</Text><br />
                    <Text> - Số Giao Dịch: {transactionNo}</Text><br />
                    <Text> - Trạng Thái Giao Dịch: {transactionStatus}</Text><br />
                    <Text> - Mã Đơn Hàng: {txnRef}</Text><br />
                </div>
            </Card>
        </div>
    );
};

export default Bill;
