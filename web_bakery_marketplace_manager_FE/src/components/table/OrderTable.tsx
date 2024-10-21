// components/OrderTable.tsx
import React from 'react';
import { Table, Tag, Select } from 'antd';
import moment from 'moment';
import { getStatusInfo } from '../../utils/status/statusUtils';

interface OrderTableProps {
    orders: any[];
    searchText: string;
    isCustom: boolean;
    status: string | null;
    showOrderDetail: (order: any) => void;
    showConfirmModal: (orderId: string, newStatus: string) => void;
}

const { Option } = Select;

const OrderTable: React.FC<OrderTableProps> = ({ orders, searchText, isCustom, status, showOrderDetail, showConfirmModal }) => {
    const columns = [
        {
            title: 'Order ID',
            dataIndex: '_id',
            key: '_id',
            render: (text: string, record: any) => (
                <a onClick={() => showOrderDetail(record)}>{text}</a>
            ),
        },
        {
            title: 'Order Time',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: string) => moment(createdAt).format('DD-MM-YYYY HH:mm:ss'),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `₫${price.toLocaleString()}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const { color, icon, text } = getStatusInfo(status);
                return <Tag color={color} icon={icon}>{text}</Tag>;
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: string, record: any) => (
                <Select
                    defaultValue={record.status}
                    style={{ width: 120 }}
                    onChange={(value) => showConfirmModal(record._id, value)}
                >
                    <Option value="pending">Pending</Option>
                    <Option value="processing">Processing</Option>
                    <Option value="success">Success</Option>
                    <Option value="confirmed">Confirmed</Option>
                    <Option value="rejected">Rejected</Option>
                    <Option value="shipping">Shipping</Option>
                    <Option value="delivered">Delivered</Option>
                    <Option value="canceled">Canceled</Option>
                </Select>
            ),
        },
    ];

    const filteredOrders = orders.filter(order =>
        order.isCustomCake === isCustom &&
        (status ? order.status === status : true) &&
        (searchText === '' || order._id.toLowerCase().includes(searchText.toLowerCase()))
    );

    return <Table dataSource={filteredOrders} columns={columns} rowKey="_id" pagination={{ pageSize: 10 }} />;
};

export default OrderTable;
