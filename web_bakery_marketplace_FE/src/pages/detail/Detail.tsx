import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Typography, Spin, Button, Col, Row } from 'antd';
import { motion } from 'framer-motion';
import BakeryInfo from './BakeryInfo';
import CakeFilter from './CakeFilter';
import OtherStores from './OtherStores';
import { getBakeryById, Bakery } from '../../services/bakeriesService';
import { getProductsByBakery } from '../../services/productService';
import { getListCategory } from '../../services/categorService';
import Img3D from '../../assets/Cake.png'
import '../../styles/detailStyles/Detail.css'

const { Title } = Typography;

interface BakeryWithDetails extends Bakery {
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
}



const Detail: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState('Tất cả');
    const [filteredCakes, setFilteredCakes] = useState();
    const [listCake, setListCake] = useState();
    const [bakery, setBakery] = useState<BakeryWithDetails | null>(null);
    const [listFilter, setListFilter] = useState([]);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchBakery = async () => {
            if (id) {
                try {
                    const bakeryData = await getBakeryById(id);
                    console.log("Bakery detail", bakeryData.metadata);
                    setBakery(bakeryData.metadata);
                    const products = await getProductsByBakery(id);
                    console.log("Products", products);
                    setListCake(products.metadata);
                    const listCategory = await getListCategory();
                    console.log("List category", listCategory);
                    const categoryNames = listCategory.metadata.map((category: { name: string }) => ({ name: category.name }));
                    const allCategory = { name: 'Tất cả' };
                    categoryNames.unshift(allCategory);
                    setListFilter(categoryNames);
                } catch (error) {
                    console.error("Error fetching bakery data", error);
                }
            } else {
                console.error("Bakery ID is undefined");
            }
        };

        fetchBakery();
    }, [id]);

    useEffect(() => {
        if (selectedFilter === 'Tất cả') {
            setFilteredCakes(listCake);
        } else {
            setFilteredCakes(listCake?.filter((cake: any) => cake.category.name === selectedFilter));
        }
    }, [selectedFilter, listCake]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };



    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
    };

    if (!bakery) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="detail-page"
        >
            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <motion.div variants={itemVariants}>
                        <BakeryInfo bakery={bakery} />
                    </motion.div>
                </Col>

                <Col span={24}>
                    <motion.div variants={itemVariants} className="design-section">
                        <Card className="design-card card-hover"
                            style={{
                                position: 'relative',
                                overflow: 'hidden',
                                height: '100%',
                                borderRadius: '15px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                            }}>
                            <img
                                src={Img3D}
                                alt="Designer"
                                style={{
                                    width: 300,
                                    height: 300,
                                    alignItems: 'start',
                                    justifyContent: 'center',
                                    objectFit: 'cover',
                                    filter: 'brightness(80%)',
                                }}
                            />
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(10, 10, 0, 0.7))',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#fff',
                                    padding: '20px',
                                    textAlign: 'center',
                                }}
                            >
                                <Title level={2} style={{ color: '#fff', fontSize: '36px', textTransform: 'uppercase', marginBottom: '20px' }}>
                                    Thiết kế bánh 3D của bạn
                                </Title>
                                <p style={{ fontSize: '18px', maxWidth: '80%', marginBottom: '30px' }}>
                                    Hãy sáng tạo và thiết kế chiếc bánh hoàn hảo theo phong cách của bạn bằng công cụ thiết kế 3D trực tuyến.
                                </p>
                                <Link to={`/CakeDesigner/${bakery._id}`}>
                                    <Button
                                        className='button-hover'
                                        type="primary"
                                        style={{
                                            backgroundColor: '#ff4d4f',
                                            borderColor: '#ff4d4f',
                                            fontSize: '18px',
                                            padding: '12px 40px',
                                            height: 'auto',
                                            borderRadius: '30px',
                                            boxShadow: '0 2px 4px rgba(255,77,79,0.3)'
                                        }}
                                    >
                                        Thiết kế ngay
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    </motion.div>
                </Col>

                <Col span={24}>
                    <motion.div variants={itemVariants}>
                        <CakeFilter
                            selectedFilter={selectedFilter}
                            onFilterChange={handleFilterChange}
                            filteredCakes={filteredCakes || []}
                            listFilter={listFilter}
                        />
                    </motion.div>
                </Col>

                <Col span={24}>
                    <motion.div variants={itemVariants}>
                        <OtherStores bakeryId={bakery._id} />
                    </motion.div>
                </Col>
            </Row>
        </motion.div>
    );
};

export default Detail;
