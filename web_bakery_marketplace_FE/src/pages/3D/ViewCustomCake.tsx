import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Mesh, Object3D, Raycaster, Vector2, Intersection, Color, MeshStandardMaterial, MeshPhongMaterial, MeshLambertMaterial, Scene } from 'three';
import { Card, Col, Divider, message, Row, Spin, Typography } from 'antd';
import { convertToVND } from '../../utils';
import { getCakeOptionByBakeryId } from '../../services/cakeoptionService';

import { getOrderProductById } from '../../services/orderProductService';
import CakeVisualization from './CakeVisualizationProps';
import { useParams } from 'react-router-dom';

const { Title, Text } = Typography;

const ViewCustomCake = () => {
    const [selectedObject, setSelectedObject] = useState<Object3D | null>(null);
    const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 500, 1000]);
    const [selectedFilling, setSelectedFilling] = useState<any>({});
    const [frostingColor, setFrostingColor] = useState<any>({});
    const [selectedDripSauce, setSelectedDripSauce] = useState<any>({});
    const [isCandle, setIsCandle] = useState<boolean>(false);
    const [isWafer, setIsWafer] = useState<boolean>(false);
    const [isMacaron, setIsMacaron] = useState<boolean>(false);
    const [isStrawberry, setIsStrawberry] = useState<boolean>(false);
    const [isCream, setIsCream] = useState<boolean>(false);
    const [isCherry, setIsCherry] = useState<boolean>(false);
    const [isChocolate, setIsChocolate] = useState<boolean>(false);
    const [selectedDecorations, setSelectedDecorations] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const [decorationOptions, setDecorationsOptions] = useState<object[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isReady, setIsReady] = useState<boolean>(false);

    const sceneRef = useRef<Scene | null>(null);
    const { id } = useParams<{ id: string }>();

    const [orderProduct, setOrderProduct] = useState<any>({});

    const fetchOrderProductById = async () => {
        setLoading(true);
        const response = await getOrderProductById(id);
        console.log('response:', response.metadata);
        setOrderProduct(response.metadata);
    }
    const fetchCakeOption = async () => {
        if (orderProduct?.bakery_id) {
            try {
                const cakeOption = await getCakeOptionByBakeryId(orderProduct.bakery_id);
                console.log('Cake option:', cakeOption);
                setDecorationsOptions(cakeOption.metadata.cakeDecoration);
                setSelectedFilling(orderProduct.customCake.selectedFilling);
                setFrostingColor(orderProduct.customCake.frostingColor);
                setSelectedDripSauce(orderProduct.customCake.selectedDripSauce);
                setSelectedDecorations(orderProduct.customCake.selectedDecorations);
                setTotalPrice(orderProduct.price);
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

    useEffect(() => {
        fetchOrderProductById();
    }, []);

    useEffect(() => {
        fetchCakeOption();
    }, [orderProduct]);

    const setDecoration = (decorations: any[]) => {
        console.log('decorations:', decorations);
        console.log('decorationOptions:', decorationOptions);

        const newSelectedDecorations = decorations.map(decoration => {
            const foundDecoration = decorationOptions.find((option: any) => option.value === decoration.value);
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
        setIsReady(true);
    };
    const handleObjectClick = (object: Object3D) => {
        setSelectedObject(object);
        console.log('Selected object:', object);
    };

    const handleCanvasCreated = useCallback(({ scene }: { scene: Scene }) => {
        sceneRef.current = scene;
    }, []);


    if (loading || !isReady) {
        return <Spin />;
    }
    return (
        <Row gutter={[24, 24]}>
            <Col span={16}>
                {selectedDripSauce && frostingColor && isReady && (
                    <CakeVisualization
                        cameraPosition={cameraPosition}
                        frostingColor={frostingColor}
                        selectedDripSauce={selectedDripSauce}
                        isCandle={isCandle}
                        isWafer={isWafer}
                        isMacaron={isMacaron}
                        isStrawberry={isStrawberry}
                        isCream={isCream}
                        isCherry={isCherry}
                        isChocolate={isChocolate}
                        onObjectClick={handleObjectClick}
                        handleCanvasCreated={handleCanvasCreated}
                        style={{ height: '80vh' }}
                    />
                )}

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



