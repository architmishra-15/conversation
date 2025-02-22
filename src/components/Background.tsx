// // Background.tsx
// import React, { useMemo, useRef, useEffect } from 'react';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import * as THREE from 'three';

// // Utility to generate a round star texture from a canvas
// function generateStarTexture() {
//   const size = 50;
//   const canvas = document.createElement('canvas');
//   canvas.width = size;
//   canvas.height = size;
//   const ctx = canvas.getContext('2d');
//   if (ctx) {
//     ctx.fillStyle = 'white';
//     ctx.beginPath();
//     ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
//     ctx.fill();
//   }
//   return new THREE.CanvasTexture(canvas);
// }

// const starTexture = generateStarTexture();

// // Random field of stars
// function Stars({ count = 3000 }: { count?: number }) {
//   const pointsRef = useRef<THREE.Points>(null);
  
//   const positions = useMemo(() => {
//     const positions = new Float32Array(count * 3);
//     for (let i = 0; i < count; i++) {
//       positions[i * 3] = (Math.random() - 0.5) * 200;
//       positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
//       positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
//     }
//     return positions;
//   }, [count]);
  
//   useFrame(() => {
//     if (pointsRef.current) {
//       // Slow rotation for a gentle parallax feel
//       pointsRef.current.rotation.y += 0.0005;
//     }
//   });
  
//   return (
//     <points ref={pointsRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={positions.length / 3}
//           array={positions}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         map={starTexture}
//         size={1.2}
//         transparent
//         opacity={0.8}
//         sizeAttenuation
//       />
//     </points>
//   );
// }

// // Spiral galaxy of stars
// function SpiralGalaxy({ count = 800, radius = 5, arms = 4, spin = 1 } : {
//   count?: number, radius?: number, arms?: number, spin?: number
// }) {
//   const pointsRef = useRef<THREE.Points>(null);
  
//   const positions = useMemo(() => {
//     const positions = new Float32Array(count * 3);
//     for (let i = 0; i < count; i++) {
//       // Determine which arm this star belongs to
//       const branchAngle = ((i % arms) / arms) * Math.PI * 2;
//       // Base angle along the spiral
//       const angle = (i / count) * Math.PI * 2 * arms;
//       // Distance from center with some randomness
//       const distance = Math.random() * radius;
//       const spinAngle = distance * spin;
      
//       // Add slight random offsets for natural dispersion
//       const randomX = (Math.random() - 0.5) * 0.5;
//       const randomY = (Math.random() - 0.5) * 0.5;
//       const randomZ = (Math.random() - 0.5) * 0.5;
      
//       const x = Math.cos(angle + spinAngle + branchAngle) * distance + randomX;
//       const y = randomY * 2; // minimal vertical spread
//       const z = Math.sin(angle + spinAngle + branchAngle) * distance + randomZ;
      
//       positions[i * 3] = x;
//       positions[i * 3 + 1] = y;
//       positions[i * 3 + 2] = z;
//     }
//     return positions;
//   }, [count, radius, arms, spin]);
  
//   useFrame(() => {
//     if (pointsRef.current) {
//       // Gentle rotation for additional depth
//       pointsRef.current.rotation.y += 0.001;
//     }
//   });
  
//   return (
//     <points ref={pointsRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={positions.length / 3}
//           array={positions}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         map={starTexture}
//         size={1.5}
//         transparent
//         opacity={0.9}
//         sizeAttenuation
//       />
//     </points>
//   );
// }

// // Component that handles the parallax effect based on scroll
// function GalaxyParallax() {
//   const { camera } = useThree();
  
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       const maxScroll = document.body.scrollHeight - window.innerHeight;
//       const scrollFactor = scrollY / maxScroll;
      
//       // Adjust camera zoom (moving closer as user scrolls down)
//       camera.position.z = 30 - scrollFactor * 20;
//       // Rotate camera slightly for a dynamic effect
//       camera.rotation.y = scrollFactor * Math.PI * 0.5;
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [camera]);
  
//   return (
//     <>
//       <Stars count={3000} />
//       <SpiralGalaxy count={800} radius={20} arms={4} spin={1} />
//     </>
//   );
// }

// export function Background() {
//   return (
//     <div 
//       className="fixed inset-0 -z-10"
//       style={{
//         // Dark, purplish-dash bluish gradient background (space)
//         background: 'linear-gradient(135deg, #000000, #220033, #000033)',
//       }}
//     >
//       <Canvas
//         camera={{ position: [0, 0, 30], fov: 60 }}
//         style={{ width: '100vw', height: '100vh' }}
//         gl={{ alpha: true }}
//       >
//         <GalaxyParallax />
//       </Canvas>
//     </div>
//   );
// }

