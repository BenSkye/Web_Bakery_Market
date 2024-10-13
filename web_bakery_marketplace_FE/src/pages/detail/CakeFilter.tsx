import React from 'react';
import FilterButtons from '../../components/filter/FilterButtons';
import CakeList from '../../components/list/CakeList';

interface CakeFilterProps {
    selectedFilter: string;
    onFilterChange: (filter: string) => void;
    filteredCakes: Array<{
        _id: string;
        id: string;
        name: string;
        price: string;
        image: string[];
    }>;
    listFilter: Array<{ name: string }>;
}

const CakeFilter: React.FC<CakeFilterProps> = ({ selectedFilter, onFilterChange, filteredCakes, listFilter }) => {
    return (
        <>
            <FilterButtons
                selectedFilter={selectedFilter}
                listFilter={listFilter}
                onFilterChange={onFilterChange}
            />
            <CakeList filteredCakes={filteredCakes} />
        </>
    );
};

export default CakeFilter;
