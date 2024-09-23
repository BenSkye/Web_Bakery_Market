import React, { useState } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import {
    UserOutlined,
    BarChartOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    const handleOpenChange = (keys: string[]) => {
        setOpenKeys(keys);
    };

    return (
        <Header style={{ background: '#f0f2f5', padding: '0 16px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <Row justify="space-between" align="middle">
                <Col>
                    <h2 style={{ margin: 0, fontWeight: 'bold', color: '#ff7e67' }}>Admin Dashboard</h2>
                </Col>
            </Row>
            <Menu
                mode="inline"
                style={{ border: 'none', marginTop: '16px' }}
                openKeys={openKeys}
                onOpenChange={handleOpenChange}
            >
                <Menu.Item key="dashboard" icon={<UserOutlined />}>
                    <Link to='/admin/dashboard'>Tài khoản</Link>
                </Menu.Item>
                <Menu.SubMenu key="statistics" title="Thống kê" icon={<BarChartOutlined />}>
                    <Menu.Item key="stats-overview" icon={<BarChartOutlined />}>
                        <Link to='/statistics'>Tổng quan</Link>
                    </Menu.Item>
                    <Menu.Item key="stats-reports" icon={<BarChartOutlined />}>
                        <Link to='/statistics'>Báo cáo</Link>
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="bakeries" icon={<HomeOutlined />}>
                    <Link to='/'>Các tiệm</Link>
                </Menu.Item>
                <Menu.Item key="orders" icon={<ShoppingCartOutlined />}>
                    <Link to='manage'>Đơn hàng</Link>
                </Menu.Item>

                <Menu.Item key="settings-profile" icon={<SettingOutlined />}>
                    <Link to='/admin/settings/profile'>Cài đặt hồ sơ</Link>
                </Menu.Item>

            </Menu>
        </Header>
    );
};

export default HeaderComponent;
