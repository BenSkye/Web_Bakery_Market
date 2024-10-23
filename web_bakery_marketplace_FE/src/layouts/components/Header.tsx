import React, { useContext, useState } from 'react';
import { Layout, Menu, Button, Row, Col, Badge, Dropdown, Input, Modal, AutoComplete } from 'antd';
import { ShoppingCartOutlined, UserOutlined, LogoutOutlined, ShareAltOutlined, SearchOutlined, HeartOutlined, HomeOutlined, ShopOutlined, QuestionCircleOutlined, ToolOutlined, FacebookOutlined, TwitterOutlined, TikTokOutlined } from '@ant-design/icons';
import logo from '../../assets/logoNobackground.png';
import cakeIcon from '../../assets/pen_1324.png'
import { Link } from 'react-router-dom';
import { useAuth } from '../../stores/authContex';
import '../../styles/layoutSyles/headerComponent.css';
import { CartContext } from '../../stores/cartContext';
import { searchBakeries } from '../../services/bakeriesService';


const { Header } = Layout;

interface BakerySearchResult {
    image: any;
    _id: string;
    name: string;
    address: string;
}

const HeaderComponent: React.FC = () => {
    const { user, logout } = useAuth();
    const { cart } = useContext(CartContext) || { cart: undefined };

    const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
    const [searchOptions, setSearchOptions] = useState<BakerySearchResult[]>([]);
    const [isShareModalVisible, setIsShareModalVisible] = useState(false);


    const showSearchModal = () => {
        setIsSearchModalVisible(true);
    };

    const handleSearchCancel = () => {
        setIsSearchModalVisible(false);
    };

    const showShareModal = () => {
        setIsShareModalVisible(true);
    };

    const handleShareCancel = () => {
        setIsShareModalVisible(false);
    };


    const handleSearch = async (value: string) => {
        if (value.length > 2) {
            try {
                const response = await searchBakeries(value);
                console.log('response', response.metadata);
                setSearchOptions(response.metadata || []); // Ensure it's always an array
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchOptions([]); // Set to empty array on error
            }
        } else {
            setSearchOptions([]);
        }
    };

    const renderOption = (bakery: BakerySearchResult) => ({
        value: bakery._id,
        label: (
            <Link to={`/detail/${bakery._id}`} style={{ display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={bakery.image[0]} alt={bakery.name} style={{ width: 30, height: 30, marginRight: 10 }} />
                    <span>
                        <div>{bakery.name}</div>
                        <div style={{ fontSize: '0.8em', color: '#888' }}>{bakery.address}</div>
                    </span>
                </div>
            </Link>
        ),
    });

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
                            <Button type="text" icon={<SearchOutlined />} className="header-button" onClick={showSearchModal} />
                        </Col>
                        <Col>
                            <Button type="text" icon={<HeartOutlined />} className="header-button" />
                        </Col>
                        <Col>
                            <Button type="text" icon={<ShareAltOutlined />} className="header-button" onClick={showShareModal} />
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
            <Modal
                title="Tìm kiếm cửa hàng"
                visible={isSearchModalVisible}
                onCancel={handleSearchCancel}
                footer={null}
            >
                <AutoComplete
                    style={{ width: '100%' }}
                    onSearch={handleSearch}
                    placeholder="Nhập tên cửa hàng hoặc địa chỉ"
                    options={(searchOptions || []).map(renderOption)}
                >
                    <Input.Search size="large" />
                </AutoComplete>
            </Modal>
            <Modal
                title={<div style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>Chia sẻ</div>}
                visible={isShareModalVisible}
                onCancel={handleShareCancel}
                footer={null}
                width={400}
                bodyStyle={{ padding: '24px' }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <p style={{ fontSize: '16px', textAlign: 'center', marginBottom: '20px' }}>
                        Chia sẻ trang web của chúng tôi trên mạng xã hội!
                    </p>
                    <Button
                        type="primary"
                        className='button-hover'
                        icon={<FacebookOutlined />}
                        href="https://www.facebook.com/profile.php?id=61566189472699"
                        target="_blank"
                        style={{ width: '200px', height: '40px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        Facebook
                    </Button>
                    <Button
                        type="primary"
                        className='button-hover'
                        icon={<TikTokOutlined />}
                        href="https://www.tiktok.com/@your-account"
                        target="_blank"
                        style={{ width: '200px', height: '40px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000', borderColor: '#000000' }}
                    >
                        TikTok
                    </Button>
                </div>
            </Modal>
        </Header>
    );
};

export default HeaderComponent;
