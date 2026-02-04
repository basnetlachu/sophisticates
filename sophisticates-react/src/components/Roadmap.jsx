import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Roadmap = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const items = [
        {
            title: 'Scalable Intelligent Runtimes',
            desc: 'Optimizing the execution layer for large-scale distributed inference.'
        },
        {
            title: 'Adaptive Infrastructure for Robotics',
            desc: 'Building low-latency, high-reliability control systems for physical interaction.'
        },
        {
            title: 'Quantum & Physics Informed Systems',
            desc: 'Integrating deep scientific constraints directly into computational frameworks.'
        },
        {
            title: 'Dynamic Optimization Layers',
            desc: 'Next-generation auto-tuning for enterprise AI workflows.'
        }
    ];

    return (
        <section id="roadmap" ref={ref} className="section-padding" style={{ background: 'var(--bg-color)', borderTop: '1px solid var(--border-color)' }}>
            <div className="max-w-container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'clamp(40px, 8vw, 80px)' }} className="grid-stack-mobile">

                    <div>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            style={{
                                fontFamily: 'Syne, sans-serif',
                                fontSize: '1rem',
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'var(--text-main)',
                                marginBottom: '40px',
                                opacity: 0.7
                            }}
                        >
              // What’s Next (Roadmap)
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', marginBottom: '60px', maxWidth: '500px' }}
                        >
                            We are actively expanding our solutions beyond memory optimization to enable the next generation of deep tech infrastructure.
                        </motion.p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        {items.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '30px', position: 'relative' }}
                            >
                                <div style={{ position: 'absolute', left: '-4px', top: '0', width: '8px', height: '8px', background: 'var(--text-main)', borderRadius: '50%' }} />
                                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: 'var(--text-main)', marginBottom: '10px' }}>{item.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Roadmap;
