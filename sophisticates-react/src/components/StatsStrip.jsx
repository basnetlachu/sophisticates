import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

const EXPO = [0.16, 1, 0.3, 1];

const stats = [
    { value: '90%', label: 'Capacity Recovery', sub: 'via global KV-deduplication' },
    { value: '4×', label: 'Tenant Density', sub: 'across all silicon architectures' },
    { value: '40%', label: 'Energy Reduction', sub: 'per compute workload' },
    { value: '4', label: 'Frontier Domains', sub: 'AI · Quantum · Robotics · Physics' },
];

const StatsStrip = () => {
    const ref = useRef(null);
    const isMobile = useMobile();
    const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

    return (
        <section ref={ref} style={{
            borderTop: '1px solid var(--border-color)',
            borderBottom: '1px solid var(--border-color)',
            background: 'var(--bg-color)',
            padding: 'clamp(48px, 7vh, 80px) 0',
            overflow: 'hidden',
        }}>
            <div className="max-w-container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                    gap: '0',
                }}>
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={isMobile ? {} : { opacity: 0, y: 30 }}
                            animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1, ease: EXPO, delay: i * 0.08 }}
                            style={{
                                padding: 'clamp(24px, 4vw, 48px)',
                                borderRight: i < stats.length - 1 ? '1px solid var(--border-color)' : 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            <span style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(3rem, 5vw, 5.5rem)',
                                fontWeight: 300,
                                color: 'var(--text-main)',
                                letterSpacing: '-0.05em',
                                lineHeight: 1,
                            }}>
                                {stat.value}
                            </span>
                            <span style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)',
                                fontWeight: 500,
                                color: 'var(--text-main)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.15em',
                            }}>
                                {stat.label}
                            </span>
                            <span style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'clamp(0.7rem, 0.8vw, 0.8rem)',
                                fontWeight: 300,
                                color: 'var(--text-dim)',
                                letterSpacing: '0.05em',
                            }}>
                                {stat.sub}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsStrip;
