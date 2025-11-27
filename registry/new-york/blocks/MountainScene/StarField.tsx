import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function StarField() {
  const groupRef = useRef<THREE.Group>(null);

  const { small, medium, large } = useMemo(() => {
    const maxRadius = 4000;
    const counts = { small: 1000, medium: 100, large: 40 };
    const radii = { small: maxRadius, medium: maxRadius * 0.9, large: maxRadius * 0.8 };

    const makeLayer = (count: number, radius: number) => {
      const positions = new Float32Array(count * 3);
      const rMin = radius * 0.6;
      const rMax = radius;
      for (let i = 0; i < count; i++) {
        const u = Math.random();
        const r = Math.cbrt(rMin * rMin * rMin + (rMax * rMax * rMax - rMin * rMin * rMin) * u);
        const phi = Math.random() * 2 * Math.PI;
        const cosTheta = Math.random();
        const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
        const x = r * sinTheta * Math.cos(phi);
        const y = r * cosTheta;
        const z = r * sinTheta * Math.sin(phi);
        const idx = i * 3;
        positions[idx] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = z;
      }
      return positions;
    };

    return {
      small: makeLayer(counts.small, radii.small),
      medium: makeLayer(counts.medium, radii.medium),
      large: makeLayer(counts.large, radii.large),
    };
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.004;
    }
  });

  return (
    <group ref={groupRef}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[small, 3]} />
        </bufferGeometry>
        <pointsMaterial color={0xffffff} size={0.9} sizeAttenuation transparent opacity={0.9} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[medium, 3]} />
        </bufferGeometry>
        <pointsMaterial color={0xffffff} size={1.4} sizeAttenuation transparent opacity={0.95} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[large, 3]} />
        </bufferGeometry>
        <pointsMaterial color={0xffffff} size={2.0} sizeAttenuation transparent opacity={1} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}
