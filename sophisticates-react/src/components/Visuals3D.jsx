import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';
import { useMobile } from '../hooks/useMobile';

const ResponsiveWrapper = ({ children }) => {
    const { isDarkMode } = useTheme();
    const isMobile = useMobile();

    const wrapperStyle = isMobile 
        ? { position: 'absolute', top: '5%', left: 0, width: '100%', height: '40vh', zIndex: 0, pointerEvents: 'none', opacity: 0.2 }
        : { position: 'absolute', top: '10%', right: '5%', width: '45vw', height: '80vh', zIndex: 0, pointerEvents: 'none', opacity: 0.8 };

    return (
        <div style={wrapperStyle}>
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={isDarkMode ? 0.6 : 1.2} />
                <directionalLight position={[5, 10, 5]} intensity={1.5} color={isDarkMode ? "#ffffff" : "#666666"} />
                <directionalLight position={[-5, -10, -5]} intensity={0.5} color={isDarkMode ? "#444444" : "#cccccc"} />
                {children}
                <Environment preset={isDarkMode ? "city" : "studio"} />
            </Canvas>
        </div>
    );
};

// --- ABOUT SCENE ---
const AboutScene = () => {
    const { isDarkMode } = useTheme();
    const groupRef = useRef();
    
    useFrame((state, delta) => {
        groupRef.current.rotation.x += delta * 0.1;
        groupRef.current.rotation.y += delta * 0.15;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
            <group ref={groupRef}>
                <mesh scale={2.8}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshPhysicalMaterial color={isDarkMode ? "#ffffff" : "#000000"} wireframe={true} metalness={1} opacity={isDarkMode ? 0.15 : 0.05} transparent={true} />
                </mesh>
                <mesh scale={2.0}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color={isDarkMode ? "#050505" : "#ffffff"} metalness={0.8} roughness={0.2} />
                </mesh>
            </group>
        </Float>
    );
};

export const AboutVisualizer = () => (
    <ResponsiveWrapper>
        <AboutScene />
    </ResponsiveWrapper>
);


// --- RESEARCH SCENE ---
const ResearchScene = () => {
    const { isDarkMode } = useTheme();
    const groupRef = useRef();
    const ring1 = useRef();
    const ring2 = useRef();

    useFrame((state, delta) => {
        groupRef.current.rotation.y += delta * 0.05;
        ring1.current.rotation.x -= delta * 0.5;
        ring1.current.rotation.y -= delta * 0.3;
        ring2.current.rotation.x += delta * 0.4;
        ring2.current.rotation.z += delta * 0.6;
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
            <group ref={groupRef}>
                <mesh scale={1.2}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color={isDarkMode ? "#000000" : "#ffffff"} metalness={1} roughness={0.2} />
                </mesh>
                <mesh ref={ring1} scale={2.8}>
                    <torusGeometry args={[1, 0.02, 16, 100]} />
                    <meshPhysicalMaterial color={isDarkMode ? "#ffffff" : "#000000"} metalness={1} opacity={isDarkMode ? 0.4 : 0.1} transparent={true} />
                </mesh>
                <mesh ref={ring2} scale={2.8} rotation={[Math.PI/2, 0, 0]}>
                    <torusGeometry args={[1, 0.02, 16, 100]} />
                    <meshPhysicalMaterial color={isDarkMode ? "#ffffff" : "#000000"} metalness={1} opacity={isDarkMode ? 0.4 : 0.1} transparent={true} />
                </mesh>
            </group>
        </Float>
    );
};

export const ResearchVisualizer = () => (
    <ResponsiveWrapper>
        <ResearchScene />
    </ResponsiveWrapper>
);


// --- PARTNERS SCENE ---
const PartnersScene = () => {
    const { isDarkMode } = useTheme();
    const r1 = useRef();
    const r2 = useRef();

    useFrame((state, delta) => {
        r1.current.rotation.x += delta * 0.2;
        r2.current.rotation.x -= delta * 0.2;
        r1.current.rotation.y += delta * 0.1;
        r2.current.rotation.y -= delta * 0.1;
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
            <group>
                <mesh ref={r1} position={[-0.8, 0, 0]} scale={1.5}>
                    <torusGeometry args={[1, 0.15, 32, 64]} />
                    <meshStandardMaterial color={isDarkMode ? "#ffffff" : "#000000"} metalness={0.9} roughness={0.1} transparent={true} opacity={isDarkMode ? 0.3 : 0.15} />
                </mesh>
                <mesh ref={r2} position={[0.8, 0, 0]} scale={1.5} rotation={[0, Math.PI/2, 0]}>
                    <torusGeometry args={[1, 0.15, 32, 64]} />
                    <meshStandardMaterial color={isDarkMode ? "#111111" : "#ffffff"} metalness={0.9} roughness={0.1} />
                </mesh>
            </group>
        </Float>
    );
};

export const PartnersVisualizer = () => (
    <ResponsiveWrapper>
        <PartnersScene />
    </ResponsiveWrapper>
);


// --- CAREERS SCENE ---
const CareersScene = () => {
    const { isDarkMode } = useTheme();
    const groupRef = useRef();
    
    useFrame((state, delta) => {
        groupRef.current.rotation.y += delta * 0.1;
    });

    return (
        <Float speed={2} rotationIntensity={0.1} floatIntensity={1.2}>
            <group ref={groupRef} position={[0, -1, 0]}>
                {[0, 1, 2, 3].map((i) => (
                    <mesh key={i} position={[Math.sin(i)*1.5, i * 1.2, Math.cos(i)*1.5]} scale={1 - (i*0.15)}>
                        <boxGeometry args={[1.5, 0.2, 1.5]} />
                        <meshStandardMaterial color={isDarkMode ? "#ffffff" : "#000000"} metalness={0.8} roughness={0.2} transparent={true} opacity={0.8 - (i*0.1)} />
                    </mesh>
                ))}
                <mesh position={[0, 4.5, 0]} scale={0.6}>
                    <octahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color={isDarkMode ? "#020202" : "#ffffff"} metalness={0.9} roughness={0.2} />
                </mesh>
            </group>
        </Float>
    );
};

export const CareersVisualizer = () => (
    <ResponsiveWrapper>
        <CareersScene />
    </ResponsiveWrapper>
);
