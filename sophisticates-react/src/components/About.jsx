import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

    const [isDesktop, setIsDesktop] = useState(true);
    useEffect(() => {
        const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    return (
        <section id="about" ref={ref} className="section-padding" style={{
            background: 'var(--bg-color)',
            position: 'relative',
            paddingTop: 'clamp(120px, 20vh, 200px)',
            paddingBottom: 'clamp(120px, 20vh, 200px)',
            overflow: 'hidden'
        }}>
            <div className="max-w-container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ maxWidth: '1400px', margin: '0 auto' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '80px', justifyContent: isDesktop ? 'flex-start' : 'center' }}>
                        <div style={{ width: '40px', height: '1px', background: 'var(--text-main)' }} />
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-body)', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.4em', fontWeight: 500 }}>
                            Manifesto
                        </span>
                    </div>

                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.7rem, 3.2vw, 2.8rem)',
                        lineHeight: '1.2',
                        fontWeight: 400,
                        color: 'var(--text-main)',
                        marginBottom: 'clamp(80px, 15vh, 160px)',
                        textAlign: isDesktop ? 'left' : 'center',
                        letterSpacing: '-0.06em',
                        maxWidth: '1200px',
                        margin: '0 auto 120px 0'
                    }}>
                        Bridging the widening gap between <span className="text-accent" style={{ color: 'var(--text-dim)' }}>theoretical possibility</span> and <span style={{ opacity: 0.8 }}>practical reality</span>.
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isDesktop ? 'repeat(12, 1fr)' : '1fr',
                        gap: 'clamp(40px, 8vw, 100px)',
                        alignItems: 'start'
                    }}>
                        <div style={{ gridColumn: isDesktop ? 'span 5' : 'span 1' }}>
                            <p style={{
                                fontSize: 'clamp(1.2rem, 1.5vw, 1.5rem)',
                                color: 'var(--text-muted)',
                                lineHeight: '1.7',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 300,
                                margin: 0
                            }}>
                                Across disciplines like artificial intelligence, quantum computing, physics, and robotics, foundational limits are often well understood, yet rarely translated into systems that can be hardened, trusted, and scaled in the real world.
                            </p>
                        </div>

                        <div style={{
                            gridColumn: isDesktop ? 'span 7' : 'span 1',
                            borderLeft: isDesktop ? '1px solid var(--border-color)' : 'none',
                            paddingLeft: isDesktop ? 'clamp(40px, 5vw, 80px)' : '0'
                        }}>
                            <p style={{
                                fontSize: 'clamp(1.2rem, 1.5vw, 1.5rem)',
                                color: 'var(--text-muted)',
                                lineHeight: '1.7',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 300,
                                margin: 0
                            }}>
                                We work at the intersection of deep theory and engineering discipline. Sophisticates transforms abstract constraints into <span style={{ color: 'var(--text-main)', fontWeight: 400 }}>tangible capabilities</span> that make complex systems intelligible, usable, and durable.
                                <br /><br />
                                <span style={{ color: 'var(--text-main)', fontWeight: 500, display: 'block', marginTop: '40px', fontSize: '1.1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    It is the vehicle through which breakthroughs become real.
                                </span>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Background Graphic */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                width: '100%', height: '100%',
                background: 'radial-gradient(circle at center, var(--grid-line) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none'
            }} />
        </section>
    );
};

export default About;
