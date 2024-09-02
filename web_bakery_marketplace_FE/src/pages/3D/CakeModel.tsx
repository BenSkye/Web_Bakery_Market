// src/components/CakeDesigner.js
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Col, Row, Slider } from "antd";

const CakeModel = () => {
  const mountRef = useRef(null);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const cameraRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.shadowMap.enabled = true; // Tắt tính năng đổ bóng cho renderer
    if (mountRef.current) {
      (mountRef.current as HTMLElement).appendChild(renderer.domElement);
    }

    const DirectionLight = new THREE.DirectionalLight(0xffffff, 2);
    DirectionLight.position.set(1, 2, 1).normalize();
    // DirectionLight.castShadow = true; // Tắt tính năng đổ bóng cho ánh sáng
    scene.add(DirectionLight);

    const light = new THREE.PointLight(0xc4c4c4, 20);
    light.position.set(0, 300, 500);
    scene.add(light);

    const light2 = new THREE.PointLight(0xc4c4c4, 20);
    light2.position.set(500, 100, 0);
    scene.add(light2);

    const light3 = new THREE.PointLight(0xc4c4c4, 20);
    light3.position.set(0, 100, -500);
    scene.add(light3);

    const light4 = new THREE.PointLight(0xc4c4c4, 20);
    light4.position.set(-500, 300, 0);
    scene.add(light4);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Màu trắng, cường độ 1
    scene.add(ambientLight);

    const loader = new GLTFLoader();
    loader.load(
      "/public/cake.glb",
      (gltf) => {
        const cake = gltf.scene;
        cake.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            console.log(child);
          }
        });
        scene.add(cake);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
    cameraRef.current = camera;
    camera.position.z = 1;
    camera.position.y = 1;
    camera.position.x = 1;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2;

    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (mountRef.current) {
        (mountRef.current as HTMLElement).removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (cameraRef.current) {
      console.log(rotationX);
      cameraRef.current.position.y = rotationX;
    }
  }, [rotationX]);
  useEffect(() => {
    if (cameraRef.current) {
      console.log(rotationY);
      cameraRef.current.position.x = rotationY;
    }
  }, [rotationY]);

  return (
    <div>
      <Row>
        <Col span={20}>
          <div ref={mountRef} style={{ width: "100vw", height: "90vh" }} />
        </Col>
        <Col span={4}>
          <Slider
            min={0}
            vertical
            max={2 * Math.PI}
            step={0.01}
            value={rotationY}
            onChange={(value) => setRotationY(value)}
            style={{ height: "500px", marginTop: 100 }}
          />
        </Col>
      </Row>
      <Slider
        min={0}
        max={2 * Math.PI}
        step={0.01}
        value={rotationX}
        onChange={(value) => setRotationX(value)}
        style={{ width: "80vw", margin: "0 auto" }}
      />
    </div>
  );
};

export default CakeModel;
