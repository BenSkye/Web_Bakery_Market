import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Button, message, Tabs } from 'antd';
import { updateProduct, getProductById } from '../../services/productService';
import { getCategories } from '../../services/categoryService';
import { updateStock } from '../../services/stockService';

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
    }, []);

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
            });

            inventoryForm.setFieldsValue({
                inventory: inventory.stock,
            });
        } catch (error) {
            message.error('Không thể tải thông tin sản phẩm');
        }
    };

    const onFinishProduct = async (values: any) => {
        setLoading(true);
        try {
            await updateProduct(productId, values);
            message.success('Cập nhật thông tin sản phẩm thành công');
            onSuccess();
        } catch (error) {
            message.error('Cập nhật thông tin sản phẩm thất bại');
        }
        setLoading(false);
    };

    const onFinishInventory = async (values: any) => {
        setLoading(true);
        try {
            const difference = values.newStock - currentStock;
            if (difference > 0) {
                await updateStock.addStockToInventory(productId, difference);
                console.log('====================================');
                console.log('');
                console.log('====================================');
            } else if (difference < 0) {
                await updateStock.removeStockFromInventory(productId, Math.abs(difference));
            }
            message.success('Cập nhật tồn kho thành công');
            setCurrentStock(values.newStock);
            onSuccess();
        } catch (error) {
            message.error('Cập nhật tồn kho thất bại');
        }
        setLoading(false);
    };

    return (
        <Tabs defaultActiveKey="2">
            <TabPane tab="Thông tin sản phẩm" key="1">
                <Form form={productForm} layout="vertical" onFinish={onFinishProduct}>
                    <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
                        <Input />
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
                    <Form.Item name="inventory" label="Tồn kho" rules={[{ required: true }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
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