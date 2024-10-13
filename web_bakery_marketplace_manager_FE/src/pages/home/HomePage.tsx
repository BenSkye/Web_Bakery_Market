import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Tag, message } from "antd";
import { getBakeryByUserId } from "../../services/bakeriesService";
import "../../styles/ManagePageStyles/BakeryManager.css";
import { StarOutlined, StarFilled, PlusCircleOutlined } from '@ant-design/icons';
import AddBakeryModal from '../../components/modal/AddBakeryModal';
import { createBakery } from '../../services/bakeriesService';
import { useAuth } from '../../stores/authContex';
import { ShopOutlined } from '@ant-design/icons';


interface Bakery {
    key: number;
    name: string;
    address: string;
    rating: number;
    contact: {
        phone: string;
        facebook?: string;
        instagram?: string;
    };
    openingHours: {
        [key: string]: { open: string; close: string };
    };
    image: string[];
    customCake: boolean;
    status: string;
}

const BakeryManager: React.FC = () => {
    const [bakeries, setBakeries] = useState<Bakery[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const fetchBakeries = async () => {
            try {
                const data = await getBakeryByUserId(user?.userId || '');
                console.log('data: ', data);

                // Assuming data.metadata contains the bakery information in the desired structure
                const mappedBakeries = data.metadata.map((bakery: any) => ({
                    key: bakery._id, // Use _id as the key
                    name: bakery.name,
                    address: bakery.address,
                    rating: bakery.rating,
                    contact: bakery.contact,
                    openingHours: bakery.openingHours,
                    image: bakery.image,
                    customCake: bakery.customCake,
                    status: bakery.status,
                }));
                setBakeries(mappedBakeries);
                console.log('====================================');
                console.log('bakeries', bakeries);
                console.log('====================================');
            } catch (error) {
                message.error("Lấy danh sách tiệm bánh thất bại!");
            }
        };
        fetchBakeries();
    }, [user]);

    const showModal = () => setIsModalVisible(true);
    const handleCloseModal = () => setIsModalVisible(false);

    const handleAddBakery = async (values: any) => {
        try {
            const openingHoursMap: { [key: string]: { open: string; close: string } } = {};
            Object.keys(values.openingHours).forEach((day) => {
                const { open, close } = values.openingHours[day];
                openingHoursMap[day] = { open, close };
            });

            const bakeryData = {
                name: values.name,
                address: values.address,
                contact: values.contact,
                customCake: values.customCake,
                image: values.image,
                openingHours: openingHoursMap,

            };

            const response = await createBakery(bakeryData);

            if (response && response.status === 201) {
                setBakeries([...bakeries, { key: response.data._id, ...response.data }]);
                message.success("Thêm tiệm bánh thành công!");
                return response;
            } else {
                message.error("Đã xảy ra lỗi, vui lòng thử lại.");
            }
        } catch (error) {
            message.error((error as Error).message || "Thêm tiệm bánh thất bại, vui lòng thử lại.");
            return undefined;
        }
    };

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i}>
                    {i <= Math.floor(rating) ? <StarFilled style={{ color: 'yellow' }} /> : <StarOutlined />}
                </span>
            );
        }
        return <div>{stars}</div>;
    };

    const columns = [
        {
            title: "Tên tiệm bánh",
            dataIndex: "name",
            key: "name",
            render: (text: string, record: Bakery) => {
                return <Link to={`/bakery/${record.key}`}>{text}</Link>;
            },
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Đánh giá",
            dataIndex: "rating",
            key: "rating",
            render: (text: number) => renderStars(text),
        },
        {
            title: "Trang thái",
            dataIndex: "status",
            key: "status",
            render: (text: string) => {
                let color = "blue";
                switch (text.toLowerCase()) {
                    case "active":
                        color = "green";
                        break;
                    case "inactive":
                        color = "red";
                        break;
                    case "pending":
                        color = "orange";
                        break;
                }
                return <Tag color={color}>{text.toUpperCase()}</Tag>;
            },
            // Add sorting functionality
            sorter: (a: Bakery, b: Bakery) => {
                const getStatusPriority = (status: string): number => {
                    if (status.toLowerCase() === 'active') return 0;
                    if (status.toLowerCase() === 'pending') return 1;
                    if (status.toLowerCase() === 'inactive') return 2;
                    return 3;
                };
                return getStatusPriority(a.status) - getStatusPriority(b.status);
            },
        },
    ];

    return (
        <div className="bakery-manager-container">
            <header className="bakery-manager-header">
                <ShopOutlined className="bakery-icon" />
                <h1 className="page-title">Quản Lý Tiệm Bánh</h1>
            </header>
            <div className="bakery-content">
                <Button type="primary" className="add-button" onClick={showModal}>
                    Thêm Tiệm Bánh <PlusCircleOutlined />
                </Button>
                <div className="table-container">
                    <Table
                        columns={columns}
                        dataSource={bakeries}
                        className="bakery-table"
                    />
                </div>
            </div>
            <AddBakeryModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                onAdd={handleAddBakery}
            />
        </div>
    );
};

export default BakeryManager;
