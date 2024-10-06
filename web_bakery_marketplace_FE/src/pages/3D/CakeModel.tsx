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

const CakeModel = ({ bakeryId }: { bakeryId: string }) => {
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
  const [decorations, setDecorations] = useState<CheckboxValueType[]>([]);
  const [selectedDecorations, setSelectedDecorations] = useState<object[]>([]);
  const [disabledOptions, setDisabledOptions] = useState<CheckboxValueType[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [cakeFillings, setCakeFillings] = useState<object[]>([]);
  const [frostingColors, setFrostingColors] = useState<object[]>([]);
  const [dripSauces, setDripSauces] = useState<object[]>([]);
  const [decorationOptions, setDecorationsOptions] = useState<object[]>([]);
  const [basePrice, setBasePrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

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
    const selectedBranch = cakeFillings.find(branch => branch.fillings.some(filling => filling.name === value));
    if (selectedBranch) {
      const selectedFilling = selectedBranch.fillings.find(filling => filling.name === value);
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
        customCake: { selectedFilling, frostingColor, selectedDripSauce, selectedDecorations }
      };

      if (!newOrder.user_address) {
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


      <Col span={8} style={{ background: '#f1948a', borderRadius: '10px', padding: '10px' }}>
        <Card
          title={<Title level={3}>Tùy chỉnh bánh</Title>}
          style={{ height: '80vh', overflowY: 'auto' }}
        >
          <Row gutter={[0, 16]}>
            <Col span={24} >
              <Text strong>Nhân bánh:</Text>
              <TreeSelect
                style={{ width: '100%', marginTop: 8 }}
                // value={selectedFilling}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Chọn nhân bánh"
                treeDefaultExpandAll
                onChange={handleFillingChange}
              >
                {cakeFillings?.map((branch) => (
                  <TreeNode value={branch.branch} title={branch.branch} key={branch.branch} selectable={false}>
                    {branch?.fillings?.map((filling) => (
                      <TreeNode
                        value={filling.name}
                        title={`${filling.name} - ${convertToVND(filling.price)}`}
                        key={filling.name}
                        description={filling.description as string}
                      >

                      </TreeNode>
                    ))}
                  </TreeNode>
                ))}
              </TreeSelect>
            </Col>
            <Col span={24}>
              <Text strong>Màu kem phủ:</Text>
              <Radio.Group onChange={handleFrostingColorChange}
                value={frostingColor}
                style={{ width: '100%', marginTop: 8 }}>
                {frostingColors?.map((color) => (
                  <Tooltip title={`${color?.name}-${convertToVND(color?.price)}`} key={color.hex}>
                    <Radio.Button
                      value={color.hex}
                      style={{
                        backgroundColor: color.hex,
                        width: '30px',
                        height: '30px',
                        border: `2px solid ${frostingColor === color?.hex ? '#1890ff' : '#d9d9d9'}`,
                        marginRight: '10px',
                        marginBottom: '10px',
                        borderRadius: '50%',
                        padding: 0,
                        overflow: 'hidden',
                      }}
                    />
                  </Tooltip>
                ))}
              </Radio.Group>
            </Col>

            <Col span={24}>
              <Text strong>Sốt phủ:</Text>
              <Select
                style={{ width: '100%', marginTop: 8 }}
                placeholder="Chọn sốt phủ"
                onChange={handleDripSauceChange}
                value={selectedDripSauce?.name}
              >
                {dripSauces?.map((sauce) => (
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
                      {sauce.name} - {convertToVND(sauce.price)}
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={24} >
              <Text strong>Trang trí:</Text>
              <Checkbox.Group
                options={optionsWithDisabled?.map(option => ({
                  ...option,
                  label: `${option.label} - ${convertToVND(option.price)}`
                }))}
                value={selectedDecorations?.map(d => d.value)}
                onChange={handleDecorationChange}
                style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 8 }}
              />
            </Col>


          </Row>
        </Card>
        <Divider />


        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4}>Tổng giá:</Title>
          </Col>
          <Col>
            <Title level={3} type="danger">{convertToVND(totalPrice)}</Title>
          </Col>
        </Row>
        <Row justify="space-between" align="middle">
          <Card style={{ width: '100%' }}>
            <Row>
              <Col>
                <h3>
                  <EnvironmentOutlined /> Địa Chỉ Nhận Hàng
                </h3>
              </Col>
            </Row>
            <Row align="middle" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
              <Col>
                <span style={{ marginRight: '10px' }}>{newAddress?.name} (+{newAddress?.phone})</span>
                <span>{newAddress?.address}</span>
              </Col>
              <Col>
                <Button type="link" onClick={() => setNewAddressVisible(true)} style={{ paddingLeft: '10px' }}>
                  <EditOutlined /> Thay Đổi
                </Button>
              </Col>
            </Row>
          </Card>
          <Modal
            title="Thay Đổi Địa Chỉ"
            visible={newAddressVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Lưu"
            cancelText="Hủy"
          >
            <Form form={form} layout="vertical">
              <Form.Item
                label="Họ và Tên"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
            </Form>
          </Modal>
        </Row>
        <Row justify="end" align="middle">
          <Col>
            <Button type="primary" onClick={handleSubmitRequest}>Gửi yêu cầu</Button>
          </Col>
        </Row>

      </Col>
    </Row>
  );
};

export default CakeModel;



