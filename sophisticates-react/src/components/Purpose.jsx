import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Purpose = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const imageY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

    const [isDesktop, setIsDesktop] = useState(true);
    useEffect(() => {
        const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    return (
        <section id="purpose" ref={ref} className="section-padding" style={{
            background: 'var(--bg-color)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background branding element */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '-5%',
                fontSize: '20vw',
                fontFamily: 'var(--font-display)',
                color: 'var(--text-main)',
                opacity: 0.015,
                fontWeight: 800,
                letterSpacing: '-0.05em',
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: 0
            }}>
                MISSION
            </div>

            <div className="max-w-container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isDesktop ? '1.2fr 0.8fr' : '1fr',
                    gap: 'clamp(60px, 10vw, 160px)',
                    alignItems: 'flex-start'
                }}>

                    {/* Content Section */}
                    <div style={{ paddingTop: isDesktop ? '100px' : '0' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
                                <div style={{ width: '40px', height: '1px', background: 'var(--text-main)' }} />
                                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-body)', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.25em', fontWeight: 600 }}>
                                    Core Intent
                                </span>
                            </div>

                            <motion.h2
                                className="text-gradient"
                                style={{
                                    fontSize: 'clamp(1.9rem, 3vw, 2.5rem)',
                                    lineHeight: '0.95',
                                    marginBottom: '40px',
                                    maxWidth: '850px'
                                }}
                            >
                                Solving problems that don't yield to <span className="text-accent">incremental</span> progress.
                            </motion.h2>

                            <p style={{
                                fontSize: 'clamp(1.1rem, 1.4vw, 1.45rem)',
                                lineHeight: '1.4',
                                color: 'var(--text-muted)',
                                maxWidth: '750px',
                                marginBottom: '60px',
                                fontWeight: 300
                            }}>
                                We deliver breakthroughs that are <span style={{ color: 'var(--text-main)' }}>measurable, safe, energy-aware, and scalable.</span>
                            </p>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '60px'
                            }}>
                                {[
                                    { label: 'Energy Aware', value: 'Optimized Control', detail: 'Minimizing thermodynamic overhead in computation.' },
                                    { label: 'Scalability', value: 'Global Infrastructure', detail: 'Architectures designed for planetary-scale deployment.' },
                                    { label: 'Safety', value: 'Intrinsic Security', detail: 'Provable guarantees in every instruction set.' }
                                ].map((statItem, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        viewport={{ once: true }}
                                        style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '32px' }}
                                    >
                                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px', fontWeight: 600 }}>[{statItem.label}]</div>
                                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--text-main)', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '12px' }}>{statItem.value}</div>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', maxWidth: '240px' }}>{statItem.detail}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Visual Segment */}
                    <div style={{ position: 'relative', width: '100%' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="glass-panel"
                            style={{
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: '2px',
                                boxShadow: '0 40px 100px rgba(0,0,0,0.6)'
                            }}
                        >
                            <motion.div
                                style={{
                                    width: '100%',
                                    aspectRatio: '4/5',
                                    backgroundImage: 'url(/purpose_bg.webp)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    filter: 'grayscale(100%) brightness(0.8) contrast(1.2)',
                                    y: imageY,
                                    scale: 1.2
                                }}
                            />
                            {/* Technical Overlay */}
                            <div style={{
                                position: 'absolute',
                                left: '20px',
                                bottom: '20px',
                                padding: '12px 16px',
                                background: 'rgba(0,0,0,0.4)',
                                backdropFilter: 'blur(10px)',
                                borderLeft: '2px solid var(--text-main)',
                                color: 'var(--text-main)',
                                fontFamily: 'monospace',
                                fontSize: '0.65rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase'
                            }}>
                                System Objective: Breakthrough Verification // 002
                            </div>
                        </motion.div>

                        <div style={{
                            marginTop: '32px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline'
                        }}>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                Ref: 2024.P-01
                            </div>
                            <div style={{ fontFamily: 'var(--font-accent)', fontStyle: 'italic', fontSize: '1rem', color: 'var(--text-muted)' }}>
                                "The physics of progress"
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Purpose;

