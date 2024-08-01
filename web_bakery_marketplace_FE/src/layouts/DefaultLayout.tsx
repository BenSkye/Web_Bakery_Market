import React from 'react';
import { Layout } from 'antd';

import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';
import { Outlet } from 'react-router-dom';


const { Content } = Layout;

const layoutStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',

};

const contentStyle: React.CSSProperties = {
    flex: '1',
    background: 'linear-gradient(to left, rgba(253, 222, 222, 1), rgba(253, 222, 222, 0.1))',
    color: 'black',
    textAlign: 'center',
    padding: '24px',

};


const MainLayout: React.FC = () => {
    return (
        <Layout style={layoutStyle}>
            <HeaderComponent />
            <Content style={contentStyle}><Outlet /></Content>
            <FooterComponent />
        </Layout>
    );
};

export default MainLayout;
