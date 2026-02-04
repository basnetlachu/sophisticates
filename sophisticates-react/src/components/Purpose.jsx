import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Purpose = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <section id="purpose" ref={ref} className="section-padding" style={{
            minHeight: '80vh',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>

            {/* Symbolic Abstract Element (Framer Motion) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                animate={isInView ? { opacity: 0.1, scale: 1.2, rotate: 0 } : {}}
                transition={{ duration: 2, ease: "easeOut" }}
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    width: 'min(400px, 60vw)',
                    height: 'min(400px, 60vw)',
                    border: '1px solid var(--text-main)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />

            <div className="max-w-container" style={{ position: 'relative', zIndex: 1 }}>
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
                        marginBottom: '60px'
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
                        fontSize: 'clamp(1.8rem, 5vw, 4rem)',
                        lineHeight: '1.2',
                        fontWeight: 500,
                        color: 'var(--text-main)',
                        maxWidth: '1200px'
                    }}
                >
                    To solve problems that don’t yield to incremental progress.
                    <br /><br />
                    <span style={{ color: 'var(--text-muted)' }}>We deliver breakthroughs that are</span> measurable, safe, energy-aware, and scalable.
                </motion.p>

                <div style={{ marginTop: 'clamp(40px, 8vw, 80px)', display: 'flex', gap: '40px' }} className="flex-col-mobile">
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
        </section>
    );
};

export default Purpose;
