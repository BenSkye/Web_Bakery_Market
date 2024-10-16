// components/ConfirmModal.tsx
import React from 'react';
import { Modal } from 'antd';
import { getStatusInfo } from '../../utils/status/statusUtils';

interface ConfirmModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    newStatus: string | undefined;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ visible, onConfirm, onCancel, newStatus }) => {
    return (
        <Modal
            title="Xác nhận thay đổi trạng thái"
            visible={visible}
            onOk={onConfirm}
            onCancel={onCancel}
        >
            <p>Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng này thành <strong>{getStatusInfo(newStatus)?.text}</strong>?</p>
        </Modal>
    );
};

export default ConfirmModal;
