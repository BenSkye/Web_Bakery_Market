import { Radio, Tooltip, Typography } from 'antd';
import { convertToVND } from '../../utils';
const { Text } = Typography;
export const FrostingColorPicker = ({ frostingColors, frostingColor, handleFrostingColorChange }: any) => (
    <>
        <Text strong>Màu kem phủ:</Text>
        <Radio.Group
            value={frostingColor?.hex}
            onChange={handleFrostingColorChange}
            style={{ width: '100%', marginTop: 8 }}
        >
            {frostingColors?.map((color: any) => (
                <Tooltip title={`${color.name}-${convertToVND(color.price)}`} key={color.hex}>
                    <Radio.Button
                        value={color.hex}
                        style={{
                            backgroundColor: color.hex,
                            width: '30px',
                            height: '30px',
                            border: `2px solid ${frostingColor?.hex === color.hex ? '#1890ff' : '#d9d9d9'}`,
                            marginRight: '10px',
                            marginBottom: '10px',
                            borderRadius: '50%',
                        }}
                    />
                </Tooltip>
            ))}
        </Radio.Group>
    </>
);