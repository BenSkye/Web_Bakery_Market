// src/components/FBXModel.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from '@react-three/drei';

interface FBXModelProps {
    url: string;
}

const FBXModel: React.FC<FBXModelProps> = ({ url }) => {
    const fbx = useLoader(FBXLoader, url);

    // Center the model by adjusting its position
    fbx.position.set(0, 0, 0); // Adjust as necessary based on your model
    fbx.scale.set(0.015, 0.015, 0.015);
    return <primitive object={fbx} />;
};

const Render3D: React.FC = () => {
    return (
        <Canvas
            style={{ height: '600px', width: '1000px', border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}
            camera={{ position: [0, 2, 5], fov: 50 }} // Adjust camera position as needed
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <OrbitControls /> {/* Enables interaction with the model */}
            <FBXModel url="/Cake1.fbx" />
        </Canvas>
    );
};

export default Render3D;
