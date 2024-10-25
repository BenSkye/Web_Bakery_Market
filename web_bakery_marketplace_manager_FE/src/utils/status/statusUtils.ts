import { CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, SyncOutlined, CarOutlined, SmileOutlined } from '@ant-design/icons';

export const getStatusInfo = (status: string) => {
    switch (status) {
        case 'pending':
            return {
                text: 'Pending',
                color: 'orange',
                icon: ClockCircleOutlined,
            };
        case 'processing':
            return {
                text: 'Processing',
                color: 'blue',
                icon: SyncOutlined,
            };
        case 'success':
            return {
                text: 'Success',
                color: 'green',
                icon: CheckCircleOutlined ,
            };
        case 'confirmed':
            return {
                text: 'Confirmed',
                color: 'purple',
                icon: CheckCircleOutlined ,
            };
        case 'rejected':
            return {
                text: 'Rejected',
                color: 'red',
                icon: CloseCircleOutlined ,
            };
        case 'shipping':
            return {
                text: 'Shipping',
                color: 'cyan',
                icon: CarOutlined ,
            };
        case 'delivered':
            return {
                text: 'Delivered',
                color: 'green',
                icon: SmileOutlined ,
            };
        case 'canceled':
            return {
                text: 'Canceled',
                color: 'red',
                icon: CloseCircleOutlined ,
            };
        default:
            return {
                text: 'Unknown',
                color: 'grey',
                icon: null,
            };
    }
};
