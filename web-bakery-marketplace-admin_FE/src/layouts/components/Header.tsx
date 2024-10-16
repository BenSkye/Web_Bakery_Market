import React from 'react';
import { Layout, Menu, Input, Button, Row, Col, Badge, Dropdown } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import logo from '../../assets/1.png';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
    const userMenu = (
        <Menu>
            <Menu.Item key="login">
                <Link to='/login'>Login</Link>
            </Menu.Item>
            <Menu.Item key="signup">
                <Link to='/signup'>Sign Up</Link>
            </Menu.Item>
        </Menu>
    );

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
                                width: '300px', borderRadius: '10px',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                            }} />
                        </Col>
                    </Row>
                </Col>
                <Col span={16}>
                    <Row style={{ gap: '2rem' }} justify="end" align="middle" >
                        <Menu mode="horizontal" defaultSelectedKeys={['home']} style={{ textAlign: 'center', backgroundColor: 'inherit', fontSize: '20px' }}>
                            <Menu.Item key="home"><Link to='/'>Trang chủ</Link></Menu.Item>
                            <Menu.Item key="about"><Link to='/about'>Giới Thiệu</Link></Menu.Item>
                            <Menu.Item key="store"><Link to='/stores'>Cửa Hàng</Link></Menu.Item>
                            <Menu.Item key="workshop"><Link to='/workshop'>Workshop</Link></Menu.Item>
                        </Menu>
                        <Row align="middle">
                            <Col style={{ marginRight: '1rem' }}>
                                <Badge count={5} size="small">
                                    <Link to="/cart">
                                        <Button type="text" icon={<ShoppingCartOutlined />} style={{ fontSize: '1.5rem' }} />
                                    </Link>
                                </Badge>
                            </Col>
                            <Col>
                                <Dropdown overlay={userMenu} trigger={['click']}>
                                    <Button type="text" icon={<UserOutlined />} style={{ fontSize: '1.5rem' }} />
                                </Dropdown>
                            </Col>
                        </Row>
                    </Row>
                </Col>
            </Row>
        </Header>
    );
};

export default HeaderComponent;
