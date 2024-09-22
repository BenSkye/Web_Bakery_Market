import React from 'react';
import { Form, Input, Button, TimePicker, message } from 'antd';
import { createBakery } from '../../services/bakeriesService';

// Define the type for form values
interface BakeryFormValues {
    bakeryName: string;
    location: string;
    mondayOpen: string;
    mondayClose: string;
    tuesdayOpen?: string;
    tuesdayClose?: string;
    // Add other days as needed
}

const BakerySignupPage: React.FC = () => {
    // Initialize the form instance
    const [form] = Form.useForm();

    // Handle form submission
    const handleSubmit = async (values: BakeryFormValues) => {
        try {
            // Format the values to match your backend schema
            const formattedValues = {
                name: values.bakeryName,
                address: values.location,
                openingHours: {
                    monday: { open: values.mondayOpen, close: values.mondayClose },
                    // Add other days similarly
                },
                // Include additional fields if necessary
            };

            const response = await createBakery(formattedValues);
            message.success('Bakery created successfully!');
            form.resetFields(); // Optionally reset the form after successful submission
        } catch (error) {
            message.error('Failed to create bakery');
            console.error('Error creating bakery:', error);
        }
    };

    return (
        <div className="bakery-signup-form">
            <h2>Create a New Bakery</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Bakery Name"
                    name="bakeryName"
                    rules={[{ required: true, message: 'Please input the bakery name!' }]}
                >
                    <Input placeholder="Enter bakery name" />
                </Form.Item>

                <Form.Item
                    label="Location"
                    name="location"
                    rules={[{ required: true, message: 'Please input the location!' }]}
                >
                    <Input placeholder="Enter bakery location" />
                </Form.Item>

                {/* Example for Monday */}
                <Form.Item label="Monday Opening Time" name="mondayOpen" rules={[{ required: true }]}>
                    <TimePicker format="HH:mm" />
                </Form.Item>
                <Form.Item label="Monday Closing Time" name="mondayClose" rules={[{ required: true }]}>
                    <TimePicker format="HH:mm" />
                </Form.Item>

                {/* Add other days similarly */}
                {/* Example for Tuesday */}
                <Form.Item label="Tuesday Opening Time" name="tuesdayOpen">
                    <TimePicker format="HH:mm" />
                </Form.Item>
                <Form.Item label="Tuesday Closing Time" name="tuesdayClose">
                    <TimePicker format="HH:mm" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create Bakery
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default BakerySignupPage;
