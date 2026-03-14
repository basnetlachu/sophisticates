import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

const UseCases = () => {
    const ref = useRef(null);
    const isMobile = useMobile();
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const [isDesktop, setIsDesktop] = useState(true);
    useEffect(() => {
        const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    const benefits = [
        {
            stat: "3.8x",
            label: "Throughput",
            desc: "Critical alignment of computation blocks with effective memory bandwidth."
        },
        {
            stat: "Zero",
            label: "Manual Tuning",
            desc: "Automatic algorithmic identification of architectural bottlenecks at scale."
        },
        {
            stat: "85%",
            label: "Energy Floor",
            desc: "Reducing redundant data motion lowers the power requirement of inference."
        }
    ];

    return (
        <section id="use-cases" ref={ref} className="section-padding" style={{
            background: 'var(--bg-color)',
            position: 'relative',
            paddingBottom: 'clamp(100px, 15vh, 180px)'
        }}>
            <div className="max-w-container">
                <div className="usecases-grid">

                    {/* Header */}
                    <motion.div
                        initial={isMobile ? {} : { opacity: 0, x: -30 }}
                        animate={(!isMobile && isInView) ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="section-label-wrapper">
                            <div className="section-label-line" />
                            <span className="section-label">Impact</span>
                        </div>

                        <h2 style={{
                            fontSize: 'clamp(1.9rem, 3vw, 2.4rem)',
                            color: 'var(--text-main)',
                            lineHeight: '0.95',
                            fontFamily: 'var(--font-display)',
                            letterSpacing: '-0.05em',
                            fontWeight: 400,
                            margin: 0
                        }}>
                            Structural <span className="text-accent" style={{ color: 'var(--text-dim)' }}>Efficiency</span> as a Metric.
                        </h2>
                        <p style={{ marginTop: '32px', fontSize: 'clamp(0.9rem, 1.2vw, 1.15rem)', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 300, lineHeight: 1.6, maxWidth: '400px' }}>
                            Our stack addresses the fundamental physical constraints of modern hardware infrastructure by optimizing at the atomic level of instructions.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="usecases-stats-grid">
                        {benefits.map((statItem, i) => (
                            <motion.div
                                key={i}
                                className="glass-panel hover-target"
                                initial={isMobile ? {} : { opacity: 0, y: 50 }}
                                animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 + (i * 0.15), duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    padding: 'clamp(32px, 4vw, 48px)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    minHeight: '320px',
                                    borderRadius: '2px',
                                    border: '1px solid var(--border-color)'
                                }}
                            >
                                <span style={{
                                    fontSize: 'clamp(2.6rem, 3vw, 3.3rem)',
                                    fontFamily: 'var(--font-display)',
                                    color: 'var(--text-main)',
                                    display: 'block',
                                    marginBottom: '16px',
                                    lineHeight: 1,
                                    letterSpacing: '-0.06em',
                                    fontWeight: 400
                                }}>
                                    {statItem.stat}
                                </span>
                                <span style={{
                                    fontSize: '0.65rem',
                                    color: 'var(--text-dim)',
                                    fontFamily: 'monospace',
                                    display: 'block',
                                    marginBottom: '24px',
                                    letterSpacing: '0.25em',
                                    textTransform: 'uppercase',
                                    fontWeight: 600
                                }}>
                                    {statItem.label}
                                </span>
                                <p style={{
                                    fontSize: '1rem',
                                    color: 'var(--text-muted)',
                                    margin: 0,
                                    fontFamily: 'var(--font-body)',
                                    lineHeight: '1.5',
                                    fontWeight: 300,
                                    marginTop: 'auto'
                                }}>
                                    {statItem.desc}
                                </p>

                                {/* Decorative indicator */}
                                <div style={{
                                    position: 'absolute', top: '24px', right: '24px',
                                    width: '12px', height: '12px',
                                    border: '1px solid var(--text-main)', opacity: 0.1
                                }} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Call to Action Banner */}
                <motion.div
                    initial={isMobile ? {} : { opacity: 0, y: 80 }}
                    whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    style={{
                        marginTop: 'clamp(80px, 12vh, 120px)',
                        padding: 'clamp(48px, 8vw, 80px)',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '2px',
                        border: '1px solid var(--border-color)',
                        background: 'var(--grid-line)'
                    }}
                >
                    <div className="mesh-gradient-bg" style={{ opacity: 0.05 }} />
                    <h3 style={{
                        fontSize: 'clamp(1.9rem, 3vw, 2.7rem)',
                        color: 'var(--text-main)',
                        marginBottom: '32px',
                        fontFamily: 'var(--font-display)',
                        letterSpacing: '-0.04em',
                        fontWeight: 400,
                        position: 'relative',
                        zIndex: 1,
                        lineHeight: 0.95
                    }}>
                        Scaling Intelligence <span className="text-accent" style={{ color: 'var(--text-dim)' }}>Safely</span>
                    </h3>
                    <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                        <p style={{ fontSize: 'clamp(1.2rem, 1.5vw, 1.4rem)', color: 'var(--text-muted)', lineHeight: '1.7', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                            We don't just optimize for speed; <span style={{ color: 'var(--text-main)' }}>we optimize for sovereignty.</span> Every layer of the Sophisticates stack contains specialized telemetry for safety and ethical alignment.
                        </p>
                    </div>

                    {/* Background Visual Detail */}
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        width: '150%', height: '150%',
                        background: 'radial-gradient(circle, var(--grid-line) 0%, transparent 60%)',
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none'
                    }} />
                </motion.div>
            </div>

            {/* Sector Decal */}
            <div style={{
                position: 'absolute', top: '50%', right: '-4%',
                fontSize: '15rem', fontFamily: 'var(--font-display)',
                color: 'var(--text-main)', opacity: 0.012, pointerEvents: 'none',
                lineHeight: 1, fontWeight: 600, transform: 'rotate(90deg)'
            }}>
                METRICS
            </div>
        </section>
    );
};

export default UseCases;
