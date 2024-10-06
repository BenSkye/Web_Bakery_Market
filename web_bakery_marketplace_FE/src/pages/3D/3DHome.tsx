import { useParams } from "react-router-dom";
import CakeModel from "./CakeModel";

const CakeDesigner: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      <CakeModel bakeryId={id || ''} />
    </div>
  );
};
export default CakeDesigner;
