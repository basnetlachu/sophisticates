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
            question: "What exactly does Sophisticates do?",
            answer: "Sophisticates is a deep tech venture company. We build companies from scratch, each engineered from first principles. We don't consult, we don't invest in others' ideas. We identify the hardest unsolved problems in AI, Quantum Computing, Robotics, and Physics, then build dedicated companies to solve them. MEMOPT is our first live venture."
        },
        {
            question: "Is Sophisticates taking clients or only building its own ventures?",
            answer: "We build our own ventures. We are not a consultancy or a services firm. If you're a company looking to integrate MEMOPT, our AI memory infrastructure, you can request early access directly. For everything else, we're building internally and will surface new ventures as they're ready."
        },
        {
            question: "What is MEMOPT and who is it for?",
            answer: "MEMOPT is a Universal Memory Fabric: infrastructure that eliminates the memory bottleneck across AI workloads on any silicon (NVIDIA, AMD, custom). It delivers 4× higher compute density and 40% less energy overhead. It's built for AI labs, cloud providers, and enterprises running large-scale inference or training workloads who are hitting the limits of current hardware."
        },
        {
            question: "How do I get early access?",
            answer: "Submit your email using the form at the bottom of this page. Access is granted in selective waves. Priority goes to teams with active large-scale AI infrastructure challenges. We review every submission and reach out directly."
        },
        {
            question: "Are you raising funding or are you self-funded?",
            answer: "We don't publicly disclose our funding structure. If you're an investor interested in what we're building, reach out through the contact page. We engage selectively with partners who understand deep tech timelines and the nature of what it takes to build at this level."
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
                                Common <br /><span className="text-accent" style={{ color: 'var(--text-dim)' }}>Questions</span>
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)', maxWidth: '340px', fontFamily: 'var(--font-body)', fontWeight: 300, lineHeight: 1.6 }}>
                                Answers to what most visitors want to know about Sophisticates and how we work.
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
                                        gridTemplateColumns: 'clamp(28px, 6vw, 60px) 1fr clamp(28px, 5vw, 40px)',
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
                                            <div className="faq-answer-indent" style={{
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

