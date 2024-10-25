import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal, TimePicker, Table, message, Checkbox, Select, Card, Col, Row } from "antd";
import dayjs, { Dayjs } from "dayjs";
import ImageUploader from '../upload/ImageUploader';
import pathFirebase from '../../config/firebase/pathFirebase';
import styles from '../../styles/modal/AddBakeryModal.module.css'
import { DISTRICT_ID } from '../../constants/districWard_ID';
import { fetchDistricts, fetchWards } from '../../services/districtWardService';
import Map from '../../utils/mapbox/Map';
import { ClockCircleOutlined, PlusOutlined } from '@ant-design/icons';


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

type District = { id: string; name: string };
type Ward = { id: string; name: string };


interface AddBakeryModalProps {
    visible: boolean;
    onClose: () => void;
    onAdd: (bakery: Bakery) => void;
}

const AddBakeryModal: React.FC<AddBakeryModalProps> = ({ visible, onClose, onAdd }) => {
    const [form] = Form.useForm();
    const [isScheduleVisible, setIsScheduleVisible] = useState(false);
    const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
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
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const updateFullAddress = () => {
        const district = form.getFieldValue('district');
        const ward = form.getFieldValue('ward');
        const specificAddress = form.getFieldValue('specificAddress');

        if (district && ward && specificAddress) {
            const newFullAddress = `${specificAddress}, Phường ${selectedWard}, Quận ${selectedDistrict}, Hồ Chí Minh`;
            setFullAddress(newFullAddress);
        }
    };

    useEffect(() => {
        fetchDistricts(DISTRICT_ID.HOCHIMINH_ID).then(data => setDistricts(data));
    }, []);

    const handleDistrictChange = (value: string, option: { children: string }) => {
        setSelectedDistrict(option.children);
        form.setFieldsValue({ ward: undefined });
        fetchWards(value).then(data => setWards(data));
        updateFullAddress();
    };

    const handleWardChange = (value: string, option: { children: string }) => {
        setSelectedWard(option.children);
        updateFullAddress();
    };

    const handleSpecificAddressChange = () => {
        updateFullAddress();
    };

    const handleTimeChange = (day: string, timeType: 'open' | 'close', time: Dayjs) => {
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

    const handleImageUploadSuccess = (urls: string[]) => {
        setUploadedImageUrls(urls);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            // Validate images
            if (uploadedImageUrls.length === 0) {
                message.warning("Vui lòng chọn ít nhất một hình ảnh!");
                return;
            }

            const fullAddress = `${values.specificAddress}, Phường ${selectedWard}, Quận ${selectedDistrict}, Hồ Chí Minh`;


            const bakeryData = {
                name: values.name,
                address: fullAddress,
                contact: values.contact,
                customCake: values.customCake,
                image: uploadedImageUrls,
                openingHours: openingHours.reduce((acc, { day, open, close }) => {
                    acc[day] = { open, close };
                    return acc;
                }, {} as { [key: string]: { open: string; close: string } }),
            };

            const response = await onAdd(bakeryData);
            console.log('bakeryData:', bakeryData);
            console.log("Response:", response);

            if (response && response.status === 201) {
                message.success(response.message || "Tạo tiệm bánh thành công!");
                form.resetFields();
                setUploadedImageUrls([]);
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
            visible={visible}
            onOk={handleOk}
            onCancel={onClose}
            width={1000}
            centered
            className={styles.modalContent}
            bodyStyle={{ padding: 0 }}
            title={<div className={styles.modalTitle}>Thêm Tiệm Bánh Mới</div>}
            footer={[
                <Button key="back" onClick={onClose} className={styles.button}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk} icon={<PlusOutlined />} className={styles.button}>
                    Thêm Tiệm Bánh
                </Button>,
            ]}
        >
            <div className={styles.modalBody}>
                <Form form={form} layout="vertical">
                    <Row gutter={24}>
                        <Col span={12}>
                            <Card title="Thông Tin Cơ Bản" className={styles.card}>
                                <Form.Item
                                    label="Tên tiệm bánh"
                                    name="name"
                                    rules={[{ required: true, message: "Vui lòng nhập tên tiệm bánh!" }]}
                                >
                                    <Input placeholder="Nhập tên tiệm bánh" />
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
                                    rules={[{ type: 'url', message: 'Vui lòng nhập một liên kết Facebook hợp lệ!' }]}
                                >
                                    <Input placeholder="Nhập liên kết Facebook" />
                                </Form.Item>

                                <Form.Item
                                    label="Liên kết Instagram"
                                    name={["contact", "instagram"]}
                                    rules={[{ type: 'url', message: 'Vui lòng nhập một liên kết Instagram hợp lệ!' }]}
                                >
                                    <Input placeholder="Nhập liên kết Instagram" />
                                </Form.Item>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Địa Chỉ" className={styles.card}>
                                <Form.Item
                                    label="Quận"
                                    name="district"
                                    rules={[{ required: true, message: 'Vui lòng chọn quận' }]}
                                >
                                    <Select placeholder="Chọn quận" onChange={handleDistrictChange}>
                                        {districts.map((district: District) => (
                                            <Select.Option key={district.id} value={district.id}>
                                                {district.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Phường"
                                    name="ward"
                                    rules={[{ required: true, message: 'Vui lòng chọn phường' }]}
                                >
                                    <Select placeholder="Chọn phường" onChange={handleWardChange}>
                                        {wards.map((ward: Ward) => (
                                            <Select.Option key={ward.id} value={ward.id}>
                                                {ward.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Địa chỉ cụ thể"
                                    name="specificAddress"
                                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể' }]}
                                >
                                    <Input placeholder="Nhập địa chỉ cụ thể" onChange={handleSpecificAddressChange} />
                                </Form.Item>
                                <Form.Item label="Bản đồ">
                                    <div className={styles.mapContainer}>
                                        <Map address={fullAddress} />
                                    </div>
                                </Form.Item>
                            </Card>
                        </Col>
                    </Row>

                    <Card title="Hình Ảnh và Thông Tin Khác" className={styles.card}>
                        <Form.Item label="Hình ảnh" name="image" valuePropName="fileList">
                            <div className={styles.imageUploader}>
                                <ImageUploader
                                    onUploadSuccess={handleImageUploadSuccess}
                                    maxCount={5}
                                    multiple={true}
                                    storagePath={pathFirebase.bakeryImages}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item label="Thiết kế bánh 3D" name="customCake" valuePropName="checked">
                            <Checkbox className={styles.checkbox}>Có thể thiết kế bánh 3D</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" onClick={() => setIsScheduleVisible(true)} icon={<ClockCircleOutlined />}>
                                Cài đặt giờ mở cửa
                            </Button>
                        </Form.Item>
                    </Card>
                </Form>
            </div>

            <Modal
                title="Cài Đặt Giờ Mở Cửa"
                visible={isScheduleVisible}
                onCancel={() => setIsScheduleVisible(false)}
                footer={[
                    isAnyTimeSelected && (
                        <Button key="applyAll" onClick={handleApplyToAll} disabled={!selectedOpenTime && !selectedCloseTime}>
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
            >
                <Table
                    dataSource={openingHours}
                    columns={openingHoursColumns}
                    pagination={false}
                />
            </Modal>
        </Modal>
    );
};



export default AddBakeryModal;
