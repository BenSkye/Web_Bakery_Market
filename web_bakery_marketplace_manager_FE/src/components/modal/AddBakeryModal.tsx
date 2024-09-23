import React, { useState } from "react";
import { Form, Input, Button, Modal, TimePicker, Upload, Switch, Table, message } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';

interface Bakery {
    key: number;
    name: string;
    address: string;
    contact: {
        phone: string;
        facebook?: string;
        instagram?: string;
    };
    image: string[];
    customCake: boolean;
}

interface AddBakeryModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (bakery: Bakery) => void;
}

const AddBakeryModal: React.FC<AddBakeryModalProps> = ({ visible, onClose, onAdd }) => {
    const [form] = Form.useForm();
    const [isScheduleVisible, setIsScheduleVisible] = useState(false);
    const [openingHours, setOpeningHours] = useState<{ day: string; open: string; close: string }[]>([
        { day: "Thứ Hai", open: "", close: "" },
        { day: "Thứ Ba", open: "", close: "" },
        { day: "Thứ Tư", open: "", close: "" },
        { day: "Thứ Năm", open: "", close: "" },
        { day: "Thứ Sáu", open: "", close: "" },
        { day: "Thứ Bảy", open: "", close: "" },
        { day: "Chủ Nhật", open: "", close: "" },
    ]);


    const handleScheduleCancel = () => setIsScheduleVisible(false);
    const handleTimeChange = (day: string, timeType: 'open' | 'close', time: string) => {
        const newOpeningHours = openingHours.map((item) =>
            item.day === day ? { ...item, [timeType]: time } : item
        );
        setOpeningHours(newOpeningHours);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const openingHoursMap = {};
            openingHours.forEach(({ day, open, close }) => {
                openingHoursMap[day] = { open, close };
            });
            onAdd({ key: Math.random(), ...values, openingHours: openingHoursMap });
            message.success("Thêm tiệm bánh thành công!");
            form.resetFields();
            onClose();
        } catch (error) {
            console.error("Validation Failed:", error);
        }
    };

    const openingHoursColumns = [
        {
            title: "Ngày",
            dataIndex: "day",
            key: "day",
        },
        {
            title: "Giờ Mở",
            dataIndex: "open",
            key: "open",
            render: (_, record: { day: string }) => (
                <TimePicker onChange={(time, timeString) => handleTimeChange(record.day, 'open', timeString)} />
            ),
        },
        {
            title: "Giờ Đóng",
            dataIndex: "close",
            key: "close",
            render: (_, record: { day: string }) => (
                <TimePicker onChange={(time, timeString) => handleTimeChange(record.day, 'close', timeString)} />
            ),
        },
    ];

    return (
        <Modal
            title="Thêm Tiệm Bánh"
            visible={visible}
            onOk={handleOk}
            onCancel={onClose}
            centered
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
                    name={["contact", "phone"]}
                    rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                >
                    <Input placeholder="Nhập số điện thoại" />
                </Form.Item>

                <Form.Item label="Hình ảnh" name="image">
                    <Upload multiple>
                        <Button>Chọn Hình Ảnh</Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="Thiết kế bánh 3D" name="customCake" valuePropName="checked">
                    <Switch />
                </Form.Item>

                <Button type="primary" onClick={() => setIsScheduleVisible(true)}>Cài đặt giờ mở cửa</Button>

                <Modal
                    title="Cài Đặt Giờ Mở Cửa"
                    visible={isScheduleVisible}
                    onCancel={handleScheduleCancel}
                    footer={null}
                >
                    <Table
                        dataSource={openingHours}
                        columns={openingHoursColumns}
                        pagination={false}
                    />
                </Modal>

            </Form>
        </Modal>
    );
};

export default AddBakeryModal;
