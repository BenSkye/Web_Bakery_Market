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
    newStatus?: string;
}
interface OrderModalsProps {
    confirmModalVisible: boolean;
    orderDetailModalVisible: boolean;
    selectedOrder: Order | null;
    handleConfirm: () => void;
    cancelConfirmModal: () => void;
    closeOrderDetailModal: () => void;
}

const OrderModals: React.FC<OrderModalsProps> = ({
    confirmModalVisible,
    orderDetailModalVisible,
    selectedOrder,
    handleConfirm,
    cancelConfirmModal,
    closeOrderDetailModal
}) => (
    <>
        {/* Confirm Status Modal */}
        <Modal
            title="Xác nhận thay đổi trạng thái"
            visible={confirmModalVisible}
            onOk={handleConfirm}
            onCancel={cancelConfirmModal}
        >
            <p>Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng này thành <strong>{getStatusInfo(selectedOrder?.newStatus)?.text}</strong>?</p>
        </Modal>

        {/* Order Detail Modal */}
        <Modal
            title="Order Details"
            visible={orderDetailModalVisible}
            onCancel={closeOrderDetailModal}
            footer={null}
        >
            {selectedOrder && (
                <Descriptions column={1}>
                    <Descriptions.Item label="Order ID">{selectedOrder._id}</Descriptions.Item>
                    <Descriptions.Item label="Order Time">{moment(selectedOrder.createdAt).format('DD-MM-YYYY HH:mm:ss')}</Descriptions.Item>
                    <Descriptions.Item label="Quantity">{selectedOrder.quantity}</Descriptions.Item>
                    <Descriptions.Item label="Price">{selectedOrder.price}</Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <Tag color={getStatusInfo(selectedOrder.status).color}>
                            {getStatusInfo(selectedOrder.status).text}
                        </Tag>
                    </Descriptions.Item>
                </Descriptions>
            )}
        </Modal>
    </>
);

export default OrderModals;
