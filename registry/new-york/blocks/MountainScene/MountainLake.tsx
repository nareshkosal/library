import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export function MountainLake() {
  const { scene } = useGLTF('/frozen_lake.glb');
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        // Preserve original material colors
        if (mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          if (material.color) {
            // Ensure the material displays its original colors
            material.color.multiplyScalar(1.2); // Slightly brighten original colors
          }
        }
      }
    });
  }, [scene]);

  return (
    <group ref={ref}>
      <primitive object={scene} scale={1780} position={[0, -350.2, 200]} />
      {/* Dedicated lighting for the mountain to show original colors */}
      <directionalLight
        position={[0, 100, 200]}
        intensity={0.8}
        color="#ffffff"
      />
      <pointLight
        position={[100, 50, 100]}
        intensity={0.5}
        color="#ffffff"
        distance={1000}
      />
    </group>
  );
}