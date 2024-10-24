import React from 'react';
import { Layout, Button, Dropdown, Menu } from 'antd';
import { UserOutlined, BellOutlined, DownOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.png'
import imgFun from '../../assets/asset-13-16837926873.png'
import { useAuth } from '../../stores/authContex';

const { Header } = Layout;

const UserHeader: React.FC = () => {
    const { user, logout } = useAuth();

    // console.log('====================================');
    // console.log('user', user);
    // console.log('====================================');

    const handleLanguageChange = (lang: string) => {
        // Xử lý thay đổi ngôn ngữ
        console.log(`Đổi ngôn ngữ sang ${lang}`);
    };



    const menu = (
        <Menu>
            <Menu.Item onClick={() => handleLanguageChange('Tiếng Việt')}>
                Tiếng Việt
            </Menu.Item>
            <Menu.Item onClick={() => handleLanguageChange('English')}>
                English
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={logout}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <Header style={{ background: 'white', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="Logo" style={{ height: '80px', marginRight: '10px' }} />
                <span className="curvy-text">Merci<img src={imgFun} style={{ height: '40px', marginRight: '10px' }}></img> </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button shape="circle" icon={<BellOutlined />} style={{ marginRight: '16px' }} />
                <Dropdown overlay={menu} trigger={['click']}>
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <UserOutlined sizes='large' />
                        {user ? <span style={{ marginLeft: '10px' }}>Xin chào, {user.name}, {user.roles} </span> : <UserOutlined />}
                        <DownOutlined style={{ marginLeft: '5px' }} />
                    </div>
                </Dropdown>
            </div>
        </Header>
    );
};

export default UserHeader;
