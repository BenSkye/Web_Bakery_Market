import React, { useState, useEffect } from 'react';
import { Tabs, Card, Row, Col, Typography, Image, Space, Button, message, Rate, Tooltip, Table, Divider, Tag } from 'antd';
import { getAllBakeriesByStatus, updateBakeryStatus } from '../../services/bakeriesService';
import { CheckOutlined, CloseOutlined, EnvironmentOutlined, FacebookOutlined, InstagramOutlined, PhoneOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

interface Contact {
    phone: string;
    facebook: string;
    instagram: string;
}

interface OpeningHours {
    open: string;
    close: string;
}

interface Bakery {
    _id: string;
    name: string;
    address: string;
    contact: Contact;
    status: string;
    image: string[];
    rating: number;
    openingHours: {
        [key: string]: OpeningHours;
    };
    customCake: boolean;
    createdAt: string;
}

const ManageBakeries: React.FC = () => {
    const [pendingBakeries, setPendingBakeries] = useState<Bakery[]>([]);
    const [activeBakeries, setActiveBakeries] = useState<Bakery[]>([]);
    const [inactiveBakeries, setInactiveBakeries] = useState<Bakery[]>([]);

    const fetchBakeries = async (status: string) => {
        try {
            const response = await getAllBakeriesByStatus(status);
            return response.metadata;
        } catch (error) {
            console.error(`Error fetching ${status} bakeries:`, error);
            return [];
        }
    };

    useEffect(() => {
        const loadBakeries = async () => {
            setPendingBakeries(await fetchBakeries('pending'));
            setActiveBakeries(await fetchBakeries('active'));
            setInactiveBakeries(await fetchBakeries('inactive'));
        };
        loadBakeries();
    }, []);

    const handleStatusUpdate = async (bakeryId: string, newStatus: 'active' | 'inactive') => {
        try {
            await updateBakeryStatus(bakeryId, newStatus);
            message.success(`Bakery status updated to ${newStatus}`);
            // Refresh the bakeries list
            setPendingBakeries(await fetchBakeries('pending'));
            setActiveBakeries(await fetchBakeries('active'));
            setInactiveBakeries(await fetchBakeries('inactive'));
        } catch (error) {
            console.error('Error updating bakery status:', error);
            message.error('Failed to update bakery status');
        }
    };


    const columns = [
        {
            title: 'Sun',
            dataIndex: 'sunday',
            key: 'sunday',
        },
        {
            title: 'Mon',
            dataIndex: 'monday',
            key: 'monday',
        },
        {
            title: 'Tue',
            dataIndex: 'tuesday',
            key: 'tuesday',
        },
        {
            title: 'Wed',
            dataIndex: 'wednesday',
            key: 'wednesday',
        },
        {
            title: 'Thu',
            dataIndex: 'thursday',
            key: 'thursday',
        },
        {
            title: 'Fri',
            dataIndex: 'friday',
            key: 'friday',
        },
        {
            title: 'Sat',
            dataIndex: 'saturday',
            key: 'saturday',
        },
    ];

    const renderOpeningHours = (openingHours: Bakery['openingHours']) => {
        const data = [{
            key: '1',
            sunday: openingHours.sunday ? `${openingHours.sunday.open} - ${openingHours.sunday.close}` : 'Closed',
            monday: openingHours.monday ? `${openingHours.monday.open} - ${openingHours.monday.close}` : 'Closed',
            tuesday: openingHours.tuesday ? `${openingHours.tuesday.open} - ${openingHours.tuesday.close}` : 'Closed',
            wednesday: openingHours.wednesday ? `${openingHours.wednesday.open} - ${openingHours.wednesday.close}` : 'Closed',
            thursday: openingHours.thursday ? `${openingHours.thursday.open} - ${openingHours.thursday.close}` : 'Closed',
            friday: openingHours.friday ? `${openingHours.friday.open} - ${openingHours.friday.close}` : 'Closed',
            saturday: openingHours.saturday ? `${openingHours.saturday.open} - ${openingHours.saturday.close}` : 'Closed',
        }];

        return (
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                size="small"
                style={{ width: '100%' }}
            />
        );
    };


    const renderBakeryCard = (bakery: Bakery) => (
        <Card
            key={bakery._id}
            hoverable
            style={{ marginBottom: 24, borderRadius: 12, overflow: 'hidden' }}
            bodyStyle={{ padding: 0 }}
        >
            <Row>
                <Col span={10}>
                    <div style={{ height: '100%', minHeight: 200, overflow: 'hidden' }}>
                        <Image
                            alt={bakery.name}
                            src={bakery.image[0]}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </Col>
                <Col span={14}>
                    <div style={{ padding: 16 }}>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <Title level={3} style={{ margin: 0 }}>{bakery.name}</Title>
                            <Space>
                                {bakery.rating === -1 ? (
                                    <Text type="secondary">Not rated</Text>
                                ) : (
                                    <Rate disabled defaultValue={bakery.rating} />
                                )}
                            </Space>
                            <Space>
                                <EnvironmentOutlined style={{ color: '#1890ff' }} />
                                <Text>{bakery.address}</Text>
                            </Space>
                            <Space>
                                <PhoneOutlined style={{ color: '#1890ff' }} />
                                <Text>{bakery.contact.phone}</Text>
                            </Space>
                            <Space>
                                {bakery.contact.facebook && (
                                    <Tooltip title="Facebook">
                                        <a href={bakery.contact.facebook} target="_blank" rel="noopener noreferrer">
                                            <FacebookOutlined style={{ fontSize: '24px', color: '#1877F2' }} />
                                        </a>
                                    </Tooltip>
                                )}
                                {bakery.contact.instagram && (
                                    <Tooltip title="Instagram">
                                        <a href={bakery.contact.instagram} target="_blank" rel="noopener noreferrer">
                                            <InstagramOutlined style={{ fontSize: '24px', color: '#E4405F' }} />
                                        </a>
                                    </Tooltip>
                                )}
                            </Space>
                            <Divider style={{ margin: '12px 0' }} />
                            <Space>
                                <Text strong>Custom Cake:</Text>
                                <Tag color={bakery.customCake ? 'green' : 'red'}>
                                    {bakery.customCake ? 'Available' : 'Not Available'}
                                </Tag>
                            </Space>
                            <Text type="secondary">Created: {new Date(bakery.createdAt).toLocaleDateString()}</Text>

                        </Space>
                    </div>
                </Col>
            </Row>
            <Divider style={{ margin: '12px 0' }} />
            <Space>
                {renderOpeningHours(bakery.openingHours)}
            </Space>
            {bakery.status === 'pending' && (
                <div style={{ padding: '12px 16px', background: '#f0f2f5' }}>
                    <Space>
                        <Tooltip title="Accept Bakery">
                            <Button type="primary" icon={<CheckOutlined />} onClick={() => handleStatusUpdate(bakery._id, 'active')}>
                                Accept
                            </Button>
                        </Tooltip>
                        <Tooltip title="Reject Bakery">
                            <Button danger icon={<CloseOutlined />} onClick={() => handleStatusUpdate(bakery._id, 'inactive')}>
                                Reject
                            </Button>
                        </Tooltip>
                    </Space>
                </div>
            )}
        </Card>
    );

    return (
        <div style={{ padding: '24px', minHeight: '100vh' }}>
            <Title level={2} style={{ marginBottom: '24px', textAlign: 'center' }}>Manage Bakeries</Title>
            <Tabs defaultActiveKey="1" type="card" size="large" style={{ padding: '16px', borderRadius: '8px' }}>
                <TabPane tab="Pending Bakeries" key="1">
                    {pendingBakeries.map(renderBakeryCard)}
                </TabPane>
                <TabPane tab="Active Bakeries" key="2">
                    {activeBakeries.map(renderBakeryCard)}
                </TabPane>
                <TabPane tab="Inactive Bakeries" key="3">
                    {inactiveBakeries.map(renderBakeryCard)}
                </TabPane>
            </Tabs>
        </div>
    );
};

export default ManageBakeries;