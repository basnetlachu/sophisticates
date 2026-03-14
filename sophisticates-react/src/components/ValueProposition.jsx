import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

const ValueProposition = () => {
    const [isDesktop, setIsDesktop] = useState(true);
    const isMobile = useMobile();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    useEffect(() => {
        const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    return (
        <section id="values" ref={ref} className="section-padding" style={{ position: 'relative', overflow: 'hidden', paddingBottom: 'clamp(120px, 20vh, 200px)' }}>
            <div className="max-w-container">
                <div style={{ marginBottom: 'clamp(80px, 12vh, 120px)', maxWidth: '900px' }}>
                    <div className="section-label-wrapper">
                        <div className="section-label-line" />
                        <motion.span
                            initial={isMobile ? {} : { opacity: 0, x: -20 }}
                            animate={(!isMobile && isInView) ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="section-label"
                        >
                            Philosophy
                        </motion.span>
                    </div>
                    <motion.h2
                        initial={isMobile ? {} : { opacity: 0, y: 40 }}
                        animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontSize: 'clamp(2.3rem, 4.2vw, 3.6rem)', fontWeight: 400, fontFamily: 'var(--font-display)', lineHeight: 0.95, letterSpacing: '-0.05em', margin: 0 }}
                    >
                        Foundation of <span className="text-accent" style={{ color: 'var(--text-dim)' }}>Rigor</span>
                    </motion.h2>
                </div>

                <div className="value-prop-grid">
                    {items.map((item, i) => (
                        <BentoBox key={i} item={item} index={i} isDesktop={isDesktop} isInView={isInView} isMobile={isMobile} />
                    ))}
                </div>
            </div>

        </section>
    );
};

const BentoBox = ({ item, index, isDesktop, isInView, isMobile }) => {
    // Provide asymmetric grid spanning for desktop
    const getGridColumn = () => {
        if (!isDesktop) return 'span 1';
        return item.span ? `span ${item.span}` : 'span 6';
    };

    return (
        <motion.div
            className="glass-panel hover-target"
            initial={isMobile ? {} : { opacity: 0, y: 60 }}
            animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + (index * 0.1), duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
                gridColumn: getGridColumn(),
                padding: 'clamp(32px, 5vw, 48px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '380px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '2px',
                border: '1px solid var(--border-color)'
            }}
        >
            <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '40px'
                }}>
                    <div style={{
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-body)',
                        color: 'var(--text-dim)',
                        letterSpacing: '0.4em'
                    }}>0{index + 1}</div>

                    {item.visual && (
                        <div style={{ opacity: 0.2, fontSize: '1.2rem' }}>
                            {item.visual}
                        </div>
                    )}
                </div>

                <div style={{ marginTop: 'auto' }}>
                    <h3 style={{
                        fontFamily: 'var(--font-display)',
                        color: 'var(--text-main)',
                        fontSize: 'clamp(2.1rem, 3.2vw, 2.8rem)',
                        marginBottom: '24px',
                        lineHeight: 1,
                        letterSpacing: '-0.04em',
                        fontWeight: 400
                    }}>
                        {item.title}
                    </h3>
                    <p style={{
                        fontSize: 'clamp(1.1rem, 1.3vw, 1.25rem)',
                        color: 'var(--text-muted)',
                        lineHeight: '1.7',
                        maxWidth: '90%',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 300
                    }}>
                        {item.desc}
                    </p>
                </div>
            </div>

            {/* Technical Detail */}
            <div style={{
                position: 'absolute',
                top: 0, right: 0,
                width: '100%', height: '100%',
                opacity: 0.05,
                pointerEvents: 'none',
                background: 'radial-gradient(circle at 100% 0%, var(--grid-line) 0%, transparent 20%)'
            }} />
        </motion.div>
    );
};

const items = [
    {
        title: "The Simplest Path",
        desc: "We reduce complexity into the minimal set of variables that actually matter, ensuring clarity in every architectural decision.",
        span: 7,
        visual: <div style={{ fontFamily: 'var(--font-body)' }}>↗</div>
    },
    {
        title: "Actionable Intelligence",
        desc: "We turn research-grade ideas into decisions and things that operate in reality, bridging the gap between theory and execution.",
        span: 5,
        visual: (
            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '16px' }}>
                <div style={{ width: '2px', height: '40%', background: 'var(--text-main)' }} />
                <div style={{ width: '2px', height: '70%', background: 'var(--text-main)' }} />
                <div style={{ width: '2px', height: '100%', background: 'var(--text-main)' }} />
            </div>
        )
    },
    {
        title: "Resilient Systems",
        desc: "We build architectures that endure: stable under extreme stress, and infinitely adaptive under shifting computational loads.",
        span: 5,
        visual: <div style={{ fontFamily: 'var(--font-body)' }}>○</div>
    },
    {
        title: "Enduring Breakthroughs",
        desc: "We pursue breakthroughs that survive contact with the real world, ensuring long-term technical sovereignty for our partners.",
        span: 7,
        visual: <div style={{ fontFamily: 'var(--font-body)' }}>+</div>
    }
];

export default ValueProposition;
