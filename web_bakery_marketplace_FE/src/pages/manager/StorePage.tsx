import React, { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { UserOutlined, ShopOutlined, FileDoneOutlined, BarChartOutlined, SettingOutlined, FormOutlined } from '@ant-design/icons';
import StoreInfo from './StoreInfo'; // Import StoreInfo component
import OrderManagement from './OrderManagement'; // Import OrderManagement component
import Analytics from './Analytics'; // Import Analytics component
import AccountSetting from './AccountSetting'; // Import AccountSetting component
import BakerySignupPage from './BakerySignupPage'; // Import BakerySignupPage component

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const StorePage: React.FC = () => {
    const [selectedMenu, setSelectedMenu] = useState<string>('1');

    const handleMenuClick = (e: any) => {
        setSelectedMenu(e.key);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={256} className="site-layout-background">
                <Menu
                    mode="inline"
                    selectedKeys={[selectedMenu]}
                    onClick={handleMenuClick}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="1" icon={<ShopOutlined />}>Store Info</Menu.Item>
                    <Menu.Item key="2" icon={<FileDoneOutlined />}>Order Management</Menu.Item>
                    <Menu.Item key="3" icon={<BarChartOutlined />}>Analytics</Menu.Item>
                    <Menu.Item key="4" icon={<SettingOutlined />}>Account Settings</Menu.Item>
                    <Menu.Item key="5" icon={<FormOutlined />}>Create Bakery</Menu.Item> {/* New Menu Item for Bakery Signup */}
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-background" style={{ padding: 0, backgroundColor: '#f3f3f3' }}>
                    <Title level={2} style={{ padding: '0 24px' }}>Store Management</Title>
                </Header>
                <Content style={{ padding: '24px', margin: 0 }}>
                    {selectedMenu === '1' && <StoreInfo />}
                    {selectedMenu === '2' && <OrderManagement />}
                    {selectedMenu === '3' && (
                        <div>
                            <Title level={3}>Analytics</Title>
                            <Analytics />
                        </div>
                    )}
                    {selectedMenu === '4' && (
                        <div>
                            <Title level={3}>Account Settings</Title>
                            <AccountSetting />
                        </div>
                    )}
                    {selectedMenu === '5' && (
                        <div>
                            <Title level={3}>Create a New Bakery</Title>
                            <BakerySignupPage />
                        </div>
                    )} {/* Render BakerySignupPage when 'Create Bakery' is selected */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default StorePage;
