import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { Mesh, Object3D, Raycaster, Vector2, Intersection, Color, MeshBasicMaterial, MeshStandardMaterial, MeshPhongMaterial, MeshLambertMaterial } from 'three';

const FBXModel = ({ url, onClick, position = [0, 0, 0] }: { url: string, onClick: (object: Object3D) => void, position: [number, number, number] }) => {
  const fbx = useLoader(FBXLoader, url);
  const modelRef = useRef<Object3D>();
  const { camera, gl, scene } = useThree();
  const [dragControls, setDragControls] = useState<DragControls | null>(null);

  useEffect(() => {
    console.log('fbx:', fbx);
    fbx.traverse((child) => {
      console.log(child.name, child);
    });
    modelRef.current = fbx;
    const controls = new DragControls([fbx], camera, gl.domElement);
    controls.addEventListener('dragstart', (event) => {
      if (event.object instanceof MeshStandardMaterial) {
        event.object.emissive.set(0xaaaaaa);
      }
    });
    controls.addEventListener('dragend', (event) => {
      if (event.object instanceof MeshStandardMaterial) {
        event.object.emissive.set(0x000000);
      }
    });

    setDragControls(controls);

    return () => {
      controls.dispose();
    };
  }, [fbx, camera, gl]);

  // useFrame(() => {
  //   if (modelRef.current) {
  //     modelRef.current.rotation.y += 0.01;
  //   }
  // });

  return (
    <primitive
      ref={modelRef}
      object={fbx}
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

  useEffect(() => {
    console.log('Camera position:', cameraPosition);
  }, [cameraPosition]);

  return (
    <Canvas style={{ height: '80vh' }}>
      <PerspectiveCamera makeDefault position={cameraPosition} />
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <FBXModel url="/public/Cake2.fbx" position={[-2, 0, 0]} onClick={(object) => setSelectedObject(object)} />
      <FBXModel url="/public/Candle.fbx" position={[2, 150, 0]} onClick={(object) => setSelectedObject(object)} />
      <Scene onSelect={(object) => setSelectedObject(object)} />
    </Canvas>
  );
};

export default CakeModel;