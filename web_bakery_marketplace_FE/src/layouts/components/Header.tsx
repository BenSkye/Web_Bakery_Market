import React, { useContext } from 'react';
import { Layout, Menu, Button, Row, Col, Badge, Dropdown } from 'antd';
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined, ShareAltOutlined, SearchOutlined, HeartOutlined, HomeOutlined, InfoCircleOutlined, ShopOutlined, FundViewOutlined, QuestionCircleOutlined, ToolOutlined } from '@ant-design/icons';
import logo from '../../assets/logoNobackground.png';
import cakeIcon from '../../assets/pen_1324.png'
import { Link } from 'react-router-dom';
import { useAuth } from '../../stores/authContex';
import '../../styles/layoutSyles/headerComponent.css';
import { CartContext, CartContextType } from '../../stores/cartContext';

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
    const { user, logout } = useAuth();
    const { cart } = useContext(CartContext) as CartContextType;
    console.log('cart', cart)
    // Dropdown menu for user
    const userMenu = (
        <Menu>
            {user ? (
                <>
                    <Menu.Item key="profile">
                        <Link to='/profile'>Hồ sơ</Link>
                    </Menu.Item>
                    <Menu.Item key="order">
                        <Link to='/orderstatus'>Đơn Hàng</Link>
                    </Menu.Item>
                    <Menu.Item key="logout" onClick={logout}>
                        <LogoutOutlined /> Đăng xuất
                    </Menu.Item>
                </>
            ) : (
                <>
                    <Menu.Item key="login" >
                        <Link to='/login'>Đăng nhập</Link>
                    </Menu.Item>
                    <Menu.Item key="signup">
                        <Link to='/signup'>Đăng ký</Link>
                    </Menu.Item>
                </>
            )}
        </Menu>
    );

    return (
        <Header className="header-wrapper">
            <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                {/* Cụm bên trái - Menu */}
                <Col flex="1">
                    <Menu mode="horizontal" className="header-menu" style={{ border: 'none' }}>
                        <Menu.Item key="home" icon={<HomeOutlined />}>
                            <Link to='/'>Trang chủ</Link>
                        </Menu.Item>
                        <Menu.Item key="about" icon={<QuestionCircleOutlined />}>
                            <Link to='/about'>Giới Thiệu</Link>
                        </Menu.Item>
                        <Menu.Item key="store" icon={<ShopOutlined />}>
                            <Link to='/stores'>Cửa Hàng</Link>
                        </Menu.Item>
                        <Menu.Item key="workshop" icon={<ToolOutlined />}>
                            <Link to='/workshop'>Workshop</Link>
                        </Menu.Item>
                    </Menu>
                </Col>

                {/* Cụm giữa - Logo */}
                <Col flex="none" className="logo-section">
                    <img src={logo} alt="logo" className="header-logo" />
                    <img src={cakeIcon} alt="cake icon" className="cake-icon" />
                </Col>

                {/* Cụm bên phải - Tìm kiếm, Chia sẻ, Giỏ hàng, User */}
                <Col flex="1" style={{ textAlign: 'right' }}>
                    <Row gutter={[16, 16]} align="middle" justify="end">
                        <Col>
                            <Button type="text" icon={<SearchOutlined />} className="header-button" />
                        </Col>
                        <Col>
                            <Button type="text" icon={<HeartOutlined />} className="header-button" />
                        </Col>
                        <Col>
                            <Button type="text" icon={<ShareAltOutlined />} className="header-button" />
                        </Col>
                        {user && (
                            <Col>
                                <Badge count={cart?.cart_count_products} size="small">
                                    <Link to="/cart">
                                        <Button type="text" icon={<ShoppingCartOutlined />} className="header-button" />
                                    </Link>
                                </Badge>
                            </Col>
                        )}
                        <Col>
                            <Dropdown overlay={userMenu} trigger={['hover']} >
                                <Button type="text" className="header-user-button">
                                    {user ? `Xin chào, ${user.name}` : <UserOutlined />}
                                </Button>
                            </Dropdown>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Header>
    );
};

export default HeaderComponent;
