import { TreeSelect, Typography } from 'antd';
import { convertToVND } from '../../utils';
const { Text } = Typography;
export const FillingSelector = ({ cakeFillings, handleFillingChange }: any) => (
    <>
        <Text>Nhân bánh:</Text>
        <TreeSelect
            style={{ width: '100%', marginTop: 8 }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Chọn nhân bánh"
            treeDefaultExpandAll
            onChange={handleFillingChange}
        >
            {cakeFillings?.map((branch: any) => (
                <TreeSelect.TreeNode value={branch.branch} title={branch.branch} key={branch.branch} selectable={false}>
                    {branch?.fillings?.map((filling: any) => (
                        <TreeSelect.TreeNode
                            value={filling.name}
                            title={`${filling.name} - ${convertToVND(filling.price)}`}
                            key={filling.name}
                        />
                    ))}
                </TreeSelect.TreeNode>
            ))}
        </TreeSelect>
    </>
);