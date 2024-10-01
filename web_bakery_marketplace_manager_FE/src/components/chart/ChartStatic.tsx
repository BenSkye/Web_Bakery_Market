import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, LabelList
} from 'recharts';

const storeData = [
    {
        name: 'Cửa Hàng A',
        sales: [
            { name: 'Tháng 1', amount: 4000 },
            { name: 'Tháng 2', amount: 3000 },
            { name: 'Tháng 3', amount: 2000 },
            { name: 'Tháng 4', amount: 2780 },
            { name: 'Tháng 5', amount: 1890 },
            { name: 'Tháng 6', amount: 2390 },
        ],
        orders: [
            { name: 'Tháng 1', count: 240 },
            { name: 'Tháng 2', count: 300 },
            { name: 'Tháng 3', count: 200 },
            { name: 'Tháng 4', count: 278 },
            { name: 'Tháng 5', count: 189 },
            { name: 'Tháng 6', count: 239 },
        ],
        customers: [
            { name: 'Tháng 1', count: 40 },
            { name: 'Tháng 2', count: 30 },
            { name: 'Tháng 3', count: 50 },
            { name: 'Tháng 4', count: 40 },
            { name: 'Tháng 5', count: 60 },
            { name: 'Tháng 6', count: 70 },
        ],
    },
    {
        name: 'Cửa Hàng B',
        sales: [
            { name: 'Tháng 1', amount: 5000 },
            { name: 'Tháng 2', amount: 4000 },
            { name: 'Tháng 3', amount: 3000 },
            { name: 'Tháng 4', amount: 3780 },
            { name: 'Tháng 5', amount: 2890 },
            { name: 'Tháng 6', amount: 3390 },
        ],
        orders: [
            { name: 'Tháng 1', count: 340 },
            { name: 'Tháng 2', count: 400 },
            { name: 'Tháng 3', count: 300 },
            { name: 'Tháng 4', count: 378 },
            { name: 'Tháng 5', count: 289 },
            { name: 'Tháng 6', count: 339 },
        ],
        customers: [
            { name: 'Tháng 1', count: 50 },
            { name: 'Tháng 2', count: 40 },
            { name: 'Tháng 3', count: 60 },
            { name: 'Tháng 4', count: 50 },
            { name: 'Tháng 5', count: 70 },
            { name: 'Tháng 6', count: 80 },
        ],
    },
];

const StatisticsPage: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Thống Kê Doanh Số Các Cửa Hàng</h2>
            {storeData.map((store) => (
                <div key={store.name} style={{ marginBottom: '40px' }}>
                    <h3 style={{ textAlign: 'center' }}>{store.name}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1, marginRight: '10px' }}>
                                <h4>Doanh Số</h4>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={store.sales}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="amount" stroke="#8884d8">
                                            <LabelList dataKey="amount" position="top" />
                                        </Line>
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{ flex: 1, marginLeft: '10px' }}>
                                <h4>Đơn Hàng</h4>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={store.orders}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="count" stroke="#ff7300">
                                            <LabelList dataKey="count" position="top" />
                                        </Line>
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1 }}>
                                <h4>Khách Hàng</h4>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={store.customers}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="count" stroke="#00c49f">
                                            <LabelList dataKey="count" position="top" />
                                        </Line>
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatisticsPage;
