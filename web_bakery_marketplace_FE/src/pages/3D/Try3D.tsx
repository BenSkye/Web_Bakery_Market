import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Mesh, Object3D, Raycaster, Vector2, Intersection, Color, MeshStandardMaterial, MeshPhongMaterial, MeshLambertMaterial } from 'three';
import { Checkbox, Col, Progress, Radio, RadioChangeEvent, Row, Select, Tooltip, Button, Steps, message, Slider } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import '../../styles/3d/Try3D.css';

const { Step } = Steps;

const FBXModel = ({ url, onClick, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1], frostingColor, modelColor, DripSauce }: {
    url: string,
    onClick: (object: Object3D) => void,
    position: [number, number, number],
    rotation: [number, number, number],
    scale: [number, number, number],
    modelColor?: string,
    frostingColor: string,
    DripSauce: string
}) => {
    const fbx = useLoader(FBXLoader, url);
    const modelRef = useRef<Object3D>();
    const { camera, gl } = useThree();
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    useEffect(() => {
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
                    const color = new Color(frostingColor);
                    child.material.color = color;
                    child.material.needsUpdate = true;
                }
                if (child.name.includes("Circle")) {
                    const color = new Color(DripSauce);
                    child.material.color = color;
                    child.material.needsUpdate = true;
                }
            }
        });

        modelRef.current = fbx;
    }, [fbx, frostingColor, DripSauce, modelColor]);

    const rotateModel = (degrees: number) => {
        return degrees * (Math.PI / 180);
    };

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.0055;
            modelRef.current.rotation.x = rotateModel(rotation[0]);
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
            onClick(intersects[0].object);
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
            onClick={(event: React.MouseEvent<Element, MouseEvent>) => onClick((event as unknown as { object: Object3D }).object)}
        />
    );
};

