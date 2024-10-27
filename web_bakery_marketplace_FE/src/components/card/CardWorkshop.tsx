import React from "react";
import { Link } from 'react-router-dom';
import { Card, Button, Rate, Tooltip } from "antd";
import { Workshop } from '../../services/workshopsService';
import { truncateText } from '../../utils/truncate/TruncateText';
import NoImg from '../../assets/NoImg.jpg';


interface WorkshopCardProps {
    workshop: Workshop;
}

const WorkShopCard: React.FC<WorkshopCardProps> = ({ workshop }) => {
    // Get the first image or use a placeholder if the array is empty
    const coverImage = workshop.image.length > 0 ? workshop.image : NoImg;

    return (
        <Link to={'/workshop'}>
            <div className="card-wrapper">
                <Card
                    className="card-hover"
                    bordered={false}
                    style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)" }}
                    cover={
                        <img
                            alt={workshop.title}
                            src={coverImage}
                            style={{ height: "200px", objectFit: "cover" }}
                        />
                    }
                >
                    <Tooltip title={workshop.title} placement="topLeft">
                        <h3 style={{ textAlign: "start" }}>
                            {truncateText(workshop.title, 35)}
                        </h3>
                    </Tooltip>
                    <p style={{ textAlign: "start" }}>Ngày diễn ra: {workshop.date}</p>

                    <Tooltip title={workshop.description} placement="topRight">
                        <div
                            style={{
                                marginBottom: "10px",
                            }}
                        >
                            <span style={{ marginLeft: "8px" }}>{truncateText(workshop.description, 100)}</span>
                        </div></Tooltip>

                    <Button type="primary" className="button-hover">
                        Đăng ký tham gia
                    </Button>

                </Card>
            </div>
        </Link>
    );
};

export default WorkShopCard;
