import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Mesh, Object3D, Raycaster, Vector2, Intersection, Color, MeshStandardMaterial, MeshPhongMaterial, MeshLambertMaterial, Scene } from 'three'


const FBXModel = ({ url, onClick,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1],
    frostingColor,
    modelColor,
    DripSauce }:
    {
        url: string,
        onClick: (object: Object3D) => void,
        position: [number, number, number],
        rotation: [number, number, number],
        scale: [number, number, number],
        modelColor?: string,
        frostingColor: object,
        DripSauce: string
    }) => {
    const fbx = useLoader(FBXLoader, url);
    const modelRef = useRef<Object3D>();
    const { camera, gl } = useThree();
    const raycaster = new Raycaster();
    const mouse = new Vector2();



    useEffect(() => {
        console.log('fbx:', fbx);
        console.log('frostingColor', frostingColor);
        console.log(DripSauce)
        if (fbx && modelColor) {
            fbx.traverse((child) => {
                if (child instanceof Mesh && child.material) {
                    if (child.material instanceof MeshStandardMaterial ||
                        child.material instanceof MeshPhongMaterial ||
                        child.material instanceof MeshLambertMaterial) {
                        child.material.color.set(modelColor);
                        child.material.needsUpdate = true;
                    }
                }
            });
        }

        fbx.traverse((child) => {
            if (child instanceof Mesh && child.material) {
                child.name = child.name || `Mesh_${child.id}`;

                if (child.name.includes("Cylinder") && child.name !== 'Cylinder002') {
                    const color = new Color(frostingColor?.hex);
                    child.material.color = color;
                    child.material.needsUpdate = true;
                }
                if (child.name.includes("Circle")) {
                    const color = new Color(DripSauce?.color);
                    child.material.color = color;
                    child.material.needsUpdate = true;
                }
            }
        });

        modelRef.current = fbx;
    }, [fbx, frostingColor, DripSauce, modelColor]);

    const rotateModel = (degrees: number) => {
        const radians = degrees * (Math.PI / 180)
        return radians;
    };


    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.x = rotateModel(rotation[0]);
            modelRef.current.rotation.y = rotateModel(rotation[1]);
            modelRef.current.rotation.z = rotateModel(rotation[2]);
            modelRef.current.scale.set(scale[0], scale[1], scale[2]);
        }
    });

    const handleClick = (event: MouseEvent) => {
        event.preventDefault();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(fbx.children, true);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            console.log('Clicked object:', clickedObject);
            clickedObject.traverse((child) => {
                if (child instanceof Mesh && child.material) {
                    console.log('modelColor:', child.material.color);
                }
            });
            onClick(clickedObject);
        }
    };

    useEffect(() => {
        const canvas = gl.domElement;
        canvas.addEventListener('click', handleClick);

        return () => {
            canvas.removeEventListener('click', handleClick);
        };
    }, [gl, camera, fbx, onClick]);

    return (
        <primitive
            ref={modelRef}
            object={fbx}
            scale={scale}
            position={position}
            onClick={(event: React.MouseEvent<Element, MouseEvent>) => onClick((event as unknown as { object: Object3D }).object)} />
    );
};

const SceneInteraction = ({ onSelect }: { onSelect: (object: Object3D) => void }) => {
    const { camera, scene } = useThree();
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    const handleMouseClick = (event: MouseEvent) => {
        // Convert mouse coordinates to normalized device coordinates (NDC)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // Calculate objects intersecting the picking ray
        const intersects: Intersection<Object3D>[] = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            const firstIntersect = intersects[0].object;
            onSelect(firstIntersect);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleMouseClick);
        return () => {
            window.removeEventListener('click', handleMouseClick);
        };
    }, []);

    return null;
};

const Render3DCakeProps = ({
    cameraPosition,
    frostingColor,
    selectedDripSauce,
    isCandle,
    isWafer,
    isMacaron,
    isStrawberry,
    isCream,
    isCherry,
    isChocolate,
    onObjectClick,
    handleCanvasCreated,
    style
}: {
    cameraPosition: [number, number, number];
    frostingColor: object;
    selectedDripSauce: object;
    isCandle: boolean;
    isWafer: boolean;
    isMacaron: boolean;
    isStrawberry: boolean;
    isCream: boolean;
    isCherry: boolean;
    isChocolate: boolean;
    onObjectClick: (object: Object3D) => void;
    handleCanvasCreated: ({ scene }: { scene: Scene }) => void;
    style: React.CSSProperties;
}) => {
    return (
        <Canvas onCreated={handleCanvasCreated} style={style}>
            <PerspectiveCamera makeDefault position={cameraPosition} />
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <FBXModel url="/public/Cake2.fbx" position={[0, -100, 0]} onClick={onObjectClick} frostingColor={frostingColor} DripSauce={selectedDripSauce} />
            {isCandle && <FBXModel url="/public/Candle.fbx" position={[0, -50, 0]} scale={[0.5, 1.4, 0.5]} onClick={onObjectClick} />}
            {isWafer && <FBXModel url="/public/Wafer.fbx" position={[-20, -100, -15]} rotation={[0, 0, 0]} scale={[1.1, 1.1, 1.1]} modelColor='#f8c471' onClick={onObjectClick} />}
            {isMacaron && <FBXModel url="/public/Macaron.fbx" position={[0, 85, 0]} rotation={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} onClick={onObjectClick} />}
            {isStrawberry && <FBXModel url="/public/Strawberry.fbx" position={[0, 85, 0]} rotation={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} modelColor='#f1948a' onClick={onObjectClick} />}
            {isCream && <FBXModel url="/public/Cream.fbx" position={[0, -100, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} onClick={onObjectClick} />}
            {isCherry && <FBXModel url="/public/Cherry.fbx" position={[0, -100, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} modelColor='#e74c3c' onClick={onObjectClick} />}
            {isChocolate && <FBXModel url="/public/Chocolate.fbx" position={[0, 15, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} modelColor='#b76732' onClick={onObjectClick} />}
            <SceneInteraction onSelect={onObjectClick} />
        </Canvas>
    );
};

export default Render3DCakeProps;