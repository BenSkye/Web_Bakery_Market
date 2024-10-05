import React, { useContext, useEffect, useState } from 'react';
import { Table, InputNumber, Button, Typography, Space, Image } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { CartContext } from '../../stores/cartContext';
import { convertToVND } from '../../utils';



const { Title } = Typography;

const CartPage: React.FC = () => {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCartData = async () => {
            console.log('cart18', cart)
            console.log('cartItems', cartItems);
            const cart_products = cart?.cart_products;
            setCartItems(cart_products);
        };
        fetchCartData();
    }, []);

    // Function to handle quantity change
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
            })

        }
    };

    // Function to remove item from cart
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

    // Calculate total price
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
            title: 'Hình ảnh',
            dataIndex: 'product_id',
            key: 'thumbnail',
            render: (product_id: any) => (
                <div style={{
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}>
                    <Image
                        src={product_id?.thumbnail}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'product_id',
            key: 'name',
            render: (product_id: any) => <p>{product_id?.name}</p>,
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
                <InputNumber
                    min={1}
                    value={text}
                    onChange={(value) => handleQuantityChange(record?._id, value)}
                />
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
                <Button type="primary" danger onClick={() => handleRemoveItem(record._id)}>
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Giỏ hàng của bạn</Title>

            <Table
                dataSource={cartItems}
                columns={columns}
                // rowKey="id"
                pagination={false}
                style={{ marginBottom: '24px' }}
            />
            <Space direction="vertical" size="large" style={{ float: 'right' }}>
                <Title level={3}>Tổng tiền: {convertToVND(getTotalPrice())}</Title>
                <Button
                    type="primary"
                    size="large"
                    onClick={handleCheckout}
                    style={{ marginTop: '16px' }}
                >
                    Thanh Toán
                </Button>
            </Space>

        </div>
    );
};

export default CartPage;
