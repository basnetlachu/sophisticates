import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

const Products = () => {
    const ref = useRef(null);
    const isMobile = useMobile();
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    // Parallax — disabled on mobile
    const isDesktop = !isMobile;
    const imageY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-100, 100]);
    const titleX = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -50]);

    return (
        <section id="products" ref={ref} style={{
            padding: 'clamp(60px, 8vh, 100px) 0',
            background: 'var(--bg-color)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="max-w-container">
                <div className="products-grid">
                    {/* Visual Side */}
                    <motion.div
                        initial={isMobile ? {} : { opacity: 0, scale: 0.98 }}
                        animate={(!isMobile && isInView) ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ position: 'relative', height: '100%', paddingTop: isDesktop ? '15vh' : '0' }}
                    >
                        <div className="glass-panel" style={{
                            padding: 'clamp(32px, 5vw, 48px)',
                            overflow: 'hidden',
                            position: 'relative',
                            borderRadius: '4px',
                            border: '1px solid var(--border-color)'
                        }}>
                            <motion.img
                                src="/products_image.png"
                                alt="Memopt Architecture"
                                className="hover-target"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    y: imageY,
                                    filter: 'grayscale(100%) contrast(1.0) brightness(0.9)',
                                    scale: 1.05
                                }}
                            />
                            {/* Inner abstract glow */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 110%)',
                                zIndex: 1, pointerEvents: 'none'
                            }} />
                        </div>

                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={isMobile ? {} : { opacity: 0, x: 30 }}
                        animate={(!isMobile && isInView) ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        <div className="section-label-wrapper">
                            <div className="section-label-line" />
                            <span className="section-label">Flagship Venture</span>
                        </div>

                        <motion.h3 style={{
                            fontSize: 'clamp(2.8rem, 7vw, 7rem)',
                            fontFamily: 'var(--font-display)',
                            color: 'var(--text-main)',
                            margin: '0 0 10px 0',
                            lineHeight: 0.85,
                            letterSpacing: '-0.06em',
                            x: isDesktop ? titleX : 0,
                            overflow: 'hidden',
                            maxWidth: '100%'
                        }}>
                            MEMOPT
                        </motion.h3>

                        <p style={{
                            fontFamily: 'var(--font-accent)',
                            fontStyle: 'italic',
                            fontSize: 'clamp(1.4rem, 2.5vw, 2.5rem)',
                            color: 'var(--text-muted)',
                            marginBottom: '60px',
                            marginTop: 10,
                            letterSpacing: '-0.02em'
                        }}>
                            Universal Memory Fabric
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '60px' }}>
                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '32px' }}>
                                <h4 style={{ fontSize: '0.7rem', fontFamily: 'var(--font-body)', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.2em' }}>The Pipeline</h4>
                                <h5 style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.5rem)', fontFamily: 'var(--font-display)', color: 'var(--text-main)', fontWeight: 400, margin: '0 0 16px 0' }}>Automated Hardware Synthesis</h5>
                                <p style={{ fontSize: 'clamp(1rem, 1.25vw, 1.3rem)', fontFamily: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0, fontWeight: 300 }}>
                                    A foundational orchestration layer that translates architectural constraints into high-performance execution. By profiling deep-tier bottlenecks and synthesizing custom kernels in real-time, the pipeline enables intelligence to flow across diverse silicon NVIDIA, AMD, and custom architectures with zero code changes.
                                </p>
                            </div>
                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '32px' }}>
                                <h4 style={{ fontSize: '0.7rem', fontFamily: 'var(--font-body)', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.2em' }}>The Unlock</h4>
                                <h5 style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.5rem)', fontFamily: 'var(--font-display)', color: 'var(--text-main)', fontWeight: 400, margin: '0 0 16px 0' }}>Computational Sovereignty at Scale</h5>
                                <p style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.15rem)', fontFamily: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: '1.7', margin: 0, fontWeight: 300 }}>
                                    A total elimination of the "Memory Wall" through distributed VMM and global KV-deduplication. This protocol recovers up to 90% of wasted capacity, delivering 4x higher tenant density and a 40% reduction in energy overhead. We decouple intelligence from the scarcity of hardware.
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <button className="btn-premium hover-target" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                                Priority Access
                            </button>
                            <a href="https://memopt.com" target="_blank" rel="noopener" className="btn-outline hover-target" title="MEMOPT by Sophisticates: Universal Memory Fabric">
                                MEMOPT Specification
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    );
};

export default Products;
