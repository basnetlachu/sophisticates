import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Infrastructure = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <section id="infrastructure" ref={ref} className="section-padding" style={{
            background: 'var(--bg-color)',
            borderTop: '1px solid var(--border-color)',
        }}>
            <div className="max-w-container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr minmax(300px, 1fr)',
                    gap: 'clamp(40px, 8vw, 100px)',
                    alignItems: 'center'
                }} className="grid-stack-tablet">

                    {/* Content Container */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
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
                            // 03. Infrastructure
                        </h2>
                        <p style={{
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                            lineHeight: '1.4',
                            fontWeight: 300,
                            color: 'var(--text-muted)',
                            marginBottom: '40px'
                        }}>
                            We engineer systems that <strong style={{ fontWeight: 500, color: 'var(--text-main)' }}>transcend hardware limitations</strong> through algorithmic precision. Memopt, our specialized memory optimization tool, eliminates traffic bottlenecks to align computational potential with effective memory bandwidth.
                        </p>
                        <motion.a
                            href="https://memopt.sophisticatesai.com"
                            whileHover={{ letterSpacing: '0.3em', color: 'var(--text-main)' }}
                            style={{
                                color: 'var(--text-main)',
                                textDecoration: 'none',
                                borderBottom: '1px solid var(--text-main)',
                                paddingBottom: '8px',
                                fontFamily: 'Space Grotesk, sans-serif',
                                fontSize: '0.8rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                display: 'inline-block'
                            }}
                        >
                            Explore the Stack →
                        </motion.a>
                    </motion.div>

                    {/* Visual Container */}
                    <div style={{ position: 'relative' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            whileHover={{ scale: 1.02 }}
                            style={{
                                width: '100%',
                                aspectRatio: '1/1',
                                backgroundImage: 'url(/infra_bg.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'grayscale(100%) contrast(1.15)',
                                border: '1px solid var(--border-color)',
                                transition: 'transform 0.6s ease'
                            }}
                        />
                        <div style={{ marginTop: '16px', fontFamily: 'monospace', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', textAlign: 'right' }}>
                            Fig. 3 — NEURAL_MAP_V1.0
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Infrastructure;
