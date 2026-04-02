'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

const EXPO = [0.16, 1, 0.3, 1];

const ventures = [
    {
        domain: 'Artificial Intelligence',
        tag: 'AI · Hardware Infrastructure',
        name: 'MEMOPT',
        description: 'Universal Memory Fabric. Eliminates the memory wall across all silicon architectures: NVIDIA, AMD, and custom. 4× tenant density, 40% less energy overhead.',
        status: 'live',
        statusLabel: 'Live',
        link: 'https://memopt.com',
    },
    {
        domain: 'Quantum Computing · Physics · Robotics',
        tag: 'Ventures · In Stealth',
        name: '3 Ventures',
        description: 'Three companies in active development across Quantum Computing, Physics, and Robotics. Each is being built from first principles, targeting domains where the gap between what science knows and what engineering delivers is the widest.',
        status: 'stealth',
        statusLabel: 'In Stealth',
        link: null,
    },
];

const VentureCard = ({ venture, index, isInView, isMobile }) => (
    <motion.div
        initial={isMobile ? {} : { opacity: 0, y: 50 }}
        animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease: EXPO, delay: 0.1 + index * 0.1 }}
        style={{
            border: '1px solid var(--border-color)',
            padding: 'clamp(28px, 4vw, 44px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '340px',
            position: 'relative',
            background: venture.status === 'live'
                ? 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 100%)'
                : venture.status === 'stealth'
                ? 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.01) 10px, rgba(255,255,255,0.01) 11px)'
                : 'transparent',
            transition: 'border-color 0.3s ease',
            cursor: venture.link ? 'pointer' : 'default',
        }}
        className="hover-target"
        onClick={() => venture.link && window.open(venture.link, '_blank', 'noopener')}
        whileHover={venture.link ? { borderColor: 'rgba(255,255,255,0.35)' } : {}}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--text-dim)' }}>
                {venture.tag}
            </span>
            <span style={{
                fontSize: '0.58rem',
                fontFamily: 'var(--font-accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: venture.status === 'live' ? 'var(--text-main)' : 'var(--text-dim)',
                border: '1px solid',
                borderColor: venture.status === 'live' ? 'rgba(255,255,255,0.4)' : venture.status === 'stealth' ? 'rgba(255,255,255,0.2)' : 'var(--border-color)',
                padding: '4px 10px',
            }}>
                {venture.statusLabel}
            </span>
        </div>

        <div style={{ marginTop: '40px' }}>
            <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 2.8vw, 2.8rem)',
                fontWeight: 400,
                color: venture.status === 'live' ? 'var(--text-main)' : 'var(--text-muted)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                margin: '0 0 8px 0',
            }}>
                {venture.name}
            </h3>
            <p style={{ fontSize: '0.72rem', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-dim)', margin: '0 0 24px 0' }}>
                {venture.domain}
            </p>
            <p style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)', fontFamily: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: '1.65', fontWeight: 300, margin: 0 }}>
                {venture.description}
            </p>
            {venture.link && (
                <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.68rem', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--text-main)' }}>
                    <span>View Venture</span>
                    <span style={{ fontSize: '0.9rem' }}>↗</span>
                </div>
            )}
        </div>
    </motion.div>
);

const Portfolio = () => {
    const ref = useRef(null);
    const isMobile = useMobile();
    const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

    return (
        <section id="portfolio" ref={ref} style={{
            padding: 'clamp(80px, 12vh, 140px) 0',
            background: 'var(--bg-color)',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid var(--border-color)',
        }}>
            <div className="max-w-container">
                <div style={{ marginBottom: 'clamp(50px, 8vh, 90px)', maxWidth: '800px' }}>
                    <div className="section-label-wrapper">
                        <div className="section-label-line" />
                        <motion.span
                            initial={isMobile ? {} : { opacity: 0, x: -20 }}
                            animate={(!isMobile && isInView) ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 1, ease: EXPO }}
                            className="section-label"
                        >
                            Ventures
                        </motion.span>
                    </div>

                    <motion.h2
                        initial={isMobile ? {} : { opacity: 0, y: 40 }}
                        animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.1, ease: EXPO }}
                        style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', fontWeight: 400, fontFamily: 'var(--font-display)', lineHeight: 1, letterSpacing: '-0.04em', margin: '0 0 24px 0', color: 'var(--text-main)' }}
                    >
                        One Company.<br />
                        <span style={{ color: 'var(--text-dim)' }}>Four Frontiers.</span>
                    </motion.h2>

                    <motion.p
                        initial={isMobile ? {} : { opacity: 0, y: 20 }}
                        animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2, ease: EXPO }}
                        style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)', fontFamily: 'var(--font-body)', color: 'var(--text-muted)', lineHeight: '1.7', fontWeight: 300, margin: 0 }}
                    >
                        Sophisticates builds each venture from first principles. A separate company, a separate mission, unified under one vision. Every venture targets a domain where the gap between what science knows and what engineering delivers is the widest.
                    </motion.p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1px', background: 'var(--border-color)', border: '1px solid var(--border-color)' }}>
                    {ventures.map((venture, i) => (
                        <div key={i} style={{ background: 'var(--bg-color)' }}>
                            <VentureCard venture={venture} index={i} isInView={isInView} isMobile={isMobile} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
