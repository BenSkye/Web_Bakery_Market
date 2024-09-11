import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Rate, Typography, Avatar, Button } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { IoStorefrontOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import BakeryInfo from './BakeryInfo';
import CustomizeCake from './CustomizeCake';
import TopSellingCakes from './TopSellingCakes';
import CakeFilter from './CakeFilter';
import OtherStores from './OtherStores';




const sampleCakeImage = 'path/to/cake-image.jpg'; // Replace with actual cake images

const allCakes = [
    { id: 1, name: "Bánh kem dâu", price: "100.000đ", type: "sweet", image: sampleCakeImage },
    { id: 2, name: "Bánh su kem", price: "50.000đ", type: "sweet", image: sampleCakeImage },
    { id: 3, name: "Bánh tart trứng", price: "60.000đ", type: "sweet", image: sampleCakeImage },
    { id: 4, name: "Bánh mì", price: "20.000đ", type: "bread", image: sampleCakeImage },
    { id: 5, name: "Bánh quy", price: "30.000đ", type: "cookie", image: sampleCakeImage },
    { id: 6, name: "Bánh donut", price: "40.000đ", type: "donut", image: sampleCakeImage },
    { id: 7, name: "Bánh pie", price: "70.000đ", type: "pie", image: sampleCakeImage },
];


const Detail: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [filteredCakes, setFilteredCakes] = useState(allCakes);

    const { scene } = useGLTF('/public/cake.glb');

    scene.scale.set(10, 10, 10); // Adjust the scale values as needed


    useEffect(() => {
        if (selectedFilter === 'all') {
            setFilteredCakes(allCakes);
        } else {
            setFilteredCakes(allCakes.filter(cake => cake.type === selectedFilter));
        }
    }, [selectedFilter]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0 },
    };

    const separatorStyle: React.CSSProperties = {
        border: '0',
        borderTop: '2px solid #e0e0e0',
        margin: '2rem 0',
    };

    const handleFilterChange = (filter: string) => {
        setSelectedFilter(filter);
    };

    return (
        <div style={{ padding: '2rem' }}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
            >
                <BakeryInfo />
                <hr style={separatorStyle} />
                <CustomizeCake />
                <hr style={separatorStyle} />
                {/* Cake Categories Section */}
                <TopSellingCakes />
                <hr style={separatorStyle} />
                {/* Filter Section */}
                <CakeFilter
                    selectedFilter={selectedFilter}
                    onFilterChange={handleFilterChange}
                    filteredCakes={filteredCakes}
                />
                <hr style={separatorStyle} />
                {/* Other Stores Section */}

                <OtherStores />
            </motion.div >
        </div >
    );
};

export default Detail;