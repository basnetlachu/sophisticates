'use client';

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

const Personality = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
    const isMobile = useMobile();

    const personality = [
        { index: '01', title: 'Visionary Yet Grounded', desc: 'We think beyond the horizon and prove it step by step.', size: 'large' },
        { index: '02', title: 'Boldly Innovative', desc: 'Big swings with rigorous methods and zero shortcuts.', size: 'small' },
        { index: '03', title: 'Precisely Intelligent', desc: 'Clean models for complex ideas.', size: 'small' },
        { index: '04', title: 'Human Centered', desc: 'Safety and ethics as a hard instruction.', size: 'medium' }
    ];

    return (
        <section ref={ref} className="section-padding" style={{ background: 'var(--bg-color-secondary)', position: 'relative', overflow: 'hidden' }}>
            <div className="max-w-container">
                <div style={{ marginBottom: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '40px' }}>
                    <motion.div
                        initial={isMobile ? {} : { opacity: 0, y: 30 }}
                        whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                    >
                        <div className="section-label-wrapper">
                            <div className="section-label-line" />
                            <span className="section-label">Identity</span>
                        </div>
                        <h2 style={{ fontSize: 'clamp(2.3rem, 4.2vw, 3.6rem)', lineHeight: '0.95', maxWidth: '600px' }}>
                            Character of the <span className="text-accent">Protocol</span>.
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={isMobile ? {} : { opacity: 0 }}
                        whileInView={isMobile ? {} : { opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        viewport={{ once: true }}
                        style={{ maxWidth: '400px', fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '10px' }}
                    >
                        Our personality is a mirror of our methodology: precise, ambitious, and relentlessly focused on the core.
                    </motion.p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gap: '24px',
                    gridAutoRows: 'minmax(200px, auto)'
                }} className="personality-grid">
                    {personality.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={isMobile ? {} : { opacity: 0, scale: 0.95 }}
                            whileInView={isMobile ? {} : { opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="glass-panel"
                            style={{
                                gridColumn: item.size === 'large' ? 'span 8' : item.size === 'medium' ? 'span 6' : 'span 4',
                                padding: 'clamp(32px, 5vw, 48px)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                minHeight: '300px',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-dim)', letterSpacing: '0.2em' }}>[{item.index}]</span>
                                <div style={{ width: '8px', height: '8px', border: '1px solid var(--text-dim)', borderRadius: '1px' }} />
                            </div>

                            <div>
                                <h3 style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: item.size === 'large' ? 'clamp(1.9rem, 3vw, 2.4rem)' : 'clamp(1.8rem, 3vw, 2.5rem)',
                                    color: 'var(--text-main)',
                                    marginBottom: '24px',
                                    lineHeight: 1,
                                    letterSpacing: '-0.02em',
                                    fontWeight: 400
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
                                    color: 'var(--text-muted)',
                                    lineHeight: '1.5',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 300,
                                    margin: 0,
                                    maxWidth: '400px'
                                }}>
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Texture */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'radial-gradient(circle at 70% 30%, var(--grid-line) 0%, transparent 60%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />
        </section>
    );
};

export default Personality;
