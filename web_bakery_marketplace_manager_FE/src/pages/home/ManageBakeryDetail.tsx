import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBakeryById } from '../../services/bakeriesService';
import { Spin, Descriptions, message } from "antd";

interface Bakery {
    _id: string;
    name: string;
    address: string;
    contact: {
        phone: string;
        facebook?: string;
        instagram?: string;
    };
}

const BakeryDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [bakery, setBakery] = useState<Bakery | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBakeryDetail = async () => {
            try {
                if (id) {
                    const response = await getBakeryById(id);
                    // Extract the metadata and set it as bakery
                    setBakery(response.metadata);
                } else {
                    message.error("ID tiệm bánh không hợp lệ!");
                }
                setLoading(false);
            } catch (error) {
                message.error("Lấy thông tin tiệm bánh thất bại!");
                setLoading(false);
            }
        };
        fetchBakeryDetail();
    }, [id]);

    if (loading) {
        return <Spin />;
    }

    if (!bakery) {
        return <div>Không tìm thấy tiệm bánh!</div>;
    }

    return (
        <div className="bakery-detail-container">
            <h1>Chi tiết tiệm bánh</h1>
            <Descriptions bordered>
                <Descriptions.Item label="Tên tiệm bánh">{bakery.name}</Descriptions.Item>
                <Descriptions.Item label="Địa chỉ">{bakery.address}</Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">{bakery.contact.phone}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export default BakeryDetail;
