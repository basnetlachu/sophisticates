import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';

const StaticCanvasWrapper = ({ children, isDarkMode }) => (
    <Canvas 
        frameloop="demand" 
        camera={{ position: [0, 0, 12], fov: 40 }} 
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%', outline: 'none' }}
    >
        <ambientLight intensity={isDarkMode ? 0.6 : 1.2} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} color={isDarkMode ? "#ffffff" : "#666666"} />
        <directionalLight position={[-10, -10, -10]} intensity={0.4} color={isDarkMode ? "#444444" : "#cccccc"} />
        
        <group position={[0, 0, 0]}>
            {children}
        </group>
        <Environment preset={isDarkMode ? "city" : "studio"} />
    </Canvas>
);

// 1. Value Proposition (Clarity from Chaos)
export const VPPicture = () => {
    const { isDarkMode } = useTheme();
    const glassMaterial = {
        color: isDarkMode ? "#ffffff" : "#cccccc",
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.95,
        thickness: 0.5,
        ior: 1.5,
        transparent: true,
        opacity: 0.5
    };
    
    const solidMaterial = {
        color: isDarkMode ? "#ffffff" : "#111111",
        metalness: 0.9,
        roughness: 0.2
    };

    return (
        <StaticCanvasWrapper isDarkMode={isDarkMode}>
            {/* The structural filter */}
            <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 6, 0]}>
                <boxGeometry args={[3, 5, 0.4]} />
                <meshPhysicalMaterial {...glassMaterial} />
            </mesh>

            {/* Chaotic input (Left side) */}
            <group position={[-4, 0, -2]}>
                {[...Array(12)].map((_, i) => (
                    <mesh key={`chaos-${i}`} position={[(Math.random() - 0.5) * 3, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3]}>
                        <sphereGeometry args={[0.2 + Math.random() * 0.3, 32, 32]} />
                        <meshStandardMaterial {...solidMaterial} />
                    </mesh>
                ))}
            </group>

            {/* Structured output (Right side) */}
            <group position={[4, 0, 1]} rotation={[0, Math.PI / 6, 0]}>
                {[0, 1, 2].map(x => 
                    [-1, 0, 1].map(y => (
                        <mesh key={`struct-${x}-${y}`} position={[x * 1.0 - 1.0, y * 1.0, 0]}>
                            <boxGeometry args={[0.6, 0.6, 0.6]} />
                            <meshStandardMaterial {...solidMaterial} />
                        </mesh>
                    ))
                )}
            </group>
        </StaticCanvasWrapper>
    );
};

// 2. Products (MEMOPT - Universal Memory Fabric)
export const ProductPicture = () => {
    const { isDarkMode } = useTheme();
    const glassMaterial = {
        color: isDarkMode ? "#ffffff" : "#cccccc",
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.9,
        transparent: true,
        opacity: 0.4
    };
    
    return (
        <StaticCanvasWrapper isDarkMode={isDarkMode}>
            <group rotation={[0.4, -0.4, 0]} position={[0, 1.5, 0]}>
                {/* Orchestration Rings (Funnel) */}
                {[0, 1, 2, 3, 4].map(i => (
                    <mesh key={`ring-${i}`} position={[0, -i * 1.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[3 - i * 0.3, 0.15, 16, 64]} />
                        <meshPhysicalMaterial {...glassMaterial} color={isDarkMode ? "#ffffff" : "#aaaaaa"} />
                    </mesh>
                ))}

                {/* Uncollided Flowing Data (Spheres) */}
                {[0, 1, 2, 3, 4].map(i => (
                    <group key={`data-${i}`} position={[0, -i * 1.0 + 0.2, 0]}>
                        <mesh position={[-0.8 + i*0.1, 0, 0.8 - i*0.1]}>
                            <sphereGeometry args={[0.15, 32, 32]} />
                            <meshStandardMaterial color={isDarkMode ? "#ffffff" : "#111111"} metalness={0.8} />
                        </mesh>
                        <mesh position={[0.8 - i*0.1, 0, -0.8 + i*0.1]}>
                            <sphereGeometry args={[0.1, 32, 32]} />
                            <meshStandardMaterial color={isDarkMode ? "#cccccc" : "#333333"} metalness={0.8} />
                        </mesh>
                    </group>
                ))}
                
                {/* Central CPU/Memory Processor Block */}
                <mesh position={[0, -4.5, 0]}>
                    <cylinderGeometry args={[1.5, 1.5, 0.4, 32]} />
                    <meshStandardMaterial color={isDarkMode ? "#050505" : "#e0e0e0"} metalness={0.9} roughness={0.2} />
                </mesh>
            </group>
        </StaticCanvasWrapper>
    );
};

// 3. Infrastructure (GPU Data Center / GPU Stacks)
export const InfraPicture = () => {
    const { isDarkMode } = useTheme();
    const rackMaterial = {
        color: isDarkMode ? "#1a1a1a" : "#e0e0e0",
        metalness: 0.9,
        roughness: 0.1
    };

    const gpuMaterial = {
        color: isDarkMode ? "#ffffff" : "#333333",
        emissive: isDarkMode ? "#ffffff" : "#000000",
        emissiveIntensity: isDarkMode ? 0.2 : 0,
        metalness: 1,
        roughness: 0.2
    };

    const lightMaterial = {
        color: "#00ff88",
        emissive: "#00ff88",
        emissiveIntensity: 2
    };

    const Rack = ({ position }) => (
        <group position={position}>
            {/* Main Rack Body */}
            <mesh>
                <boxGeometry args={[1.5, 6, 1.2]} />
                <meshStandardMaterial {...rackMaterial} />
            </mesh>
            {/* GPU Units (stacked) */}
            {[...Array(8)].map((_, i) => (
                <group key={`gpu-${i}`} position={[0, -2.5 + i * 0.7, 0.61]}>
                    <mesh>
                        <boxGeometry args={[1.3, 0.4, 0.05]} />
                        <meshStandardMaterial {...gpuMaterial} />
                    </mesh>
                    {/* Status lights */}
                    <mesh position={[-0.5, 0, 0.03]}>
                        <sphereGeometry args={[0.03, 16, 16]} />
                        <meshStandardMaterial {...lightMaterial} />
                    </mesh>
                </group>
            ))}
        </group>
    );

    return (
        <StaticCanvasWrapper isDarkMode={isDarkMode}>
            <group rotation={[0.2, -Math.PI / 6, 0]} position={[0, 0, 0]}>
                {/* Two rows of racks */}
                <Rack position={[-2, 0, -1]} />
                <Rack position={[0, 0, 0]} />
                <Rack position={[2, 0, 1]} />
                
                {/* Floor Grid */}
                <mesh position={[0, -3.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial 
                        color={isDarkMode ? "#050505" : "#f5f5f5"} 
                        roughness={0.1}
                        metalness={0.5}
                    />
                </mesh>
            </group>
        </StaticCanvasWrapper>
    );
};
