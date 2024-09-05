import React, { useState, useEffect } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Mesh, Object3D, Raycaster, Vector2, Intersection, Color, MeshBasicMaterial, MeshStandardMaterial, MeshPhongMaterial, MeshLambertMaterial } from 'three';

const FBXModel = ({ url, onClick }: { url: string, onClick: (object: Object3D) => void }) => {
  const fbx = useLoader(FBXLoader, url);

  return (
    <primitive object={fbx} onClick={(event: React.MouseEvent<Element, MouseEvent>) => onClick((event as unknown as { object: Object3D }).object)} />
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
  const zoomFactor = 0.05;
  useEffect(() => {
    if (selectedObject) {
      const mesh = selectedObject as Mesh;
      console.log('Selected object:', mesh);
      // const directionX = mesh.position.x + 0;
      // const directionY = mesh.position.y + 0;
      // const directionZ = mesh.position.z + 200;
      // setX(0)
      // setY(0)
      // setZ(1000)
      // // setX(directionX);
      // // setY(directionY);
      // setZ(directionZ);
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((material) => {
          if (material instanceof MeshBasicMaterial ||
            material instanceof MeshStandardMaterial ||
            material instanceof MeshPhongMaterial ||
            material instanceof MeshLambertMaterial) {
            console.log('Changing color of material to blue');
            material.color = new Color(0x0000ff); // Set color to blue
          } else {
            console.log('Material type does not support color changes:', material);
          }
        });
        //mesh.materia
      } else if (mesh.material instanceof MeshBasicMaterial ||
        mesh.material instanceof MeshStandardMaterial ||
        mesh.material instanceof MeshPhongMaterial ||
        mesh.material instanceof MeshLambertMaterial
      ) {
        console.log('Changing color of material to blue');
        mesh.material.color = new Color(0x0000ff); // Set color to blue
      } else {
        console.log('Material type does not support color changes:', mesh.material);
      }
    }
  }, [selectedObject]);

  useEffect(() => {
    console.log('x:', x, 'y:', y, 'z:', z);
  }, [x, y, z]);

  return (
    <Canvas style={{ height: '80vh' }}>
      <PerspectiveCamera makeDefault position={[x, y, z]} />
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <FBXModel url="/public/thaidayy.fbx" onClick={(object) => setSelectedObject(object)} />
      <Scene onSelect={(object) => setSelectedObject(object)} />
    </Canvas>
  );
};

export default CakeModel;