import * as THREE from 'three';
import { useRef, forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud } from '@react-three/drei';

interface AnimatedCloudProps {
  position: [number, number, number];
  scale: [number, number, number];
  speed: number;
  opacity: number;
  radius?: number;
  height?: number;
  color?: string;
  editable?: boolean;
}

export const AnimatedCloud = forwardRef<THREE.Group, AnimatedCloudProps>(function AnimatedCloud({ position, scale, speed, opacity, radius = 200, height = 0, color, editable }, ref) {
  const cloudRef = useRef<THREE.Group>(null);
  const time = useRef(0);
  useImperativeHandle(ref, () => cloudRef.current as THREE.Group);

  useFrame((state, delta) => {
    if (!cloudRef.current) return;
    if (editable) return;
    time.current += delta * speed;
    const x = position[0] + Math.sin(time.current * 0.3) * radius;
    const z = position[2] + Math.cos(time.current * 0.2) * radius * 0.7;
    const y = position[1] + Math.sin(time.current * 0.1) * height;
    cloudRef.current.position.set(x, y, z);
    cloudRef.current.rotation.y = time.current * 0.05;
    const scaleVariation = 1 + Math.sin(time.current * 0.8) * 0.05;
    cloudRef.current.scale.set(
      scale[0] * scaleVariation,
      scale[1] * scaleVariation,
      scale[2] * scaleVariation
    );
  });

  return (
    <group ref={cloudRef}>
      <Cloud
        position={[0, 0, 0]}
        speed={speed * 0.5}
        opacity={opacity}
        color={color}
      />
    </group>
  );
});
