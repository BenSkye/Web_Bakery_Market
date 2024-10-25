// components/StatusTabs.tsx
import React from 'react';
import { Tabs } from 'antd';
import OrderTable from '../table/OrderTable';

const { TabPane } = Tabs;
interface Order {
    id: string;
    status: string;
}

interface StatusTabsProps {
    orders: Order[];
    searchText: string;
    isCustom: boolean;
    showOrderDetail: (order: Order) => void;
    showConfirmModal: (orderId: string, newStatus: string) => void;
}

const StatusTabs: React.FC<StatusTabsProps> = ({ orders, searchText, isCustom, showOrderDetail, showConfirmModal }) => {
    const statuses = ['All', 'Pending', 'Processing', 'Success', 'Confirmed', 'Rejected', 'Shipping', 'Delivered', 'Canceled'];

    return (
        <Tabs defaultActiveKey="all">
            {statuses.map(status => (
                <TabPane tab={status} key={status.toLowerCase()}>
                    <OrderTable
                        orders={orders}
                        searchText={searchText}
                        isCustom={isCustom}
                        status={status.toLowerCase() === 'all' ? null : status.toLowerCase()}
                        showOrderDetail={showOrderDetail}
                        showConfirmModal={showConfirmModal}
                    />
                </TabPane>
            ))}
        </Tabs>
    );
};

export default StatusTabs;
