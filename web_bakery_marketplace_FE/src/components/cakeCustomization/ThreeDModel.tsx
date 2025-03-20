import React, { useRef, useEffect } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { Mesh, Object3D, Raycaster, Intersection, Vector2, Color, MeshStandardMaterial, MeshPhongMaterial, MeshLambertMaterial } from 'three';

export const FBXModel = ({ url, onClick,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [1, 1, 1],
    frostingColor,
    modelColor,
    DripSauce }:
    {
        url: string,
        onClick: (object: Object3D) => void,
        position?: [number, number, number],
        rotation?: [number, number, number],
        scale?: [number, number, number],
        modelColor?: string,
        frostingColor?: any,
        DripSauce?: any
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


export const SceneInteraction = ({ onSelect }: { onSelect: (object: Object3D) => void }) => {
    const { camera, scene } = useThree();
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    const handleMouseClick = (event: MouseEvent) => {
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