// Background.tsx
// import React, { useMemo, useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

// // Generate a perfectly round star texture using a canvas.
// function generateStarTexture() {
//   const size = 64;
//   const canvas = document.createElement('canvas');
//   canvas.width = size;
//   canvas.height = size;
//   const ctx = canvas.getContext('2d');
//   if (ctx) {
//     ctx.fillStyle = 'white';
//     ctx.beginPath();
//     ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
//     ctx.fill();
//   }
//   return new THREE.CanvasTexture(canvas);
// }

// const starTexture = generateStarTexture();

// // Define a visible boundary for our animation.
// const BOUND = 50;

// // Utility to return a random number in range.
// function getRandomFromRange(min: number, max: number) {
//   return Math.random() * (max - min) + min;
// }

// // Initialize a cluster with a random starting edge and a velocity that takes it across the screen.
// function initializeCluster() {
//   // 0: top, 1: bottom, 2: left, 3: right.
//   const edge = Math.floor(Math.random() * 4);
//   let initialPosition: [number, number, number] = [0, 0, 0];
//   let velocityAngle = 0;

//   switch (edge) {
//     case 0: // top: start above, move downward.
//       initialPosition = [getRandomFromRange(-BOUND, BOUND), BOUND + 5, 0];
//       velocityAngle = getRandomFromRange((200 * Math.PI) / 180, (340 * Math.PI) / 180);
//       break;
//     case 1: // bottom: start below, move upward.
//       initialPosition = [getRandomFromRange(-BOUND, BOUND), -BOUND - 5, 0];
//       velocityAngle = getRandomFromRange((20 * Math.PI) / 180, (160 * Math.PI) / 180);
//       break;
//     case 2: // left: start left, move rightward.
//       initialPosition = [-BOUND - 5, getRandomFromRange(-BOUND, BOUND), 0];
//       velocityAngle = getRandomFromRange((-70 * Math.PI) / 180, (70 * Math.PI) / 180);
//       break;
//     case 3: // right: start right, move leftward.
//       initialPosition = [BOUND + 5, getRandomFromRange(-BOUND, BOUND), 0];
//       velocityAngle = getRandomFromRange((110 * Math.PI) / 180, (250 * Math.PI) / 180);
//       break;
//   }
//   // Choose a fast speed (e.g., between 8 and 15 units/second).
//   const speed = getRandomFromRange(8, 15);
//   const velocity: [number, number] = [Math.cos(velocityAngle) * speed, Math.sin(velocityAngle) * speed];

//   // For an ordered (lined) cluster, we align the stars along the same direction as the velocity.
//   const lineAngle = velocityAngle;
//   return { initialPosition, velocity, lineAngle };
// }

// // A cluster component where stars are arranged in a straight line.
// function StarClusterLine({ count = 12, spacing = 0.8 }: { count?: number; spacing?: number }) {
//   const groupRef = useRef<THREE.Group>(null);
//   // Initialize cluster parameters; stored in a ref so that reinitialization doesn't trigger re-renders.
//   const clusterParamsRef = useRef(initializeCluster());

//   // Create positions for stars arranged in a line along the lineAngle.
//   const positions = useMemo(() => {
//     const pos = new Float32Array(count * 3);
//     const { lineAngle } = clusterParamsRef.current;
//     const ux = Math.cos(lineAngle);
//     const uy = Math.sin(lineAngle);
//     const half = (count - 1) / 2;
//     for (let i = 0; i < count; i++) {
//       const offset = (i - half) * spacing;
//       pos[i * 3] = offset * ux;
//       pos[i * 3 + 1] = offset * uy;
//       pos[i * 3 + 2] = 0;
//     }
//     return pos;
//   }, [count]);

//   useFrame((_, delta) => {
//     if (groupRef.current) {
//       // Update the cluster's position based on its velocity.
//       const { velocity } = clusterParamsRef.current;
//       groupRef.current.position.x += velocity[0] * delta;
//       groupRef.current.position.y += velocity[1] * delta;

//       // If the cluster moves out of bounds, reinitialize it.
//       const pos = groupRef.current.position;
//       if (pos.x < -BOUND - 10 || pos.x > BOUND + 10 || pos.y < -BOUND - 10 || pos.y > BOUND + 10) {
//         clusterParamsRef.current = initializeCluster();
//         const { initialPosition } = clusterParamsRef.current;
//         groupRef.current.position.set(initialPosition[0], initialPosition[1], 0);
//       }
//     }
//   });

