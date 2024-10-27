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
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  .ant-card-cover {
    position: relative;
    img {
      height: 250px;
      width: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
      border-radius: 15px 15px 0 0;
    }
  }

  &:hover .ant-card-cover img {
    transform: scale(1.05);
  }

  .ant-card-body {
    padding: 20px;
    text-align: center;
  }

  .ant-card-meta-title {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
  }

  .price {
    font-size: 24px;
    color: #c2185b;
    font-weight: bold;
  }

  .currency {
    font-size: 16px;
    color: #666;
    margin-left: 5px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
  height: 45px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #c2185b;
  border: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a9154b;
    color: #fff;
  }

  svg {
    margin-right: 8px;
  }
`;

const CakeCard: React.FC<CakeCardProps> = ({ cake }) => {
  return (
    <StyledCard hoverable cover={<img src={cake.image[0]} alt={cake.name} />}>
      <Card.Meta
        title={cake.name}
        description={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text className="price">{formatCurrency(Number(cake.price))}</Text>
            <Text className="currency">VNĐ</Text>
          </div>
        }
      />
      <Link to={`/product/${cake._id}`}>
        <StyledButton>
          <ShoppingOutlined />
          Xem chi tiết
        </StyledButton>
      </Link>
    </StyledCard>
  );
};

export default CakeCard;
