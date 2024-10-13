import React, { useContext, useEffect, useState } from 'react';
import { Table, InputNumber, Button, Typography, Space, Image, Card, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../stores/cartContext';
import { convertToVND } from '../../utils';
import { DeleteOutlined, ShoppingCartOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Cart: React.FC = () => {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setCartItems(cart?.cart_products || []);
    }, [cart]);

    const handleQuantityChange = (id: number, value: number | null) => {
        if (value !== null) {
            let productData: any = null;
            setCartItems(prevItems => prevItems.map(item => {
                if (item?._id === id) {
                    productData = item?.product_id;
                    return { ...item, quantity: value };
                }
                return item;
            }));
            addToCart({
                product_id: productData?._id,
                quantity: value,
            });
        }
    };

    const handleRemoveItem = (id: number) => {
        let productData: any = null;
        cartItems.forEach(item => {
            if (item._id === id) {
                productData = item.product_id;
            }
        });
        setCartItems(cartItems.filter(item => item._id !== id));
        removeFromCart(productData._id);
    };

    const getTotalPrice = () => {
        if (cartItems) {
            return cartItems?.reduce((total, item) => {
                const price = item?.product_id?.price || 0;
                return total + price * (item?.quantity || 0);
            }, 0);
        }
        return 0;
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'product_id',
            key: 'product',
            render: (product_id: any) => (
                <Space>
                    <Image
                        src={product_id?.thumbnail}
                        width={80}
                        height={80}
                        style={{ objectFit: 'cover' }}
                        preview={false}
                    />
                    <span>{product_id?.name}</span>
                </Space>
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'product_id',
            key: 'price',
            render: (product_id: any) => `${convertToVND(product_id?.price)}`,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text: number, record: any) => (
                <Space>
                    <Button
                        icon={<MinusOutlined />}
                        onClick={() => handleQuantityChange(record?._id, Math.max(1, text - 1))}
                    />
                    <InputNumber
                        min={1}
                        value={text}
                        onChange={(value) => handleQuantityChange(record?._id, value)}
                        style={{ width: '50px' }}
                    />
                    <Button
                        icon={<PlusOutlined />}
                        onClick={() => handleQuantityChange(record?._id, text + 1)}
                    />
                </Space>
            ),
        },
        {
            title: 'Tổng',
            dataIndex: 'total',
            key: 'total',
            render: (_: any, record: any) => `${convertToVND(record?.product_id?.price * record?.quantity)}`,
        },
        {
            title: '',
            key: 'actions',
            render: (_: any, record: any) => (
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveItem(record._id)}
                >
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <Card
            title={<Title level={2}><ShoppingCartOutlined /> Giỏ hàng của bạn</Title>}
            style={{ margin: '24px' }}
        >
            {cartItems.length > 0 ? (
                <>
                    <Table
                        dataSource={cartItems}
                        columns={columns}
                        pagination={false}
                        style={{ marginBottom: '24px' }}
                        rowKey="_id"
                    />
                    <Space direction="vertical" size="large" style={{ float: 'right' }}>
                        <Title level={3}>Tổng tiền: {convertToVND(getTotalPrice())}</Title>
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleCheckout}
                            icon={<ShoppingCartOutlined />}
                        >
                            Thanh Toán
                        </Button>
                    </Space>
                </>
            ) : (
                <Empty
                    description="Giỏ hàng của bạn đang trống"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            )}
        </Card>
    );
};

export default Cart;