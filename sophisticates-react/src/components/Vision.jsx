import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Vision = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <section id="vision" ref={ref} className="section-padding" style={{
            background: 'var(--bg-color)',
            borderTop: '1px solid var(--border-color)',
        }}>
            <div className="max-w-container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(300px, 1fr) 1.2fr',
                    gap: 'clamp(40px, 8vw, 100px)',
                    alignItems: 'center'
                }} className="grid-stack-tablet">

                    {/* Visual Container */}
                    <div style={{ position: 'relative' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            whileHover={{ scale: 1.02 }}
                            style={{
                                width: '100%',
                                aspectRatio: '4/5',
                                backgroundImage: 'url(/vision_bg.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'grayscale(100%) contrast(1.1)',
                                border: '1px solid var(--border-color)',
                                transition: 'transform 0.6s ease'
                            }}
                        />
                        <div style={{ marginTop: '16px', fontFamily: 'monospace', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                            Fig. 1 — Visionary Matrix
                        </div>
                    </div>

                    {/* Content Container */}
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
                            fontWeight: 300,
                            color: 'var(--text-main)',
                        }}>
                            To build the frontier infrastructure for intelligence and physical systems that make <strong style={{ fontWeight: 500 }}>complexity navigable</strong>.
                            <br /><br />
                            We convert theoretical constraints in <strong style={{ fontWeight: 500 }}>AI, Quantum Computing, Physics, and Robotics</strong> into practical breakthroughs for humanity.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Vision;
