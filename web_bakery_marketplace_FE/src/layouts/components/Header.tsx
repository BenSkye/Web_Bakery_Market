// components/Header.tsx

import React from 'react';
import { Layout, Menu, Input, Button, Row, Col, Badge } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../assets/1.png'; // Đường dẫn đến file logo của bạn
import { motion } from 'framer-motion';
import cake from '../../assets/384c76efd36e7480fcb3eb5fa0f8b3e2.jpg';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
    return (
        <Header style={{ position: 'relative', background: 'linear-gradient(to left, rgba(253, 222, 222, 1), rgba(253, 222, 222, 0.1))', padding: '0 16px' }}>
            <Row justify="space-between" align="middle">
                <Col span={8}>
                    <Row align="middle">
                        <Col style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={logo} alt="logo" style={{ width: 64, height: 64, marginRight: 16 }} />
                        </Col>
                        <Col style={{ display: 'flex', alignItems: 'center' }}>
                            <Input.Search placeholder="Tìm kiếm" style={{
                                width: '100%', borderRadius: 10,
                                boxShadow: '3px',
                            }} />
                        </Col>
                    </Row>
                </Col>
                <Col span={5}>
                    <motion.img
                        src={cake}
                        alt="cake"
                        style={{ width: 50, height: 50, position: 'absolute', top: 0, left: 0 }}
                        animate={{
                            x: ["0%", "100%", "100%", "0%", "0%"],
                            y: ["0%", "0%", "100%", "100%", "0%"]
                        }}
                        transition={{
                            duration: 0.2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </Col>
                <Col span={11}>
                    <Row style={{ gap: '2rem' }} justify="end" align="middle" >


                        <Menu mode="horizontal" defaultSelectedKeys={['home']} style={{ textAlign: 'center', backgroundColor: 'inherit' }}>
                            <Menu.Item key="home" ><Link to='/'>Trang chủ</Link></Menu.Item>
                            <Menu.Item key="about" ><Link to='/about'>Giới Thiệu</Link></Menu.Item>
                            <Menu.Item key="store" ><Link to='/stores'>Cửa Hàng</Link></Menu.Item>
                            <Menu.Item key="workshop" ><Link to='/workshop'></Link>Workshop</Menu.Item>
                        </Menu>
                        <Row align="middle">
                            <Col style={{ marginRight: '1rem' }}>
                                <Badge count={5} size="small">
                                    <Button type="text" icon={<ShoppingCartOutlined />} style={{ fontSize: '1.5rem' }} />
                                </Badge>
                            </Col>
                            <Col>
                                <Link to='/login'><Button type="text" icon={<UserOutlined />} style={{ fontSize: '1.5rem' }} /></Link>
                            </Col>
                        </Row>
                    </Row>
                </Col>
            </Row>
        </Header>
    );
};

export default HeaderComponent;
