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
            values.openingHours.forEach(({ day, open, close }) => {
                openingHoursMap[day] = { open, close };
            });

            // Prepare bakery data
            const bakeryData = {
                name: values.name,
                address: values.address,
                contact: values.contact,
                customCake: values.customCake,
                image: values.image,
                openingHours: openingHoursMap,
                // Add more fields if needed
            };

            // Call API to create a new bakery
            const createdBakery = await createBakery(bakeryData);

            // If the bakery is successfully created, update the state
            setBakeries([...bakeries, { key: createdBakery._id, ...createdBakery }]);
            message.success("Thêm tiệm bánh thành công!");

            // Close the modal
            handleCloseModal();
        } catch (error) {
            message.error("Thêm tiệm bánh thất bại!");
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
