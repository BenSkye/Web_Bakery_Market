import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Input, Tag, Image, Tooltip, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { getProductsByBakery } from '../../services/productService';
import type { ColumnsType } from 'antd/es/table';
import { useParams } from 'react-router-dom';

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string[];
    category: {
        _id: string;
        name: string;
    };
    bakery: {
        _id: string;
        name: string;
    };
    status: string;
    rating: number;
}

const { Search } = Input;

const ManageProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const bakeryId = useParams();


    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProductsByBakery(bakeryId as unknown as string);
            console.log('====================================');
            console.log(response.metadata);
            console.log('====================================');
            setProducts(response.metadata);
            setLoading(false);
        };
        fetchProducts();
    }, [bakeryId, products]);

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    const handleEdit = (record: Product) => {
        // Implement edit functionality
        console.log('Edit product:', record);
    };

    const handleDelete = (record: Product) => {
        // Implement delete functionality
        console.log('Delete product:', record);
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
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (price) => `${price.toLocaleString()} VND`,
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
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => (rating === -1 ? 'N/A' : rating),
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
        <div style={{ padding: 24 }}>
            <h1>Manage Products</h1>
            <Search
                placeholder="Search products"
                onSearch={handleSearch}
                style={{ marginBottom: 16 }}
            />
            <Table
                columns={columns}
                dataSource={products}
                rowKey="_id"
                loading={loading}
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default ManageProducts;