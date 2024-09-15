import React from 'react';
import { Avatar, Typography, Row, Col, Rate, Tooltip } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { IoStorefrontOutline } from "react-icons/io5";

const { Title } = Typography;

interface BakeryInfoProps {
    bakery: {
        name: string;
        address: string;
        openingHours: {
            monday: { open: string; close: string };
            tuesday: { open: string; close: string };
            wednesday: { open: string; close: string };
            thursday: { open: string; close: string };
            friday: { open: string; close: string };
            saturday: { open: string; close: string };
            sunday: { open: string; close: string };
        };
        rating: number;
        description: string;
        avatarUrl: string;
    };
}

const BakeryInfo: React.FC<BakeryInfoProps> = ({ bakery }) => {
    const { name, address, openingHours, rating, description, avatarUrl } = bakery;

    const avatarStyle: React.CSSProperties = {
        width: '500px',
        height: '100px',
        borderRadius: '10px',
        objectFit: 'cover',
    };

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
        <Row gutter={[16, 16]}>
            <Col span={6}>
                <Avatar shape="square" src={avatarUrl} style={avatarStyle} />
            </Col>
            <Col span={18}>
                <Title level={2}>
                    {name} <IoStorefrontOutline style={{ marginLeft: '8px' }} />
                </Title>
                <p style={{ fontSize: '16px' }}>
                    <EnvironmentOutlined /> {address}
                </p>


                <div style={{ fontSize: '16px', marginBottom: '20px', cursor: 'pointer' }}>
                    <ClockCircleOutlined />
                    <Tooltip
                        title={<div style={tooltipStyle} dangerouslySetInnerHTML={{ __html: openingHoursText }} />}
                        placement="topLeft"
                    >      Mở cửa hôm nay: {openingHoursToday.open} - {openingHoursToday.close}
                        <br />
                        {isOpen() ? 'Đang mở cửa' : 'Đã đóng cửa'}
                    </Tooltip>


                </div>

                <div style={{ marginBottom: '10px' }}>
                    <Rate disabled value={rating} />
                    <span style={{ marginLeft: '8px' }}>{rating}</span>
                </div>
                <p>
                    {description}
                </p>
            </Col>
        </Row>
    );
};

export default BakeryInfo;
