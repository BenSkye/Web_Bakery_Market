import React from 'react';
import { Card, Table } from 'antd';

interface TopProductsTableProps {
    tableData: Array<{ key: string; product: string; revenue: string; orders: string }>;
    columns: Array<{ title: string; dataIndex: string; key: string }>;
}

const TopProductsTable: React.FC<TopProductsTableProps> = ({ tableData, columns }) => (
    <Card title="Top Products">
        <Table
            dataSource={tableData}
            columns={columns}
            pagination={false}
        />
    </Card>
);

export default TopProductsTable;
