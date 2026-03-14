import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Products = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20% 0px" });
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    // Advanced parallax depth
    const imageY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const titleX = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const [isDesktop, setIsDesktop] = useState(true);
    useEffect(() => {
        const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    return (
        <section id="products" ref={ref} style={{
            padding: 'clamp(120px, 20vh, 200px) 0',
            background: 'var(--bg-color)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="max-w-container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isDesktop ? '1fr 1.2fr' : '1fr',
                    gap: 'clamp(80px, 12vw, 160px)',
                    alignItems: 'start'
                }}>
                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
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
                                src="/memopt-visual.webp"
                                alt="Memopt Architecture"
                                className="hover-target"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    y: imageY,
                                    filter: 'grayscale(100%) contrast(1.1) brightness(0.6)',
                                    scale: 1.3
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
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        <div className="section-label-wrapper">
                            <div className="section-label-line" />
                            <span className="section-label">Primary Infrastructure</span>
                        </div>

                        <motion.h3 style={{
                            fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)',
                            fontFamily: 'var(--font-display)',
                            color: 'var(--text-main)',
                            margin: '0 0 10px -5px',
                            lineHeight: 0.8,
                            letterSpacing: '-0.06em',
                            x: titleX
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
                            Intelligent Memory Orchestration
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '60px' }}>
                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '32px' }}>
                                <h4 style={{ fontSize: '0.7rem', fontFamily: 'var(--font-body)', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.2em' }}>The Pipeline</h4>
                                <p style={{ fontSize: 'clamp(1rem, 1.25vw, 1.3rem)', fontFamily: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0, fontWeight: 300 }}>
                                    Automated multi-stage orchestration that <span style={{ color: 'var(--text-main)', fontWeight: 400 }}>profiles</span> architectural traffic, <span style={{ color: 'var(--text-main)', fontWeight: 400 }}>attributes</span> deep bottlenecks, and <span style={{ color: 'var(--text-main)', fontWeight: 400 }}>optimizes</span> execution sequences in real-time.
                                </p>
                            </div>
                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '32px' }}>
                                <h4 style={{ fontSize: '0.7rem', fontFamily: 'var(--font-body)', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '0.2em' }}>The Unlock</h4>
                                <p style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.15rem)', fontFamily: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: '1.7', margin: 0, fontWeight: 300 }}>
                                    A significant efficiency protocol via total elimination of cache thrashing and redundant data movement, delivering raw performance at scale.
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <button className="btn-premium hover-target" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                                Priority Access
                            </button>
                            <a href="https://memopt.com" target="_blank" rel="noopener noreferrer" className="btn-outline hover-target">
                                Specification
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    );
};

export default Products;
