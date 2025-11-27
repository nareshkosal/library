'use client';

import { useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Preload, OrbitControls } from '@react-three/drei';
import { Ocean } from './Ocean';
import { MountainLake } from './MountainLake';
import { DynamicLighting } from './DynamicLighting';
import { NightClouds } from './NightClouds';
import { HorizonBackground } from './HorizonBackground';
import { useSearchParams } from 'next/navigation';
import { StarField } from './StarField';

interface BoatControls {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

// Preload GLTF models
useGLTF.preload('/boat1.glb');
useGLTF.preload('/frozen_lake.glb');

export default function MountainScene() {
  const [] = useState<BoatControls>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  const search = useSearchParams();
  const initialTheme = useMemo(() => {
    const t = search?.get('theme');
    return t === 'sunset' ? 'sunset' : 'night';
  }, [search]);
  const [theme, setTheme] = useState<'night' | 'sunset'>(initialTheme);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 's') setTheme('sunset');
      if (e.key.toLowerCase() === 'n') setTheme('night');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <Canvas shadows camera={{ position: [-150, 20, 500], fov: 80, near: 0.1, far: 12000 }}>
      <ambientLight intensity={0.05} />
      <DynamicLighting />
      {theme === 'sunset' ? (
        <HorizonBackground variant="sunset" intensity={1.05} horizonBand={0.5} />
      ) : (
        <HorizonBackground variant="night" intensity={1} horizonBand={0.5} />
      )}
      <Ocean transitionProgress={theme === 'sunset' ? 0.7 : 1.0} />
      <MountainLake />
      {theme === 'night' && <NightClouds />}
      {theme === 'night' && <StarField />}
      <OrbitControls enableDamping dampingFactor={0.05} enableRotate={false} maxDistance={1500} minDistance={80} />
      <Preload all />
    </Canvas>
  );
}
