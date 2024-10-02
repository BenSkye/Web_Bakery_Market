import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Mesh, Object3D, Raycaster, Vector2, Intersection, Color, MeshStandardMaterial, MeshPhongMaterial, MeshLambertMaterial } from 'three';
import { Checkbox, Col, Progress, Radio, RadioChangeEvent, Row, Select, Tooltip, TreeSelectProps, Typography } from 'antd';

const { Title } = Typography;

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
        frostingColor: string,
        DripSauce: string
    }) => {
    const fbx = useLoader(FBXLoader, url);
    const modelRef = useRef<Object3D>();
    const { camera, gl, scene } = useThree();
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
        const radians = degrees * (Math.PI / 180)
        return radians;
    };


    useFrame(() => {
        if (modelRef.current) {
            // Tăng góc xoay của trục Y để mô hình tự động xoay
            modelRef.current.rotation.y += 0.0055; // Giá trị này xác định tốc độ xoay, bạn có thể thay đổi cho phù hợp
            modelRef.current.rotation.x = rotateModel(rotation[0]);
            modelRef.current.rotation.z = rotateModel(rotation[2]);
            modelRef.current.scale.set(scale[0], scale[2], scale[2]);
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
    //   if (modelRef.current) {
    //     modelRef.current.rotation.y += 0.01;
    //   }
    // });

    return (
        <primitive
            ref={modelRef}
            object={fbx}
            scale={scale}
            position={position}
            onClick={(event: React.MouseEvent<Element, MouseEvent>) => onClick((event as unknown as { object: Object3D }).object)} />
    );
};

const Scene = ({ onSelect }: { onSelect: (object: Object3D) => void }) => {
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



const TryCake3D = () => {
    const [progress, setProgress] = useState<number>(0);
    const [selectedObject, setSelectedObject] = useState<Object3D | null>(null);
    const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([100, 500, 450]);
    const [cakeSize, setCakeSize] = useState<number>(20);
    const [cakeColor, setCakeColor] = useState<Color>('#FFFFFF');
    const [selectedFilling, setSelectedFilling] = useState<string>('');
    const [frostingColor, setFrostingColor] = useState<string>(frostingColors[0].hex);
    const [selectedDripSauce, setSelectedDripSauce] = useState<string>('');
    const [isCandle, setIsCandle] = useState<boolean>(false);
    const [isWafer, setIsWafer] = useState<boolean>(false);
    const [isMacaron, setIsMacaron] = useState<boolean>(false);
    const [isStrawberry, setIsStrawberry] = useState<boolean>(false);
    const [isCream, setIsCream] = useState<boolean>(false);
    const [isCherry, setIsCherry] = useState<boolean>(false);
    const [isChocolate, setIsChocolate] = useState<boolean>(false);
    const [decorations, setDecorations] = useState<CheckboxValueType[]>([]);
    const [disabledOptions, setDisabledOptions] = useState<CheckboxValueType[]>([]);

    useEffect(() => {
        // Example of updating progress as the user makes changes
        const totalSteps = 5; // Frosting, Drip Sauce, and 3 Decorations
        let completedSteps = 0;

        if (frostingColor) completedSteps++;
        if (selectedDripSauce) completedSteps++;
        if (decorations.length > 0) completedSteps++;

        setProgress((completedSteps / totalSteps) * 100);
    }, [frostingColor, selectedDripSauce, decorations]);

    const handleDecorationChange = (checkedValues: CheckboxValueType[]) => {
        setDecorations(checkedValues);
        // Cập nhật các state tương ứng
        setIsCandle(checkedValues.includes('candle'));
        setIsWafer(checkedValues.includes('wafer'));
        setIsMacaron(checkedValues.includes('macaron'));
        setIsStrawberry(checkedValues.includes('strawberry'));
        setIsCream(checkedValues.includes('cream'));
        setIsCherry(checkedValues.includes('cherry'));
        setIsChocolate(checkedValues.includes('chocolate'));

        const specialOptions = ['cherry', 'chocolate', 'macaron'];
        const selectedSpecialOption = specialOptions.find(option => checkedValues.includes(option));
        if (selectedSpecialOption) {
            setDisabledOptions(specialOptions.filter(option => option !== selectedSpecialOption));
        } else {
            setDisabledOptions([]);
        }
    };


    const optionsWithDisabled = decorationOptions.map(option => ({
        ...option,
        disabled: disabledOptions.includes(option.value)
    }));

    const handleDripSauceChange = (value: string) => {
        setSelectedDripSauce(value);
    };
    const handleObjectClick = (object: Object3D) => {
        setSelectedObject(object);
        console.log('Selected object:', object);
    };
    const handleFillingChange: TreeSelectProps['onChange'] = (value, node) => {
        setSelectedFilling(value as string);
    };

    const handleFrostingColorChange = (e: RadioChangeEvent) => {
        setFrostingColor(e.target.value);
    };


    useEffect(() => {
        console.log('Camera position:', cameraPosition);
    }, [cameraPosition]);

    return (
        < >
            <>
                <Canvas style={{ height: '255px' }}>
                    <PerspectiveCamera makeDefault position={cameraPosition} />
                    <OrbitControls />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} />
                    <FBXModel url="/public/Cake2.fbx" position={[0, -100, 0]} onClick={handleObjectClick} frostingColor={frostingColor} DripSauce={selectedDripSauce} />
                    {isCandle && <FBXModel url="/public/Candle.fbx" position={[0, -50, 0]} scale={[0.5, 1.4, 0.5]} onClick={(object) => setSelectedObject(object)} />}
                    {isWafer && <FBXModel url="/public/Wafer.fbx" position={[-20, -100, -15]} rotation={[0, 0, 0]} scale={[1.1, 1.1, 1.1]} modelColor='#f8c471' onClick={(object) => setSelectedObject(object)} />}
                    {isMacaron && <FBXModel url="/public/Macaron.fbx" position={[0, 85, 0]} rotation={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} onClick={(object) => setSelectedObject(object)} />}
                    {isStrawberry && <FBXModel url="/public/Strawberry.fbx" position={[0, 85, 0]} rotation={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} modelColor='#f1948a' onClick={(object) => setSelectedObject(object)} />}
                    {isCream && <FBXModel url="/public/Cream.fbx" position={[0, -100, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} onClick={(object) => setSelectedObject(object)} />}
                    {isCherry && <FBXModel url="/public/Cherry.fbx" position={[0, -100, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} modelColor='#e74c3c' onClick={(object) => setSelectedObject(object)} />}
                    {isChocolate && <FBXModel url="/public/Chocolate.fbx" position={[0, 15, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} modelColor='#b76732' onClick={(object) => setSelectedObject(object)} />}
                    <Scene onSelect={(object) => setSelectedObject(object)} />
                </Canvas>
            </>




            <Row gutter={[16, 16]}>

                <Col span={14} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <label style={{ marginRight: '10px' }}>Màu kem phủ:</label>
                    <Radio.Group
                        onChange={handleFrostingColorChange}
                        value={frostingColor}
                        style={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                        {frostingColors.map((color) => (
                            <Tooltip title={color.name} key={color.hex}>
                                <Radio.Button
                                    value={color.hex}
                                    style={{
                                        backgroundColor: color.hex,
                                        width: '35px',
                                        height: '30px',
                                    }}
                                />
                            </Tooltip>
                        ))}
                    </Radio.Group>

                </Col>


                <Col span={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <label style={{ marginRight: '10px' }}>Sốt phủ:</label>
                    <Select
                        style={{ width: '50%' }}
                        placeholder="Chọn sốt phủ"
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
                </Col>

            </Row>
            <Col span={24} >
                <Title level={5}>Trang trí</Title>
                <Checkbox.Group
                    options={optionsWithDisabled}
                    value={decorations}
                    onChange={handleDecorationChange}
                    style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}
                />
            </Col>
            <Progress percent={progress} />
        </>
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
