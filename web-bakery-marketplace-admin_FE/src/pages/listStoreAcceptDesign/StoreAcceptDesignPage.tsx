import React, { useState, useEffect } from 'react';
import { Input, Menu, Dropdown, Rate, Tag, Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { animated, useSpring } from "@react-spring/web";
import StoreCard from '../../components/card/CardStore';
import { getBakeries, Bakery } from "../../services/bakeriesService";
import SpinLoading from '../../components/loading/SpinLoading';

const { Search } = Input;

const provinces = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ"];

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
                setBakeries(data);
            } catch (error) {
                console.error("Failed to fetch bakeries:", error);
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
        <Menu onClick={() => addFilter('Lượt đặt hàng', 'Nhiều nhất', 'orderCount')}>
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
        <div>
            <animated.h1 style={springPropsH1}>Chọn cửa hàng để thiết kế chiếc bánh cho riêng bạn</animated.h1>

            <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0' }}>
                {/* <Search
                    placeholder="Tên tiệm bánh"
                    onSearch={handleSearch}
                    style={{ marginRight: '0.5rem', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)', borderRadius: '5px', width: '200px', display: 'flex', flex: 'start' }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                /> */}
                <Dropdown overlay={filterMenu} trigger={['click']} placement="bottomLeft">
                    <Button icon={<FilterOutlined />}>
                        Bộ lọc
                    </Button>
                </Dropdown>

                <div >
                    {appliedFilters.map((filter, index) => (
                        <Tag
                            key={index}
                            closable
                            onClose={() => removeFilter(index)}
                            style={{ margin: '0.2rem' }}
                        >
                            {filter.label}: {filter.value}
                        </Tag>
                    ))}
                </div>
            </div>

            <div >
                {loading ? (
                    <SpinLoading />
                ) : (

                    <div className="grid-container">
                        {bakeries.map((bakery, index) => (
                            <div key={index} >
                                <StoreCard key={bakery.id} bakery={bakery} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListStoreAcceptDesignPage;
