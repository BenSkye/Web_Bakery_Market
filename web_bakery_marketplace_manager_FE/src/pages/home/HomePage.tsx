import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Table, Modal, message } from "antd";
import { getBakeries } from "../../services/bakeriesService"; // Đường dẫn đến file dịch vụ của bạn

interface Bakery {
    key: number;
    name: string;
    address: string;
    phone: string;
}

const BakeryManager: React.FC = () => {
    const [bakeries, setBakeries] = useState<Bakery[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Lấy danh sách tiệm bánh khi component được mount
    useEffect(() => {
        const fetchBakeries = async () => {
            try {
                const data = await getBakeries();
                // Chuyển đổi dữ liệu để thêm thuộc tính `key`
                console.log(data.metadata);
                setBakeries(data.metadata);
            } catch (error) {
                message.error("Lấy danh sách tiệm bánh thất bại!");
            }
        };

        fetchBakeries();
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setBakeries([...bakeries, { key: bakeries.length + 1, ...values }]);
            message.success("Thêm tiệm bánh thành công!");
            form.resetFields();
            setIsModalVisible(false);
        } catch (error) {
            console.error("Validation Failed:", error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: "Tên tiệm bánh",
            dataIndex: "name",
            key: "name",
            render: (text: string, record: Bakery) => (
                <Link to={''}>{text}</Link> // Tạo liên kết đến trang chi tiết tiệm bánh
            ),
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
    ];

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Quản Lý Tiệm Bánh</h1>
            <Button type="primary" onClick={showModal}>
                Thêm Tiệm Bánh
            </Button>

            <Table columns={columns} dataSource={bakeries} style={{ marginTop: "2rem" }} />

            <Modal
                title="Thêm Tiệm Bánh"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Tên tiệm bánh"
                        name="name"
                        rules={[{ required: true, message: "Vui lòng nhập tên tiệm bánh!" }]}
                    >
                        <Input placeholder="Nhập tên tiệm bánh" />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
                    >
                        <Input placeholder="Nhập địa chỉ" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="contact"
                        rules={[
                            { required: true, message: "Vui lòng nhập số điện thoại!" },
                            { pattern: /^[0-9]*$/, message: "Số điện thoại phải là số!" },
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BakeryManager;