//   return (
//     <group ref={groupRef} position={clusterParamsRef.current.initialPosition}>
//       <points>
//         <bufferGeometry>
//           <bufferAttribute
//             attach="attributes-position"
//             count={positions.length / 3}
//             array={positions}
//             itemSize={3}
//           />
//         </bufferGeometry>
//         <pointsMaterial
//           map={starTexture}
//           size={0.2}           // Very tiny stars.
//           transparent
//           opacity={0.3}        // Reduced brightness.
//           sizeAttenuation
//         />
//       </points>
//     </group>
//   );
// }

// // Render multiple clusters.
// function MovingStarClusters() {
//   const clusterCount = 12; // Total clusters on screen.
//   const clusters = useMemo(() => Array.from({ length: clusterCount }), [clusterCount]);
//   return (
//     <>
//       {clusters.map((_, i) => (
//         <StarClusterLine key={i} count={12} spacing={0.8} />
//       ))}
//     </>
//   );
// }

// // The main Background component with the dark, purplish-bluish gradient.
// export function Background() {
//   return (
//     <div
//       className="fixed inset-0 -z-10"
//       style={{
//         background: 'linear-gradient(135deg, #000000, #220033, #000033)',
//       }}
//     >
//       <Canvas
//         camera={{ position: [0, 0, 30], fov: 60 }}
//         style={{ width: '100vw', height: '100vh' }}
//         gl={{ alpha: true }}
//       >
//         <MovingStarClusters />
//       </Canvas>
//     </div>
//   );
// }

// Background.tsx
// import React, { useMemo, useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

// // Utility: Generate a perfectly round star texture
// function generateStarTexture() {
//   const size = 64;
//   const canvas = document.createElement('canvas');
//   canvas.width = size;
//   canvas.height = size;
//   const ctx = canvas.getContext('2d');
//   if (ctx) {
//     ctx.fillStyle = 'white';
//     ctx.beginPath();
//     ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
//     ctx.fill();
//   }
//   return new THREE.CanvasTexture(canvas);
// }
// const starTexture = generateStarTexture();

// // Utility: Random number between min and max
// function getRandomFromRange(min: number, max: number) {
//   return Math.random() * (max - min) + min;
// }

// // Generate starting parameters for a shooting star cluster:
// // Choose a random side for it to start from, and assign a random velocity.
// function generateClusterParameters() {
//   const sides = ['top', 'bottom', 'left', 'right'];
//   const side = sides[Math.floor(Math.random() * sides.length)];
//   const bound = 60; // Defines the border where clusters begin
//   let initialPosition = { x: 0, y: 0 };
//   switch (side) {
//     case 'top':
//       initialPosition = { x: getRandomFromRange(-bound, bound), y: bound };
//       break;
//     case 'bottom':
//       initialPosition = { x: getRandomFromRange(-bound, bound), y: -bound };
//       break;
//     case 'left':
//       initialPosition = { x: -bound, y: getRandomFromRange(-bound, bound) };
//       break;
//     case 'right':
//       initialPosition = { x: bound, y: getRandomFromRange(-bound, bound) };
//       break;
//   }
//   // Random direction (any angle) with a fast speed.
//   const angle = getRandomFromRange(0, 2 * Math.PI);
//   const speed = getRandomFromRange(10, 20);
//   const velocity = { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed };
//   return { initialPosition, velocity };
// }

// // A shooting star cluster: stars are randomly scattered within a small rectangle,
// // giving a loosely ordered (quadrilateral) pattern.
// function ShootingStarCluster({ count = 20, clusterWidth = 4, clusterHeight = 4 }: { count?: number; clusterWidth?: number; clusterHeight?: number }) {
//   const groupRef = useRef<THREE.Group>(null);
//   // Store the cluster parameters in a ref so we can update them without re-rendering.
//   const clusterParamsRef = useRef(generateClusterParameters());

//   // Generate random positions for each star within the cluster's rectangular region.
//   const positions = useMemo(() => {
//     const pos = new Float32Array(count * 3);
//     for (let i = 0; i < count; i++) {
//       pos[i * 3] = getRandomFromRange(-clusterWidth / 2, clusterWidth / 2);
//       pos[i * 3 + 1] = getRandomFromRange(-clusterHeight / 2, clusterHeight / 2);
//       pos[i * 3 + 2] = 0;
//     }
//     return pos;
//   }, [count, clusterWidth, clusterHeight]);

