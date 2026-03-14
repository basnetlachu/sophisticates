import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Vision = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20% 0px" });
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    // Deeper parallax for cinematic feel
    const imageY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

    const [isDesktop, setIsDesktop] = useState(true);
    useEffect(() => {
        const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    return (
        <section id="vision" ref={ref} className="section-padding" style={{
            background: 'var(--bg-color)',
            position: 'relative',
            overflow: 'hidden',
            paddingBottom: 'clamp(100px, 15vh, 200px)'
        }}>
            <div className="max-w-container">
                <div className="vision-grid">

                    {/* Visual Container - Asymmetric Placement */}
                    <div style={{ position: 'relative', paddingTop: isDesktop ? '10vh' : '0' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            style={{ position: 'relative', overflow: 'hidden', borderRadius: '2px' }}
                            className="glass-panel"
                        >
                            <motion.div
                                style={{
                                    width: '100%',
                                    aspectRatio: '1/1',
                                    backgroundImage: 'url(/vision_bg.webp)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    filter: 'grayscale(100%) contrast(1.1) brightness(0.7)',
                                    y: imageY,
                                    scale: 1.2
                                }}
                            />
                            {/* Overlay Glow */}
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'radial-gradient(circle at 30% 30%, var(--grid-line), transparent 60%)',
                                pointerEvents: 'none'
                            }} />
                        </motion.div>

                        {/* Image Caption */}
                        <div style={{
                            display: 'flex',
                            marginTop: '24px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.8rem',
                            color: 'var(--text-dim)'
                        }}>
                            <span>Fig. 1 — Visionary Matrix</span>
                        </div>
                    </div>

                    {/* Content Container */}
                    <motion.div
                        style={{ y: textY, display: 'flex', flexDirection: 'column', gap: '48px' }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    >
                        <div>
                            <div className="section-label-wrapper">
                                <div className="section-label-line" />
                                <span className="section-label">The Vision</span>
                            </div>

                            <p style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(1.7rem, 2.4vw, 2.5rem)',
                                lineHeight: '0.95',
                                fontWeight: 500,
                                letterSpacing: '-0.05em',
                                color: 'var(--text-main)',
                                margin: 0,
                                marginBottom: '32px'
                            }}>
                                To build the <span className="text-accent" style={{ color: 'var(--text-dim)' }}>frontier</span> infrastructure for intelligence and physical systems.
                            </p>

                            <div style={{ maxWidth: '450px' }}>
                                <p style={{
                                        fontSize: 'clamp(0.9rem, 1.2vw, 1.15rem)',
                                        color: 'var(--text-muted)',
                                        lineHeight: '1.7',
                                        fontFamily: 'var(--font-body)',
                                        fontWeight: 300,
                                        letterSpacing: '-0.01em'
                                    }}>
                                    We convert theoretical constraints in <span style={{ color: 'var(--text-main)', fontWeight: 400 }}>AI, Quantum, Physics, and Robotics</span> into practical breakthroughs for humanity.
                                    <br /><br />
                                    Our methodology is rooted in the convergence of software abstraction and physical hardware resilience.
                                </p>
                            </div>
                        </div>

                        {/* Decorative Detail */}
                        <div style={{ width: '100%', height: '1px', background: 'var(--border-color)', opacity: 0.5 }} />
                    </motion.div>

                </div>
            </div>

        </section>
    );
};

export default Vision;
