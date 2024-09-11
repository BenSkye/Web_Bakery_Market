import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import { motion } from 'framer-motion';
import DashboardCard from './Dashboard';
import RevenueChart from './RevenueChart';
import TopProductsTable from './TopProductsTable';
import UserList from './UserList';

const dashboardData = {
  cards: [
    { title: 'Total Revenue', value: '$25,000', icon: '💵' },
    { title: 'Total Orders', value: '1,200', icon: '📦' },
    { title: 'New Customers', value: '150', icon: '👥' },
    { title: 'Monthly Growth', value: '12%', icon: '📈' },
  ],
  tableData: [
    { key: '1', product: 'Cake', revenue: '$1,000', orders: '50' },
    { key: '2', product: 'Donut', revenue: '$500', orders: '30' },
    { key: '3', product: 'Cookie', revenue: '$750', orders: '40' },
    { key: '4', product: 'Bread', revenue: '$300', orders: '20' },
  ],
  chartData: [
    { date: '2024-01', value: 3000 },
    { date: '2024-02', value: 5000 },
    { date: '2024-03', value: 7000 },
    { date: '2024-04', value: 6000 },
    { date: '2024-05', value: 8000 },
  ],
  users: [
    { key: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { key: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { key: '3', name: 'Michael Brown', email: 'michael@example.com', role: 'Moderator' },
  ],
};

const HomePage: React.FC = () => {
  const [view, setView] = useState<'dashboard' | 'userList'>('dashboard');
  const { cards, tableData, chartData, users } = dashboardData;

  const columns = [
    { title: 'Product', dataIndex: 'product', key: 'product' },
    { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
    { title: 'Orders', dataIndex: 'orders', key: 'orders' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ padding: '2rem' }}
    >
      {/* Buttons to switch between views */}
      <Row gutter={16} style={{ marginBottom: '2rem' }}>
        <Col>
          <Button
            type={view === 'dashboard' ? 'primary' : 'default'}
            onClick={() => setView('dashboard')}
          >
            Dashboard
          </Button>
        </Col>
        <Col>
          <Button
            type={view === 'userList' ? 'primary' : 'default'}
            onClick={() => setView('userList')}
          >
            User List
          </Button>
        </Col>
      </Row>

      {/* Conditionally render based on the current view */}
      {view === 'dashboard' ? (
        <>
          <Row gutter={16}>
            {cards.map((card, index) => (
              <DashboardCard key={index} title={card.title} value={card.value} icon={card.icon} />
            ))}
          </Row>

          <Row gutter={16} style={{ marginTop: '2rem' }}>
            <Col span={24}>
              <RevenueChart chartData={chartData} />
            </Col>
            <Col span={24} style={{ marginTop: '2rem' }}>
              <TopProductsTable tableData={tableData} columns={columns} />
            </Col>
          </Row>
        </>
      ) : (
        <Row gutter={16} style={{ marginTop: '2rem' }}>
          <Col span={24}>
            <UserList users={users} />
          </Col>
        </Row>
      )}
    </motion.div>
  );
};

export default HomePage;
