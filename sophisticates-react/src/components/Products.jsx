import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Products = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <section id="products" ref={ref} style={{ background: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 0 }} className="grid-stack-mobile">

            {/* Left Column: Visual/Title */}
            <div style={{ padding: 'clamp(40px, 8vw, 100px) var(--container-padding)', borderRight: '1px solid var(--border-color)' }} className="mobile-no-border">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1 }}
                >
                    <h2 style={{
                        fontFamily: 'Syne, sans-serif',
                        fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--text-main)',
                        marginBottom: 'clamp(30px, 5vw, 40px)'
                    }}>
                        // 02. Products
                    </h2>

                    <div style={{ position: 'relative', marginTop: 'clamp(40px, 8vw, 60px)' }}>
                        <img src="/memopt-visual.png" alt="Memopt Architecture" style={{ width: '100%', maxWidth: '100%', height: 'auto', opacity: 0.8, filter: 'grayscale(100%)' }} />
                        <div style={{ position: 'absolute', bottom: -20, left: 0, fontSize: 'clamp(0.5rem, 1vw, 0.6rem)', fontFamily: 'monospace', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                            CORE_KERNEL_TRAFFIC_OPTIMIZER_VIRTUAL
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Column: Detailed Info */}
            <div style={{ padding: 'clamp(40px, 8vw, 100px) var(--container-padding)' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span style={{ fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)', fontFamily: 'monospace', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                        Memory Management Layer
                    </span>
                    <h3 style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontFamily: 'Syne, sans-serif', color: 'var(--text-main)', marginTop: '10px', marginBottom: 'clamp(30px, 5vw, 40px)' }}>
                        MEMOPT
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 4vw, 32px)' }}>
                        <div style={{ borderLeft: '2px solid var(--text-main)', paddingLeft: 'clamp(16px, 3vw, 24px)' }}>
                            <h4 style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', color: 'var(--text-main)', textTransform: 'uppercase', marginBottom: '8px' }}>Mechanism</h4>
                            <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', color: 'var(--text-muted)', lineHeight: '1.6' }}>Automated 3-step pipeline: Profiles traffic, Attributes bottlenecks, and Optimizes execution sequences.</p>
                        </div>
                        <div style={{ borderLeft: '2px solid var(--text-muted)', paddingLeft: 'clamp(16px, 3vw, 24px)' }}>
                            <h4 style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', color: 'var(--text-main)', textTransform: 'uppercase', marginBottom: '8px' }}>Outcome</h4>
                            <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', color: 'var(--text-muted)', lineHeight: '1.6' }}>Significant speedup (1.1x - 3.8x) by eliminating cache thrashing and redundant data fetches.</p>
                        </div>
                    </div>

                    <div style={{ marginTop: 'clamp(40px, 6vw, 50px)', display: 'flex', gap: 'clamp(15px, 3vw, 20px)', alignItems: 'center', flexWrap: 'wrap' }}>
                        <motion.a
                            href="https://memopt.sophisticatesai.com"
                            whileHover={{ scale: 1.05, backgroundColor: 'var(--text-main)', color: 'var(--bg-color)' }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'inline-block',
                                border: '1px solid var(--text-main)',
                                padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)',
                                fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                background: 'transparent',
                                color: 'var(--text-main)',
                                cursor: 'none'
                            }}
                        >
                            Access Architecture
                        </motion.a>

                        <motion.button
                            whileHover={{ scale: 1.05, opacity: 0.8 }}
                            style={{
                                padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 32px)',
                                border: 'none',
                                background: 'transparent',
                                color: 'var(--text-main)',
                                fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                cursor: 'none',
                                borderBottom: '1px solid var(--border-color)'
                            }}
                            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Contact Sales
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Products;
