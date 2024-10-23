import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Input, Select, Slider, Typography, Space, Card, Button, Collapse } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { getBakeries, Bakery } from '../../services/bakeriesService';
import StoreCard from '../../components/card/CardStore';
import { ShopOutlined, StarOutlined, ShoppingOutlined, SearchOutlined, FilterOutlined, EnvironmentOutlined } from '@ant-design/icons';


const { Title, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const StoresPage: React.FC = () => {
    const [bakeries, setBakeries] = useState<Bakery[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [minRating, setMinRating] = useState(0);
    const [minOrders, setMinOrders] = useState(0);

    useEffect(() => {
        const fetchBakeries = async () => {
            try {
                const response = await getBakeries();
                setBakeries(response.metadata);
            } catch (error) {
                console.error('Error fetching bakeries:', error);
            }
        };

        fetchBakeries();
    }, []);

    const filteredBakeries = useMemo(() => {
        return bakeries.filter(bakery => bakery.rating >= minRating);
    }, [bakeries, minRating]);

    const cities = useMemo(() =>
        [...new Set(bakeries.map((b: any) => b.city))],
        [bakeries]
    );

    const containerStyle: React.CSSProperties = {
        padding: '28px',
        minHeight: '100vh',
        backgroundColor: 'transparent',
    };

    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        marginBottom: '40px',
    };

    const searchFilterStyle: React.CSSProperties = {
        marginBottom: '32px',
        backgroundColor: 'Background',
        padding: '0px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    };

    const searchStyle: React.CSSProperties = {
        width: '100%',
        maxWidth: '300px',
    };

    const infoSectionStyle: React.CSSProperties = {
        marginTop: '40px',
        padding: '32px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    };

    return (
        <div style={containerStyle}>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Title level={1} style={headerStyle}>
                    <ShopOutlined style={{ marginRight: '12px' }} />
                    Khám Phá Các Cửa Hàng Của Chúng Tôi
                </Title>
            </motion.div>

            <Card style={searchFilterStyle}>
                <Row gutter={[24, 24]} align="middle">
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Input.Search
                            placeholder="Tìm kiếm cửa hàng"
                            onSearch={value => setSearchTerm(value)}
                            size="large"
                            prefix={<SearchOutlined />}
                            style={searchStyle}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={16} lg={18}>
                        <Collapse
                            expandIconPosition="right"
                            expandIcon={({ isActive }) => <FilterOutlined rotate={isActive ? 90 : 0} />}
                            ghost
                        >
                            <Panel header={<span style={{ fontWeight: 'bold', fontSize: '16px' }}><FilterOutlined /> Bộ lọc tìm kiếm</span>} key="1">
                                <Space direction="vertical" style={{ width: '100%' }} size="large">
                                    <Row gutter={[24, 24]}>
                                        <Col xs={24} md={8}>
                                            <Title level={5}>
                                                <EnvironmentOutlined style={{ marginRight: '8px' }} />
                                                Chọn thành phố
                                            </Title>
                                            <Select
                                                placeholder="Chọn thành phố"
                                                allowClear
                                                onChange={value => setSelectedCity(value)}
                                                style={{ width: '100%' }}
                                                size="large"
                                            >
                                                {cities.map(city => (
                                                    <Option key={city} value={city}>{city}</Option>
                                                ))}
                                            </Select>
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Title level={5}>
                                                <StarOutlined style={{ marginRight: '8px' }} />
                                                Đánh giá tối thiểu
                                            </Title>
                                            <Slider
                                                min={0}
                                                max={5}
                                                step={0.5}
                                                onChange={value => setMinRating(value)}
                                                value={minRating}
                                                marks={{
                                                    0: '0',
                                                    2.5: '2.5',
                                                    5: '5'
                                                }}
                                                tooltip={{ formatter: value => `${value} sao` }}
                                            />
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Title level={5}>
                                                <ShoppingOutlined style={{ marginRight: '8px' }} />
                                                Số lượt đặt hàng tối thiểu
                                            </Title>
                                            <Slider
                                                min={0}
                                                max={1000}
                                                onChange={value => setMinOrders(value)}
                                                value={minOrders}
                                                marks={{
                                                    0: '0',
                                                    500: '500',
                                                    1000: '1000'
                                                }}
                                                tooltip={{ formatter: value => `${value} đơn` }}
                                            />
                                        </Col>
                                    </Row>
                                    <Button type="primary" size="large" block onClick={() => {/* Thêm logic áp dụng filter ở đây */ }}>
                                        Áp dụng bộ lọc
                                    </Button>
                                </Space>
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>
            </Card>

            <AnimatePresence>
                <Row gutter={[24, 24]} justify="start">
                    {filteredBakeries.map((bakery, index) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={bakery._id}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <StoreCard bakery={bakery} />
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={infoSectionStyle}
            >
                <Title level={2}>Tìm Hiểu Thêm Về Các Cửa Hàng Của Chúng Tôi</Title>
                <Paragraph>
                    Các cửa hàng của chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất. Từ những sản phẩm chất lượng cao đến dịch vụ khách hàng tuyệt vời, chúng tôi đảm bảo rằng mỗi lần ghé thăm của bạn sẽ là một kỷ niệm đáng nhớ. Hãy khám phá các cửa hàng của chúng tôi để tìm thấy những sản phẩm phù hợp với nhu cầu của bạn.
                </Paragraph>
            </motion.div>
        </div>
    );
};

export default StoresPage;