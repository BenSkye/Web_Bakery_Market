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
import { FBXModel, SceneInteraction } from '../../components/cakeCustomization/ThreeDModel';
import AddressSection from '../../components/cakeCustomization/AddressSection';
import { OrderButton } from '../../components/cakeCustomization/OrderButton';
import { DecorationCheckboxGroup } from '../../components/cakeCustomization/DecorationCheckboxGroup';
import { DripSauceSelect } from '../../components/cakeCustomization/DripSauceSelect';
import { FrostingColorPicker } from '../../components/cakeCustomization/FrostingColorPicker';
import { FillingSelector } from '../../components/cakeCustomization/FillingSelector';
import { PriceSummary } from '../../components/cakeCustomization/PriceSummary';
type CheckboxValueType = string | number | boolean;

const { Title, Text } = Typography;

const CakeModel = ({ bakeryId }: { bakeryId: string }) => {
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
  const [decorations, setDecorations] = useState<CheckboxValueType[]>([]);
  const [selectedDecorations, setSelectedDecorations] = useState<any[]>([]);
  const [disabledOptions, setDisabledOptions] = useState<CheckboxValueType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [cakeFillings, setCakeFillings] = useState<any[]>([]);
  const [frostingColors, setFrostingColors] = useState<any[]>([]);
  const [dripSauces, setDripSauces] = useState<any[]>([]);
  const [decorationOptions, setDecorationsOptions] = useState<any[]>([]);
  const [basePrice, setBasePrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [userAddress, setUserAddress] = useState<any>({});

  const sceneRef = useRef<Scene | null>(null);

  const { user } = useAuth();


  useEffect(() => {
    const fetchCakeOption = async () => {
      setLoading(true);
      if (bakeryId) {
        const cakeOption = await getCakeOptionByBakeryId(bakeryId);
        console.log('Cake option:', cakeOption);
        setCakeFillings(cakeOption.metadata.cakeFillings);
        setFrostingColors(cakeOption.metadata.cakeFrosting);
        setDripSauces(cakeOption.metadata.cakeDripSauce);
        setDecorationsOptions(cakeOption.metadata.cakeDecoration);
        setBasePrice(cakeOption.metadata.basePrice);
        setTotalPrice(cakeOption.metadata.basePrice);
      }
    };
    fetchCakeOption();
    setLoading(false);
  }, [bakeryId]);

  useEffect(() => {
    console.log('selectedFilling:', selectedFilling);
    console.log('frostingColor:', frostingColor);
    console.log('selectedDripSauce:', selectedDripSauce);
    console.log('selectedDecorations:', selectedDecorations);
    caculatePrice();
  }, [selectedFilling, frostingColor, selectedDripSauce, selectedDecorations]);

  const caculatePrice = () => {
    let price = basePrice;
    if (selectedFilling.price) {
      price += selectedFilling.price;
      console.log('selectedFillingprice:', selectedFilling.price)
    }
    if (frostingColor.price) {
      price += frostingColor.price;
      console.log('frostingColorprice:', frostingColor.price)
    }
    if (selectedDripSauce.price) {
      price += selectedDripSauce.price;
      console.log('selectedDripSauceprice:', selectedDripSauce.price)
    }
    if (selectedDecorations.length > 0) {
      price += selectedDecorations.reduce((sum, decoration) => sum + decoration.price, 0);
      console.log('selectedDecorationsprice:', selectedDecorations.reduce((sum, decoration) => sum + decoration.price, 0))
    }
    console.log('price:', price)
    setTotalPrice(price);
  }
  const handleDecorationChange = (checkedValues: CheckboxValueType[]) => {
    const newSelectedDecorations = decorationOptions.filter(decoration =>
      checkedValues.includes(decoration.value)
    );
    setSelectedDecorations(newSelectedDecorations);
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

  const optionsWithDisabled = decorationOptions?.map(option => ({
    ...option,
    disabled: disabledOptions.includes(option.value)
  }));
  const handleDripSauceChange = (value: string) => {
    const selectedSauce = dripSauces.find(sauce => sauce.color === value);
    if (selectedSauce) {
      setSelectedDripSauce(selectedSauce);
    }
  };
  const handleObjectClick = (object: Object3D) => {
    setSelectedObject(object);
    console.log('Selected object:', object);
  };
  const handleFillingChange: TreeSelectProps['onChange'] = (value, node) => {
    const selectedBranch = cakeFillings.find(branch => branch.fillings.some((filling: any) => filling.name === value));
    if (selectedBranch) {
      const selectedFilling = selectedBranch.fillings.find((filling: any) => filling.name === value);
      if (selectedFilling) {
        setSelectedFilling(selectedFilling);
      }
    }
  };
  const handleFrostingColorChange = (e: RadioChangeEvent) => {
    const selectedColor = frostingColors.find(color => color.hex === e.target.value);
    if (selectedColor) {
      setFrostingColor(selectedColor);
    }
  };
  const handleCanvasCreated = useCallback(({ scene }: { scene: Scene }) => {
    sceneRef.current = scene;
  }, []);

  const [form] = Form.useForm();
  const [order, setOrder] = useState<any>({});
  const [newAddress, setNewAddress] = useState<any>({});
  const [newAddressVisible, setNewAddressVisible] = useState(false);
  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        console.log('New Address:', values);
        setNewAddress(values)
        setNewAddressVisible(false);
        setOrder({
          ...order,
          user_address: values
        })
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setNewAddressVisible(false);
  };


  const handleSubmitRequest = () => {
    setOrder((prevOrder: any) => {
      const newOrder = {
        ...prevOrder,
        bakery_id: bakeryId,
        quantity: 1,
        price: totalPrice,
        customCake: { selectedFilling, frostingColor, selectedDripSauce, selectedDecorations },
        user_address: userAddress
      };
      console.log('newOrder:', newOrder);

      if (!newOrder.user_address?.address) {
        message.error('Vui lòng nhập địa chỉ nhận hàng');
      } else {
        console.log('order:', newOrder);
        createOrderCakeDesign(newOrder)
          .then(response => {
            if (response.status === 200) {
              message.success('Gửi yêu cầu thành công');
            } else {
              message.error('Gửi yêu cầu thất bại');
            }
            console.log('response:', response);
          })
          .catch(error => {
            console.error('Error submitting order:', error);
            message.error('Có lỗi xảy ra khi gửi yêu cầu');
          });
      }

      return newOrder;
    });
  };


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
          <FBXModel url="/Cake2.fbx" position={[0, -100, 0]}
            onClick={handleObjectClick}
            frostingColor={frostingColor}
            DripSauce={selectedDripSauce} />
          {isCandle && <FBXModel url="/Candle.fbx" position={[0, -50, 0]} scale={[0.5, 1.4, 0.5]} onClick={(object) => setSelectedObject(object)} />}
          {isWafer && <FBXModel url="/Wafer.fbx" position={[-20, -100, -15]} rotation={[0, 0, 0]} scale={[1.1, 1.1, 1.1]} modelColor='#f8c471' onClick={(object) => setSelectedObject(object)} />}
          {isMacaron && <FBXModel url="/Macaron.fbx" position={[0, 85, 0]} rotation={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} onClick={(object) => setSelectedObject(object)} />}
          {isStrawberry && <FBXModel url="/Strawberry.fbx" position={[0, 85, 0]} rotation={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} modelColor='#f1948a' onClick={(object) => setSelectedObject(object)} />}
          {isCream && <FBXModel url="/Cream.fbx" position={[0, -100, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} onClick={(object) => setSelectedObject(object)} />}
          {isCherry && <FBXModel url="/Cherry.fbx" position={[0, -100, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} modelColor='#e74c3c' onClick={(object) => setSelectedObject(object)} />}
          {isChocolate && <FBXModel url="/Chocolate.fbx" position={[0, 15, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} modelColor='#b76732' onClick={(object) => setSelectedObject(object)} />}
          <SceneInteraction onSelect={(object) => setSelectedObject(object)} />
        </Canvas>
      </Col>


      <Col span={8} style={{ background: '#f1948a', borderRadius: '10px', padding: '10px' }}>
        <Card title={<Title level={3}>Tùy chỉnh bánh</Title>} style={{ height: '80vh', overflowY: 'auto' }}>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <FillingSelector
                cakeFillings={cakeFillings}
                handleFillingChange={handleFillingChange}
              />
            </Col>

            <Col span={24}>
              <FrostingColorPicker
                frostingColors={frostingColors}
                frostingColor={frostingColor}
                handleFrostingColorChange={handleFrostingColorChange}
              />
            </Col>

            <Col span={24}>
              <DripSauceSelect
                dripSauces={dripSauces}
                selectedDripSauce={selectedDripSauce}
                handleDripSauceChange={handleDripSauceChange}
              />
            </Col>

            <Col span={24}>
              <DecorationCheckboxGroup
                decorationOptions={optionsWithDisabled}
                selectedDecorations={selectedDecorations}
                handleDecorationChange={handleDecorationChange}
              />
            </Col>
          </Row>
        </Card>

        <PriceSummary totalPrice={totalPrice} />

        <AddressSection
          onAddressChange={(address) => {
            setUserAddress(address);
            // setOrder(prev => ({ ...prev, user_address: address }));
          }}
          initialAddress={userAddress}
        />
        <OrderButton handleSubmitRequest={handleSubmitRequest} />
      </Col>
    </Row>
  );
};

export default CakeModel;