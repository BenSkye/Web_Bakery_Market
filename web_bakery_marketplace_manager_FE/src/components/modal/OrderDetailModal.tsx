// components/OrderDetailModal.tsx
import React from 'react';
import { Modal, Descriptions, Tag } from 'antd';
import moment from 'moment';
import { getStatusInfo } from '../../utils/status/statusUtils';


interface Order {
    _id: string;
    createdAt: string;
    quantity: number;
    price: number;
    status: string;
}interface OrderDetailModalProps {
    visible: boolean;
    onCancel: () => void;
    selectedOrder: Order | null;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ visible, onCancel, selectedOrder }) => {
    return (
        <Modal title="Order Details" visible={visible} onCancel={onCancel} footer={null}>
            {selectedOrder && (
                <Descriptions column={1}>
                    <Descriptions.Item label="Order ID">{selectedOrder._id}</Descriptions.Item>
                    <Descriptions.Item label="Order Time">{moment(selectedOrder.createdAt).format('DD-MM-YYYY HH:mm:ss')}</Descriptions.Item>
                    <Descriptions.Item label="Quantity">{selectedOrder.quantity}</Descriptions.Item>
                    <Descriptions.Item label="Price">{`₫${selectedOrder.price.toLocaleString()}`}</Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <Tag color={getStatusInfo(selectedOrder.status).color}>
                            {getStatusInfo(selectedOrder.status).text}
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>
            )}
        </Modal>
    );
};

export default OrderDetailModal;
