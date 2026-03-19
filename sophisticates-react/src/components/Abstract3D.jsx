import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useEnvironment } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';
import { useMobile } from '../hooks/useMobile';

// Preload both HDR presets immediately at module load time — before Canvas mounts
useEnvironment.preload({ preset: 'city' });
useEnvironment.preload({ preset: 'studio' });

const Monolith = ({ isDarkMode }) => {
    const meshRef = useRef();
    const coreRef = useRef();

    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta * 0.08;
        meshRef.current.rotation.y += delta * 0.12;
        coreRef.current.rotation.y -= delta * 0.04;
        coreRef.current.rotation.z -= delta * 0.04;
    });

    const isMobile = useMobile();
    const xPos = isMobile ? 0 : 4;
    const yPos = isMobile ? -1 : -0.5;

    return (
        <group position={[xPos, yPos, -5]}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Outer Wireframe Hull */}
                <mesh ref={meshRef} scale={3.4}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshPhysicalMaterial
                        color={isDarkMode ? "#ffffff" : "#111111"}
                        metalness={1}
                        roughness={0}
                        wireframe={true}
                        transparent={true}
                        opacity={isDarkMode ? 0.08 : 0.12}
                    />
                </mesh>
                
                {/* Inner Solid Core */}
                <mesh ref={coreRef} scale={3.1}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial
                        color={isDarkMode ? "#020202" : "#cccccc"}
                        metalness={0.9}
                        roughness={0.3}
                    />
                </mesh>
            </Float>
        </group>
    );
};

const Abstract3D = () => {
    const { isDarkMode } = useTheme();

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
            // Prevent any CSS transition/fade on the wrapper
            transition: 'none',
            opacity: 1,
            willChange: 'auto',
        }}>
            <Canvas
                camera={{ position: [0, 0, 10], fov: 40 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 1.5]}
                onCreated={({ gl }) => {
                    // Immediately render first frame so no blank flash
                    gl.render;
                }}
            >
                <ambientLight intensity={isDarkMode ? 0.8 : 1.2} />
                <directionalLight position={[5, 10, 5]} intensity={1.5} color={isDarkMode ? "#ffffff" : "#444444"} />
                <directionalLight position={[-5, -10, -5]} intensity={0.5} color={isDarkMode ? "#444444" : "#aaaaaa"} />
                <Monolith isDarkMode={isDarkMode} />
                <Suspense fallback={null}>
                    <Environment preset={isDarkMode ? "city" : "studio"} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Abstract3D;
