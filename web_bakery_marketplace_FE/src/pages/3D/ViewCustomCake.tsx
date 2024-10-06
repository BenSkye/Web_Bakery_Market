import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { Mesh, Object3D, Raycaster, Vector2, Intersection, Color, MeshStandardMaterial, MeshPhongMaterial, MeshLambertMaterial, Scene } from 'three';
import { Button, Card, Checkbox, Col, Divider, Form, Input, message, Modal, Radio, RadioChangeEvent, Row, Select, Spin, Tooltip, TreeSelect, TreeSelectProps, Typography } from 'antd';
import { TreeNode } from 'antd/es/tree-select';
import { convertToVND } from '../../utils';
import { getCakeOptionByBakeryId } from '../../services/cakeoptionService';
import { useAuth } from '../../stores/authContex';
import { EditOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { createOrderCakeDesign } from '../../services/checkoutService';
import { getOrderProductById } from '../../services/orderProductService';
import { useParams } from 'react-router-dom';

const { Title, Text } = Typography;

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

const ViewCustomCake = () => {
    const [selectedObject, setSelectedObject] = useState<Object3D | null>(null);
    const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 500, 1000]);
    const [cakeSize, setCakeSize] = useState<number>(20);
    const [cakeColor, setCakeColor] = useState<Color>('#FFFFFF');
    const [selectedFilling, setSelectedFilling] = useState<object>({});
    const [frostingColor, setFrostingColor] = useState<object>({});
    const [selectedDripSauce, setSelectedDripSauce] = useState<object>({});
    const [isCandle, setIsCandle] = useState<boolean>(false);
    const [isWafer, setIsWafer] = useState<boolean>(false);
    const [isMacaron, setIsMacaron] = useState<boolean>(false);
    const [isStrawberry, setIsStrawberry] = useState<boolean>(false);
    const [isCream, setIsCream] = useState<boolean>(false);
    const [isCherry, setIsCherry] = useState<boolean>(false);
    const [isChocolate, setIsChocolate] = useState<boolean>(false);
    const [selectedDecorations, setSelectedDecorations] = useState<object[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const [decorationOptions, setDecorationsOptions] = useState<object[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const sceneRef = useRef<Scene | null>(null);

    const { id } = useParams<{ id: string }>();

    const [orderProduct, setOrderProduct] = useState<object>({});

    const fetchOrderProductById = async () => {
        const response = await getOrderProductById(id);
        console.log('response:', response.metadata);
        setOrderProduct(response.metadata);
        setSelectedFilling(response.metadata.customCake.selectedFilling);
        setFrostingColor(response.metadata.customCake.frostingColor);
        setSelectedDripSauce(response.metadata.customCake.selectedDripSauce);
        setSelectedDecorations(response.metadata.customCake.selectedDecorations);
        setTotalPrice(response.metadata.price);

    }

    useEffect(() => {
        fetchOrderProductById();
    }, []);

    useEffect(() => {
        const fetchCakeOption = async () => {
            setLoading(true);
            if (orderProduct?.bakery_id) {
                try {
                    const cakeOption = await getCakeOptionByBakeryId(orderProduct.bakery_id);
                    console.log('Cake option:', cakeOption);
                    setDecorationsOptions(cakeOption.metadata.cakeDecoration);

                    // Xử lý decorations từ orderProduct
                    if (orderProduct.customCake && orderProduct.customCake.selectedDecorations) {
                        setDecoration(orderProduct.customCake.selectedDecorations);
                    }
                } catch (error) {
                    console.error('Error fetching cake options:', error);
                    message.error('Không thể tải tùy chọn bánh');
                }
            }
            setLoading(false);
        };

        fetchCakeOption();
    }, [orderProduct]);

    const setDecoration = (decorations: any[]) => {
        console.log('decorations:', decorations);
        console.log('decorationOptions:', decorationOptions);

        const newSelectedDecorations = decorations.map(decoration => {
            const foundDecoration = decorationOptions.find(option => option.value === decoration.value);
            return foundDecoration || decoration;
        });

        console.log('newSelectedDecorations:', newSelectedDecorations);
        setSelectedDecorations(newSelectedDecorations);

        // Cập nhật các state tương ứng
        setIsCandle(newSelectedDecorations.some(d => d.value === 'candle'));
        setIsWafer(newSelectedDecorations.some(d => d.value === 'wafer'));
        setIsMacaron(newSelectedDecorations.some(d => d.value === 'macaron'));
        setIsStrawberry(newSelectedDecorations.some(d => d.value === 'strawberry'));
        setIsCream(newSelectedDecorations.some(d => d.value === 'cream'));
        setIsCherry(newSelectedDecorations.some(d => d.value === 'cherry'));
        setIsChocolate(newSelectedDecorations.some(d => d.value === 'chocolate'));
    };
    const handleObjectClick = (object: Object3D) => {
        setSelectedObject(object);
        console.log('Selected object:', object);
    };

    const handleCanvasCreated = useCallback(({ scene }: { scene: Scene }) => {
        sceneRef.current = scene;
    }, []);
    useEffect(() => {
        console.log('Camera position:', cameraPosition);
    }, [cameraPosition]);

    if (loading) {
        return <Spin />;
    }
    return (
        <Row gutter={[24, 24]}>
            <Col span={16}>
                <Canvas onCreated={handleCanvasCreated} style={{ height: '80vh' }}>
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
                    <SceneInteraction onSelect={(object) => setSelectedObject(object)} />
                </Canvas>
            </Col>
            <Col span={8}>
                <Card title="Thông tin bánh">
                    <Title level={4}>Chi tiết đơn hàng</Title>
                    <Divider />
                    <Divider />
                    <Text strong>Nhân bánh:</Text>
                    <Text> {selectedFilling?.name || 'N/A'}</Text>
                    <Divider />
                    <Text strong>Màu kem:</Text>
                    <Text> {frostingColor?.name || 'N/A'}</Text>
                    <Divider />
                    <Text strong>Sốt chảy:</Text>
                    <Text> {selectedDripSauce?.name || 'N/A'}</Text>
                    <Divider />
                    <Text strong>Trang trí:</Text>
                    <ul>
                        {selectedDecorations.map((decoration, index) => (
                            <li key={index}>{decoration?.label || 'N/A'}</li>
                        ))}
                    </ul>
                    <Divider />
                    <Title level={4}>Tổng giá: {convertToVND(totalPrice)}</Title>
                </Card>
            </Col>
        </Row>
    );
};

export default ViewCustomCake;



