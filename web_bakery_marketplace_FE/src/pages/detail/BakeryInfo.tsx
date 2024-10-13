import React from 'react';
import { Typography, Row, Col, Rate, Tooltip, Card, Tag } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined, FacebookOutlined, InstagramOutlined, PhoneOutlined } from '@ant-design/icons';
import { IoStorefrontOutline } from "react-icons/io5";

const { Title, Paragraph } = Typography;

interface BakeryInfoProps {
    bakery: {
        name: string;
        address: string;
        rating: number;
        openingHours: {
            monday: { open: string; close: string };
            tuesday: { open: string; close: string };
            wednesday: { open: string; close: string };
            thursday: { open: string; close: string };
            friday: { open: string; close: string };
            saturday: { open: string; close: string };
            sunday: { open: string; close: string };
        };
        contact: {
            phone: string,
            facebook: string,
            instagram: string,
        }
        description: string;
        image: string[];

    };
}

const BakeryInfo: React.FC<BakeryInfoProps> = ({ bakery }) => {
    const { name, address, openingHours, rating, description, contact, image } = bakery;

    console.log('bakery: ', bakery)



    // Determine current day and time
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const today = new Date().getDay();
    const currentDay = daysOfWeek[today === 0 ? 6 : today - 1]; // Adjust for Sunday
    const currentTime = new Date().toTimeString().slice(0, 5); // Get current time in HH:mm format

    const openingHoursToday = openingHours[currentDay];

    // Function to check if the bakery is open
    const isOpen = () => {
        return currentTime >= openingHoursToday.open && currentTime <= openingHoursToday.close;
    };

    // Create opening hours details for tooltip
    const openingHoursText = Object.entries(openingHours)
        .map(([day, { open, close }]) => `${day.charAt(0).toUpperCase() + day.slice(1)}: ${open} - ${close}`)
        .join('<br />');

    const tooltipStyle: React.CSSProperties = {
        textAlign: 'right',
        whiteSpace: 'pre-line', // Preserve line breaks
    };

    return (
        <Card className="bakery-info-card" hoverable style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
            <Row gutter={[24, 24]} align="middle">
                <Col xs={24} sm={24} md={8} lg={6}>
                    {Array.isArray(image) && image.length > 0 ? (
                        <img
                            src={image[0]}
                            alt="Bakery image"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '10px',
                                objectFit: 'cover',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            }}
                        />
                    ) : (
                        <div style={{
                            height: 200,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#f0f2f5',
                            borderRadius: '10px'
                        }}>
                            No images available
                        </div>
                    )}
                </Col>
                <Col xs={24} sm={24} md={16} lg={18}>
                    <Title level={2} style={{ marginBottom: '16px' }}>
                        {name} <IoStorefrontOutline style={{ marginLeft: '8px' }} />
                    </Title>
                    <Paragraph>
                        <EnvironmentOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
                        {address}
                    </Paragraph>
                    {contact.phone && (
                        <Paragraph>
                            <PhoneOutlined style={{ marginRight: '8px', color: '#faad14' }} />
                            {contact.phone}
                        </Paragraph>
                    )}
                    {contact.facebook && (
                        <Paragraph>
                            <a> <FacebookOutlined style={{ marginRight: '8px', color: 'blue' }} />
                                {contact.facebook}</a>
                        </Paragraph>
                    )}
                    {contact.instagram && (
                        <Paragraph>
                            <a> <InstagramOutlined style={{ marginRight: '8px', color: 'pink' }} />
                                {contact.instagram}</a>
                        </Paragraph>
                    )}
                    <Tooltip
                        title={<div style={tooltipStyle} dangerouslySetInnerHTML={{ __html: openingHoursText }} />}
                        placement="topLeft"
                    >
                        <Paragraph>
                            <ClockCircleOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                            Mở cửa hôm nay: {openingHoursToday.open} - {openingHoursToday.close}
                            <Tag color={isOpen() ? 'success' : 'error'} style={{ marginLeft: '8px' }}>
                                {isOpen() ? 'Đang mở cửa' : 'Đã đóng cửa'}
                            </Tag>
                        </Paragraph>
                    </Tooltip>
                    <div style={{ marginBottom: '16px' }}>
                        <Rate disabled value={rating} style={{ fontSize: '16px' }} />
                        <span style={{ marginLeft: '8px', fontSize: '16px' }}>{rating.toFixed(1)}</span>
                    </div>
                    <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'Xem thêm' }}>
                        {description}
                    </Paragraph>
                </Col>
            </Row>
        </Card>
    );
};

export default BakeryInfo;