const Scene = ({ onSelect }: { onSelect: (object: Object3D) => void }) => {
    const { camera, scene } = useThree();
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    const handleMouseClick = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects: Intersection<Object3D>[] = raycaster.intersectObjects(scene.children, true);
        if (intersects.length > 0) {
            onSelect(intersects[0].object);
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

const CakeZoomStep = ({ zoomLevel, handleZoomChange }: { zoomLevel: number, handleZoomChange: (value: number) => void }) => (
    <div>
        <h4 style={{ color: 'black' }}>Điều chỉnh góc nhìn</h4>
        <Slider
            min={0.5}
            max={2}
            step={0.1}
            value={zoomLevel}
            onChange={handleZoomChange}
            marks={{
                0.5: 'Xa',
                1: 'Bình thường',
                2: 'Gần'
            }}
        />
    </div>
);

const FrostingStep = ({ frostingColor, handleFrostingColorChange }: { frostingColor: string, handleFrostingColorChange: (e: RadioChangeEvent) => void }) => (
    <div>
        <h4 style={{ color: 'black' }}>Chọn màu kem phủ</h4>
        <Radio.Group
            onChange={handleFrostingColorChange}
            value={frostingColor}
            className="color-picker"
        >
            {frostingColors.map((color) => (
                <Tooltip title={color.name} key={color.hex}>
                    <Radio.Button
                        value={color.hex}
                        style={{
                            backgroundColor: color.hex,
                            width: '35px',
                            height: '35px',
                            borderRadius: '50%',
                            margin: '0 5px',
                        }}
                    />
                </Tooltip>
            ))}
        </Radio.Group>
    </div>
);

const DripSauceStep = ({ selectedDripSauce, handleDripSauceChange }: { selectedDripSauce: string, handleDripSauceChange: (value: string) => void }) => (
    <div>
        <h4 style={{ color: 'black' }}>Chọn sốt chảy</h4>
        <Select
            style={{ width: '100%' }}
            placeholder="Chọn sốt chảy"
            onChange={handleDripSauceChange}
            value={selectedDripSauce}
        >
            {dripSauces.map((sauce) => (
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
                        {sauce.name}
                    </div>
                </Select.Option>
            ))}
        </Select>
    </div>
);

const DecorationsStep = ({ decorations, handleDecorationChange, optionsWithDisabled }: { decorations: CheckboxValueType[], handleDecorationChange: (checkedValues: CheckboxValueType[]) => void, optionsWithDisabled: any[] }) => (
    <div>
        <h4 style={{ color: 'black' }}>Thêm trang trí</h4>
        <Checkbox.Group
            options={optionsWithDisabled}
            value={decorations}
            onChange={handleDecorationChange}
            className="decoration-options"
        />
    </div>
);

const TryCake3D = () => {
    const [progress, setProgress] = useState<number>(0);
    const [selectedObject, setSelectedObject] = useState<Object3D | null>(null);
    const [zoomLevel, setZoomLevel] = useState<number>(1);
    const [frostingColor, setFrostingColor] = useState<string>(frostingColors[0].hex);
    const [selectedDripSauce, setSelectedDripSauce] = useState<string>('');
    const [decorations, setDecorations] = useState<CheckboxValueType[]>([]);
    const [disabledOptions, setDisabledOptions] = useState<CheckboxValueType[]>([]);
    const [activeStep, setActiveStep] = useState<number>(0);

    const steps = ['Góc nhìn', 'Kem phủ', 'Sốt chảy', 'Trang trí'];

    const baseCameraPosition: [number, number, number] = [0, 500, 450];
    const cameraPosition: [number, number, number] = baseCameraPosition.map(coord => coord / zoomLevel) as [number, number, number];

    useEffect(() => {
        const totalSteps = 4;
        let completedSteps = 0;
        if (zoomLevel !== 1) completedSteps++;
        if (frostingColor) completedSteps++;
        if (selectedDripSauce) completedSteps++;
        if (decorations.length > 0) completedSteps++;
        setProgress((completedSteps / totalSteps) * 100);
    }, [zoomLevel, frostingColor, selectedDripSauce, decorations]);

    const handleDecorationChange = (checkedValues: CheckboxValueType[]) => {
        setDecorations(checkedValues);
        const specialOptions = ['cherry', 'chocolate', 'macaron'];
        const selectedSpecialOption = specialOptions.find(option => checkedValues.includes(option));
        if (selectedSpecialOption) {
            setDisabledOptions(specialOptions.filter(option => option !== selectedSpecialOption));
        } else {
            setDisabledOptions([]);
        }
    };

    const handleDripSauceChange = (value: string) => {
        setSelectedDripSauce(value);
    };

    const handleObjectClick = (object: Object3D) => {
        setSelectedObject(object);
        console.log('Selected object:', object);
    };

    const handleFrostingColorChange = (e: RadioChangeEvent) => {
        setFrostingColor(e.target.value);
    };

    const handleZoomChange = (value: number) => {
        setZoomLevel(value);
    };

    const optionsWithDisabled = decorationOptions.map(option => ({
        ...option,
        disabled: disabledOptions.includes(option.value)
    }));

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <CakeZoomStep
                        zoomLevel={zoomLevel}
                        handleZoomChange={handleZoomChange}
                    />
                );
            case 1:
                return (
                    <FrostingStep
                        frostingColor={frostingColor}
                        handleFrostingColorChange={handleFrostingColorChange}
                    />
                );
            case 2:
                return (
                    <DripSauceStep
                        selectedDripSauce={selectedDripSauce}
                        handleDripSauceChange={handleDripSauceChange}
                    />
                );
            case 3:
                return (
                    <DecorationsStep
                        decorations={decorations}
                        handleDecorationChange={handleDecorationChange}
                        optionsWithDisabled={optionsWithDisabled}
                    />
                );
            default:
                return null;
        }
    };

    const handleFinish = () => {
        message.success('Thiết kế bánh của bạn đã hoàn thành!');
        // Here you can add logic to save the design or proceed to order
    };

    return (
        <div className="cake-designer-container">
            <div className="cake-preview">
                <Canvas>
                    <PerspectiveCamera
                        makeDefault
                        position={cameraPosition}
                        fov={75 / zoomLevel}
                    />
                    <OrbitControls enableZoom={false} />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={0.8} />
                    <spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} intensity={0.5} />
                    <FBXModel
                        url="/public/Cake2.fbx"
                        position={[0, -100, 0]}
                        onClick={handleObjectClick}
                        frostingColor={frostingColor}
                        DripSauce={selectedDripSauce}
                    />
                    {decorations.includes('candle') && (
                        <FBXModel
                            url="/public/Candle.fbx"
                            position={[0, -50, 0]}
                            scale={[0.5, 1.4, 0.5]}
                            onClick={(object) => setSelectedObject(object)}
                        />
                    )}
                    {decorations.includes('wafer') && (
                        <FBXModel
                            url="/public/Wafer.fbx"
                            position={[-20, -100, -15]}
                            rotation={[0, 0, 0]}
                            scale={[1.1, 1.1, 1.1]}
                            modelColor='#f8c471'
                            onClick={(object) => setSelectedObject(object)}
                        />
                    )}
                    {decorations.includes('macaron') && (
                        <FBXModel
                            url="/public/Macaron.fbx"
                            position={[0, 85, 0]}
                            rotation={[0, 0, 0]}
                            scale={[0.5, 0.5, 0.5]}
                            onClick={(object) => setSelectedObject(object)}
                        />
                    )}
                    {decorations.includes('strawberry') && (
                        <FBXModel
                            url="/public/Strawberry.fbx"
                            position={[0, 85, 0]}
                            rotation={[0, 0, 0]}
                            scale={[0.5, 0.5, 0.5]}
                            modelColor='#f1948a'
                            onClick={(object) => setSelectedObject(object)}
                        />
                    )}
                    {decorations.includes('cream') && (
                        <FBXModel
                            url="/public/Cream.fbx"
                            position={[0, -100, 0]}
                            rotation={[0, 0, 0]}
                            scale={[1, 1, 1]}
                            onClick={(object) => setSelectedObject(object)}
                        />
                    )}
                    {decorations.includes('cherry') && (
                        <FBXModel
                            url="/public/Cherry.fbx"
                            position={[0, -100, 0]}
                            rotation={[0, 0, 0]}
                            scale={[1, 1, 1]}
                            modelColor='#e74c3c'
                            onClick={(object) => setSelectedObject(object)}
                        />
                    )}
                    {decorations.includes('chocolate') && (
                        <FBXModel
                            url="/public/Chocolate.fbx"
                            position={[0, 15, 0]}
                            rotation={[0, 0, 0]}
                            scale={[1, 1, 1]}
                            modelColor='#b76732'
                            onClick={(object) => setSelectedObject(object)}
                        />
                    )}
                    <Scene onSelect={(object) => setSelectedObject(object)} />
                </Canvas>
            </div>
            <div className="cake-controls">
                <Steps current={activeStep} onChange={setActiveStep}>
                    {steps.map(step => <Step key={step} title={step} />)}
                </Steps>
                <div className="step-content">
                    {renderStepContent(activeStep)}
                </div>
                <div className="navigation-buttons">
                    {activeStep > 0 && (
                        <Button onClick={() => setActiveStep(activeStep - 1)}>Quay lại</Button>
                    )}
                    {activeStep < steps.length - 1 && (
                        <Button type="primary" onClick={() => setActiveStep(activeStep + 1)}>Tiếp theo</Button>
                    )}
                    {activeStep === steps.length - 1 && (
                        <Button type="primary" onClick={handleFinish}>Hoàn thành</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TryCake3D;

const frostingColors = [
    { name: "Trắng", hex: "#FFFFFF" },
    { name: "Hồng", hex: "#ffabba" },
    { name: "Xanh Dương", hex: "#95d6eb" },
    { name: "Vàng", hex: "#FFFF00" },
    { name: "Đỏ", hex: "#ff5959" },
    { name: "Xanh Lá Cây", hex: "#90EE90" },
    { name: "Nâu", hex: "#a06f4c" },
    { name: "Tím", hex: "#cc69cc" }
];

const dripSauces = [
    {
        name: "Sốt Socola Đen",
        color: "#3B2F2F",
        description: "Làm từ socola đen, tạo ra lớp sốt chảy màu nâu đậm và hương vị đậm đà."
    },
    {
        name: "Sốt Socola Trắng",
        color: "#F4F1EB",
        description: "Làm từ socola trắng, tạo hiệu ứng chảy với màu trắng kem."
    },
    {
        name: "Sốt Socola Sữa",
        color: "#D2A679",
        description: "Sốt từ socola sữa, có màu nâu nhạt và hương vị ngọt ngào."
    },
    {
        name: "Sốt Caramel",
        color: "#C68C53",
        description: "Sốt caramel ngọt ngào, có màu vàng nâu sáng bóng."
    },
    {
        name: "Sốt Dâu",
        color: "#FF4B5C",
        description: "Làm từ dâu tươi hoặc siro dâu, có màu đỏ hồng và hương vị trái cây."
    },
    {
        name: "Sốt Việt Quất",
        color: "#4B0082",
        description: "Làm từ việt quất, tạo ra lớp sốt màu tím xanh đặc trưng."
    },
    {
        name: "Sốt Chanh",
        color: "#F9E79F",
        description: "Làm từ chanh, có màu vàng nhạt tươi sáng và vị chua nhẹ."
    },
    {
        name: "Sốt Cam",
        color: "#FFA500",
        description: "Sốt cam có màu cam tươi sáng, thích hợp cho bánh vị cam."
    }
];

const decorationOptions = [
    { label: 'Thêm nến', value: 'candle' },
    { label: 'Bánh Wafer', value: 'wafer' },
    { label: 'Bánh Macaron', value: 'macaron' },
    { label: 'Dâu Tây', value: 'strawberry' },
    { label: 'Kem', value: 'cream' },
    { label: 'Đào', value: 'cherry' },
    { label: 'Socola', value: 'chocolate' },
];