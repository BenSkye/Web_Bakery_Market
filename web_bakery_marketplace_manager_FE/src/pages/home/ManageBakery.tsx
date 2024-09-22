import React from 'react';
import { Layout, Menu, Table, Typography } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

const ManageBakery = () => {
    // Dữ liệu mẫu cho sản phẩm, đơn hàng và khách hàng
    const productData = [
        { key: '1', name: 'Sản phẩm 1', price: '100.000 VNĐ' },
        { key: '2', name: 'Sản phẩm 2', price: '200.000 VNĐ' },
    ];

    const orderData = [
        { key: '1', orderId: '001', customer: 'Nguyễn Văn A', total: '300.000 VNĐ' },
        { key: '2', orderId: '002', customer: 'Trần Thị B', total: '500.000 VNĐ' },
    ];

    const customerData = [
        { key: '1', name: 'Nguyễn Văn A', email: 'a@gmail.com', phone: '0123456789' },
        { key: '2', name: 'Trần Thị B', email: 'b@gmail.com', phone: '0987654321' },
    ];

    // Cấu hình các cột cho bảng
    const productColumns = [
        { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
        { title: 'Giá', dataIndex: 'price', key: 'price' },
    ];

    const orderColumns = [
        { title: 'Mã đơn hàng', dataIndex: 'orderId', key: 'orderId' },
        { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
        { title: 'Tổng giá', dataIndex: 'total', key: 'total' },
    ];

    const customerColumns = [
        { title: 'Tên khách hàng', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    ];

    return (
        <Layout>
            <Header>
                <div className="logo" style={{ color: 'white', fontSize: '24px' }}>
                    Quản lý Shop
                </div>
                <Menu theme="dark" mode="horizontal" />
            </Header>
            <Content style={{ padding: '20px' }}>
                <Title level={2}>Danh sách sản phẩm</Title>
                <Table columns={productColumns} dataSource={productData} pagination={false} />

                <Title level={2}>Danh sách đơn hàng</Title>
                <Table columns={orderColumns} dataSource={orderData} pagination={false} />

                <Title level={2}>Danh sách khách hàng</Title>
                <Table columns={customerColumns} dataSource={customerData} pagination={false} />
            </Content>
        </Layout>
    );
};

export default ManageBakery;
