import { Cloud } from '@react-three/drei';
import { AnimatedCloud } from './AnimatedCloud';

export function NightClouds() {
  return (
    <>
      <AnimatedCloud position={[480, 300, -400]} scale={[50, 50, 50]} speed={0.05} opacity={0.3} radius={150} height={20} />
      <AnimatedCloud position={[1250, 750, -700]} scale={[35, 35, 35]} speed={0.04} opacity={0.25} radius={180} height={30} />
      <AnimatedCloud position={[780, 200, -500]} scale={[45, 45, 45]} speed={0.06} opacity={0.3} radius={220} height={40} />
      <AnimatedCloud position={[-500, 1220, -500]} scale={[32, 32, 32]} speed={0.03} opacity={0.2} radius={160} height={25} />
      <AnimatedCloud position={[200, 10, -300]} scale={[38, 38, 38]} speed={0.05} opacity={0.25} radius={190} height={35} />

      <AnimatedCloud position={[-400, 180, -800]} scale={[28, 28, 28]} speed={0.08} opacity={0.2} radius={140} height={15} />
      <AnimatedCloud position={[350, 200, -650]} scale={[33, 33, 33]} speed={0.07} opacity={0.22} radius={170} height={20} />
      <AnimatedCloud position={[-250, 260, -800]} scale={[25, 25, 25]} speed={0.09} opacity={0.18} radius={130} height={10} />
      <AnimatedCloud position={[450, 240, -700]} scale={[33, 33, 33]} speed={0.06} opacity={0.21} radius={175} height={75} />

      <group position={[-900, 590, -800]} scale={[29, 29, 29]}>     
        <Cloud position={[0, 0, 0]} speed={0.07} opacity={0.19} />
      </group>

      <group position={[900, 350, -900]} scale={[42, 42, 42]}>     
        <Cloud position={[0, 0, 0]} speed={0.02} opacity={0.32} />
      </group>

      <AnimatedCloud position={[800, 120, -100]} scale={[38, 38, 38]} speed={0.03} opacity={0.28} radius={185} height={30} />

      <AnimatedCloud position={[700, 280, -200]} scale={[36, 36, 36]} speed={0.04} opacity={0.24} radius={165} height={20} />
      <AnimatedCloud position={[-600, 260, -600]} scale={[40, 40, 40]} speed={0.05} opacity={0.26} radius={195} height={25} />
      <AnimatedCloud position={[100, 400, -1200]} scale={[48, 48, 48]} speed={0.01} opacity={0.35} radius={230} height={45} />
      <AnimatedCloud position={[-400, 380, -1100]} scale={[44, 44, 44]} speed={0.02} opacity={0.29} radius={210} height={35} />
      <AnimatedCloud position={[500, 340, -800]} scale={[39, 39, 39]} speed={0.03} opacity={0.27} radius={200} height={30} />
    </>
  );
}
