import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table, message } from "antd";
import { getBakeries } from "../../services/bakeriesService";
import "../../styles/ManagePageStyles/BakeryManager.css";
import { StarOutlined, StarFilled, PlusCircleOutlined } from '@ant-design/icons';
import AddBakeryModal from '../../components/modal/AddBakeryModal'; // Import modal mới

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

    const handleAddBakery = (values: any) => {
        const openingHoursMap: { [key: string]: { open: string; close: string } } = {};
        // Chuyển đổi giờ mở cửa nếu cần thiết
        setBakeries([...bakeries, { key: bakeries.length + 1, ...values, openingHours: openingHoursMap }]);
        message.success("Thêm tiệm bánh thành công!");
        handleCloseModal();
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
                onAddBakery={handleAddBakery}
            />
        </div>
    );
};

export default BakeryManager;
