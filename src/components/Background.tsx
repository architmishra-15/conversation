import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Points, PointMaterial } from '@react-three/drei';
import { useScroll as useFramerScroll } from 'framer-motion';

// function Galaxy({ count = 5000, radius = 10 }) {
//   const points = useRef<any>();
//   const scroll = useScroll();

//   const { positions, colors } = useMemo(() => {
//     const positions = new Float32Array(count * 3);
//     const colors = new Float32Array(count * 3);

//     for (let i = 0; i < count; i++) {
//       const i3 = i * 3;
//       const angle = (i / count) * Math.PI * 2;
//       const spiralRadius = Math.sqrt(Math.random()) * radius;
//       const randomOffset = (Math.random() - 0.5) * 2;

//       positions[i3] = Math.cos(angle + spiralRadius) * spiralRadius;
//       positions[i3 + 1] = randomOffset * (radius / 5);
//       positions[i3 + 2] = Math.sin(angle + spiralRadius) * spiralRadius;

//       const color = new THREE.Color();
//       const hue = 0.8 + Math.random() * 0.2;
//       const saturation = 0.8;
//       const lightness = 0.6 + Math.random() * 0.2;
//       color.setHSL(hue, saturation, lightness);

//       colors[i3] = color.r;
//       colors[i3 + 1] = color.g;
//       colors[i3 + 2] = color.b;
//     }

//     return { positions, colors };
//   }, [count, radius]);

//   useFrame((state) => {
//     if (!points.current) return;

//     const time = state.clock.getElapsedTime() * 0.1;
//     const offset = scroll?.offset ?? 0;

//     points.current.rotation.y = time + offset * Math.PI * 2;
//     points.current.rotation.z = offset * Math.PI * 0.5;

//     const scale = 1 + offset * 2;
//     points.current.scale.set(scale, scale, scale);
//   });

//   return (
//     <Points ref={points}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={count}
//           array={positions}
//           itemSize={3}
//         />
//         <bufferAttribute
//           attach="attributes-color"
//           count={count}
//           array={colors}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         size={0.2}
//         vertexColors
//         transparent
//         opacity={0.8}
//         sizeAttenuation
//         depthWrite={false}
//       />
//     </Points>
//   );
// }

function RomanticBackground() {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      temp.push({ x, y });
    }
    return temp;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 z-0"
      style={{
        background:
          'radial-gradient(circle at center, #ff69b4 0%, #4a0072 100%)',
        pointerEvents: 'none',
      }}
    >
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white"
          initial={{
            x: particle.x * 50,
            y: particle.y * 50,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: particle.x * 100,
            y: particle.y * 100,
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.02,
          }}
        />
      ))}
    </motion.div>
  );
}

function GalaxyScene() {
  const scroll = useScroll();
  const [showRomantic, setShowRomantic] = useState(false);

  useFrame(() => {
    const offset = scroll?.offset ?? 0;
    setShowRomantic(offset > 0.8);
  });

  return (
    <>
      {!showRomantic && <Galaxy />}
      <ambientLight intensity={0.5} />
      {showRomantic && <RomanticBackground />}
    </>
  );
}

function Galaxy({ count = 5000, radius = 15 }) {
  const scroll = useFramerScroll(); // use scroll offset from framer-motion
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = Math.random() * radius;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = Math.sin(angle) * r;
      color.setHSL(Math.random(), 0.8, 0.8);
      colors.set([color.r, color.g, color.b], i * 3);
    }
    return { positions, colors };
  }, [count, radius]);

  useFrame(() => {
    if (pointsRef.current) {
      const scrollOffset = scroll.offset || 0;
      pointsRef.current.rotation.y += 0.01; // slow rotation
      pointsRef.current.scale.setScalar(1 + scrollOffset * 0.5); // zoom effect based on scroll
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <pointMaterial size={0.1} vertexColors={true} />
    </Points>
  );
}

// export function Background() {
//   return (
//     <div className="fixed inset-0 -z-10">
//       <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 2]}>
//         <color attach="background" args={['#000']} />
//         <ScrollControls pages={4} damping={0.25}>
//           <Galaxy />
//         </ScrollControls>
//       </Canvas>
//     </div>
//   );
// }

export function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 40], fov: 60 }} dpr={[1, 2]}>
        <color attach="background" args={['#000000']} />
        <Galaxy />
      </Canvas>
    </div>
  );
}
