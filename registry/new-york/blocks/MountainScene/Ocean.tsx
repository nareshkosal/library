import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Water } from 'three-stdlib';
import { Water as WaterImpl } from 'three-stdlib';

const dayWaterColor = new THREE.Color(0x001e0f);
const nightWaterColor = new THREE.Color(0x1a2852);

interface OceanProps {
  transitionProgress: number;
}

export function Ocean({ transitionProgress }: OceanProps) {
  const ref = useRef<WaterImpl>(null);
  const { scene } = useThree();

  useEffect(() => {
    const waterGeometry = new THREE.PlaneGeometry(100000, 100000);

    const waterNormals = new THREE.TextureLoader().load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/waternormals.jpg',
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      }
    );

    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: dayWaterColor,
      distortionScale: 3.7,
      fog: true,
    });

    water.rotation.x = -Math.PI / 2;
    scene.add(water);
    ref.current = water;

    return () => {
      scene.remove(water);
    };
  }, [scene]);

  useFrame((_, delta) => {
    if (ref.current) {
      const material = ref.current.material as THREE.ShaderMaterial;
      material.uniforms['time'].value += delta / 2;

      const waterColor = dayWaterColor.clone().lerp(nightWaterColor, transitionProgress);
      material.uniforms['waterColor'].value = waterColor;
    }

    scene.background = getSkyColorForTransition(transitionProgress);
  });

  function getSkyColorForTransition(t: number) {
    const daySkyColor = new THREE.Color(0x87ceeb);
    const nightSkyColor = new THREE.Color(0x000011);
    return daySkyColor.clone().lerp(nightSkyColor, t);
  }

  return null;
}