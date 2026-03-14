import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const Values = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const [isDesktop, setIsDesktop] = useState(true);
    useEffect(() => {
        const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    const values = [
        {
            index: '01',
            title: 'Radical Insight',
            description: 'We turn complexity into clarity without compromising truth. We model reality, expose assumptions, quantify uncertainty, and communicate what matters, with precision.',
            tag: 'ANALYTICAL RIGOR'
        },
        {
            index: '02',
            title: 'Core Courage',
            description: 'We go where the evidence leads, even when it contradicts tradition. We challenge defaults, run disciplined experiments, and choose real progress over comfortable plateaus.',
            tag: 'DISCIPLINED EXPLORATION'
        },
        {
            index: '03',
            title: 'Stewardship',
            description: 'We build power responsibly. Safety, privacy, and ethics are hard constraints, not afterthoughts. We prevent harm and take ownership of the systems we manifest.',
            tag: 'SYSTEMIC RESPONSIBILITY'
        }
    ];

    return (
        <section id="values" ref={ref} className="section-padding" style={{ background: 'var(--bg-color)', position: 'relative' }}>
            <div className="max-w-container">
                <div style={{ marginBottom: '120px' }}>
                    <div className="section-label-wrapper">
                        <div className="section-label-line" />
                        <span className="section-label">Foundation</span>
                    </div>
                    <h2 style={{ fontSize: 'clamp(2.3rem, 4.2vw, 3.6rem)', lineHeight: '0.95', maxWidth: '800px' }}>
                        The Principles of <span className="text-accent">Execution</span>.
                    </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {values.map((item, i) => (
                        <motion.div
                            key={i}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true, margin: "-10%" }}
                            style={{
                                borderTop: '1px solid var(--border-color)',
                                padding: 'clamp(40px, 6vw, 80px) 0',
                                position: 'relative',
                                transition: 'opacity 0.6s var(--ease-out-expo)',
                                opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.3 : 1,
                            }}
                            className="values-row"
                        >
                            {/* Index & Tag */}
                            <div style={{ display: 'flex', flexDirection: isDesktop ? 'column' : 'row', gap: '20px', alignItems: 'flex-start' }}>
                                <span style={{ fontFamily: 'monospace', fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 400 }}>{item.index}</span>
                                <span style={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.6rem',
                                    color: 'var(--text-dim)',
                                    writingMode: isDesktop ? 'vertical-lr' : 'horizontal-tb',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.15em'
                                }}>{item.tag}</span>
                            </div>

                            {/* Title */}
                            <h3
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 'clamp(1.5rem, 2.7vw, 2.7rem)',
                                    margin: 0,
                                    color: 'var(--text-main)',
                                    lineHeight: 0.9,
                                    letterSpacing: '-0.04em',
                                    fontWeight: 400
                                }}
                            >
                                {item.title.split(' ').map((word, idx) => (
                                    <React.Fragment key={idx}>
                                        {word}
                                        {idx === 0 && isDesktop && <br />}
                                        {idx !== 0 && ' '}
                                    </React.Fragment>
                                ))}
                            </h3>

                            {/* Description */}
                            <div style={{ paddingRight: isDesktop ? '10%' : '0' }}>
                                <p style={{
                                    fontSize: 'clamp(0.9rem, 1.2vw, 1.15rem)',
                                    color: 'var(--text-muted)',
                                    lineHeight: '1.7',
                                    fontFamily: 'var(--font-body)',
                                    fontWeight: 300,
                                    margin: 0
                                }}>
                                    {item.description}
                                </p>
                            </div>

                            {/* Ornamental corner detail on hover */}
                            {hoveredIndex === i && isDesktop && (
                                <motion.div
                                    layoutId="value-highlight"
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: '60px',
                                        width: '4px',
                                        height: '40px',
                                        background: 'var(--text-main)'
                                    }}
                                />
                            )}
                        </motion.div>
                    ))}
                    <div style={{ borderTop: '1px solid var(--border-color)' }} />
                </div>
            </div>
        </section>
    );
};

export default Values;

