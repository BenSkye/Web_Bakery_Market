import React, { useState } from 'react';
import { Table, InputNumber, Button, Typography, Space, Image } from 'antd';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate for navigation

// Define a type for cart items with an image URL
type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string; // New field for image URL
};

// Sample cart data with images
const initialCartItems: CartItem[] = [
    { id: 1, name: 'Cake A', price: 20, quantity: 1, imageUrl: 'https://brodardbakery.com/wp-content/uploads/2020/12/Duong-phen-Chocolate-2-2.png' },
    { id: 2, name: 'Cake B', price: 25, quantity: 2, imageUrl: 'https://brodardbakery.com/wp-content/uploads/2020/12/Duong-phen-Chocolate-2-2.png' },
];

const { Title } = Typography;

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const navigate = useNavigate(); // Hook for navigation

    // Function to handle quantity change
    const handleQuantityChange = (id: number, value: number | null) => {
        if (value !== null) {
            setCartItems(cartItems.map(item =>
                item.id === id ? { ...item, quantity: value } : item
            ));
        }
    };

    // Function to remove item from cart
    const handleRemoveItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    // Calculate total price
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Function to handle checkout
    const handleCheckout = () => {
        // Navigate to the checkout page
        navigate('/checkout');
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (url: string) => <Image src={url} width={100} />,
        },
        {
            title: 'Item',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text: number) => `$${text.toFixed(2)}`,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text: number, record: CartItem) => (
                <InputNumber
                    min={1}
                    value={text}
                    onChange={(value) => handleQuantityChange(record.id, value)}
                />
            ),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (_: any, record: CartItem) => `$${(record.price * record.quantity).toFixed(2)}`,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: CartItem) => (
                <Button type="primary" danger onClick={() => handleRemoveItem(record.id)}>
                    Remove
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Shopping Cart</Title>
            {cartItems.length === 0 ? (
                <Typography.Paragraph>Giỏ hàng trống</Typography.Paragraph>
            ) : (
                <>
                    <Table
                        dataSource={cartItems}
                        columns={columns}
                        rowKey="id"
                        pagination={false}
                        style={{ marginBottom: '24px' }}
                    />
                    <Space direction="vertical" size="large" style={{ float: 'right' }}>
                        <Title level={3}>Total Price: ${getTotalPrice().toFixed(2)}</Title>
                        <Link to="/checkout">
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleCheckout}
                                style={{ marginTop: '16px' }}
                            >
                                Thanh Toán
                            </Button>
                        </Link>
                    </Space>
                </>
            )}
        </div>
    );
};

export default CartPage;
