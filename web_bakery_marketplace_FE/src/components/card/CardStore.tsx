import React from "react";
import { Link } from 'react-router-dom';
import { Card, Button, Rate, Tooltip, Tag } from "antd";
import styled from 'styled-components';
import { Bakery } from "../../services/bakeriesService";
import { truncateText } from '../../utils/truncate/TruncateText';
import NoImg from '../../assets/NoImg.jpg';
import { EnvironmentOutlined, ShopOutlined } from '@ant-design/icons';

interface StoreCardProps {
  bakery: Bakery;
  className?: string;
}

const StyledCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
   transition: transform 0.3s;
   transform: scale(1.05);
   box-shadow 0.3s;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .ant-card-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 16px;
  }
`;

const ImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;

  ${StyledCard}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const StoreName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1a1a1a;
`;

const StoreAddress = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

const StyledButton = styled(Button)`
  border-radius: 20px;
  font-weight: 600;
  height: 40px;
  font-size: 16px;
  padding: 0 24px;
`;

const StoreCard: React.FC<StoreCardProps> = ({ bakery, className }) => {
  const coverImage = bakery.image.length > 0 ? bakery.image[0] : NoImg;

  return (
    <Link to={`/detail/${bakery._id}`} className={className}>
      <StyledCard
        bordered={false}
        cover={
          <ImageContainer>
            <StyledImage alt={bakery.name} src={coverImage} />
          </ImageContainer>
        }
      >
        <CardContent>
          <Tooltip title={bakery.name} placement="topLeft">
            <StoreName>{truncateText(bakery.name, 35)}</StoreName>
          </Tooltip>
          <Tooltip title={bakery.address} placement="topLeft">
            <StoreAddress>
              <EnvironmentOutlined style={{ marginRight: 8 }} />
              {truncateText(bakery.address, 35)}
            </StoreAddress>
          </Tooltip>
          <RatingContainer>
            {bakery.rating >= 0 ? (
              <>
                <Rate disabled value={bakery.rating} style={{ fontSize: 16 }} />
                <span style={{ marginLeft: 8, fontSize: 16, color: '#faad14' }}>{bakery.rating.toFixed(1)}</span>
              </>
            ) : (
              <Tag color="default">Chưa có đánh giá</Tag>
            )}
          </RatingContainer>
          <ButtonContainer>
            <StyledButton type="primary" className='button-hover' icon={<ShopOutlined />}>
              Ghé tiệm
            </StyledButton>
          </ButtonContainer>
        </CardContent>
      </StyledCard>
    </Link>
  );
};

export default StoreCard;