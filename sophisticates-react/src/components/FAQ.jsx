import React, { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const isMobile = useMobile();

    const faqs = [
        {
            question: "Technical integration scope?",
            answer: "We engineer customized, high-precision technical solutions tailored to systemic complexities in your architecture. Our focus spans from deep analytical modeling to deploying resilient, scalable frameworks suitable for the hardest frontiers."
        },
        {
            question: "Partnership model?",
            answer: "We operate on a mutual alignment principle. After initial transmission and review, we conduct a deep-dive analysis of your technical landscape. Engagements are structured as collaborative research and development partnerships rather than traditional vendor-client dynamics."
        },
        {
            question: "Ideal engagement profile?",
            answer: "We partner with organizations and visionary leaders who face unprecedented, highly complex technical challenges that standard off-the-shelf solutions cannot resolve. We require a commitment to precision and innovation."
        },
        {
            question: "Early Access timeline?",
            answer: "Our core frameworks are currently undergoing rigorous closed-environment testing. Priority access will be granted in selective waves. Submitting an early access request puts you directly into the evaluation queue."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" ref={ref} className="section-padding" style={{
            background: 'var(--bg-color)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="max-w-container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="faq-grid">

                    {/* Sticky Sidebar */}
                    <div className="faq-sticky">
                        <motion.div
                            initial={isMobile ? {} : { opacity: 0, x: -30 }}
                            whileInView={isMobile ? {} : { opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                        >
                            <div className="section-label-wrapper">
                                <div className="section-label-line" />
                                <span className="section-label">Knowledge Base</span>
                            </div>

                            <h2 style={{
                                fontSize: 'clamp(1.9rem, 3vw, 2.7rem)',
                                fontFamily: 'var(--font-display)',
                                color: 'var(--text-main)',
                                letterSpacing: '-0.04em',
                                lineHeight: '0.95',
                                fontWeight: 400,
                                marginBottom: '40px'
                            }}>
                                Inquiries & <br /><span className="text-accent">Clarifications</span>
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)', maxWidth: '340px', fontFamily: 'var(--font-body)', fontWeight: 300, lineHeight: 1.6 }}>
                                Essential information regarding the Sophisticates protocol and partnership framework.
                            </p>
                        </motion.div>
                    </div>

                    {/* FAQ Items */}
                    <div>
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={isMobile ? {} : { opacity: 0, y: 20 }}
                                whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true }}
                                style={{
                                    borderBottom: '1px solid var(--border-color)',
                                }}
                            >
                                <button
                                    onClick={() => toggleAccordion(i)}
                                    className="hover-target"
                                    style={{
                                        width: '100%',
                                        display: 'grid',
                                        gridTemplateColumns: 'minmax(40px, 60px) 1fr 40px',
                                        alignItems: 'center',
                                        padding: 'clamp(32px, 5vw, 48px) 0',
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--text-main)',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
                                        fontFamily: 'var(--font-display)',
                                        letterSpacing: '-0.01em',
                                        fontWeight: 400,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <span style={{
                                        fontFamily: 'monospace',
                                        fontSize: '0.8rem',
                                        color: 'var(--text-dim)',
                                        opacity: activeIndex === i ? 1 : 0.4
                                    }}>
                                        0{i + 1}
                                    </span>
                                    <span style={{
                                        paddingRight: '20px',
                                        color: activeIndex === i ? 'var(--text-main)' : 'var(--text-muted)',
                                        transition: 'color 0.4s var(--ease-out-expo)'
                                    }}>
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: activeIndex === i ? 135 : 0 }}
                                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            fontSize: '1.5rem',
                                            color: activeIndex === i ? 'var(--text-main)' : 'var(--text-dim)'
                                        }}
                                    >
                                        +
                                    </motion.div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {activeIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div style={{
                                                padding: '0 0 clamp(32px, 6vw, 56px) clamp(40px, 6vw, 60px)',
                                                color: 'var(--text-muted)',
                                                fontFamily: 'var(--font-body)',
                                                fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
                                                lineHeight: '1.7',
                                                fontWeight: 300,
                                                maxWidth: '600px'
                                            }}>
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Background branding detail */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                right: '5%',
                fontSize: '15vw',
                fontFamily: 'var(--font-display)',
                color: 'var(--text-main)',
                opacity: 0.015,
                fontWeight: 900,
                pointerEvents: 'none',
                zIndex: 0
            }}>
                FAQ
            </div>
        </section>
    );
};

export default FAQ;

