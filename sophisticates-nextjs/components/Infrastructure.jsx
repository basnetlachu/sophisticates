'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

const Infrastructure = () => {
    const ref = useRef(null);
    const isMobile = useMobile();
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    // Parallax — disabled on mobile
    const isDesktop = !isMobile;
    const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-60, 60]);
    const textY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 20]);

    return (
        <section id="infrastructure" ref={ref} className="section-padding" style={{
            background: 'var(--bg-color)',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: 'clamp(60px, 8vh, 100px)'
        }}>
            <div className="max-w-container">
                <div className="infra-grid">

                    {/* Content Container */}
                    <motion.div
                        initial={isMobile ? {} : { opacity: 0, x: -30 }}
                        animate={(!isMobile && isInView) ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ y: isMobile ? 0 : textY, zIndex: 2 }}
                    >
                        <div className="section-label-wrapper">
                            <div className="section-label-line" />
                            <span className="section-label">Architecture</span>
                        </div>

                        <p style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.5rem, 2.3vw, 2.7rem)',
                            lineHeight: '0.95',
                            fontWeight: 500,
                            letterSpacing: '-0.05em',
                            color: 'var(--text-main)',
                            margin: 0,
                            marginBottom: '40px'
                        }}>
                            Systems that <span className="text-accent" style={{ color: 'var(--text-dim)' }}>transcend</span> hardware.
                        </p>

                        <div style={{ maxWidth: '500px', marginBottom: '48px' }}>
                            <p style={{
                                fontSize: 'clamp(0.9rem, 1.2vw, 1.15rem)',
                                color: 'var(--text-muted)',
                                lineHeight: '1.7',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 300
                            }}>
                                We engineer foundational layers that eliminate computational bottlenecks, aligning raw potential with effective execution. Our specialized infrastructure transforms fragmented GPU resources into a contiguous, global memory fabric, ensuring that the mission of Sophisticates remains resilient against supply chain constraints.
                            </p>
                        </div>

                        <div>
                            <a
                                href="https://memopt.com"
                                className="btn-premium hover-target"
                            >
                                Explore Stack
                            </a>
                        </div>
                    </motion.div>

                    {/* Visual Container */}
                    <div style={{ position: 'relative' }}>
                        <motion.div
                            initial={isMobile ? {} : { opacity: 0, scale: 0.98 }}
                            animate={(!isMobile && isInView) ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            style={{ position: 'relative', overflow: 'hidden', borderRadius: '2px' }}
                            className="glass-panel"
                        >
                            <motion.div
                                style={{
                                    width: '100%',
                                    aspectRatio: '1/1',
                                    backgroundImage: 'url(/infra_network.png)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    filter: 'grayscale(20%) contrast(1.1) brightness(0.8)',
                                    y: imageY,
                                    scale: 1.05,
                                    opacity: 0.95
                                }}
                            />
                            {/* Technical Overlay */}
                            <div style={{
                                position: 'absolute',
                                bottom: '40px',
                                left: '40px',
                                right: '40px',
                                padding: '24px',
                                borderTop: '1px solid var(--border-color)',
                                display: isDesktop ? 'flex' : 'none',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                opacity: 1
                            }}>
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>Infrastructure Topology</span>
                            </div>
                        </motion.div>

                        {/* Shadow Detail */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '120%',
                            height: '110%',
                            background: 'radial-gradient(circle, var(--grid-line) 0%, transparent 70%)',
                            transform: 'translate(-50%, -50%)',
                            zIndex: -1,
                            pointerEvents: 'none'
                        }} />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Infrastructure;
