import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const WhoWeServe = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const [isDesktop, setIsDesktop] = useState(true);
    useEffect(() => {
        const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    const audiences = [
        {
            tag: "ML Teams",
            title: "Optimized Compute",
            content: "We provide high-frequency memory management for engineering teams building the next generation of transformer models."
        },
        {
            tag: "Researchers",
            title: "Scientific Rigor",
            content: "Bridging the gap between peer-reviewed theory and hardened, deployable systems for theoretical physics and quantum simulations."
        },
        {
            tag: "Strategic Partners",
            title: "Deep Tech Synergies",
            content: "Collaborating with institutions at the frontier of robotics and cyber-physical systems to solve planetary-scale complexity."
        },
        {
            tag: "Enterprises",
            title: "Technical Resilience",
            content: "Building infrastructure that doesn't just work today, but remains resilient as the underlying complexity of intelligence scales."
        }
    ];

    return (
        <section id="who-we-serve" ref={ref} className="section-padding" style={{ background: 'var(--bg-color)', position: 'relative', overflow: 'hidden' }}>
            <div className="max-w-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: 'clamp(60px, 12vh, 100px)', display: 'flex', flexDirection: 'column', gap: '32px' }}
                >
                    <div className="section-label-wrapper">
                        <div className="section-label-line" />
                        <span className="section-label">Partnerships</span>
                    </div>

                    <h2 style={{
                        fontSize: 'clamp(2.3rem, 4.2vw, 3.3rem)',
                        color: 'var(--text-main)',
                        fontFamily: 'var(--font-display)',
                        lineHeight: 0.95,
                        letterSpacing: '-0.05em',
                        fontWeight: 400,
                        maxWidth: '900px',
                        margin: 0
                    }}>
                        Empowering the <span className="text-accent" style={{ color: 'var(--text-dim)' }}>Frontier</span>
                    </h2>
                </motion.div>

                <div className="whoweserve-grid">
                    {audiences.map((item, i) => (
                        <motion.div
                            key={i}
                            className="glass-panel hover-target"
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + (i * 0.1), duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                padding: 'clamp(32px, 5vw, 48px)',
                                minHeight: '340px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                position: 'relative',
                                borderRadius: '2px',
                                border: '1px solid var(--border-color)',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Decorative Corner Element */}
                            <div style={{ position: 'absolute', top: '0', right: '0', padding: '32px', opacity: 0.2 }}>
                                <div style={{ width: '20px', height: '20px', borderTop: '1px solid var(--text-main)', borderRight: '1px solid var(--text-main)' }} />
                            </div>

                            <div style={{ position: 'absolute', top: 'clamp(32px, 5vw, 48px)', left: 'clamp(32px, 5vw, 48px)' }}>
                                <span style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1rem',
                                    color: 'var(--text-main)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    fontWeight: 500
                                }}>
                                    {item.tag}
                                </span>
                            </div>

                            <div style={{ zIndex: 1, position: 'relative' }}>
                                <h3 style={{
                                    fontSize: 'clamp(1.7rem, 2.8vw, 2.2rem)',
                                    color: 'var(--text-main)',
                                    marginBottom: '20px',
                                    letterSpacing: '-0.04em',
                                    fontFamily: 'var(--font-display)',
                                    lineHeight: 1,
                                    fontWeight: 400
                                }}>
                                    {item.title}
                                </h3>
                                <p style={{
                                    fontSize: 'clamp(0.9rem, 1.2vw, 1.15rem)',
                                    color: 'var(--text-muted)',
                                    lineHeight: '1.7',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 300,
                                    margin: 0,
                                    maxWidth: '45ch'
                                }}>
                                    {item.content}
                                </p>
                            </div>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhoWeServe;
