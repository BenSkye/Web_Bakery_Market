import React, { useState } from 'react';
import { Modal, InputNumber } from 'antd';


interface StockEditModalProps {
    visible: boolean;
    onCancel: () => void;
    onOk: (stockChange: number) => void;
    currentStock: number;
}

const StockEditModal: React.FC<StockEditModalProps> = ({ visible, onCancel, onOk, currentStock }) => {
    const [stockChange, setStockChange] = useState(0);

    const handleOk = () => {
        onOk(stockChange);
        setStockChange(0);
    };

    return (
        <Modal
            title="Edit Stock"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
        >
            <p>Current stock: {currentStock}</p>
            <InputNumber
                value={stockChange}
                onChange={(value) => setStockChange(value || 0)}
                placeholder="Enter stock change"
            />
            <p>
                {stockChange > 0
                    ? `Adding ${stockChange} to stock`
                    : stockChange < 0
                        ? `Removing ${Math.abs(stockChange)} from stock`
                        : 'No change'}
            </p>
        </Modal>
    );
};

export default StockEditModal;