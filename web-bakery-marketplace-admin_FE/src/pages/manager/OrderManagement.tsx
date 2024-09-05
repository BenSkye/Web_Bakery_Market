import React, { useState } from 'react';
import { Table, Button, Typography, Space, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

// Định nghĩa kiểu OrderItem
type OrderItem = {
    id: number;
    orderDate: string;
    customerName: string;
    totalAmount: number;
    status: string;
    imageUrl: string; // Trường hình ảnh
};

// Dữ liệu mẫu
const initialOrders: OrderItem[] = [
    { id: 1, orderDate: '2024-09-01', customerName: 'John Doe', totalAmount: 50, status: 'Pending', imageUrl: 'https://brodardbakery.com/wp-content/uploads/2020/12/Duong-phen-Chocolate-2-2.png' },
    { id: 2, orderDate: '2024-09-02', customerName: 'Jane Smith', totalAmount: 75, status: 'Completed', imageUrl: 'https://brodardbakery.com/wp-content/uploads/2020/12/Duong-phen-Chocolate-2-2.png' },
    // Thêm dữ liệu mẫu khác nếu cần
];

const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<OrderItem[]>(initialOrders);

    // Xử lý chỉnh sửa đơn hàng
    const handleEditOrder = (id: number) => {
        console.log('Edit order with ID:', id);
    };

    // Xử lý xóa đơn hàng
    const handleDeleteOrder = (id: number) => {
        setOrders(orders.filter(order => order.id !== id));
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (url: string) => <Image src={url} width={100} />,
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (text: number) => `$${text.toFixed(2)}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: OrderItem) => (
                <Space>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEditOrder(record.id)}>
                        Edit
                    </Button>
                    <Button type="primary" className="danger-button" icon={<DeleteOutlined />} onClick={() => handleDeleteOrder(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Title level={3}>Order Management</Title>
            <Table
                dataSource={orders}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                style={{ marginBottom: '24px' }}
            />
        </div>
    );
};

export default OrderManagement;
