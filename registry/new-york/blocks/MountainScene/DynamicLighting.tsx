import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function DynamicLighting() {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const time = useRef(0);

  useFrame((state, delta) => {
    if (lightRef.current) {
      time.current += delta * 0.2;
      
      // Subtle moonlight intensity changes
      const intensity = 0.2 + Math.sin(time.current * 0.3) * 0.05;
      lightRef.current.intensity = intensity;
      
      // Subtle position changes for dynamic shadows
      const x = Math.sin(time.current * 0.1) * 20;
      const z = 100 + Math.cos(time.current * 0.15) * 30;
      lightRef.current.position.set(x, 50, z);
    }
  });

  return (
    <>
      <directionalLight
        ref={lightRef}
        position={[0, 50, 100]}
        intensity={0.15}
        color="#cccccc"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={1000}
        shadow-camera-left={-500}
        shadow-camera-right={500}
        shadow-camera-top={500}
        shadow-camera-bottom={-500}
      />
      <directionalLight
        position={[100, 30, -50]}
        intensity={0.1}
        color="#dddddd"
      />
    </>
  );
}