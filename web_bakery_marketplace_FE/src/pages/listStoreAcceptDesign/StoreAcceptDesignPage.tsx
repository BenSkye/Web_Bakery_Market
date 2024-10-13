import React, { useState, useEffect } from 'react';
import { Input, Menu, Dropdown, Rate, Tag, Button, Layout, Typography, Space } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { animated, useSpring } from "@react-spring/web";
import styled from 'styled-components';
import StoreCard from '../../components/card/CardStore';
import { getBakeries, Bakery } from "../../services/bakeriesService";
import SpinLoading from '../../components/loading/SpinLoading';

const { Search } = Input;
const { Title } = Typography;
const { Content } = Layout;

const provinces = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ"];

// Styled components
const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background-color: transparent;
`;

const StyledContent = styled(Content)`
  max-width: 100%;
  margin: 0 auto;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;


const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const StyledStoreCard = styled(StoreCard)`
  width: 100%;
  height: 100%;
  max-height: 400px; // Hoặc bất kỳ giá trị nào bạn muốn
  max-width: 300px;
  display: flex;
  flex-direction: column;
`;

const ListStoreAcceptDesignPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [appliedFilters, setAppliedFilters] = useState<{ label: string, value: any, type: string }[]>([]);
    const [bakeries, setBakeries] = useState<Bakery[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBakeries = async () => {
            try {
                setLoading(true);
                const data = await getBakeries();

                if (Array.isArray(data.metadata)) {
                    setBakeries(data.metadata);
                } else {
                    console.error("Fetched data is not an array:", data.metadata);
                    setBakeries([]);
                }
            } catch (error) {
                console.error("Failed to fetch bakeries:", error);
                setBakeries([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBakeries();
    }, []);

    const springPropsH1 = useSpring({
        from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
        to: { opacity: 1, transform: "translate3d(0,0px,0)" },
        config: { tension: 200, friction: 15 },
        delay: 200,
    });

    const handleSearch = () => {
        console.log('Searching for:', searchQuery);
        // Implement search logic here
    };

    const addFilter = (label: string, value: any, type: string) => {
        setAppliedFilters([...appliedFilters, { label, value, type }]);
    };

    const removeFilter = (index: number) => {
        setAppliedFilters(appliedFilters.filter((_, i) => i !== index));
    };

    const ratingMenu = (
        <Menu onClick={(e) => addFilter('Điểm đánh giá', e.key, 'rating')}>
            {[1, 2, 3, 4, 5].map(star => (
                <Menu.Item key={star}>
                    <Rate disabled value={star} />
                    {` ${star} sao trở lên`}
                </Menu.Item>
            ))}
        </Menu>
    );

    const locationMenu = (
        <Menu onClick={(e) => addFilter('Địa điểm', e.key, 'location')}>
            {provinces.map(province => (
                <Menu.Item key={province}>
                    {province}
                </Menu.Item>
            ))}
        </Menu>
    );

    const orderCountMenu = (
        <Menu onClick={(e) => addFilter('Lượt đặt hàng', e.key, 'orderCount')}>
            <Menu.Item key="most">
                Nhiều nhất
            </Menu.Item>
            <Menu.Item key="least">
                Ít nhất
            </Menu.Item>
        </Menu>
    );

    const filterMenu = (
        <Menu>
            <Menu.SubMenu key="rating" title="Điểm đánh giá" popupOffset={[0, -5]}>
                {ratingMenu}
            </Menu.SubMenu>
            <Menu.SubMenu key="location" title="Địa điểm" popupOffset={[0, -5]}>
                {locationMenu}
            </Menu.SubMenu>
            <Menu.SubMenu key="orderCount" title="Lượt đặt hàng" popupOffset={[0, -5]}>
                {orderCountMenu}
            </Menu.SubMenu>
        </Menu>
    );

    return (
        <StyledLayout>
            <StyledContent>
                <animated.div style={springPropsH1}>
                    <Title level={2}>Chọn cửa hàng để thiết kế chiếc bánh cho riêng bạn</Title>
                </animated.div>

                <FilterContainer>
                    <Space>
                        <Search
                            placeholder="Tên tiệm bánh"
                            onSearch={handleSearch}
                            style={{ width: 250 }}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Dropdown overlay={filterMenu} trigger={['click']} placement="bottomLeft">
                            <Button icon={<FilterOutlined />}>
                                Bộ lọc
                            </Button>
                        </Dropdown>
                    </Space>

                    <TagContainer>
                        {appliedFilters.map((filter, index) => (
                            <Tag
                                key={index}
                                closable
                                onClose={() => removeFilter(index)}
                                color="blue"
                            >
                                {filter.label}: {filter.value}
                            </Tag>
                        ))}
                    </TagContainer>
                </FilterContainer>

                {loading ? (
                    <SpinLoading />
                ) : (
                    <GridContainer>
                        {bakeries.map((bakery) => (
                            <CardWrapper key={bakery.id}>
                                <StyledStoreCard bakery={bakery} />
                            </CardWrapper>
                        ))}
                    </GridContainer>
                )}
            </StyledContent>
        </StyledLayout>
    );
}

export default ListStoreAcceptDesignPage;