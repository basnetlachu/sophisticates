import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Personality = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const personality = [
        { index: '01', title: 'Visionary yet Grounded', desc: 'We think beyond the horizon and prove it step by step.' },
        { index: '02', title: 'Boldly Innovative', desc: 'We take big swings with rigorous methods, measurable outcomes, and zero shortcuts.' },
        { index: '03', title: 'Precisely Intelligent', desc: 'We explain complex ideas cleanly, build systems that withstand scrutiny, and communicate truthfully.' },
        { index: '04', title: 'Human-Centered', desc: 'We design for people and the real world, with safety, ethics, and long-term impact built in.' }
    ];

    return (
        <section className="section-padding" style={{ background: 'var(--bg-color)' }}>
            <div className="max-w-container">
                <h2 style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    marginBottom: '60px',
                    color: 'var(--text-main)',
                    opacity: 0.8
                }}>// Brand Personality</h2>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {personality.map((item, i) => (
                        <motion.div
                            key={i}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            style={{
                                borderTop: '1px solid var(--border-color)',
                                padding: '40px 0',
                                display: 'grid',
                                gridTemplateColumns: 'minmax(50px, 80px) 1.5fr 3fr',
                                gap: '24px',
                                alignItems: 'baseline',
                                transition: 'all 0.4s ease',
                                opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.3 : 1,
                            }}
                            className="grid-stack-mobile"
                        >
                            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{item.index}</span>
                            <h3
                                style={{
                                    fontFamily: 'Syne, sans-serif',
                                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                                    margin: 0,
                                    color: 'var(--text-main)',
                                    transform: hoveredIndex === i ? 'translateX(10px)' : 'translateX(0)',
                                    transition: 'transform 0.3s ease'
                                }}
                            >
                                {item.title}
                            </h3>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: '1.6' }}>
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                    <div style={{ borderTop: '1px solid var(--border-color)' }} />
                </div>
            </div>
        </section>
    );
};

export default Personality;
