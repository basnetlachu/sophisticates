import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const Roadmap = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    // Smooth line growth
    const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

    const [isDesktop, setIsDesktop] = useState(true);
    useEffect(() => {
        const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    const items = [
        {
            phase: 'Ph-I',
            title: 'Scalable Intelligent Runtimes',
            desc: 'Optimizing the execution layer for large-scale distributed inference.',
            status: 'Development'
        },
        {
            phase: 'Ph-II',
            title: 'Adaptive Infrastructure for Robotics',
            desc: 'Building low-latency, high-reliability control systems for physical interaction.',
            status: 'Research'
        },
        {
            phase: 'Ph-III',
            title: 'Quantum & Physics Informed Systems',
            desc: 'Integrating deep scientific constraints directly into computational frameworks.',
            status: 'Concept'
        },
        {
            phase: 'Ph-IV',
            title: 'Dynamic Optimization Layers',
            desc: 'Next-generation auto-tuning for enterprise AI workflows.',
            status: 'Planning'
        }
    ];

    return (
        <section id="roadmap" ref={ref} className="section-padding" style={{ background: 'var(--bg-color)', position: 'relative', overflow: 'hidden' }}>
            <div className="max-w-container">
                <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '0.8fr 1.2fr' : '1fr', gap: 'clamp(60px, 12vw, 200px)' }}>

                    {/* Left Sticky Header Area (Desktop) */}
                    <div style={{ position: isDesktop ? 'sticky' : 'relative', top: '150px', height: 'fit-content' }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                        >
                            <div className="section-label-wrapper">
                                <div className="section-label-line" />
                                <span className="section-label">Trajectory</span>
                            </div>

                            <h2 style={{ fontSize: 'clamp(2.3rem, 3.6vw, 3.3rem)', color: 'var(--text-main)', fontFamily: 'var(--font-display)', marginBottom: '40px', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 400 }}>
                                The Road <br />Ahead
                            </h2>

                            <p style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.15rem)', color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '440px', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                                We are actively expanding beyond memory optimization to enable the next generation of <span style={{ color: 'var(--text-main)' }}>deep tech infrastructure.</span>
                            </p>

                        </motion.div>
                    </div>

                    {/* Right Timeline Area */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative' }}>
                        {/* Connecting Line (Base) */}
                        <div style={{
                            position: 'absolute',
                            left: '31px',
                            top: '40px',
                            bottom: '40px',
                            width: '1px',
                            background: 'var(--border-color)',
                            zIndex: 0
                        }} />

                        {/* Connecting Line (Active) */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                left: '31px',
                                top: '40px',
                                width: '1px',
                                height: lineHeight,
                                background: 'linear-gradient(to bottom, var(--text-main), transparent)',
                                zIndex: 0
                            }}
                        />

                        {items.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-100px" }}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '62px 1fr',
                                    gap: '32px',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            >
                                {/* Marker */}
                                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
                                    <div style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        background: 'var(--bg-color)',
                                        border: '1px solid var(--text-main)',
                                        boxShadow: '0 0 20px var(--grid-line)',
                                        zIndex: 2,
                                        position: 'relative'
                                    }}>
                                        <div style={{ position: 'absolute', inset: '3px', background: 'var(--text-main)', borderRadius: '50%', opacity: 0.8 }} />
                                    </div>
                                </div>

                                {/* Card */}
                                <div className="glass-panel" style={{ padding: '32px', borderRadius: '2px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                        <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.2em' }}>{item.phase}</span>
                                        <span style={{
                                            fontFamily: 'monospace',
                                            fontSize: '0.65rem',
                                            padding: '4px 10px',
                                            border: '1px solid var(--border-color)',
                                            color: 'var(--text-main)',
                                            background: 'var(--grid-line)'
                                        }}>{item.status}</span>
                                    </div>
                                    <h3 style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                                        color: 'var(--text-main)',
                                        marginBottom: '20px',
                                        letterSpacing: '-0.02em',
                                        lineHeight: 1.1,
                                        fontWeight: 400
                                    }}>
                                        {item.title}
                                    </h3>
                                    <p style={{
                                        fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
                                        color: 'var(--text-muted)',
                                        lineHeight: '1.7',
                                        fontFamily: 'var(--font-body)',
                                        fontWeight: 300,
                                        margin: 0,
                                        maxWidth: '500px'
                                    }}>
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Roadmap;

