import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

const EXPO = [0.16, 1, 0.3, 1];

const problems = [
    {
        index: '01',
        domain: 'Artificial Intelligence',
        problem: 'AI is hitting a wall.',
        body: 'Compute costs are compounding faster than capability gains. The bottleneck is not algorithms — it is memory. Every GPU cluster wastes the majority of its capacity on redundant data movement. Intelligence is being throttled by hardware that has not kept pace with ambition.',
    },
    {
        index: '02',
        domain: 'Quantum Computing',
        problem: 'Quantum works in the lab. Nowhere else.',
        body: 'The theoretical advantage of quantum systems has been proven. Translating it into hardware that operates reliably outside controlled environments has not been solved. The gap between what quantum can do and what it currently does in the real world is the engineering challenge of the decade.',
    },
    {
        index: '03',
        domain: 'Robotics & Physics',
        problem: 'Machines still cannot reason under uncertainty.',
        body: 'Physical systems operate in a world that is noisy, dynamic, and unstructured. The mathematics to describe this exists. The engineering to act on it, reliably, at scale, in real environments — does not yet. This is the frontier where the next generation of autonomous systems will be built or remain stuck.',
    },
];

const ProblemStatement = () => {
    const ref = useRef(null);
    const isMobile = useMobile();
    const isInView = useInView(ref, { once: true, margin: '-8% 0px' });

    return (
        <section ref={ref} style={{
            padding: 'clamp(80px, 12vh, 140px) 0',
            background: 'var(--bg-color)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div className="max-w-container">

                {/* Header */}
                <div style={{ marginBottom: 'clamp(60px, 10vh, 100px)', maxWidth: '700px' }}>
                    <div className="section-label-wrapper">
                        <div className="section-label-line" />
                        <motion.span
                            initial={isMobile ? {} : { opacity: 0, x: -20 }}
                            animate={(!isMobile && isInView) ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 1, ease: EXPO }}
                            className="section-label"
                        >
                            The Problem
                        </motion.span>
                    </div>

                    <motion.h2
                        initial={isMobile ? {} : { opacity: 0, y: 40 }}
                        animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.1, ease: EXPO }}
                        style={{
                            fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                            fontWeight: 400,
                            fontFamily: 'var(--font-display)',
                            lineHeight: 1,
                            letterSpacing: '-0.04em',
                            margin: '0 0 24px 0',
                            color: 'var(--text-main)',
                        }}
                    >
                        The gap between what <br />
                        <span style={{ color: 'var(--text-dim)' }}>science knows</span> and what <br />
                        engineering delivers.
                    </motion.h2>

                    <motion.p
                        initial={isMobile ? {} : { opacity: 0, y: 20 }}
                        animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.2, ease: EXPO }}
                        style={{
                            fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                            fontFamily: 'var(--font-body)',
                            color: 'var(--text-muted)',
                            lineHeight: '1.7',
                            fontWeight: 300,
                            margin: 0,
                        }}
                    >
                        Across every frontier domain, the same pattern repeats. The theory is ahead of the engineering. The understanding is ahead of the systems. This is where Sophisticates operates.
                    </motion.p>
                </div>

                {/* Problem cards */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {problems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={isMobile ? {} : { opacity: 0, y: 40 }}
                            animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1.1, ease: EXPO, delay: 0.15 + i * 0.12 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : 'clamp(60px, 8vw, 100px) 1fr 1fr',
                                gap: 'clamp(20px, 4vw, 60px)',
                                padding: 'clamp(32px, 5vh, 56px) 0',
                                borderTop: '1px solid var(--border-color)',
                                alignItems: 'start',
                            }}
                        >
                            {/* Index + domain */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
                                <span style={{
                                    fontFamily: 'var(--font-accent)',
                                    fontSize: '0.65rem',
                                    color: 'var(--text-dim)',
                                    letterSpacing: '0.2em',
                                }}>
                                    {item.index}
                                </span>
                                {!isMobile && (
                                    <span style={{
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.6rem',
                                        color: 'var(--text-dim)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em',
                                        lineHeight: 1.4,
                                    }}>
                                        {item.domain}
                                    </span>
                                )}
                            </div>

                            {/* Problem headline */}
                            <div>
                                {isMobile && (
                                    <span style={{
                                        display: 'block',
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '0.6rem',
                                        color: 'var(--text-dim)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em',
                                        marginBottom: '12px',
                                    }}>
                                        {item.domain}
                                    </span>
                                )}
                                <h3 style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 'clamp(1.5rem, 2.5vw, 2.4rem)',
                                    fontWeight: 400,
                                    color: 'var(--text-main)',
                                    letterSpacing: '-0.03em',
                                    lineHeight: 1.05,
                                    margin: 0,
                                }}>
                                    {item.problem}
                                </h3>
                            </div>

                            {/* Body */}
                            <p style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                                color: 'var(--text-muted)',
                                lineHeight: '1.7',
                                fontWeight: 300,
                                margin: 0,
                                paddingTop: isMobile ? '0' : '6px',
                            }}>
                                {item.body}
                            </p>
                        </motion.div>
                    ))}

                    {/* Bottom border */}
                    <div style={{ borderTop: '1px solid var(--border-color)' }} />
                </div>
            </div>
        </section>
    );
};

export default ProblemStatement;
