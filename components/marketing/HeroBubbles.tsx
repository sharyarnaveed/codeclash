'use client';

import { Suspense, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, useProgress } from '@react-three/drei';
import type { Mesh } from 'three';

type BubbleConfig = {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  offset: number;
  distort: number;
};

const BUBBLES: BubbleConfig[] = [
  { position: [-2.8, 0.6, -1.5], scale: 2.4, color: '#FF8C42', speed: 0.55, offset: 0, distort: 0.35 },
  { position: [2.6, -0.4, -2], scale: 2.8, color: '#FFB088', speed: 0.45, offset: 1.2, distort: 0.4 },
  { position: [0.2, 1.2, -3], scale: 1.6, color: '#4A90D9', speed: 0.65, offset: 2.4, distort: 0.25 },
  { position: [-1.2, -1.4, -0.8], scale: 1.4, color: '#FFCCAA', speed: 0.5, offset: 3.1, distort: 0.3 },
  { position: [3.2, 1.8, -2.5], scale: 1.2, color: '#6BB5FF', speed: 0.7, offset: 4.5, distort: 0.2 },
  { position: [-3.4, -0.8, -2.8], scale: 1.8, color: '#FF7043', speed: 0.4, offset: 5.8, distort: 0.32 },
];

type HeroBubblesProps = {
  onProgress?: (progress: number) => void;
  onReady?: () => void;
};

function SceneProgressReporter({
  onProgress,
  onReady,
}: {
  onProgress?: (progress: number) => void;
  onReady?: () => void;
}) {
  const { active, progress, loaded, total } = useProgress();
  const readySentRef = useRef(false);

  useEffect(() => {
    const mapped = 55 + (progress / 100) * 40;
    onProgress?.(mapped);
  }, [onProgress, progress]);

  useEffect(() => {
    if (readySentRef.current) return;
    if (!active && loaded === total && total > 0) {
      readySentRef.current = true;
      onProgress?.(100);
      onReady?.();
    }
  }, [active, loaded, total, onProgress, onReady]);

  return null;
}

function AnimatedBubble({ position, scale, color, speed, offset, distort }: BubbleConfig) {
  const meshRef = useRef<Mesh>(null);
  const basePosition = useMemo(() => position, [position]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = state.clock.elapsedTime * speed + offset;
    mesh.position.x = basePosition[0] + Math.sin(t * 0.6) * 0.35;
    mesh.position.y = basePosition[1] + Math.cos(t * 0.45) * 0.3;
    mesh.position.z = basePosition[2] + Math.sin(t * 0.3) * 0.15;
    mesh.rotation.x = Math.sin(t * 0.25) * 0.25 + 0.1;
    mesh.rotation.y = t * 0.12;
    mesh.rotation.z = Math.cos(t * 0.2) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 5]} />
      <MeshTransmissionMaterial
        backside
        samples={6}
        resolution={256}
        transmission={0.97}
        thickness={0.8}
        roughness={0.05}
        ior={1.45}
        chromaticAberration={0.08}
        anisotropy={0.4}
        distortion={distort}
        distortionScale={0.35}
        temporalDistortion={0.15}
        clearcoat={1}
        clearcoatRoughness={0.1}
        color={color}
        attenuationColor={color}
        attenuationDistance={0.8}
      />
    </mesh>
  );
}

function BubbleScene({
  onProgress,
  onReady,
}: {
  onProgress?: (progress: number) => void;
  onReady?: () => void;
}) {
  return (
    <>
      <SceneProgressReporter onProgress={onProgress} onReady={onReady} />
      <ambientLight intensity={0.15} />
      <pointLight position={[6, 4, 4]} intensity={3} color="#FF8C42" />
      <pointLight position={[-5, -2, 3]} intensity={2} color="#4A90D9" />
      <pointLight position={[0, -4, 2]} intensity={1.2} color="#FFB088" />
      <spotLight position={[0, 8, 0]} intensity={0.8} angle={0.5} penumbra={1} color="#FFCCAA" />

      {BUBBLES.map((bubble, i) => (
        <AnimatedBubble key={i} {...bubble} />
      ))}

      <Environment preset="city" />
    </>
  );
}

export function HeroBubbles({ onProgress, onReady }: HeroBubblesProps) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-black" />
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        onCreated={() => onProgress?.(50)}
      >
        <Suspense fallback={null}>
          <BubbleScene onProgress={onProgress} onReady={onReady} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
}
