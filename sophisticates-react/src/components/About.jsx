import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    return (
        <section id="about" ref={ref} className="section-padding" style={{ background: 'var(--bg-color)', position: 'relative' }}>
            <div className="max-w-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    style={{ maxWidth: '1000px' }}
                >
                    <h2 style={{
                        fontFamily: 'Syne, sans-serif',
                        fontSize: '1rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--text-main)',
                        marginBottom: '40px',
                        opacity: 0.7
                    }}>
            // About Sophisticates
                    </h2>

                    <p style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: 'clamp(1.5rem, 2.5vw, 2.8rem)',
                        lineHeight: '1.3',
                        fontWeight: 400,
                        color: 'var(--text-main)',
                        marginBottom: '60px'
                    }}>
                        Sophisticates exists to bridge the widening gap between <span style={{ color: 'var(--text-muted)' }}>theoretical possibility</span> and <span style={{ color: 'var(--text-main)' }}>practical reality</span>.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '60px',
                        marginTop: '60px'
                    }} className="grid-stack-mobile">
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                            Across disciplines like artificial intelligence, quantum computing, physics, and robotics, foundational limits are often well understood, yet rarely translated into systems that can be deployed, trusted, and scaled in the real world. Sophisticates was formed to close that gap.
                        </p>
                        <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '40px' }} className="mobile-no-border">
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                                We work at the intersection of deep theory, engineering discipline, and system-level thinking, transforming abstract constraints into tangible capabilities that make complex systems intelligible, usable, and durable.
                                <br /><br />
                                <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>It is the vehicle through which breakthroughs become real.</span>
                            </p>
                        </div>
                    </div>

                    <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: '100px' } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{ height: '1px', background: 'var(--text-main)', marginTop: '80px' }}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default About;
