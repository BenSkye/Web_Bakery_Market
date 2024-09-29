import React from 'react';
import { Card, Row, Col, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

// Define prop types
interface CakeFilterProps {
    selectedFilter: string;
    onFilterChange: (filter: string) => void;
    filteredCakes: Array<unknown>;
    listFilter: Array<unknown>;
}

const { Title } = Typography;

const CakeFilter: React.FC<CakeFilterProps> = ({ selectedFilter, onFilterChange, filteredCakes, listFilter }) => {

    console.log('filteredCakes', filteredCakes)
    // Styles (could be extracted to a separate CSS or SCSS file)
    const filterStyle: React.CSSProperties = {
        margin: '1rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    };

    const buttonGroupStyle: React.CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0',
    };

    const buttonStyle: React.CSSProperties = {
        margin: '0',
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f06292',
        color: '#000',
        border: 'none',
        borderRadius: '4px',
        marginRight: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.1s',
    };

    const buttonActiveStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: '#c2185b',
        transform: 'scale(0.98)',
    };

    const buttonHoverStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: '#f06292',
    };

    const getButtonStyle = (type: string) => {
        return selectedFilter === type ? buttonActiveStyle : buttonHoverStyle;
    };

    const handleButtonClick = (type: string) => {
        onFilterChange(type);
    };

    const cakeImageStyle: React.CSSProperties = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '10px',
    };

    const addToCartButtonStyle: React.CSSProperties = {
        marginTop: '10px',
    };

    return (
        <>
            <div style={filterStyle}>
                <Title level={4} style={{ margin: '0 0 1rem' }}>Lọc theo loại bánh</Title>
                <div style={buttonGroupStyle}>
                    {listFilter.map((filter) => (
                        <button
                            className="button-hover"
                            style={getButtonStyle(filter.name)}
                            onClick={() => handleButtonClick(filter.name)}
                        >
                            {filter.name}
                        </button>
                    ))}
                </div>
            </div>
            <Row gutter={[16, 16]}>
                {filteredCakes.map(cake => (
                    <Col key={cake.id} span={8}>
                        <Card className="card-hover" cover={<img src={cake.image[0]} alt={cake.name} style={cakeImageStyle} />}>
                            <Card.Meta title={cake.name} description={`Giá: ${cake.price}`} />
                            <Link to={`/product/${cake._id}`}>
                                <Button className="button-hover" style={addToCartButtonStyle} type="primary">Xem chi tiết</Button>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default CakeFilter;