//   // Generate per-star colors to simulate depth: some stars are dimmer, some brighter.
//   const colors = useMemo(() => {
//     const col = new Float32Array(count * 3);
//     for (let i = 0; i < count; i++) {
//       const brightness = getRandomFromRange(0.3, 1.0);
//       col[i * 3] = brightness;
//       col[i * 3 + 1] = brightness;
//       col[i * 3 + 2] = brightness;
//     }
//     return col;
//   }, [count]);

//   useFrame((_, delta) => {
//     if (groupRef.current) {
//       const { velocity } = clusterParamsRef.current;
//       groupRef.current.position.x += velocity.x * delta;
//       groupRef.current.position.y += velocity.y * delta;

//       // If the cluster leaves a larger boundary, reinitialize it.
//       const pos = groupRef.current.position;
//       const reinitBound = 70;
//       if (pos.x < -reinitBound || pos.x > reinitBound || pos.y < -reinitBound || pos.y > reinitBound) {
//         const params = generateClusterParameters();
//         clusterParamsRef.current = params;
//         groupRef.current.position.set(params.initialPosition.x, params.initialPosition.y, 0);
//       }
//     }
//   });

//   return (
//     <group ref={groupRef} position={[clusterParamsRef.current.initialPosition.x, clusterParamsRef.current.initialPosition.y, 0]}>
//       <points>
//         <bufferGeometry>
//           <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
//           <bufferAttribute attach="attributes-color" array={colors} count={colors.length / 3} itemSize={5} />
//         </bufferGeometry>
//         <pointsMaterial
//           map={starTexture}
//           size={0.20}        // Very tiny stars.
//           vertexColors
//           transparent
//           opacity={0.4}      // Reduced brightness.
//           sizeAttenuation
//         />
//       </points>
//     </group>
//   );
// }

// // Render multiple shooting star clusters so that at any time some are on-screen.
// function MovingShootingStars() {
//   const clusterCount = 15; // Adjust as needed for density.
//   const clusters = useMemo(() => Array.from({ length: clusterCount }), [clusterCount]);
//   return (
//     <>
//       {clusters.map((_, i) => (
//         <ShootingStarCluster key={i} count={120} clusterWidth={4} clusterHeight={3} />
//       ))}
//     </>
//   );
// }

// // Main Background component: a full‑screen canvas with a dark, purplish-bluish gradient.
// export function Background() {
//   return (
//     <div
//       className="fixed inset-0 -z-10"
//       style={{
//         background: 'linear-gradient(135deg, #000000, #220033, #000033)',
//       }}
//     >
//       <Canvas
//         camera={{ position: [0, 0, 30], fov: 60 }}
//         style={{ width: '100vw', height: '100vh' }}
//         gl={{ alpha: true }}
//       >
//         <MovingShootingStars />
//       </Canvas>
//     </div>
//   );
// }

// Background.tsx
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Utility: Generate a perfectly round star texture.
function generateStarTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}
const starTexture = generateStarTexture();

// Utility: Return a random number between min and max.
function getRandomFromRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// The visible (and spawn) boundaries
const SPAWN_BOUND = 50;
const REINIT_BOUND = 60;

type Arrangement = 'line' | 'scatter';

interface ClusterParams {
  initialPosition: { x: number; y: number };
  velocity: { x: number; y: number };
  // For line clusters, a direction for positioning stars.
  lineAngle?: number;
  arrangement: Arrangement;
}

// Generate parameters for a new cluster.
// It spawns just outside the visible area (on a random edge) and gets a random velocity.
function generateClusterParameters(arrangement: Arrangement): ClusterParams {
  const sides: Array<'top' | 'bottom' | 'left' | 'right'> = ['top', 'bottom', 'left', 'right'];
  const side = sides[Math.floor(Math.random() * sides.length)];
  let initialPosition = { x: 0, y: 0 };
  switch (side) {
    case 'top':
      initialPosition = { x: getRandomFromRange(-SPAWN_BOUND, SPAWN_BOUND), y: SPAWN_BOUND + 5 };
      break;
    case 'bottom':
      initialPosition = { x: getRandomFromRange(-SPAWN_BOUND, SPAWN_BOUND), y: -SPAWN_BOUND - 5 };
      break;
    case 'left':
      initialPosition = { x: -SPAWN_BOUND - 5, y: getRandomFromRange(-SPAWN_BOUND, SPAWN_BOUND) };
      break;
    case 'right':
      initialPosition = { x: SPAWN_BOUND + 5, y: getRandomFromRange(-SPAWN_BOUND, SPAWN_BOUND) };
      break;
  }
  // Pick any angle for velocity (full 360°) with a fast speed.
  const angle = getRandomFromRange(0, 2 * Math.PI);
  const speed = getRandomFromRange(10, 20);
  const velocity = { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed };
  // For line clusters, also record the angle for positioning stars.
  const lineAngle = arrangement === 'line' ? angle : undefined;
  return { initialPosition, velocity, lineAngle, arrangement };
}

