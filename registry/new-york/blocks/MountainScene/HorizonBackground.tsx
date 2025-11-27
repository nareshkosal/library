import * as THREE from 'three';
import { useMemo } from 'react';

interface HorizonBackgroundProps {
  variant?: 'sunset' | 'sunrise' | 'night';
  intensity?: number;
  horizonBand?: number;
  radius?: number;
}

export function HorizonBackground({ variant = 'sunrise', intensity = 1, horizonBand = 0.35, radius = 12000 }: HorizonBackgroundProps) {
  const colors = useMemo(() => {
    if (variant === 'night') {
      return {
        top: new THREE.Color('#070b20'),
        mid: new THREE.Color('#0b1748'),
        warm1: new THREE.Color('#0b1748'),
        warm2: new THREE.Color('#0b1748'),
      };
    }
    if (variant === 'sunrise') {
      return {
        top: new THREE.Color('#0b1748'),
        mid: new THREE.Color('#284b8f'),
        warm1: new THREE.Color('#ffb347'),
        warm2: new THREE.Color('#ff6a00'),
      };
    }
    return {
      top: new THREE.Color('#0a1438'),
      mid: new THREE.Color('#345ea9'),
      warm1: new THREE.Color('#ffc04d'),
      warm2: new THREE.Color('#ff5a1f'),
    };
  }, [variant]);

  const uniforms = useMemo(() => ({
    topColor: { value: colors.top },
    midColor: { value: colors.mid },
    warm1Color: { value: colors.warm1 },
    warm2Color: { value: colors.warm2 },
    horizonBand: { value: horizonBand },
    intensity: { value: intensity },
  }), [colors, horizonBand, intensity]);

  return (
    <mesh scale={1}>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          precision highp float;
          varying vec2 vUv;
          uniform vec3 topColor;
          uniform vec3 midColor;
          uniform vec3 warm1Color;
          uniform vec3 warm2Color;
          uniform float horizonBand;
          uniform float intensity;

          void main() {
            float y = vUv.y;

            float h = horizonBand;        // ~0.5 around the visual horizon
            float warmW = 0.06;           // thickness of golden band
            float blendUp = 0.16;         // fade distance into blue

            vec3 color = warm2Color;
            float tWarm = smoothstep(h - warmW, h - warmW * 0.2, y);
            color = mix(warm2Color, warm1Color, tWarm);

            float tMid = smoothstep(h - warmW * 0.2, h + blendUp, y);
            color = mix(color, midColor, tMid);

            float tTop = smoothstep(h + blendUp, 1.0, y);
            color = mix(color, topColor, tTop);

            float glow = 1.0 - smoothstep(h, h + 0.18, y);
            color += warm1Color * (0.12 * glow * intensity);

            gl_FragColor = vec4(color, 1.0);
          }
        `}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}
