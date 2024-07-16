// components/Header.tsx

import React from 'react';
import { Layout, Menu, Input, Button, Row, Col, Badge } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../assets/1.png'; // Đường dẫn đến file logo của bạn

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
    return (
        <Header style={{ background: 'linear-gradient(to left, rgba(253, 222, 222, 1), rgba(253, 222, 222, 0.1))', padding: '0 16px' }}>
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
                <Col span={16}>
                    <Row style={{ gap: '2rem' }} justify="end" align="middle">
                        <Menu mode="horizontal" defaultSelectedKeys={['home']} style={{ textAlign: 'center', backgroundColor: 'inherit' }}>
                            <Menu.Item key="home" >Trang chủ</Menu.Item>
                            <Menu.Item key="about" >Giới Thiệu</Menu.Item>
                            <Menu.Item key="store" >Cửa Hàng</Menu.Item>
                            <Menu.Item key="workshop" >Workshop</Menu.Item>
                        </Menu>
                        <Row align="middle">
                            <Col style={{ marginRight: '1rem' }}>
                                <Badge count={5} size="small">
                                    <Button type="text" icon={<ShoppingCartOutlined />} style={{ fontSize: '1.5rem' }} />
                                </Badge>
                            </Col>
                            <Col>
                                <Button type="text" icon={<UserOutlined />} style={{ fontSize: '1.5rem' }} />
                            </Col>
                        </Row>
                    </Row>
                </Col>
            </Row>
        </Header>
    );
};

export default HeaderComponent;
