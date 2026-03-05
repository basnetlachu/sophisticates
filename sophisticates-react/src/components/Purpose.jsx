import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Purpose = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <section id="purpose" ref={ref} className="section-padding" style={{
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-color)',
        }}>
            <div className="max-w-container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.3fr minmax(300px, 1fr)',
                    gap: 'clamp(40px, 8vw, 100px)',
                    alignItems: 'center'
                }} className="grid-stack-tablet">

                    {/* Content Section */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                            style={{
                                fontFamily: 'Syne, sans-serif',
                                fontSize: '1rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'var(--text-main)',
                                marginBottom: '40px'
                            }}
                        >
                            // 02. Purpose
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{
                                fontFamily: 'Space Grotesk, sans-serif',
                                fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                                lineHeight: '1.3',
                                fontWeight: 300,
                                color: 'var(--text-main)',
                                maxWidth: '1000px'
                            }}
                        >
                            To solve problems that don’t yield to incremental progress.
                            <br /><br />
                            <span style={{ color: 'var(--text-muted)' }}>We deliver breakthroughs that are</span> <strong style={{ fontWeight: 500 }}>measurable, safe, energy-aware, and scalable.</strong>
                        </motion.p>

                        <div style={{ marginTop: '50px', display: 'flex', gap: '40px', flexWrap: 'wrap' }} className="flex-col-mobile">
                            {[
                                { label: 'Energy Aware', value: 'Optimized' },
                                { label: 'Scalability', value: 'Unlimited' },
                                { label: 'Safety', value: 'Intrinsic' }
                            ].map((statItem, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={isInView ? { opacity: 1 } : {}}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '20px' }}
                                    className="mobile-no-border"
                                >
                                    <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>{statItem.label}</div>
                                    <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.2rem', color: 'var(--text-main)' }}>{statItem.value}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Structural Image Insert */}
                    <div style={{ position: 'relative' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            whileHover={{ scale: 1.02 }}
                            style={{
                                width: '100%',
                                aspectRatio: '3/4',
                                backgroundImage: 'url(/purpose_bg.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'grayscale(100%) contrast(1.15)',
                                border: '1px solid var(--border-color)',
                                transition: 'transform 0.6s ease'
                            }}
                        />
                        <div style={{ marginTop: '16px', fontFamily: 'monospace', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', textAlign: 'right' }}>
                            Fig. 2 — Structural Purpose
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Purpose;