interface ShootingStarClusterProps {
  count: number;
  // For scatter: width and height of the rectangular spread.
  clusterWidth: number;
  clusterHeight: number;
  // For line: spacing between stars.
  spacing?: number;
  arrangement: Arrangement;
}

// A shooting star cluster: either arranged in a straight line or scattered in a loose quadrilateral.
function ShootingStarCluster({
  count,
  clusterWidth,
  clusterHeight,
  spacing = 0.8,
  arrangement,
}: ShootingStarClusterProps) {
  const groupRef = useRef<THREE.Group>(null);
  // Store cluster parameters (spawn position, velocity, etc.) in a ref.
  const clusterParamsRef = useRef<ClusterParams>(generateClusterParameters(arrangement));

  // Compute positions for the stars.
  // For "line" clusters, arrange them evenly along a line defined by lineAngle.
  // For "scatter", position them randomly within the rectangle.
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    if (arrangement === 'line' && clusterParamsRef.current.lineAngle !== undefined) {
      const angle = clusterParamsRef.current.lineAngle;
      const ux = Math.cos(angle);
      const uy = Math.sin(angle);
      const half = (count - 1) / 2;
      for (let i = 0; i < count; i++) {
        const offset = (i - half) * spacing;
        pos[i * 3] = offset * ux;
        pos[i * 3 + 1] = offset * uy;
        pos[i * 3 + 2] = 0;
      }
    } else {
      for (let i = 0; i < count; i++) {
        pos[i * 3] = getRandomFromRange(-clusterWidth / 2, clusterWidth / 2);
        pos[i * 3 + 1] = getRandomFromRange(-clusterHeight / 2, clusterHeight / 2);
        pos[i * 3 + 2] = 0;
      }
    }
    return pos;
  }, [arrangement, count, clusterWidth, clusterHeight, spacing]);

  // Generate per-star brightness values to simulate depth.
  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const brightness = getRandomFromRange(0.3, 1.0);
      col[i * 3] = brightness;
      col[i * 3 + 1] = brightness;
      col[i * 3 + 2] = brightness;
    }
    return col;
  }, [count]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const { velocity } = clusterParamsRef.current;
      groupRef.current.position.x += velocity.x * delta;
      groupRef.current.position.y += velocity.y * delta;
      const pos = groupRef.current.position;
      if (
        pos.x < -REINIT_BOUND ||
        pos.x > REINIT_BOUND ||
        pos.y < -REINIT_BOUND ||
        pos.y > REINIT_BOUND
      ) {
        // Reinitialize: spawn a new cluster regardless of whether others have left.
        const params = generateClusterParameters(arrangement);
        clusterParamsRef.current = params;
        groupRef.current.position.set(params.initialPosition.x, params.initialPosition.y, 0);
      }
    }
  });

  return (
    <group ref={groupRef} position={[clusterParamsRef.current.initialPosition.x, clusterParamsRef.current.initialPosition.y, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={colors} count={colors.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          map={starTexture}
          size={0.15} // Tiny stars.
          vertexColors
          transparent
          opacity={0.4} // Reduced brightness.
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// The manager: continuously render many shooting star clusters.
// We spawn a larger number so that even if some clusters are off-screen, new ones are always entering.
function MovingShootingStars() {
  const clusterCount = 30; // Increase density for a constantly populated scene.
  const clusters = useMemo(
    () =>
      Array.from({ length: clusterCount }).map(() => ({
        // Randomly decide the arrangement type.
        arrangement: Math.random() > 0.5 ? 'line' : 'scatter',
      })),
    [clusterCount]
  );
  return (
    <>
      {clusters.map((cluster, i) => (
        <ShootingStarCluster
          key={i}
          count={20}
          clusterWidth={4}
          clusterHeight={4}
          spacing={0.8}
          arrangement={cluster.arrangement}
        />
      ))}
    </>
  );
}

// The main Background component: a full-screen Canvas with a dark, purplish-bluish gradient.
// Its z-index is set so that foreground elements (like a timeline) will remain visible.
export function Background() {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: 'linear-gradient(135deg, #000000, #220033, #000033)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60 }}
        style={{ width: '100vw', height: '100vh' }}
        gl={{ alpha: true }}
      >
        <MovingShootingStars />
      </Canvas>
    </div>
  );
}
