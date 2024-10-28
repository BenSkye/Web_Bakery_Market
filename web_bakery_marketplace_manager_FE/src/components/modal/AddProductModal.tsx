import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Button, message } from 'antd';
import ImageUploader from '../upload/ImageUploader';
import { addProduct } from '../../services/productService';
import { getCategories } from '../../services/categoryService';
import pathFirebase from '../../config/firebase/pathFirebase';




const { Option } = Select;
const { TextArea } = Input;

interface Category {
    _id: string;
    name: string;
}

interface AddProductModalProps {
    bakeryId: string;
    onSuccess: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ bakeryId, onSuccess }) => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState<Category[]>([]);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);



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

    const onFinish = async (values: unknown) => {
        try {
            if (uploadedImages.length === 0) {
                message.error('Vui lòng tải lên ít nhất một hình ảnh');
                return;
            }

            const productData = {
                ...values,
                bakery: bakeryId,
                image: uploadedImages,
                thumbnail: uploadedImages[0],
            };

            await addProduct(productData);
            message.success('Thêm sản phẩm thành công');
            form.resetFields();
            setUploadedImages([]);
            onSuccess();
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            message.error('Không thể thêm sản phẩm');
        }
    };

    const handleImageUploadSuccess = (urls: string[]) => {
        setUploadedImages(urls);
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
                <TextArea rows={4} />
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
            {/* <Form.Item name="quantity" label="Số lượng" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item> */}
            <Form.Item label="Hình ảnh" required>
                <ImageUploader
                    onUploadSuccess={handleImageUploadSuccess}
                    maxCount={5}
                    multiple={true}
                    storagePath={pathFirebase.productImages}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Thêm sản phẩm
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddProductModal;