import React from 'react';
import { Card, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatCurrency } from '../../utils/currency/formatCurrency';
import { ShoppingOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface CakeCardProps {
    cake: {
        _id: string;
        id: string;
        name: string;
        price: string;
        image: string[];
    };
}

const StyledCard = styled(Card)`
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: #fff;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .ant-card-cover img {
    height: 250px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover .ant-card-cover img {
    transform: scale(1.05);
  }

  .ant-card-body {
    padding: 16px;
  }

  .ant-card-meta-title {
    font-size: 18px;
    margin-bottom: 8px;
    color: #333;
  }

  .price {
    font-size: 20px;
    color: #c2185b;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  .currency {
    font-size: 16px; // Kích thước nhỏ hơn cho chữ "VNĐ"
    color: #666;     // Màu sắc nhẹ hơn cho chữ "VNĐ"
    margin-left: 5px; // Khoảng cách giữa giá và VNĐ
  }

  &:hover .ant-card-meta-title {
    color: #c2185b;
  }
`;

const ViewDetailButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
  height: 45px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: #f06292;
    border-color: #f06292;
  }
`;

const CakeCard: React.FC<CakeCardProps> = ({ cake }) => {
    return (
        <StyledCard
            hoverable
            cover={<img src={cake.image[0]} alt={cake.name} />}
        >
            <Card.Meta
                title={cake.name}
                description={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text className="price">
                            {`${formatCurrency(Number(cake.price))}`}
                        </Text>
                        <Text className="currency">VNĐ</Text>
                    </div>
                }
            />
            <Link to={`/product/${cake._id}`}>
                <ViewDetailButton type="primary" className='button-hover'>
                    <ShoppingOutlined />
                    Xem chi tiết
                </ViewDetailButton>
            </Link>
        </StyledCard>
    );
};

export default CakeCard;
