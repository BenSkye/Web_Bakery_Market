import React, { useState, useEffect } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Mesh, Object3D, Raycaster, Vector2, Intersection, Color, MeshBasicMaterial, MeshStandardMaterial, MeshPhongMaterial, MeshLambertMaterial } from 'three';

const FBXModel = ({ url, onClick }: { url: string, onClick: (object: Object3D) => void }) => {
  const fbx = useLoader(FBXLoader, url);
  useEffect(() => {
    console.log('fbx:', fbx);
    fbx.children.forEach(child => {
      console.log('' + child.name, child);
    });
  }, [fbx]);

  return (
    <primitive object={fbx}
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
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [z, setZ] = useState<number>(1000);

  useEffect(() => {
    console.log('x:', x, 'y:', y, 'z:', z);
  }, [x, y, z]);

  return (
    <Canvas style={{ height: '80vh' }}>
      <PerspectiveCamera makeDefault position={[x, y, z]} />
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <FBXModel url="/public/EXE.fbx" onClick={(object) => setSelectedObject(object)} />
      <Scene onSelect={(object) => setSelectedObject(object)} />
    </Canvas>
  );
};

export default CakeModel;