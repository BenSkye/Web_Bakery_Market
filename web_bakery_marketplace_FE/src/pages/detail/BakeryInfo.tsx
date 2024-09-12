// BakeryInfo.tsx
import React from 'react';
import { Avatar, Typography, Row, Col, Rate } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { IoStorefrontOutline } from "react-icons/io5";

const { Title } = Typography;

const BakeryInfo: React.FC = () => {
    const sampleAvatar = 'path/to/bakery-avatar.jpg'; // Replace with the actual path to the avatar image

    const avatarStyle: React.CSSProperties = {
        width: '500px',
        height: '100px',
        borderRadius: '10px',
        objectFit: 'cover',
    };

    return (
        <Row gutter={[16, 16]}>
            <Col span={6}>
                <Avatar shape="square" src={sampleAvatar} style={avatarStyle} />
            </Col>
            <Col span={18}>
                <Title level={2}>
                    Tiệm bánh ngọt ABC <IoStorefrontOutline style={{ marginLeft: '8px' }} />
                </Title>
                <p style={{ fontSize: '16px' }}>
                    <EnvironmentOutlined /> 123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh
                </p>
                <p style={{ fontSize: '16px' }}>
                    <ClockCircleOutlined /> Mở cửa: 08:00 AM - 08:00 PM
                </p>
                <div style={{ marginBottom: '10px' }}>
                    <Rate disabled value={4.5} />
                    <span style={{ marginLeft: '8px' }}>4.5</span>
                </div>
                <p>
                    Chúng tôi mang đến cho bạn những chiếc bánh ngọt tuyệt vời với hương vị phong phú và trang trí tinh tế.
                </p>
            </Col>
        </Row>
    );
};

export default BakeryInfo;
