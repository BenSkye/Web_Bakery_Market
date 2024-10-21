import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Input, Tag, Image, Tooltip, Modal, Card, Row, Col, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { getProductsByBakery } from '../../services/productService';

import AddProductModal from '../../components/modal/AddProductModal';
import UpdateProductModal from '../../components/modal/UpdateProductModal';
import { formatCurrency } from '../../utils/format/formatCurrency';

interface Product {
    _id: string;
    name: string;
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
    quantity: number;
    status: string;
    rating: number;
}

const { Search } = Input;
const { Title } = Typography;

interface ManageProductsProps {
    bakeryId: string;
}

const ManageProducts: React.FC<ManageProductsProps> = ({ bakeryId }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        const response = await getProductsByBakery(bakeryId);
        console.log('====================================');
        console.log('products:', response.metadata);
        console.log('====================================');
        setProducts(response.metadata);
        setLoading(false);
    };



    useEffect(() => {
        fetchProducts();
    }, [bakeryId]);

    const showAddModal = () => {
        setIsAddModalVisible(true);
    };

    const handleAddSuccess = () => {
        setIsAddModalVisible(false);
        fetchProducts();
    };

    const handleSearch = (value: string) => {
        setSearchText(value);
    };



    const handleDelete = (record: Product) => {
        // Implement delete functionality
        console.log('Delete product:', record);
    };

    const handleEdit = (record: Product) => {
        setSelectedProductId(record._id);
        setIsUpdateModalVisible(true);
    };

    const handleUpdateSuccess = () => {
        setIsUpdateModalVisible(false);
        fetchProducts();
    };

    const handleViewImages = (images: string[]) => {
        Modal.info({
            title: 'Product Images',
            content: (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {images.map((img, index) => (
                        <Image
                            key={index}
                            src={img}
                            alt={`Product image ${index + 1}`}
                            style={{ width: 200, height: 200, objectFit: 'cover', margin: 8 }}
                        />
                    ))}
                </div>
            ),
            width: 800,
        });
    };

    const columns: ColumnsType<Product> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            filteredValue: [searchText],
            onFilter: (value, record) =>
                record.name.toLowerCase().includes(value.toString().toLowerCase()),
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (thumbnail) => (
                <Image src={thumbnail} alt="Thumbnail" style={{ width: 100, height: 100, objectFit: 'cover' }} />
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (price) => formatCurrency(price),
        },
        {
            title: 'Category',
            dataIndex: ['category', 'name'],
            key: 'category',
        },
        {
            title: 'Bakery',
            dataIndex: ['bakery', 'name'],
            key: 'bakery',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'available' ? 'green' : 'red'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="View Images">
                        <Button icon={<EyeOutlined />} onClick={() => handleViewImages(record.image)} />
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} danger />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <Card>
            <Row gutter={[16, 16]} align="middle" justify="space-between">
                <Col>
                    <Title level={2}>Quản lí sản phẩm</Title>
                </Col>
                <Col>
                    <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
                        Thêm sản phẩm
                    </Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Search
                        placeholder="Search products"
                        onSearch={handleSearch}
                        style={{ marginBottom: 16 }}
                        allowClear
                    />
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={products}
                rowKey="_id"
                loading={loading}
                pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
                }}
                scroll={{ x: 'max-content' }}
            />
            <Modal
                title="Cập nhật sản phẩm"
                visible={isUpdateModalVisible}
                onCancel={() => setIsUpdateModalVisible(false)}
                footer={null}
                width={800}
            >
                {selectedProductId && (
                    <UpdateProductModal
                        productId={selectedProductId}
                        onSuccess={handleUpdateSuccess}
                    />
                )}
            </Modal>
            <Modal
                title="Thêm sản phẩm mới"
                visible={isAddModalVisible}
                onCancel={() => setIsAddModalVisible(false)}
                footer={null}
                width={800}
            >
                <AddProductModal
                    bakeryId={bakeryId}
                    onSuccess={handleAddSuccess}
                />
            </Modal>
        </Card>
    );
};

export default ManageProducts;