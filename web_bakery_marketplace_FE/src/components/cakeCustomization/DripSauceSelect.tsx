import { Select, Typography } from 'antd';
import { convertToVND } from '../../utils';
const { Text } = Typography;

export const DripSauceSelect = ({ dripSauces, selectedDripSauce, handleDripSauceChange }: any) => (
    <>
        <Text strong>Sốt phủ:</Text>
        <Select
            style={{ width: '100%', marginTop: 8 }}
            placeholder="Chọn sốt phủ"
            onChange={handleDripSauceChange}
            value={selectedDripSauce?.name}
        >
            {dripSauces?.map((sauce: any) => (
                <Select.Option key={sauce.name} value={sauce.color}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                            style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: sauce.color,
                                marginRight: '8px',
                            }}
                        />
                        {sauce.name} - {convertToVND(sauce.price)}
                    </div>
                </Select.Option>
            ))}
        </Select>
    </>
);