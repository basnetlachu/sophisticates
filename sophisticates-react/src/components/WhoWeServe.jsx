import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const WhoWeServe = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const audiences = [
        {
            tag: "// ML Teams",
            title: "Optimized Compute",
            content: "We provide high-frequency memory management for engineering teams building the next generation of transformer models."
        },
        {
            tag: "// Researchers",
            title: "Scientific Rigor",
            content: "Bridging the gap between peer-reviewed theory and hardened, deployable systems for theoretical physics and quantum simulations."
        },
        {
            tag: "// Strategic Partners",
            title: "Deep Tech Synergies",
            content: "Collaborating with institutions at the frontier of robotics and cyber-physical systems to solve planetary-scale complexity."
        },
        {
            tag: "// Enterprises",
            title: "Technical Resilience",
            content: "Building infrastructure that doesn't just work today, but remains resilient as the underlying complexity of intelligence scales."
        }
    ];

    return (
        <section id="who-we-serve" ref={ref} className="section-padding" style={{ background: 'var(--bg-color)', borderTop: '1px solid var(--border-color)' }}>
            <div className="max-w-container">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    style={{
                        fontFamily: 'Syne, sans-serif',
                        fontSize: '1rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--text-main)',
                        marginBottom: '60px',
                        opacity: 0.7
                    }}
                >
          // Partners
                </motion.h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 40vw, 320px), 1fr))',
                    gap: '2px', // Minimalist hairline border look
                    background: 'var(--border-color)',
                    border: '1px solid var(--border-color)'
                }}>
                    {audiences.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            style={{
                                background: 'var(--bg-color)',
                                padding: 'clamp(40px, 6vw, 60px) clamp(24px, 4vw, 40px)',
                                minHeight: 'clamp(300px, 50vh, 350px)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{item.tag}</span>
                            <div>
                                <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', color: 'var(--text-main)', marginBottom: '20px', letterSpacing: '-0.02em' }}>{item.title}</h3>
                                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.content}</p>
                            </div>
                            <motion.div
                                whileHover={{ x: 10 }}
                                style={{ width: '30px', height: '1px', background: 'var(--text-main)', marginTop: '40px' }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhoWeServe;
