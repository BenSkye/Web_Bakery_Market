import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { updateProduct, getProductById } from '../../services/productService';
import { getCategories } from '../../services/categoryService';



const { Option } = Select;

interface UpdateProductModalProps {
    productId: string;
    onSuccess: () => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({ productId, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);

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
    }, []);


    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await getProductById(productId);
                const product = response.metadata.product;
                const inventory = response.metadata.inventory;
                console.log('====================================');
                console.log('productDetails', product);
                console.log('====================================');
                form.setFieldsValue({
                    name: product.name,
                    price: product.price,
                    category: product.category._id,
                    // quantity: product.quantity,
                    status: product.status,
                    inventory: inventory.stock,
                });
            } catch (error) {
                message.error('Không thể tải thông tin sản phẩm');
            }
        };

        fetchProductDetails();
    }, [productId, form]);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await updateProduct(productId, values);
            message.success('Cập nhật sản phẩm thành công');
            onSuccess();
        } catch (error) {
            message.error('Cập nhật sản phẩm thất bại');
        }
        setLoading(false);
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
            {/* <Form.Item name="quantity" label="Số lượng" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item> */}
            <Form.Item name="inventory" label="Tồn kho" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
                <Select>
                    <Option value="available">Có sẵn</Option>
                    <Option value="unavailable">Không có sẵn</Option>
                </Select>
            </Form.Item>
            {/* Thêm các trường khác nếu cần */}
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Cập nhật sản phẩm
                </Button>
            </Form.Item>
        </Form>
    );
};

export default UpdateProductModal;