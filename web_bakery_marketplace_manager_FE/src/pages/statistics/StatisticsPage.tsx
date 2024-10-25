import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, LabelList,
    BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { getBakeryByUserId } from '../../services/bakeriesService';
import { getOrderProductStatisticsByBakeryId } from '../../services/ordersProductService';
import { useAuth } from '../../stores/authContex';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

interface Bakery {
    _id: string;
    name: string;
}

interface DateRangeValue {
    [index: number]: dayjs.Dayjs;
}

interface Statistics {
    dailyStats: Array<{
        date: string;
        totalRevenue: number;
        totalOrders: number;
        uniqueCustomers: number;
    }>;
    topProducts: Array<{
        _id: string | null;
        productName: string;
        totalSold: number;
        totalRevenue: number;
    }>;

    orderStatusStats: Array<{
        _id: string;
        count: number;
    }>;
    overallStats: Array<{
        totalRevenue: number;
        totalOrders: number;
        averageOrderValue: number;
        uniqueCustomers: number;
    }>;
}

const { RangePicker } = DatePicker;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const StatisticsPage: React.FC = () => {
    const { user } = useAuth();
    const [bakeries, setBakeries] = useState<Bakery[]>([]);
    const [statistics, setStatistics] = useState<{ [key: string]: Statistics }>({});
    const [dateRange, setDateRange] = useState<[Date, Date]>(() => {
        const end = new Date();
        const start = new Date(end);
        start.setMonth(start.getMonth() - 5);
        return [start, end];
    });

    useEffect(() => {
        const fetchData = async () => {
            if (user?.userId) {
                try {
                    const response = await getBakeryByUserId(user.userId);
                    const bakeriesData = response.metadata;
                    console.log('bakeriesData:', bakeriesData);

                    if (!Array.isArray(bakeriesData)) {
                        console.error('bakeriesData is not an array:', bakeriesData);
                        setBakeries([]);
                        return;
                    }

                    setBakeries(bakeriesData);

                    const [startDate, endDate] = dateRange;

                    const statsPromises = bakeriesData.map(bakery =>
                        getOrderProductStatisticsByBakeryId(
                            bakery._id,
                            startDate.toISOString().split('T')[0],
                            endDate.toISOString().split('T')[0]
                        )
                    );
                    console.log('statsPromises:', statsPromises);

                    const allStats = await Promise.all(statsPromises);
                    console.log('allStats:', allStats);

                    const statsObject = bakeriesData.reduce((acc, bakery, index) => {
                        acc[bakery._id] = allStats[index].metadata[0];
                        return acc;
                    }, {} as { [key: string]: Statistics });

                    console.log('statsObject:', statsObject);
                    setStatistics(statsObject);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchData();
    }, [user, dateRange]);

    const formatData = (data: Statistics) => {
        if (!data) {
            console.error('Invalid data format:', data);
            return {
                sales: [],
                orders: [],
                customers: [],
                topProducts: [],
                orderStatusStats: [],
                overallStats: {}
            };
        }

        const dailyStats = data.dailyStats.map(item => ({
            name: item.date,
            amount: item.totalRevenue,
            orders: item.totalOrders,
            customers: item.uniqueCustomers
        }));

        const topProducts = data.topProducts.map(product => ({
            productName: product.productName || 'Unknown',  // Use the productName from the API
            totalSold: product.totalSold,
            totalRevenue: product.totalRevenue
        }));

        return {
            sales: dailyStats,
            orders: dailyStats,
            customers: dailyStats,
            topProducts: topProducts,
            orderStatusStats: data.orderStatusStats,
            overallStats: data.overallStats[0]
        };
    };


    const handleDateRangeChange = (dates: DateRangeValue | null, dateStrings: [string, string]) => {
        if (dates) {
            setDateRange([new Date(dateStrings[0]), new Date(dateStrings[1])]);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Thống Kê Doanh Số Các Cửa Hàng</h2>
            <div style={{ marginBottom: '20px', textAlign: 'end' }}>
                <RangePicker
                    onChange={handleDateRangeChange}
                    defaultValue={[dayjs(dateRange[0]), dayjs(dateRange[1])]}
                    format="YYYY-MM-DD"
                />
            </div>
            {bakeries.map(bakery => {
                const formattedData = formatData(statistics[bakery._id]);
                return (
                    <div key={bakery._id} style={{ marginBottom: '40px' }}>
                        <h3 style={{ textAlign: 'center' }}>{bakery.name}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ flex: 1, marginRight: '10px' }}>
                                    <h4>Doanh Số</h4>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={formattedData.sales}>
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
                                        <LineChart data={formattedData.orders}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="orders" stroke="#ff7300">
                                                <LabelList dataKey="orders" position="top" />
                                            </Line>
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ flex: 1 }}>
                                    <h4>Khách Hàng</h4>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={formattedData.customers}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="customers" stroke="#00c49f">
                                                <LabelList dataKey="customers" position="top" />
                                            </Line>
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1, marginRight: '10px' }}>
                                <h4>Top 5 Sản Phẩm Bán Chạy</h4>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={formattedData.topProducts}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="productName" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="totalSold" fill="#8884d8">
                                            <LabelList dataKey="totalSold" position="top" />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{ flex: 1, marginLeft: '10px' }}>
                                <h4>Trạng Thái Đơn Hàng</h4>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={formattedData.orderStatusStats}
                                            dataKey="count"
                                            nameKey="_id"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            fill="#8884d8"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {formattedData.orderStatusStats.map((_entry, index: number) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div>
                            {/* <h4>Thống Kê Tổng Quan</h4> */}
                            {/* <p>Tổng Doanh Thu: {formattedData.overallStats.totalRevenue.toLocaleString()} VND</p> */}
                            {/* <p>Tổng Số Đơn Hàng: {formattedData.overallStats.totalOrders}</p> */}
                            {/* <p>Giá Trị Đơn Hàng Trung Bình: {formattedData.overallStats.averageOrderValue.toLocaleString()} VND</p> */}
                            {/* <p>Số Lượng Khách Hàng Duy Nhất: {formattedData.overallStats.uniqueCustomers}</p> */}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatisticsPage;