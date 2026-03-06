import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What specific enterprise solutions do you offer?",
            answer: "We engineer customized, high-precision technical solutions tailored to systemic complexities in your architecture. Our focus spans from deep analytical modeling to deploying resilient, scalable frameworks suitable for the hardest frontiers."
        },
        {
            question: "How does the partnership engagement model work?",
            answer: "We operate on a mutual alignment principle. After initial transmission and review, we conduct a deep-dive analysis of your technical landscape. Engagements are structured as collaborative research and development partnerships rather than traditional vendor-client dynamics."
        },
        {
            question: "Who is the ideal candidate for Sophisticates?",
            answer: "We partner with organizations and visionary leaders who face unprecedented, highly complex technical challenges that standard off-the-shelf solutions cannot resolve. We require a commitment to precision and innovation."
        },
        {
            question: "When will the Early Access program formally launch?",
            answer: "Our core frameworks are currently undergoing rigorous closed-environment testing. Priority access will be granted in selective waves. Submitting an early access request puts you directly into the evaluation queue."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="section-padding" style={{
            background: 'var(--bg-color)',
            borderTop: '1px solid var(--border-color)',
            position: 'relative'
        }}>
            {/* Grid Background Subtlety */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)',
                backgroundSize: '120px 120px',
                maskImage: 'radial-gradient(circle at center, black 10%, transparent 60%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 60%)',
                opacity: 0.5,
                pointerEvents: 'none'
            }} />

            <div className="max-w-container">
                <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 8vw, 80px)' }}>
                    <h2 style={{
                        fontFamily: 'Syne, sans-serif',
                        fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        marginBottom: '1rem'
                    }}>
                        // Knowledge Base
                    </h2>
                    <h3 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontFamily: 'Syne, sans-serif',
                        color: 'var(--text-main)',
                        letterSpacing: '-0.02em',
                        lineHeight: '1.2'
                    }}>
                        Inquiries & Clarifications
                    </h3>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            style={{
                                borderBottom: '1px solid var(--border-color)',
                                overflow: 'hidden'
                            }}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 'clamp(20px, 4vw, 30px) 0',
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--text-main)',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontSize: 'clamp(1rem, 2vw, 1.25rem)'
                                }}
                            >
                                <span style={{ paddingRight: '20px' }}>{faq.question}</span>
                                <motion.span
                                    animate={{ rotate: activeIndex === index ? 45 : 0 }}
                                    transition={{ duration: 0.3, ease: 'backOut' }}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '24px',
                                        height: '24px',
                                        fontSize: '1.5rem',
                                        flexShrink: 0
                                    }}
                                >
                                    +
                                </motion.span>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div style={{
                                            paddingBottom: 'clamp(20px, 4vw, 30px)',
                                            color: 'var(--text-muted)',
                                            fontFamily: 'Space Grotesk, sans-serif',
                                            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                                            lineHeight: '1.6',
                                            maxWidth: '90%'
                                        }}>
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
