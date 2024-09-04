
import React from 'react';
import { Form, Input, Button, Typography } from 'antd';

const { Title } = Typography;

const StoreInfo: React.FC = () => {
    const handleSave = () => {

    };

    return (
        <div>
            <Title level={3}>Store Information</Title>
            <Form layout="vertical">
                <Form.Item label="Store Name">
                    <Input placeholder="Enter store name" />
                </Form.Item>
                <Form.Item label="Store Address">
                    <Input placeholder="Enter store address" />
                </Form.Item>
                <Form.Item label="Store Description">
                    <Input.TextArea placeholder="Enter store description" />
                </Form.Item>
                <Button type="primary" onClick={handleSave}>Save</Button>
            </Form>
        </div>
    );
};

export default StoreInfo;
