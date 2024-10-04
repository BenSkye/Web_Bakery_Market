import React from "react";
import { Link } from 'react-router-dom';
import { Card, Button, Rate, Tooltip } from "antd";
import { Bakery } from "../../services/bakeriesService";
import { truncateText } from '../../utils/truncate/TruncateText';
import NoImg from '../../assets/NoImg.jpg';

interface StoreCardProps {
    bakery: Bakery;
}

const StoreCard: React.FC<StoreCardProps> = ({ bakery }) => {
    // Get the first image or use a placeholder if the array is empty
    const coverImage = bakery.image.length > 0 ? bakery.image[0] : NoImg;

    return (
        <Link to={`/detail/${bakery._id}`}>
            <div className="card-wrapper">
                <Card
                    className="card-hover"
                    bordered={false}
                    style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)" }}
                    cover={
                        <img
                            alt={bakery.name}
                            src={coverImage}
                            style={{ height: "200px", objectFit: "cover" }}
                        />
                    }
                >
                    <Tooltip title={bakery.name} placement="topLeft">
                        <h3 style={{ textAlign: "start" }}>
                            {truncateText(bakery.name, 35)}
                        </h3>
                    </Tooltip>
                    <Tooltip title={bakery.address} placement="topLeft">
                        <p style={{ textAlign: "start" }}>{truncateText(bakery.address, 35)}</p>
                    </Tooltip>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                        }}
                    >
                        {bakery.rating >= 0 ? (
                            <>
                                <Rate disabled value={bakery.rating} />
                                <span style={{ marginLeft: "8px" }}>{bakery.rating}</span>
                            </>
                        ) : (
                            <span >Chưa có đánh giá</span>
                        )}
                    </div>

                    <Button type="primary" className="button-hover">
                        Ghé tiệm
                    </Button>

                </Card>
            </div>
        </Link>
    );
};

export default StoreCard;
