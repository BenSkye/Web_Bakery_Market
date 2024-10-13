import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Modal, Descriptions, List, Typography, Image, Select, message, Row, Col, Card, Statistic } from 'antd';
import { getOrdersByBakeryId, updateOrderProductStatus, updateOrderStatus } from '../../services/ordersBillService';
import { CheckCircleOutlined, DollarOutlined, ShoppingCartOutlined, SyncOutlined } from '@ant-design/icons';
import { formatCurrency } from '../../utils/format/formatCurrency';
import { useParams } from 'react-router-dom';
import { changeStatusOrderProduct } from '../../services/ordersProductService';

const { Title, Text } = Typography;
const { Option } = Select;

const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { bakeryId } = useParams();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await getOrdersByBakeryId(bakeryId as string);
        setOrders(response.metadata);
    };

    const showOrderDetails = (order) => {
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    const handleProductStatusChange = async (productId, status) => {
        try {
            await changeStatusOrderProduct(productId, status);
            message.success('Product status updated successfully');
            fetchOrders(); // Refresh orders after update
        } catch (error) {
            message.error('Failed to update product status');
        }
    };

    // const handleOrderStatusChange = async (orderId, newStatus) => {
    //     try {
    //         await updateOrderStatus(orderId, newStatus);
    //         message.success('Order status updated successfully');
    //         fetchOrders(); // Refresh orders after update
    //     } catch (error) {
    //         message.error('Failed to update order status');
    //     }
    // };

    const getStatusColor = (status) => {
        const colorMap = {
            'pending': 'gold',
            'confirmed': 'green',
            'rejected': 'red',
            'success': 'green',
            'processing': 'blue',
            'shipping': 'cyan',
            'delivered': 'green',
            'canceled': 'red'
        };
        return colorMap[status] || 'default';
    };

    const columns = [
        { title: 'Order ID', dataIndex: '_id', key: '_id' },
        {
            title: 'Order Status',
            dataIndex: 'status',
            key: 'orderStatus',
            render: (status, record) => (
                <Select
                    defaultValue={status}
                    style={{ width: 120 }}
                // onChange={(value) => handleOrderStatusChange(record._id, value)}
                >
                    <Option value="pending">Pending</Option>
                    <Option value="confirmed">Confirmed</Option>
                    <Option value="processing">Processing</Option>
                    <Option value="shipping">Shipping</Option>
                    <Option value="delivered">Delivered</Option>
                    <Option value="canceled">Canceled</Option>
                </Select>
            )
        },
        // {
        //     title: 'Product Statuses',
        //     dataIndex: 'order_products',
        //     key: 'productStatuses',
        //     render: (products) => (
        //         <Space>
        //             {products.map((product, index) => (
        //                 <Tag key={index} color={getStatusColor(product.status)}>
        //                     {product.status.toUpperCase()}
        //                 </Tag>
        //             ))}
        //         </Space>
        //     )
        // },
        {
            title: 'Total Price',
            dataIndex: ['checkout', 'total_price'],
            key: 'total_price',
            render: price => `$${(price / 1000).toFixed(2)}`
        },
        { title: 'Payment Method', dataIndex: 'payment_method', key: 'payment_method' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button onClick={() => showOrderDetails(record)}>View Details</Button>
            ),
        },
    ];

    const renderProductDetails = (product, orderId) => {
        const commonDetails = (
            <Space direction="vertical">
                <Image
                    width={200}
                    src={product.image || 'https://via.placeholder.com/200x200?text=No+Image'}
                    alt={product.product_name || 'Product'}
                />
                <Text strong>Quantity:</Text> {product.quantity}
                <Text strong>Price:</Text> ${(product.price / 1000).toFixed(2)}
                <Text strong>Status:</Text>
                <Tag color={getStatusColor(product.status)}>{product.status.toUpperCase()}</Tag>
            </Space>
        );

        if (product.isCustomCake) {
            return (
                <List.Item>
                    <List.Item.Meta
                        title={<Title level={4}>Custom Cake</Title>}
                        description={
                            <Space direction="vertical">
                                {commonDetails}
                                <Text strong>Filling:</Text> {product.customCake.selectedFilling.name}
                                <Text strong>Frosting Color:</Text> {product.customCake.frostingColor.name}
                                <Text strong>Drip Sauce:</Text> {product.customCake.selectedDripSauce.name}
                                <Text strong>Decorations:</Text> {product.customCake.selectedDecorations.map(d => d.label).join(', ')}
                                <Select
                                    defaultValue={product.status}
                                    style={{ width: 120 }}
                                    onChange={(value) => handleProductStatusChange(product._id, value)}
                                >
                                    <Option value="pending">Chờ</Option>
                                    <Option value="confirmed">Nhận</Option>
                                    <Option value="rejected">Từ chối</Option>
                                </Select>
                            </Space>
                        }
                    />
                </List.Item>
            );
        } else {
            return (
                <List.Item>
                    <List.Item.Meta
                        title={<Title level={4}>{product.product_name || `Product ID: ${product.product_id}`}</Title>}
                        description={commonDetails}
                    />
                </List.Item>
            );
        }
    };

    const getOrderStatistics = () => {
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.checkout.total_price, 0) / 1000;
        const completedOrders = orders.filter(order => order.status === 'delivered').length;
        const pendingOrders = orders.filter(order => order.status === 'pending').length;

        return { totalOrders, totalRevenue, completedOrders, pendingOrders };
    };

    const { totalOrders, totalRevenue, completedOrders, pendingOrders } = getOrderStatistics();

    return (
        <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
            <Title level={2} style={{ marginBottom: '24px' }}>Order Management</Title>

            <Row gutter={16} style={{ marginBottom: '24px' }}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total Orders"
                            value={totalOrders}
                            prefix={<ShoppingCartOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total Revenue"
                            value={totalRevenue}
                            precision={2}
                            prefix={<DollarOutlined />}
                            suffix="$"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Completed Orders"
                            value={completedOrders}
                            prefix={<CheckCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Pending Orders"
                            value={pendingOrders}
                            prefix={<SyncOutlined spin />}
                        />
                    </Card>
                </Col>
            </Row>

            <Card>
                <Table
                    columns={columns}
                    dataSource={orders}
                    rowKey="_id"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: true }}
                />
            </Card>

            <Modal
                title={<Title level={3}>Order Details</Title>}
                visible={isModalVisible}
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
                width={800}
                footer={null}
            >
                {selectedOrder && (
                    <Card>
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="Order ID">{selectedOrder._id}</Descriptions.Item>
                            <Descriptions.Item label="Order Status">
                                <Tag color={getStatusColor(selectedOrder.status)}>{selectedOrder.status.toUpperCase()}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Total Price">
                                ${(selectedOrder.checkout.total_price / 1000).toFixed(2)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Payment Method">{selectedOrder.payment_method}</Descriptions.Item>
                            <Descriptions.Item label="Shipping Address">
                                {selectedOrder.shipping_address.name}, {selectedOrder.shipping_address.phone}, {selectedOrder.shipping_address.address}
                            </Descriptions.Item>
                            <Descriptions.Item label="Products">
                                <List
                                    dataSource={selectedOrder.order_products}
                                    renderItem={(product) => renderProductDetails(product, selectedOrder._id)}
                                    itemLayout="vertical"
                                />
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                )}
            </Modal>
        </div>
    );
};

export default OrderManagement;