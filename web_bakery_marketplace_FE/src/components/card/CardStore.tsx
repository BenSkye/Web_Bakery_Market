import React from "react";
import { Link } from 'react-router-dom';
import { Card, Button, Rate, Tooltip } from "antd";
import { Bakery } from "../../services/bakeriesService";
import { truncateText } from '../../utils/truncate/TruncateText';

interface StoreCardProps {
    bakery: Bakery;
}


const StoreCard: React.FC<StoreCardProps> = ({ bakery }) => {
    return (
        <div className="card-wrapper" >
            <Card
                className="card-hover"
                bordered={false}
                style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)" }}
                cover={
                    <img
                        alt={bakery.name}
                        src={bakery.image}
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
                    <Rate disabled value={bakery.rating} />
                    <span style={{ marginLeft: "8px" }}>{bakery.rating}</span>
                </div>
                <Link to="">
                    <Button type="primary" className="button-hover"  >
                        Ghé tiệm
                    </Button>
                </Link>
            </Card>
        </div>
    );
};

export default StoreCard;
