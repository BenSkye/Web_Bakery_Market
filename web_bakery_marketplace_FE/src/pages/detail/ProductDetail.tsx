import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Image, Typography, Rate, InputNumber, Button } from 'antd';
import { getProductById } from '../../services/productService';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { CartContext } from '../../stores/cartContext';
const { Title, Text } = Typography;

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
    thumbnail: string;
    category: {
        _id: string;
        name: string;
    };
    bakery: {
        _id: string;
        name: string;
    };
    status: 'available' | 'draft' | 'sold_out' | 'discontinued';
    quantity: number;
    rating: number;
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [inventory, setInventory] = useState<any>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const { addToCart } = useContext(CartContext);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id || '');
                console.log('response', response.metadata)
                setProduct(response.metadata.product);
                setInventory(response.metadata.inventory);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);
    const handleAddToCart = () => {
        // Logic to add product to cart
        const productData = {
            product_id: id,
            quantity: quantity,
        }
        addToCart(productData);
        console.log(`Added ${quantity} of ${product?.name} to cart`);
    };
    const handleBuyNow = () => {
        // Logic to buy product immediately
        console.log(`Bought ${quantity} of ${product?.name}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <Card>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <div style={{ width: '100%', position: 'relative' }}>
                        <Image
                            src={selectedImage || product.thumbnail}
                            alt={product.name}
                            width='100%'
                            height='400px'
                            style={{ objectFit: 'cover', borderRadius: '10px' }}
                        />
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                            {product.image.map((image, index) => (
                                <div key={index} onClick={() => setSelectedImage(image)} style={{ margin: '5px' }}>
                                    <Image
                                        src={image}
                                        alt={`Product image ${index + 1}`}
                                        width={80}
                                        height={80}
                                        style={{ objectFit: 'cover', cursor: 'pointer', borderRadius: '10px' }}
                                        preview={false}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={12}  >
                    <div style={{ textAlign: 'left' }}>
                        <Title level={2}>{product.name}</Title>
                        <Text strong>Price: ${product.price.toFixed(2)}</Text>
                        <br />
                        <Rate disabled defaultValue={product.rating} />
                        <br />
                        <Text>Loại bánh: {product.category.name}</Text>
                        <br />
                        <Text>Tiệm Bánh: {product.bakery.name}</Text>
                        <br />
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                            <Text style={{ marginRight: '10px' }}>Số Lượng</Text>
                            <InputNumber
                                min={1}
                                max={inventory.stock - 1}
                                value={quantity}
                                onChange={(value) => setQuantity(value || 1)}
                                style={{ marginRight: '10px' }}
                            />
                            <Text>{inventory.stock} sản phẩm có sẵn</Text>
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <Button
                                type="default"
                                icon={<ShoppingCartOutlined />}
                                onClick={handleAddToCart}
                                style={{ marginRight: '10px', borderColor: '#f5b7b1', color: '#ec7063' }}
                            >
                                Thêm Vào Giỏ Hàng
                            </Button>
                            <Button type="primary" onClick={handleBuyNow} style={{ backgroundColor: 'red', borderColor: 'red' }}>
                                Mua Ngay
                            </Button>
                        </div>
                        <br />
                        <Title level={4}>Mô Tả sản phẩm</Title>
                        <Text>{product.description}</Text>
                    </div>
                </Col>
            </Row>
        </Card >
    );
};

export default ProductDetail;