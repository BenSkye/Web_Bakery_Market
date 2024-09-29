import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { Mesh, Object3D, Raycaster, Vector2, Intersection, Color, MeshBasicMaterial, MeshStandardMaterial, MeshPhongMaterial, MeshLambertMaterial } from 'three';
import { Checkbox, Col, ColorPicker, InputNumber, Radio, RadioChangeEvent, Row, Select, Tooltip, TreeSelect, TreeSelectProps, Typography } from 'antd';
import { TreeNode } from 'antd/es/tree-select';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

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



const CakeModel = () => {
  const [selectedObject, setSelectedObject] = useState<Object3D | null>(null);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 500, 1000]);
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
    <Row gutter={[16, 16]}>
      <Col span={17}>
        <Canvas style={{ height: '80vh' }}>
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
      </Col>


      <Col span={7} style={{ background: '#f1948a', borderRadius: '10px', padding: '10px' }}>
        <h2>Tùy chỉnh bánh</h2>
        <Row gutter={[16, 16]}>
          <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
            <label style={{ marginRight: '10px' }}>Nhân bánh: </label>
            <TreeSelect
              style={{ width: '50%' }}
              // value={selectedFilling}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Chọn nhân bánh"
              treeDefaultExpandAll
              onChange={handleFillingChange}
            >
              {cakeFillings.map((branch) => (
                <TreeNode value={branch.branch} title={branch.branch} key={branch.branch} selectable={false}>
                  {branch.fillings.map((filling) => (
                    <TreeNode
                      value={filling.name}
                      title={filling.name}
                      key={filling.name}
                      description={filling.description as string}
                    />
                  ))}
                </TreeNode>
              ))}
            </TreeSelect>
          </Col>
          <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
            <label style={{ marginRight: '10px' }}>Màu kem phủ:</label>
            <Radio.Group onChange={handleFrostingColorChange} value={frostingColor} style={{ width: '40%' }}>
              {frostingColors.map((color) => (
                <Tooltip title={color.name} key={color.hex}>
                  <Radio.Button
                    value={color.hex}
                    style={{
                      backgroundColor: color.hex,
                      width: '30px',
                      height: '30px',
                      border: `2px solid ${frostingColor === color.hex ? '#1890ff' : '#d9d9d9'}`,
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


          <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
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
          <Col span={24} >
            <Title level={5}>Trang trí</Title>
            <Checkbox.Group
              options={optionsWithDisabled}
              value={decorations}
              onChange={handleDecorationChange}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CakeModel;

const cakeFillings = [
  {
    branch: "Nhân Kem",
    fillings: [
      { name: "Kem Tươi Đánh Bông", description: "Kem nhẹ và mịn." },
      { name: "Kem Bơ", description: "Kem béo và ngọt từ bơ." },
      { name: "Kem Sữa Trứng", description: "Kem mịn và béo ngậy từ trứng và sữa." },
      { name: "Kem Chantilly", description: "Kem tươi ngọt có thêm vani." }
    ]
  },
  {
    branch: "Nhân Phô Mai",
    fillings: [
      { name: "Phô Mai Kem", description: "Phô mai kem mềm và béo ngậy." },
      { name: "Mascarpone", description: "Phô mai Ý nhẹ, ngọt dịu." },
      { name: "Ricotta", description: "Phô mai mềm, béo nhẹ, thường kết hợp với hương chanh hoặc mật ong." }
    ]
  },
  {
    branch: "Nhân Socola",
    fillings: [
      { name: "Ganache", description: "Hỗn hợp socola và kem tươi, rất mịn." },
      { name: "Chocolate Mousse", description: "Mousse socola, mịn và nhẹ." },
      { name: "Nutella", description: "Socola phết béo ngậy từ hạt dẻ." }
    ]
  },
  {
    branch: "Nhân Custard",
    fillings: [
      { name: "Custard Vani", description: "Kem trứng vani mịn và béo." },
      { name: "Custard Socola", description: "Kem trứng socola mềm mịn." },
      { name: "Custard Trà Xanh", description: "Kem trứng vị matcha mịn." }
    ]
  },
  {
    branch: "Nhân Trái Cây Tươi",
    fillings: [
      { name: "Dâu Tây", description: "Dâu tây tươi cắt lát." },
      { name: "Việt Quất", description: "Quả việt quất tươi nguyên." },
      { name: "Trái Cây Hỗn Hợp", description: "Hỗn hợp các loại trái cây tươi." }
    ]
  },
  {
    branch: "Nhân Hạt",
    fillings: [
      { name: "Kem Hạnh Nhân", description: "Kem làm từ hạnh nhân nghiền nhỏ." },
      { name: "Kem Hạt Dẻ", description: "Kem mịn làm từ hạt dẻ." },
      { name: "Praline", description: "Hỗn hợp giòn từ caramel và hạt nghiền." }
    ]
  },
  {
    branch: "Nhân Caramel",
    fillings: [
      { name: "Caramel Muối", description: "Caramel ngọt và mặn, có độ dẻo." },
      { name: "Dulce de Leche", description: "Caramel đặc trưng từ sữa, ngọt và mịn." }
    ]
  },
  {
    branch: "Nhân Bơ Đậu Phộng",
    fillings: [
      { name: "Kem Bơ Đậu Phộng", description: "Kem béo ngậy từ bơ đậu phộng." },
      { name: "Mousse Bơ Đậu Phộng", description: "Mousse bơ đậu phộng, nhẹ và mịn." }
    ]
  },
  {
    branch: "Nhân Dừa",
    fillings: [
      { name: "Kem Dừa", description: "Kem dừa ngọt và béo." },
      { name: "Dừa Nướng", description: "Dừa nướng giòn, thơm." }
    ]
  },
  {
    branch: "Nhân Mứt",
    fillings: [
      { name: "Mứt Dâu", description: "Mứt từ dâu tây tươi ngọt." },
      { name: "Mứt Việt Quất", description: "Mứt từ quả việt quất." },
      { name: "Mứt Mơ", description: "Mứt mơ với hương vị thanh nhẹ." },
      { name: "Mứt Đào", description: "Mứt từ quả đào chín mọng." },
      { name: "Mứt Cam", description: "Mứt từ cam, hơi ngọt và chua nhẹ." }
    ]
  }
];

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
