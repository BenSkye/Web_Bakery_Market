import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Button, message, Tabs, UploadFile, Space } from 'antd';
import { updateProduct, getProductById } from '../../services/productService';
import { getCategories } from '../../services/categoryService';
import { addStockToInventory, removeStockFromInventory } from '../../services/stockService';
import ImageUploader from '../upload/ImageUploader';
import pathFirebase from '../../config/firebase/pathFirebase';
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;

interface UpdateProductModalProps {
    productId: string;
    onSuccess: () => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({ productId, onSuccess }) => {
    const [productForm] = Form.useForm();
    const [inventoryForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [currentStock, setCurrentStock] = useState(0);
    const [stockChangeType, setStockChangeType] = useState<'add' | 'remove'>('add');

    const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.metadata);
        } catch (error) {
            message.error('Failed to fetch categories');
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchProductDetails();
    }, [productId]);

    const fetchProductDetails = async () => {
        try {
            const response = await getProductById(productId);
            const product = response.metadata.product;
            const inventory = response.metadata.inventory;
            console.log('====================================');
            console.log('productDetails', product);
            console.log('====================================');

            productForm.setFieldsValue({
                name: product.name,
                price: product.price,
                category: product.category._id,
                status: product.status,
                description: product.description,
                // thumbnail: product.thumbnail,
                // image: product.image,
            });

            // Set thumbnail
            if (product.thumbnail) {
                setThumbnailUrl(product.thumbnail);
            }

            // Set image list
            if (product.image) {
                setImageUrls(Array.isArray(product.image) ? product.image : [product.image]);
            }

            inventoryForm.setFieldsValue({
                inventory: inventory.stock,
            });

            setCurrentStock(inventory.stock);
        } catch (error) {
            message.error('Không thể tải thông tin sản phẩm');
        }
    };

    const onFinishProduct = async (values: any) => {
        setLoading(true);
        try {
            const updatedValues = {
                ...values,
                thumbnail: thumbnailUrl,
                image: imageUrls,
            };
            await updateProduct(productId, updatedValues);
            message.success('Cập nhật thông tin sản phẩm thành công');
            onSuccess();
        } catch (error) {
            message.error('Cập nhật thông tin sản phẩm thất bại');
        }
        setLoading(false);
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const onFinishInventory = async (values: any) => {
        setLoading(true);
        try {
            const changeAmount = values.stockChange;
            if (stockChangeType === 'add') {
                await addStockToInventory(productId, changeAmount);
                setCurrentStock(currentStock + changeAmount);
            } else {
                if (changeAmount > currentStock) {
                    throw new Error('Số lượng giảm không thể lớn hơn tồn kho hiện tại');
                }
                await removeStockFromInventory(productId, changeAmount);
                setCurrentStock(currentStock - changeAmount);
            }
            message.success('Cập nhật tồn kho thành công');
            onSuccess();
        } catch (error) {
            message.error('Cập nhật tồn kho thất bại: ' + (error as Error).message);
        }
        setLoading(false);
    };
    const handleDeleteImage = (index: number) => {
        const newImageUrls = [...imageUrls];
        newImageUrls.splice(index, 1);
        setImageUrls(newImageUrls);
    };

    const handleDeleteThumbnail = () => {
        setThumbnailUrl('');
    };

    return (
        <Tabs defaultActiveKey="2">
            <TabPane tab="Thông tin sản phẩm" key="1">
                <Form form={productForm} layout="vertical" onFinish={onFinishProduct}>
                    <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Ảnh đại diện">
                        <ImageUploader
                            onUploadSuccess={(urls) => setThumbnailUrl(urls[0])}
                            maxCount={1}
                            multiple={false}
                            storagePath={`${pathFirebase.productImages}/${productId}/thumbnail`}
                        />
                        {thumbnailUrl && (
                            <Space align="start">
                                <img src={thumbnailUrl} alt="Thumbnail" style={{ maxWidth: '100px', marginTop: '10px' }} />
                                <Button icon={<DeleteOutlined />} onClick={handleDeleteThumbnail} danger>Xóa</Button>
                            </Space>
                        )}
                    </Form.Item>

                    <Form.Item label="Ảnh khác">
                        <ImageUploader
                            onUploadSuccess={(urls) => setImageUrls([...imageUrls, ...urls])}
                            maxCount={5 - imageUrls.length}
                            multiple={true}
                            storagePath={`${pathFirebase.productImages}/${productId}/images`}
                        />
                        <Space wrap>
                            {imageUrls.map((url, index) => (
                                <Space key={index} direction="vertical" align="center">
                                    <img src={url} alt={`Product ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                    <Button icon={<DeleteOutlined />} onClick={() => handleDeleteImage(index)} danger>Xóa</Button>
                                </Space>
                            ))}
                        </Space>
                    </Form.Item>
                    <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="category" label="Danh mục" rules={[{ required: true }]}>
                        <Select>
                            {categories.map((category) => (
                                <Option key={category._id} value={category._id}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="description" label="Mô tả">
                        <Input />
                    </Form.Item>

                    <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
                        <Select>
                            <Option value="available">Có sẵn</Option>
                            <Option value="unavailable">Không có sẵn</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Cập nhật thông tin sản phẩm
                        </Button>
                    </Form.Item>
                </Form>
            </TabPane>
            <TabPane tab="Thông tin tồn kho" key="2">
                <Form form={inventoryForm} layout="vertical" onFinish={onFinishInventory}>
                    <Form.Item label="Tồn kho hiện tại">
                        <Input value={currentStock} disabled />
                    </Form.Item>
                    <Form.Item name="stockChangeType" label="Loại thay đổi">
                        <Select
                            onChange={(value) => setStockChangeType(value)}
                            defaultValue="add"
                        >
                            <Option value="add">Thêm stock</Option>
                            <Option value="remove">Giảm stock</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="stockChange"
                        label={stockChangeType === 'add' ? "Số lượng thêm" : "Số lượng giảm"}
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Cập nhật tồn kho
                        </Button>
                    </Form.Item>
                </Form>
            </TabPane>
        </Tabs>
    );
};

export default UpdateProductModal;