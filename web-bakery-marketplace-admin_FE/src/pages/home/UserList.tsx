import React from 'react';
import { Card, Table } from 'antd';

interface User {
    key: string;
    name: string;
    email: string;
    role: string;
}

interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Role', dataIndex: 'role', key: 'role' },
    ];

    return (
        <Card title="User List">
            <Table dataSource={users} columns={columns} pagination={false} />
        </Card>
    );
};

export default UserList;
