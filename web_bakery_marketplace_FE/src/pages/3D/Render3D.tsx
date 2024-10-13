// src/components/FBXModel.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from '@react-three/drei';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

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

interface Render3DProps {
    bakeryId: string;
}

const Render3D: React.FC<Render3DProps> = ({ bakeryId }) => {
    return (
        // Adjust the height and width of the Canvas as necessary

        <>
            <Canvas
                style={{ height: '200px', width: '600px' }}
                camera={{ position: [0, 5, 5], fov: 50 }} // Adjust camera position as needed
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <OrbitControls /> {/* Enables interaction with the model */}
                <FBXModel url="/Cake1.fbx" />

            </Canvas>
            <Link to={`/CakeDesigner/${bakeryId}`}>
                <Button
                    type="primary"
                    style={{
                        marginTop: '20px',
                        backgroundColor: '#ff4d4f',
                        borderColor: '#ff4d4f',
                        fontSize: '16px'
                    }}
                >
                    Thiết kế bánh
                </Button>
            </Link></>
    );
};

export default Render3D;
