import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

interface FilterButtonsProps {
    selectedFilter: string;
    listFilter: Array<{ name: string }>;
    onFilterChange: (filter: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ selectedFilter, listFilter, onFilterChange }) => {
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

    const getButtonStyle = (type: string) => {
        return selectedFilter === type ? buttonActiveStyle : buttonStyle;
    };

    return (
        <div style={{ margin: '1rem 0', display: 'flex', flexWrap: 'wrap', gap: '0' }}>
            <Title level={4} style={{ margin: '0 0 1rem' }}>Lọc theo loại bánh</Title>
            {listFilter.map(filter => (
                <button
                    key={filter.name}
                    style={getButtonStyle(filter.name)}
                    onClick={() => onFilterChange(filter.name)}
                >
                    {filter.name}
                </button>
            ))}
        </div>
    );
};

export default FilterButtons;
