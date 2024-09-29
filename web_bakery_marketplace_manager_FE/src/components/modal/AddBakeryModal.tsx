import React, { useState } from "react";
import { Form, Input, Button, Modal, TimePicker, Upload, Switch, Table, message } from "antd";
import dayjs from "dayjs";
import { storage } from '../../config/firebase/firebaseConfig';
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import '../../styles/modal/AddBakeryModal.css';


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

    const [selectedOpenTime, setSelectedOpenTime] = useState<string | null>(null);
    const [selectedCloseTime, setSelectedCloseTime] = useState<string | null>(null);

    const handleRemove = (file: any) => {
        const newFileList = Array.isArray(fileList) ? fileList.filter((f) => f.uid !== file.uid) : [];
        setFileList(newFileList); // Đảm bảo fileList luôn là mảng

        // Cập nhật danh sách preview URL
        const newImagePreviewUrls = newFileList.map((file: any) => URL.createObjectURL(file.originFileObj));
        setImagePreviewUrls(newImagePreviewUrls); // Đảm bảo imagePreviewUrls luôn là mảng
    };



    const handleUploadChange = (info: any) => {
        // Sử dụng Array.isArray để kiểm tra và đảm bảo fileList là mảng hợp lệ
        const newFileList = Array.isArray(info.fileList) ? info.fileList.slice(-3) : []; // Giới hạn tối đa 3 ảnh nếu cần
        setFileList(newFileList); // Đảm bảo fileList luôn là mảng

        // Generate preview URLs for display
        const newImagePreviewUrls = newFileList.map((file: any) => URL.createObjectURL(file.originFileObj));
        setImagePreviewUrls(newImagePreviewUrls); // Đảm bảo imagePreviewUrls luôn là mảng
    };



    const handleTimeChange = (day: string, timeType: 'open' | 'close', time: any) => {
        const formattedTime = time.format('HH:mm');
        const newOpeningHours = openingHours.map((item) =>
            item.day === day ? { ...item, [timeType]: formattedTime } : item
        );
        setOpeningHours(newOpeningHours);

        // Cập nhật giờ mở hoặc đóng đã chọn
        if (timeType === 'open') {
            setSelectedOpenTime(formattedTime);
        } else {
            setSelectedCloseTime(formattedTime);
        }
    };


    const handleApplyToAll = () => {
        const updatedOpeningHours = openingHours.map((item) => ({
            ...item,
            open: selectedOpenTime || item.open,  // Áp dụng giờ mở đã chọn
            close: selectedCloseTime || item.close, // Áp dụng giờ đóng đã chọn
        }));
        setOpeningHours(updatedOpeningHours);
        message.success("Giờ đã được áp dụng cho tất cả các ngày!");
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


    const handleSaveSchedule = () => {
        // Perform any additional validation if needed
        message.success("Giờ mở cửa đã được lưu thành công!");
        setIsScheduleVisible(false); // Close the modal after saving
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
                    minuteStep={30}
                    value={record.open ? dayjs(record.open, 'HH:mm') : null}
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
                    minuteStep={30}
                    value={record.close ? dayjs(record.close, 'HH:mm') : null}
                    onChange={(time) => handleTimeChange(record.day, 'close', time)}
                />
            ),
        },
    ];

    const isAnyTimeSelected = openingHours.some(({ open, close }) => open && close);

    return (
        <Modal
            title="Thêm Tiệm Bánh"
            visible={visible}
            onOk={handleOk}
            onCancel={onClose}
            centered
            className="modal-container"
        >
            <Form form={form} layout="vertical" className="form-container">
                <Form.Item
                    label="Tên tiệm bánh"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên tiệm bánh!" }]}
                >
                    <Input className="input-field" placeholder="Nhập tên tiệm bánh" />
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
                <Form.Item
                    label="Liên kết Facebook"
                    name={["contact", "facebook"]}
                    rules={[
                        {
                            type: 'url',
                            message: 'Vui lòng nhập một liên kết Facebook hợp lệ!',
                        },
                    ]}
                >
                    <Input placeholder="Nhập liên kết Facebook" />
                </Form.Item>

                <Form.Item
                    label="Liên kết Instagram"
                    name={["contact", "instagram"]}
                    rules={[
                        {
                            type: 'url',
                            message: 'Vui lòng nhập một liên kết Instagram hợp lệ!',
                        },
                    ]}
                >
                    <Input placeholder="Nhập liên kết Instagram" />
                </Form.Item>


                <Form.Item label="Hình ảnh" name="image" valuePropName="fileList">
                    <Upload
                        multiple
                        beforeUpload={() => false}
                        fileList={Array.isArray(fileList) ? fileList : []}
                        onChange={handleUploadChange}
                        onRemove={handleRemove}
                    >
                        <Button className="upload-button">Chọn Hình Ảnh</Button>
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
                    <Switch className="custom-switch" />
                </Form.Item>

                <Button type="primary" onClick={() => setIsScheduleVisible(true)}>Cài đặt giờ mở cửa</Button>

                <Modal
                    title="Cài Đặt Giờ Mở Cửa"
                    visible={isScheduleVisible}
                    onCancel={() => setIsScheduleVisible(false)}
                    footer={[
                        isAnyTimeSelected && (
                            <Button style={{ backgroundColor: '#fac2be' }} key="applyAll" onClick={handleApplyToAll} disabled={!selectedOpenTime && !selectedCloseTime}>
                                Áp dụng cho tất cả
                            </Button>
                        ),
                        <Button key="cancel" onClick={() => setIsScheduleVisible(false)}>
                            Hủy
                        </Button>,
                        <Button key="save" type="primary" onClick={handleSaveSchedule}>
                            Lưu
                        </Button>,
                    ]}
                    className="schedule-modal"
                >
                    <Table
                        dataSource={openingHours}
                        columns={openingHoursColumns}
                        pagination={false}
                        className="schedule-table"
                    />
                </Modal>
            </Form>
        </Modal>
    );
};

export default AddBakeryModal;
