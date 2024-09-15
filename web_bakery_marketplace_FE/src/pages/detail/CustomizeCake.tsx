// CustomizeCake.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const CustomizeCake: React.FC = () => {


    return (
        <>
            <div style={{ marginBottom: '1rem', fontSize: '20px', fontWeight: 'bold' }}>
                Cá nhân hóa chiếc bánh của bạn
            </div>
            <Canvas style={{ height: '300px', width: '100%' }}>
                <OrbitControls enableZoom={true} enablePan={false} />
                <ambientLight intensity={4} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

            </Canvas>
        </>
    );
};

export default CustomizeCake;
