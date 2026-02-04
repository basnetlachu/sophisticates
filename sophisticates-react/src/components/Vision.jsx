import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Vision = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <section id="vision" ref={ref} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: '80vh',
            borderTop: '1px solid var(--border-color)',
            padding: '0',
            overflow: 'hidden',
            background: 'var(--bg-color)'
        }} className="grid-stack-mobile">

            {/* Visual Column */}
            <div style={{
                position: 'relative',
                height: '400px',
                width: '100%',
                background: 'var(--bg-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRight: '1px solid var(--border-color)'
            }} className="mobile-no-border">
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={isInView ? { opacity: 0.4, scale: 1 } : {}}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'url(/vision-abstract.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'grayscale(100%)'
                    }}
                />
                <div style={{ position: 'relative', zIndex: 1, padding: '40px', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 }}
                        style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: 'var(--text-main)', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '20px' }}
                    >
                        Core Visionary Matrix
                    </motion.div>
                </div>
            </div>

            {/* Content Column */}
            <div style={{ padding: 'clamp(40px, 8vw, 100px) var(--container-padding)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 style={{
                        fontFamily: 'Syne, sans-serif',
                        fontSize: '1rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--text-main)',
                        marginBottom: '40px'
                    }}>
            // 01. Vision
                    </h2>
                    <p style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                        lineHeight: '1.3',
                        fontWeight: 400,
                        color: 'var(--text-main)',
                        maxWidth: '100%'
                    }}>
                        To build the frontier infrastructure for intelligence and physical systems that make <span style={{ color: 'var(--text-muted)' }}>complexity navigable</span>.
                        <br /><br />
                        We convert theoretical constraints in <span style={{ color: 'var(--text-main)' }}>AI, Quantum Computing, Physics, and Robotics</span> into practical breakthroughs for humanity.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Vision;
