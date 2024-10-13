import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Modal, Descriptions, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getOrdersByBakeryId } from '../../services/ordersService';
import { useParams } from 'react-router-dom';

const OrderManagement: React.FC = () => {
    const { bakeryId } = useParams();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await getOrdersByBakeryId(bakeryId as string);
            console.log(response.metadata);
            setOrders(response.metadata);
        };
        fetchOrders();
    }, []);

    const columns = [
        {
            title: 'Order ID',
            dataIndex: '_id',
            key: '_id',
            render: (text) => <a onClick={() => showOrderDetails(text)}>{text}</a>,
        },
        {
            title: 'User ID',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'Total Price',
            dataIndex: ['checkout', 'total_price'],
            key: 'total_price',
            render: (price) => `$${(price / 1000).toFixed(2)}`,
        },
        {
            title: 'Payment Method',
            dataIndex: 'payment_method',
            key: 'payment_method',
            render: (method) => (
                <Tag color={method === 'vnpay' ? 'green' : 'blue'}>{method || 'N/A'}</Tag>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleString(),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showOrderDetails(record._id)}>View Details</Button>
                </Space>
            ),
        },
    ];

    const showOrderDetails = (orderId) => {
        const order = orders.find((o) => o._id === orderId);
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    const handleSearch = (value) => {
        setSearchText(value);
        // Implement search logic here
    };

    const filteredOrders = orders.filter((order) =>
        order._id.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <h1>Order Management</h1>
            <Input
                placeholder="Search by Order ID"
                prefix={<SearchOutlined />}
                style={{ width: 300, marginBottom: 16 }}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <Table columns={columns} dataSource={filteredOrders} rowKey="_id" />
            <Modal
                title="Order Details"
                visible={isModalVisible}
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
                width={800}
            >
                {selectedOrder && (
                    <Descriptions bordered>
                        <Descriptions.Item label="Order ID" span={3}>{selectedOrder._id}</Descriptions.Item>
                        <Descriptions.Item label="User ID" span={3}>{selectedOrder.user_id}</Descriptions.Item>
                        <Descriptions.Item label="Total Price" span={3}>
                            ${(selectedOrder.checkout.total_price / 1000).toFixed(2)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Payment Method" span={3}>
                            {selectedOrder.payment_method || 'N/A'}
                        </Descriptions.Item>
                        <Descriptions.Item label="Shipping Address" span={3}>
                            {`${selectedOrder.shipping_address.name}, ${selectedOrder.shipping_address.phone}, ${selectedOrder.shipping_address.address}`}
                        </Descriptions.Item>
                        <Descriptions.Item label="Created At" span={3}>
                            {new Date(selectedOrder.createdAt).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Updated At" span={3}>
                            {new Date(selectedOrder.updatedAt).toLocaleString()}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

export default OrderManagement;