import React, { useState, useEffect } from 'react';
import { Tabs, Table, Tag } from 'antd';
import { getUsersByRole } from '../../services/userService';

interface User {
    _id: string;
    name: string;
    email: string;
    status: string;
    roles: string[];
    createdAt: string;
}

const { TabPane } = Tabs;

const ManageUser: React.FC = () => {
    const [memberUsers, setMemberUsers] = useState<User[]>([]);
    const [shopUsers, setShopUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUsers = async (role: string) => {
        setLoading(true);
        try {
            const response = await getUsersByRole(role);
            if (response.status === 200) {
                return response.metadata;
            }
            return [];
        } catch (error) {
            console.error(`Error fetching ${role} users:`, error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadUsers = async () => {
            const members = await fetchUsers('member');
            const shops = await fetchUsers('shop');
            setMemberUsers(members);
            setShopUsers(shops);
        };
        loadUsers();
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'active' ? 'green' : 'red'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
    ];

    return (
        <div>
            <h1>Quản lí người dùng</h1>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Member Users" key="1">
                    <Table
                        columns={columns}
                        dataSource={memberUsers}
                        rowKey="_id"
                        loading={loading}
                    />
                </TabPane>
                <TabPane tab="Shop Users" key="2">
                    <Table
                        columns={columns}
                        dataSource={shopUsers}
                        rowKey="_id"
                        loading={loading}
                    />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default ManageUser;