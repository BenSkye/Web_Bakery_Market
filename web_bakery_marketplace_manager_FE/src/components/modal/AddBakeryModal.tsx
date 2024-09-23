import React, { useState } from "react";
import { Form, Input, Button, Modal, TimePicker, Upload, Switch, Table, message } from "antd";
import { storage } from '../../config/firebase/firebaseConfig';
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";


interface Bakery {
    name: string;
    address: string;
    contact: {
        phone: string;
        facebook?: string;
        instagram?: string;
    };
    customCake: boolean;
    image: string[];
    openingHours: { [key: string]: { open: string; close: string } };
}


interface AddBakeryModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (bakery: Bakery) => void;
}

const AddBakeryModal: React.FC<AddBakeryModalProps> = ({ visible, onClose, onAdd }) => {
    const [form] = Form.useForm();
    const [isScheduleVisible, setIsScheduleVisible] = useState(false);

    const [fileList, setFileList] = useState<any[]>([]);
    const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

    const [openingHours, setOpeningHours] = useState<{ day: string; open: string; close: string }[]>([
        { day: "monday", open: "", close: "" },
        { day: "tuesday", open: "", close: "" },
        { day: "wednesday", open: "", close: "" },
        { day: "thursday", open: "", close: "" },
        { day: "friday", open: "", close: "" },
        { day: "saturday", open: "", close: "" },
        { day: "sunday", open: "", close: "" },
    ]);


    const handleUploadChange = (info: any) => {
        // Update the file list and set preview URLs
        const newFileList = info.fileList.slice(-3); // Limiting to 3 files if needed
        setFileList(newFileList);

        // Generate preview URLs for display
        const newImagePreviewUrls = newFileList.map((file: any) => {
            return URL.createObjectURL(file.originFileObj);
        });
        setImagePreviewUrls(newImagePreviewUrls);
    };


    const handleTimeChange = (day: string, timeType: 'open' | 'close', time: any) => {
        const newOpeningHours = openingHours.map((item) =>
            item.day === day ? { ...item, [timeType]: time.format('HH:mm') } : item
        );
        setOpeningHours(newOpeningHours);
    };

    const handleSaveSchedule = () => {
        // Perform any additional validation if needed
        message.success("Giờ mở cửa đã được lưu thành công!");
        setIsScheduleVisible(false); // Close the modal after saving
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();


            // Validate images
            if (fileList.length === 0) {
                message.warning("Vui lòng chọn ít nhất một hình ảnh!");
                return;
            }

            // Upload images to Firebase and gather URLs
            const imageUrls: string[] = await Promise.all(
                fileList.map(async (file: any) => {
                    const storageRef = ref(storage, `bakeryImages/${file.name}`);
                    const uploadTask = uploadBytesResumable(storageRef, file.originFileObj);
                    const downloadURL = await new Promise<string>((resolve, reject) => {
                        uploadTask.on(
                            "state_changed",
                            null,
                            reject,
                            () => {
                                getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
                            }
                        );
                    });
                    return downloadURL;
                })
            );

            console.log('====================================');
            console.log('imageUrls:', imageUrls);
            console.log('====================================');

            const bakeryData = {
                name: values.name,
                address: values.address,
                contact: values.contact,
                customCake: values.customCake,
                image: imageUrls,
                openingHours: openingHours.reduce((acc, { day, open, close }) => {
                    acc[day] = { open, close };
                    return acc;
                }, {} as { [key: string]: { open: string; close: string } }),
            };

            const response = onAdd(bakeryData);
            console.log('====================================');
            console.log('bakeryData:', bakeryData);
            console.log('====================================');
            console.log("Response:", response); // Log the response

            if (response && response.status === 201) {
                message.success(response.message || "Tạo tiệm bánh thành công!");
                form.resetFields();
                onClose();
            } else {
                message.error(response?.message || "Tạo tiệm bánh thất bại.");
            }
        } catch (error) {
            console.error("Validation Failed:", error);
            message.error("Vui lòng nhập đầy đủ thông tin!, Bakery Modal");
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
                <TimePicker
                    format="HH:mm"
                    onChange={(time) => handleTimeChange(record.day, 'open', time)}
                />
            ),
        },
        {
            title: "Giờ Đóng",
            dataIndex: "close",
            key: "close",
            render: (_, record: { day: string }) => (
                <TimePicker
                    format="HH:mm"
                    onChange={(time) => handleTimeChange(record.day, 'close', time)}
                />
            ),
        },
    ];

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList ? e.fileList : []; // Return an empty array if no files are selected
    };


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

                <Form.Item label="Hình ảnh" name="image" valuePropName="fileList">
                    <Upload
                        multiple
                        beforeUpload={() => false}
                        fileList={fileList}
                        onChange={handleUploadChange}
                    >
                        <Button>Chọn Hình Ảnh</Button>
                    </Upload>

                    {/* Display image previews */}
                    {imagePreviewUrls.length > 0 && (
                        <div style={{ marginTop: "10px" }}>
                            {imagePreviewUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt="Hình ảnh đã chọn"
                                    style={{ maxWidth: '100px', marginRight: '10px' }}
                                />
                            ))}
                        </div>
                    )}
                </Form.Item>

                <Form.Item label="Thiết kế bánh 3D" name="customCake" valuePropName="checked">
                    <Switch />
                </Form.Item>

                <Button type="primary" onClick={() => setIsScheduleVisible(true)}>Cài đặt giờ mở cửa</Button>

                <Modal
                    title="Cài Đặt Giờ Mở Cửa"
                    visible={isScheduleVisible}
                    onCancel={() => setIsScheduleVisible(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setIsScheduleVisible(false)}>
                            Hủy
                        </Button>,
                        <Button key="save" type="primary" onClick={handleSaveSchedule}>
                            Lưu
                        </Button>,
                    ]}

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
