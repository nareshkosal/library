import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Ocean, StarField, AnimatedCloud, DynamicLighting } from './index';

// Example: Custom mountain scene with user controls
export function CustomMountainScene() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000011' }}>
      <Canvas 
        shadows 
        camera={{ position: [0, 50, 200], fov: 75 }}
        gl={{ antialias: true }}
      >
        {/* Basic lighting */}
        <ambientLight intensity={0.1} />
        <DynamicLighting />
        
        {/* Ocean with day/night transition */}
        <Ocean transitionProgress={0.8} />
        
        {/* Star field for night sky */}
        <StarField />
        
        {/* Custom cloud formations */}
        <AnimatedCloud 
          position={[-100, 100, -200]} 
          scale={[30, 30, 30]} 
          speed={0.03} 
          opacity={0.6}
          radius={150}
        />
        
        <AnimatedCloud 
          position={[150, 120, -300]} 
          scale={[25, 25, 25]} 
          speed={0.02} 
          opacity={0.4}
          radius={180}
          height={30}
        />
        
        <AnimatedCloud 
          position={[0, 80, -400]} 
          scale={[35, 35, 35]} 
          speed={0.04} 
          opacity={0.5}
          radius={200}
        />
        
        {/* Camera controls for interaction */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={50}
          maxDistance={1000}
        />
      </Canvas>
    </div>
  );
}

// Example: Minimal scene with just ocean and stars
export function MinimalScene() {
  return (
    <div style={{ width: '800px', height: '600px' }}>
      <Canvas camera={{ position: [0, 0, 100] }}>
        <ambientLight intensity={0.05} />
        <Ocean transitionProgress={1.0} />
        <StarField />
      </Canvas>
    </div>
  );
}

// Example: Day scene with clouds
export function DayScene() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas camera={{ position: [0, 50, 300] }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[100, 100, 50]} intensity={1} />
        
        {/* Day ocean */}
        <Ocean transitionProgress={0} />
        
        {/* Day clouds with higher opacity */}
        <AnimatedCloud 
          position={[-200, 150, -400]} 
          scale={[40, 40, 40]} 
          speed={0.05} 
          opacity={0.9}
          radius={250}
        />
        
        <AnimatedCloud 
          position={[300, 180, -500]} 
          scale={[35, 35, 35]} 
          speed={0.03} 
          opacity={0.8}
          radius={300}
          height={40}
        />
      </Canvas>
    </div>
  );
}