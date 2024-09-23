import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table, message } from "antd";
import { getBakeries } from "../../services/bakeriesService";
import "../../styles/ManagePageStyles/BakeryManager.css";
import { StarOutlined, StarFilled, PlusCircleOutlined } from '@ant-design/icons';
import AddBakeryModal from '../../components/modal/AddBakeryModal'; // Import modal mới
import { createBakery } from '../../services/bakeriesService';


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
}

const BakeryManager: React.FC = () => {
    const [bakeries, setBakeries] = useState<Bakery[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        const fetchBakeries = async () => {
            try {
                const data = await getBakeries();
                const mappedBakeries = data.metadata.map((bakery: any) => ({
                    key: bakery._id,
                    name: bakery.name,
                    address: bakery.address,
                    rating: bakery.rating,
                    contact: bakery.contact,
                    openingHours: bakery.openingHours,
                    image: bakery.image,
                    customCake: bakery.customCake,
                }));
                setBakeries(mappedBakeries);
            } catch (error) {
                message.error("Lấy danh sách tiệm bánh thất bại!");
            }
        };
        fetchBakeries();
    }, []);

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

            const response = await createBakery(bakeryData); // Ensure the response is correctly returned

            if (response && response.status === 201) {
                setBakeries([...bakeries, { key: response.data._id, ...response.data }]);
                message.success("Thêm tiệm bánh thành công!");
                return response;
            } else {
                message.error("Đã xảy ra lỗi, vui lòng thử lại.");
            }

            // Return the response for handling in the modal
        } catch (error) {
            message.error((error as Error).message || "Thêm tiệm bánh thất bại, vui lòng thử lại.");
            return undefined; // Explicitly return undefined in case of error
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
    ];

    return (
        <div className="bakery-manager-container">
            <h1 className="page-title">Quản Lý Tiệm Bánh</h1>
            <Button type="primary" className="add-button" onClick={showModal}>
                Thêm Tiệm Bánh <PlusCircleOutlined />
            </Button>

            <Table
                columns={columns}
                dataSource={bakeries}
                className="bakery-table"
                style={{ marginTop: "2rem" }}
            />
            <AddBakeryModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                onAdd={handleAddBakery}
            />
        </div>
    );
};

export default BakeryManager;
