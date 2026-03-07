import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ValueProposition = () => {
    return (
        <section className="section-padding" style={{ background: 'var(--bg-color)', borderTop: '1px solid var(--border-color)' }}>
            <div className="max-w-container">
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', letterSpacing: '0.2em', color: 'var(--text-main)', opacity: 0.7, textTransform: 'uppercase' }}
                    >
             // Value Proposition
                    </motion.h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 45vw, 350px), 1fr))', // Responsive grid
                    gap: '1px',
                    background: 'var(--border-color)', // Gap color
                    border: '1px solid var(--border-color)',
                }}>
                    {items.map((item, i) => (
                        <BentoBox key={i} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const BentoBox = ({ item, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{
                background: isHovered ? 'var(--accent)' : 'var(--bg-color)',
                color: isHovered ? 'var(--bg-color)' : 'var(--text-main)',
                padding: 'clamp(24px, 5vw, 50px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '320px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'background 0.3s ease, color 0.3s ease'
            }}
        >
            <div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', color: 'inherit', fontSize: '1.8rem', marginBottom: '16px', lineHeight: 1.1, transition: 'color 0.3s' }}>
                    {item.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: isHovered ? 'var(--bg-color)' : 'var(--text-muted)', lineHeight: '1.6', transition: 'color 0.3s' }}>{item.desc}</p>
            </div>

            {item.visual && (
                <div style={{ marginTop: '40px', color: isHovered ? 'var(--bg-color)' : 'var(--text-main)', transition: 'color 0.3s' }}>
                    {React.cloneElement(item.visual, { isHovered })}
                </div>
            )}
        </motion.div>
    );
};

const items = [
    {
        title: "The Simplest Path",
        desc: "We reduce complexity into the minimal set of variables that actually matter.",
        visual: <div style={{ fontSize: '3rem', opacity: 0.4, textAlign: 'right' }}>↗</div>
    },
    {
        title: "Actionable Intelligence",
        desc: "We turn research-grade ideas into decisions and things that operate in reality.",
        visual: (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '40px', opacity: 0.8 }}>
                <motion.div initial={{ height: 0 }} whileInView={{ height: '40%' }} transition={{ delay: 0.5, duration: 1 }} style={{ width: '8px', background: 'currentColor' }} />
                <motion.div initial={{ height: 0 }} whileInView={{ height: '90%' }} transition={{ delay: 0.7, duration: 1 }} style={{ width: '8px', background: 'currentColor' }} />
                <motion.div initial={{ height: 0 }} whileInView={{ height: '60%' }} transition={{ delay: 0.9, duration: 1 }} style={{ width: '8px', background: 'currentColor' }} />
            </div>
        )
    },
    {
        title: "Resilient Systems",
        desc: "We build architectures that endure: stable under stress, adaptive under change.",
        visual: null
    },
    {
        title: "Enduring Breakthroughs",
        desc: "We pursue breakthroughs that survive contact with the real world.",
        visual: null
    }
];

export default ValueProposition;
