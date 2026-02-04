import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Infrastructure = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <section id="infrastructure" ref={ref} style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            minHeight: '60vh',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-color)',
            overflow: 'hidden'
        }} className="grid-stack-mobile">

            {/* Content Column */}
            <div style={{ padding: 'clamp(40px, 8vw, 100px) var(--container-padding)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
                        fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                        lineHeight: '1.4',
                        fontWeight: 300,
                        color: 'var(--text-muted)',
                        marginBottom: '40px'
                    }}>
                        We engineer systems that <span style={{ color: 'var(--text-main)' }}>transcend hardware limitations</span> through algorithmic precision. Memopt, our specialized memory optimization tool, eliminates traffic bottlenecks to align computational potential with effective memory bandwidth.
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
            </div>

            {/* Visual Column */}
            <div style={{
                position: 'relative',
                height: '300px',
                background: 'var(--bg-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderLeft: '1px solid var(--border-color)'
            }} className="mobile-no-border">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.4 } : {}}
                    transition={{ duration: 1.5 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'url(/infrastructure-abstract.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'grayscale(100%) brightness(0.7)'
                    }}
                />
                <div style={{ position: 'relative', zIndex: 1, padding: '40px' }}>
                    <div style={{ width: '200px', height: '1px', background: 'var(--border-color)', marginBottom: '10px' }}></div>
                    <div style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.3em' }}>NEURAL_MAP_V1.0</div>
                </div>
            </div>
        </section>
    );
};

export default Infrastructure;
