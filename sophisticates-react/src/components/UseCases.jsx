import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const UseCases = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const benefits = [
        {
            stat: "3.8x",
            label: "Maximum Throughput Increase",
            desc: "By aligning computation blocks with effective memory bandwidth."
        },
        {
            stat: "Zero",
            label: "Manual Tuning Required",
            desc: "Algorithmic identification of bottlenecks across large-scale clusters."
        },
        {
            stat: "85%",
            label: "Energy Optimization",
            desc: "Reducing redundant data motion significantly lowers the power floor of deep learning inference."
        }
    ];

    return (
        <section id="use-cases" ref={ref} className="section-padding" style={{ background: 'var(--bg-color)', borderTop: '1px solid var(--border-color)' }}>
            <div className="max-w-container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'clamp(40px, 10vw, 100px)' }} className="grid-stack-mobile">

                    {/* Header */}
                    <div>
                        <h2 style={{
                            fontFamily: 'Syne, sans-serif',
                            fontSize: '1rem',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--text-main)',
                            marginBottom: '40px',
                            opacity: 0.7
                        }}>
                // Benefits & Impact
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            We measure breakthrough not in incremental speed, but in structural efficiency. Our stack addresses the fundamental physical constraints of modern hardware.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                        {benefits.map((statItem, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: i * 0.2 }}
                                style={{ padding: 'clamp(24px, 4vw, 40px)', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--text-main)'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                            >
                                <span style={{ fontSize: 'clamp(2.5rem, 5vw, 3rem)', fontFamily: 'Syne, sans-serif', color: 'var(--text-main)', display: 'block', marginBottom: '10px' }}>{statItem.stat}</span>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600, display: 'block', marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>{statItem.label}</span>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{statItem.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: 'clamp(60px, 10vw, 100px)', padding: 'clamp(30px, 6vw, 60px)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                    <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: 'var(--text-main)', marginBottom: '30px' }}>Scaling Intelligence Safely</h3>
                    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                            We don't just optimize for speed; we optimize for trust. Every layer of the Sophisticates stack includes telemetry for safety and ethical alignment, ensuring that as systems become more powerful, they remain intelligible to their creators.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UseCases;
