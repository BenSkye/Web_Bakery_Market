export const formatCurrency = (value: number | undefined | null): string => {
    if (value === undefined || value === null || isNaN(value)) {
        return 'N/A';
    }
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};