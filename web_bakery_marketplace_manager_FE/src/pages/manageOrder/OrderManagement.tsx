import React, { useState, useEffect } from 'react';
import { Table, Select, message, Tabs, Spin, Card, Space, Typography, Input, Tag, Row, Col, Statistic, Modal, Descriptions } from 'antd';
import { useParams } from 'react-router-dom';
import { getOrdersProductByBakeryId, changeStatusOrderProduct } from '../../services/ordersProductService';
import { formatCurrency } from '../../utils/format/formatCurrency';
import { SearchOutlined, ClockCircleOutlined, SyncOutlined, CheckCircleOutlined, CloseCircleOutlined, CarOutlined, GiftOutlined, StopOutlined, DollarCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Render3DCakeProps from '../../components/3D/Render3DCakeProps';
import moment from 'moment';

const { Option } = Select;
const { TabPane } = Tabs;
const { Title } = Typography;

interface OrderManagementProps {
    bakeryId?: string;
}

const OrderManagement: React.FC<OrderManagementProps> = ({ bakeryId }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [orderDetailModalVisible, setOrderDetailModalVisible] = useState(false);

    // Fetch orders on component mount
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrdersProductByBakeryId(bakeryId as string);
                setOrders(data.metadata);
            } catch {
                message.error('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [bakeryId]);

    // Handlers for modal visibility
    const showOrderDetail = (order: any) => {
        setSelectedOrder(order);
        setOrderDetailModalVisible(true);
    };

    const closeOrderDetailModal = () => {
        setOrderDetailModalVisible(false);
        setSelectedOrder(null);
    };

    const showConfirmModal = (orderId: string, newStatus: string) => {
        setSelectedOrder({ id: orderId, newStatus });
        setConfirmModalVisible(true);
    };

    const handleConfirm = async () => {
        if (selectedOrder) {
            try {
                await changeStatusOrderProduct(selectedOrder.id, selectedOrder.newStatus);
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === selectedOrder.id ? { ...order, status: selectedOrder.newStatus } : order
                    )
                );
                message.success('Trạng thái đơn hàng đã được cập nhật thành công');
            } catch {
                message.error('Không thể cập nhật trạng thái đơn hàng');
            } finally {
                setConfirmModalVisible(false);
            }
        }
    };

    const cancelConfirmModal = () => setConfirmModalVisible(false);

    const handleSearch = (value: string) => setSearchText(value);

    // Utility functions for status information and text
    const getStatusInfo = (status: string) => {
        const statusMap = {
            pending: { color: 'orange', icon: <ClockCircleOutlined />, text: 'Pending' },
            processing: { color: 'blue', icon: <SyncOutlined spin />, text: 'Processing' },
            success: { color: 'green', icon: <CheckCircleOutlined />, text: 'Success' },
            confirmed: { color: 'cyan', icon: <CheckCircleOutlined />, text: 'Confirmed' },
            rejected: { color: 'red', icon: <CloseCircleOutlined />, text: 'Rejected' },
            shipping: { color: 'geekblue', icon: <CarOutlined />, text: 'Shipping' },
            delivered: { color: 'purple', icon: <GiftOutlined />, text: 'Delivered' },
            canceled: { color: 'magenta', icon: <StopOutlined />, text: 'Canceled' },
        };
        return statusMap[status] || { color: 'default', icon: <ClockCircleOutlined />, text: 'Unknown' };
    };

    const getDashboardStats = () => {
        const pendingOrders = orders.filter(order => order.status === 'pending').length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);
        const totalOrders = orders.length;
        const completedOrders = orders.filter(order => ['success', 'delivered'].includes(order.status)).length;

        return { pendingOrders, totalRevenue, totalOrders, completedOrders };
    };

    // Table columns
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
            sorter: (a: any, b: any) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
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
            render: (price: number) => formatCurrency(price),
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

    // Filter and render table
    const renderOrderTable = (isCustom: boolean, status: string | null) => {
        const filteredOrders = orders.filter(order =>
            order.isCustomCake === isCustom &&
            (status ? order.status === status : true) &&
            (searchText === '' || order._id.toLowerCase().includes(searchText.toLowerCase()))
        );
        return <Table dataSource={filteredOrders} columns={columns} rowKey="_id" pagination={{ pageSize: 10 }} />;
    };

    // Render status tabs
    const renderStatusTabs = (isCustom: boolean) => (
        <Tabs defaultActiveKey="all">
            {['All', 'Pending', 'Processing', 'Success', 'Confirmed', 'Rejected', 'Shipping', 'Delivered', 'Canceled'].map(status => (
                <TabPane tab={status} key={status.toLowerCase()}>
                    {renderOrderTable(isCustom, status.toLowerCase() === 'all' ? null : status.toLowerCase())}
                </TabPane>
            ))}
        </Tabs>
    );

    const checkSelectedDecorations = (decorations: any[], value: string) => {
        return decorations?.some(d => d.value === value) || false;
    }


    const { pendingOrders, totalRevenue, totalOrders, completedOrders } = getDashboardStats();

    if (loading) return <Spin size="large" />;

    return (
        <Card style={{ margin: '24px' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Title level={2}>Quản lí đơn hàng</Title>
                <Row gutter={16}>
                    <Col span={6}><StatisticCard title="Pending Orders" value={pendingOrders} icon={<ClockCircleOutlined />} /></Col>
                    <Col span={6}><StatisticCard title="Total Revenue" value={formatCurrency(totalRevenue)} icon={<DollarCircleOutlined />} /></Col>
                    <Col span={6}><StatisticCard title="Total Orders" value={totalOrders} icon={<ShoppingCartOutlined />} /></Col>
                    <Col span={6}><StatisticCard title="Completed Orders" value={completedOrders} icon={<CheckCircleOutlined />} /></Col>
                </Row>
                <Input
                    placeholder="Search orders..."
                    prefix={<SearchOutlined />}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ width: 300 }}
                />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Custom Cake Orders" key="1">{renderStatusTabs(true)}</TabPane>
                    <TabPane tab="Regular Product Orders" key="2">{renderStatusTabs(false)}</TabPane>
                </Tabs>
            </Space>

            {/* Modals */}
            <Modal
                title="Xác nhận thay đổi trạng thái"
                visible={confirmModalVisible}
                onOk={handleConfirm}
                onCancel={cancelConfirmModal}
            >
                <p>Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng này thành <strong>{getStatusInfo(selectedOrder?.newStatus)?.text}</strong>?</p>
            </Modal>

            <Modal
                title="Order Details"
                visible={orderDetailModalVisible}
                onCancel={closeOrderDetailModal}
                footer={null}
                width={800}
            >
                {selectedOrder && (
                    <Descriptions column={1}>
                        <Descriptions.Item label="Order ID">{selectedOrder._id}</Descriptions.Item>
                        <Descriptions.Item label="Order Time">{moment(selectedOrder.createdAt).format('DD-MM-YYYY HH:mm:ss')}</Descriptions.Item>
                        <Descriptions.Item label="Quantity">{selectedOrder.quantity}</Descriptions.Item>
                        <Descriptions.Item label="Price">{formatCurrency(selectedOrder.price)}</Descriptions.Item>
                        <Descriptions.Item label="Status">
                            <Tag color={getStatusInfo(selectedOrder.status).color}>
                                {getStatusInfo(selectedOrder.status).text}
                            </Tag>
                        </Descriptions.Item>
                        {selectedOrder.isCustomCake && selectedOrder.customCake && (
                            <Descriptions.Item label="Custom Cake">
                                <div style={{ height: '400px', width: '400px' }}>
                                    <Render3DCakeProps
                                        style={{ width: "100%", height: '100%' }}
                                        cameraPosition={[0, 500, 500]}
                                        frostingColor={selectedOrder.customCake.frostingColor}
                                        selectedDripSauce={selectedOrder.customCake.selectedDripSauce}
                                        isCandle={checkSelectedDecorations(selectedOrder.customCake.selectedDecorations, 'candle')}
                                        isWafer={checkSelectedDecorations(selectedOrder.customCake.selectedDecorations, 'wafer')}
                                        isMacaron={checkSelectedDecorations(selectedOrder.customCake.selectedDecorations, 'macaron')}
                                        isStrawberry={checkSelectedDecorations(selectedOrder.customCake.selectedDecorations, 'strawberry')}
                                        isCream={checkSelectedDecorations(selectedOrder.customCake.selectedDecorations, 'cream')}
                                        isCherry={checkSelectedDecorations(selectedOrder.customCake.selectedDecorations, 'cherry')}
                                        isChocolate={checkSelectedDecorations(selectedOrder.customCake.selectedDecorations, 'chocolate')}
                                        onObjectClick={() => { }}
                                        handleCanvasCreated={() => { }}
                                    />

                                </div>

                            </Descriptions.Item>
                        )}
                        <Descriptions.Item label="Is Custom Cake">
                            {selectedOrder.isCustomCake ? 'Yes' : 'No'}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </Card >
    );
};

const StatisticCard: React.FC<{ title: string; value: number | string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <Card>
        <Statistic title={title} value={value} prefix={icon} />
    </Card>
);

export default OrderManagement;
