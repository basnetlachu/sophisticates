'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

const EXPO = [0.16, 1, 0.3, 1];

const Founder = () => {
    const ref = useRef(null);
    const isMobile = useMobile();
    const isInView = useInView(ref, { once: true, margin: '-8% 0px' });

    return (
        <section ref={ref} style={{
            padding: 'clamp(80px, 12vh, 140px) 0',
            background: 'var(--bg-color)',
            borderTop: '1px solid var(--border-color)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div className="max-w-container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: 'clamp(48px, 8vw, 120px)',
                    alignItems: 'start',
                }}>

                    {/* Left — label + name */}
                    <div>
                        <div className="section-label-wrapper">
                            <div className="section-label-line" />
                            <motion.span
                                initial={isMobile ? {} : { opacity: 0, x: -20 }}
                                animate={(!isMobile && isInView) ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 1, ease: EXPO }}
                                className="section-label"
                            >
                                Founder
                            </motion.span>
                        </div>

                        <motion.div
                            initial={isMobile ? {} : { opacity: 0, y: 40 }}
                            animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1.1, ease: EXPO, delay: 0.1 }}
                        >
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(2.6rem, 5vw, 5rem)',
                                fontWeight: 400,
                                color: 'var(--text-main)',
                                letterSpacing: '-0.05em',
                                lineHeight: 0.95,
                                margin: '0 0 clamp(24px, 4vh, 40px) 0',
                            }}>
                                Lachu Man<br />
                                <span style={{ color: 'var(--text-dim)' }}>Basnet</span>
                            </h2>

                            {/* Disciplines */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                                marginBottom: 'clamp(32px, 5vh, 48px)',
                            }}>
                                {['Tech Entrepreneur', 'Quantum Computing', 'Computer Science'].map((tag, i) => (
                                    <motion.div
                                        key={i}
                                        initial={isMobile ? {} : { opacity: 0, x: -16 }}
                                        animate={(!isMobile && isInView) ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.8, ease: EXPO, delay: 0.2 + i * 0.07 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '14px',
                                        }}
                                    >
                                        <div style={{
                                            width: '4px',
                                            height: '4px',
                                            borderRadius: '50%',
                                            background: 'var(--text-dim)',
                                            flexShrink: 0,
                                        }} />
                                        <span style={{
                                            fontFamily: 'var(--font-body)',
                                            fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.2em',
                                            color: 'var(--text-muted)',
                                            fontWeight: 400,
                                        }}>
                                            {tag}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right — statement */}
                    <motion.div
                        initial={isMobile ? {} : { opacity: 0, y: 30 }}
                        animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1.2, ease: EXPO, delay: 0.2 }}
                        style={{
                            paddingTop: isMobile ? '0' : 'clamp(60px, 8vh, 90px)',
                            borderLeft: isMobile ? 'none' : '1px solid var(--border-color)',
                            paddingLeft: isMobile ? '0' : 'clamp(40px, 6vw, 80px)',
                        }}
                    >
                        <blockquote style={{
                            margin: 0,
                            padding: 0,
                        }}>
                            <p style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(1.3rem, 2vw, 2rem)',
                                fontWeight: 400,
                                color: 'var(--text-main)',
                                lineHeight: 1.3,
                                letterSpacing: '-0.03em',
                                margin: '0 0 clamp(24px, 4vh, 40px) 0',
                            }}>
                                "The hardest problems in science are not unsolved because they are impossible. They are unsolved because no one has yet built the right system to attack them."
                            </p>

                            <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                                color: 'var(--text-muted)',
                                lineHeight: '1.75',
                                fontWeight: 300,
                                margin: '0 0 clamp(32px, 5vh, 48px) 0',
                            }}>
                                Lachu founded Sophisticates with a single conviction: that the gap between what physics and mathematics allow and what engineering delivers is not a fundamental limit. It is an execution problem. Sophisticates exists to close that gap — one venture at a time, built from first principles, with no shortcuts.
                            </p>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '20px',
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <span style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '0.7rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.25em',
                                    color: 'var(--text-main)',
                                    fontWeight: 500,
                                }}>
                                    Lachu Man Basnet
                                </span>
                                <span style={{
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '0.65rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.2em',
                                    color: 'var(--text-dim)',
                                    fontWeight: 400,
                                }}>
                                    Founder, Sophisticates
                                </span>
                                </div>

                                <a
                                    href="https://www.linkedin.com/in/lachu-man-basnet-b7787922b/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.6rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em',
                                        color: 'var(--text-dim)',
                                        textDecoration: 'none',
                                        border: '1px solid var(--border-color)',
                                        padding: '8px 14px',
                                        transition: 'all 0.3s ease',
                                        flexShrink: 0,
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.color = 'var(--text-main)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.color = 'var(--text-dim)';
                                        e.currentTarget.style.borderColor = 'var(--border-color)';
                                    }}
                                >
                                    LinkedIn ↗
                                </a>
                            </div>
                        </blockquote>
                    </motion.div>

                </div>
            </div>

            {/* Ambient background letter */}
            <div style={{
                position: 'absolute',
                bottom: '-5%',
                right: '-2%',
                fontFamily: 'var(--font-display)',
                fontSize: '30vw',
                fontWeight: 700,
                color: 'var(--text-main)',
                opacity: 0.012,
                pointerEvents: 'none',
                lineHeight: 1,
                userSelect: 'none',
            }}>
                L
            </div>
        </section>
    );
};

export default Founder;
