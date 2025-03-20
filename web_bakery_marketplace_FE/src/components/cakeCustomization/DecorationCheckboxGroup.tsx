import { Checkbox, Typography } from 'antd';
import { convertToVND } from '../../utils';
const { Text } = Typography;
type CheckboxValueType = string | number | boolean;

interface DecorationCheckboxGroupProps {
    decorationOptions: any[];
    selectedDecorations: any[];
    handleDecorationChange: (checkedValues: CheckboxValueType[]) => void;
}

export const DecorationCheckboxGroup = ({
    decorationOptions,
    selectedDecorations,
    handleDecorationChange
}: DecorationCheckboxGroupProps) => {
    return (
        <>
            <Text strong>Trang trí:</Text>
            <Checkbox.Group
                options={decorationOptions?.map(option => ({
                    ...option,
                    label: `${option.label} - ${convertToVND(option.price)}`
                }))}
                value={selectedDecorations?.map(d => d.value)}
                onChange={handleDecorationChange}
                style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 8 }}
            />
        </>
    );
};