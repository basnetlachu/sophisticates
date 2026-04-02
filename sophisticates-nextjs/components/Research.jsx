'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useMobile } from '../hooks/useMobile';
import { ResearchVisualizer } from './Visuals3D';

const Research = () => {
    const ref = useRef(null);
    const isMobile = useMobile();
    const isDesktop = !isMobile;
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    const [form, setForm] = useState({ name: '', email: '', org: '', area: '', role: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('is-visible');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const aiArea = {
        title: 'Artificial Intelligence (AI)',
        desc: 'We build the infrastructure layer that makes large-scale intelligence viable. Our flagship venture, MemOpt, targets the foundational memory bottleneck in AI systems, deploying distributed virtual memory management and global key-value deduplication to recover up to 90% of wasted capacity. The result is 4x higher tenant density and a 40% reduction in energy overhead, decoupling intelligence from the scarcity of hardware. Across our AI work, the focus is the same: turn the constraints of physical compute into tractable engineering problems.'
    };

    const otherAreas = [
        {
            title: 'Quantum Computing',
            desc: 'We unlock new computational frontiers by translating quantum theory into reliable hardware and software systems. Our goal is to make quantum technologies practical, scalable, and impactful across industries.'
        },
        {
            title: 'Robotics',
            desc: 'We build intelligent, adaptable machines capable of operating safely and efficiently in real-world environments. By combining advanced AI, control systems, and mechanical design, our robotics ventures deliver tangible breakthroughs.'
        },
        {
            title: 'Physics',
            desc: 'We explore fundamental principles to develop technologies that reshape the physical world. Our physics research focuses on translating deep theoretical insights into usable, scalable systems that drive real innovation.'
        }
    ];

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.area || !form.message) return;
        setStatus('sending');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    businessName: form.org || 'Independent / Researcher',
                    country: form.area,
                    message: `Research Participation Application\nArea: ${form.area}\nRole: ${form.role || 'Not specified'}\n\n${form.message}`
                })
            });
            const data = await res.json();
            setStatus(data.status === 'success' ? 'success' : 'error');
        } catch {
            setStatus('error');
        }
    };

    const inputStyle = {
        width: '100%',
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--border-color)',
        color: 'var(--text-main)',
        padding: '12px 0',
        fontSize: '1rem',
        fontFamily: 'var(--font-body)',
        outline: 'none',
        fontWeight: 300,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    };

    const labelStyle = {
        fontSize: '0.7rem',
        textTransform: 'uppercase',
        color: 'var(--text-dim)',
        letterSpacing: '0.25em',
        fontFamily: 'var(--font-body)',
        display: 'block',
        marginBottom: '16px'
    };

    const handleFocus = (e) => {
        e.target.style.borderColor = 'var(--text-main)';
        e.target.style.borderBottomWidth = '1.5px';
    };

    const handleBlur = (e) => {
        e.target.style.borderColor = 'var(--border-color)';
        e.target.style.borderBottomWidth = '1px';
    };

    return (
        <main className="smooth-scroll-wrapper">
            <section ref={ref} style={{
                background: 'var(--bg-color)',
                position: 'relative',
                paddingTop: 'clamp(60px, 10vh, 100px)',
                paddingBottom: 'clamp(60px, 8vh, 100px)',
                minHeight: '100vh',
                overflow: 'hidden'
            }}>
                <div className="max-w-container">
                    <motion.div
                        initial={isMobile ? {} : { opacity: 0, y: 50 }}
                        animate={(!isMobile && isInView) ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}
                    >
                        <div className="section-label-wrapper">
                            <div className="section-label-line" />
                            <span className="section-label">Research & Ventures</span>
                        </div>

                        <h2 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2rem, 4vw, 3.6rem)',
                            lineHeight: '1.2',
                            fontWeight: 400,
                            color: 'var(--text-main)',
                            marginBottom: '28px',
                            textAlign: 'left',
                            letterSpacing: '-0.06em',
                            maxWidth: '1200px'
                        }}>
                            Exploring the Frontier of <span className="text-accent" style={{ color: 'var(--text-dim)' }}>Technology</span>.
                        </h2>

                        <p style={{
                            fontSize: 'clamp(1rem, 1.4vw, 1.4rem)',
                            color: 'var(--text-muted)',
                            lineHeight: '1.7',
                            fontFamily: 'var(--font-body)',
                            fontWeight: 300,
                            maxWidth: '900px',
                            marginBottom: '60px'
                        }}>
                            Sophisticates invests in research and ventures across <strong style={{ color: 'var(--text-main)', fontWeight: 500 }}>Artificial Intelligence, Quantum Computing, Robotics, and Physics</strong>, transforming theoretical possibilities into practical breakthroughs.
                        </p>

                        {/* Group 1: AI Infrastructure */}
                        <div style={{ marginBottom: '48px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'var(--text-dim)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Current Venture</span>
                                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
                            </div>
                            <motion.div
                                className="glass-panel hover-target"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10% 0px" }}
                                transition={{ duration: 0.8 }}
                                style={{
                                    padding: 'clamp(32px, 4vw, 48px)',
                                    border: '1px solid var(--border-color)',
                                    background: 'rgba(255, 255, 255, 0.01)',
                                    backdropFilter: 'blur(10px)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '24px'
                                }}
                            >
                                <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>01</div>
                                <h3 style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 'clamp(1.2rem, 1.5vw, 1.5rem)',
                                    color: 'var(--text-main)',
                                    fontWeight: 400,
                                    letterSpacing: '-0.02em',
                                    margin: 0
                                }}>{aiArea.title}</h3>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.7', fontFamily: 'var(--font-body)', fontWeight: 300, margin: 0 }}>
                                    "{aiArea.desc}"
                                </p>
                            </motion.div>
                        </div>

                        {/* Group 2: Other Domains */}
                        <div style={{ marginBottom: '60px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                                <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'var(--text-dim)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Future Research Ventures</span>
                                <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                gap: 'clamp(24px, 4vw, 40px)'
                            }}>
                                {otherAreas.map((area, idx) => (
                                    <motion.div
                                        key={area.title}
                                        className="glass-panel hover-target"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-10% 0px" }}
                                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                                        style={{
                                            padding: 'clamp(32px, 4vw, 48px)',
                                            border: '1px solid var(--border-color)',
                                            background: 'rgba(255, 255, 255, 0.01)',
                                            backdropFilter: 'blur(10px)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '24px'
                                        }}
                                    >
                                        <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--text-dim)', letterSpacing: '0.1em' }}>0{idx + 2}</div>
                                        <h3 style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: 'clamp(1.2rem, 1.5vw, 1.5rem)',
                                            color: 'var(--text-main)',
                                            fontWeight: 400,
                                            letterSpacing: '-0.02em',
                                            margin: 0
                                        }}>{area.title}</h3>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.7', fontFamily: 'var(--font-body)', fontWeight: 300, margin: 0 }}>
                                            "{area.desc}"
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Methodology Quote */}
                        <div style={{ position: 'relative', padding: 'clamp(40px, 6vh, 80px) 0', marginBottom: '60px' }}>
                            <div className="section-label-wrapper" style={{ justifyContent: 'center', marginBottom: '40px' }}>
                                <div className="section-label-line" style={{ width: '100%', position: 'absolute', top: '50%', left: 0, zIndex: 0 }} />
                                <span className="section-label" style={{ padding: '0 20px', background: 'var(--bg-color)', position: 'relative', zIndex: 1, margin: '0 auto' }}>Methodology</span>
                            </div>
                            <p style={{
                                fontSize: 'clamp(1.1rem, 1.6vw, 1.8rem)',
                                color: 'var(--text-main)',
                                lineHeight: '1.6',
                                fontFamily: 'var(--font-display)',
                                fontWeight: 300,
                                textAlign: 'center',
                                maxWidth: '1000px',
                                margin: '0 auto'
                            }}>
                                "Across all four areas, we operate at the intersection of theory and engineering discipline. We convert abstract constraints into practical capabilities, creating systems that are intelligible, usable, and durable."
                            </p>
                        </div>

                    </motion.div>
                </div>

                {/* Background Graphic */}
                <div style={{
                    position: 'absolute', top: '20%', left: '50%',
                    width: '100%', height: '100%',
                    background: 'radial-gradient(circle at center, var(--grid-line) 0%, transparent 60%)',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 1
                }} />
                <ResearchVisualizer />
            </section>

            {/* Participation Form */}
            <section style={{
                background: 'var(--bg-color)',
                borderTop: '1px solid var(--border-color)',
                paddingTop: 'clamp(60px, 8vh, 100px)',
                paddingBottom: 'clamp(60px, 8vh, 100px)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="max-w-container">
                    <div className="contact-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: isDesktop ? '1fr 1.6fr' : '1fr',
                        gap: 'clamp(60px, 8vw, 120px)',
                        alignItems: 'start'
                    }}>
                        {/* Info Side */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                                <div style={{ width: '40px', height: '1px', background: 'var(--text-main)' }} />
                                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-body)', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.4em', fontWeight: 500 }}>
                                    Participation
                                </span>
                            </div>

                            <h2 style={{
                                fontSize: 'clamp(2.3rem, 3.3vw, 3rem)',
                                color: 'var(--text-main)',
                                fontFamily: 'var(--font-display)',
                                lineHeight: '0.95',
                                marginBottom: '40px',
                                letterSpacing: '-0.05em',
                                fontWeight: 400
                            }}>
                                Apply to <span className="text-accent" style={{ color: 'var(--text-dim)' }}>Research</span>.
                            </h2>

                            <p style={{
                                fontSize: 'clamp(0.95rem, 1.3vw, 1.25rem)',
                                color: 'var(--text-muted)',
                                lineHeight: '1.7',
                                marginBottom: '60px',
                                fontFamily: 'var(--font-body)',
                                fontWeight: 300,
                                maxWidth: 'min(480px, 100%)'
                            }}>
                                We collaborate with researchers and institutions globally. Our team will review your application and notify you of the status.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                                {[
                                    { num: '01', title: 'Collaboration', desc: 'Work with our core research teams on frontier problems.' },
                                    { num: '02', title: 'Infrastructure', desc: 'Access proprietary tools and compute frameworks.' },
                                    { num: '03', title: 'Selection', desc: 'Prioritizing depth of expertise and alignment.' }
                                ].map(item => (
                                    <div key={item.num} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '32px' }}>
                                        <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', color: 'var(--text-dim)', letterSpacing: '0.2em', display: 'block', marginBottom: '12px' }}>{item.num} //</span>
                                        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 400, margin: '0 0 8px 0' }}>{item.title}</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Form Side */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="glass-panel"
                            style={{
                                padding: 'clamp(40px, 6vw, 80px)',
                                borderRadius: '2px',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: '500px' }}
                                    >
                                        <div style={{
                                            width: '80px', height: '80px', borderRadius: '50%',
                                            border: '1px solid var(--border-color)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '32px'
                                        }}>✓</div>
                                        <h3 style={{ color: 'var(--text-main)', fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: '16px' }}>Application Logged</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '300px', lineHeight: 1.6 }}>An acknowledgment has been sent to your email. We will reach out after review.</p>
                                        <button className="btn-outline hover-target" onClick={() => setStatus('idle')} style={{ marginTop: '40px', padding: '12px 32px' }}>New Application</button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 5vw, 48px)' }}>
                                        <div className="research-form-grid" style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 'clamp(20px, 3vw, 32px)' }}>
                                            <div className="input-group">
                                                <label style={labelStyle}>Full Name</label>
                                                <input required name="name" type="text" className="hover-target" value={form.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={inputStyle} />
                                            </div>
                                            <div className="input-group">
                                                <label style={labelStyle}>Email Address</label>
                                                <input required name="email" type="email" className="hover-target" placeholder="researcher@domain.edu" value={form.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={inputStyle} />
                                            </div>
                                        </div>

                                        <div className="research-form-grid" style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 'clamp(20px, 3vw, 32px)' }}>
                                            <div className="input-group">
                                                <label style={labelStyle}>Organization</label>
                                                <input name="org" type="text" className="hover-target" placeholder="Institution / Lab" value={form.org} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={inputStyle} />
                                            </div>
                                            <div className="input-group">
                                                <label style={labelStyle}>Area of Interest</label>
                                                <select name="area" required className="hover-target" value={form.area} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={{ ...inputStyle, cursor: 'pointer' }}>
                                                    <option value="" style={{ background: 'var(--bg-color)' }}>Select Area</option>
                                                    <option value="Artificial Intelligence" style={{ background: 'var(--bg-color)' }}>AI Infrastructure</option>
                                                    <option value="Quantum Computing" style={{ background: 'var(--bg-color)' }}>Quantum Systems</option>
                                                    <option value="Robotics" style={{ background: 'var(--bg-color)' }}>Robotics</option>
                                                    <option value="Physics" style={{ background: 'var(--bg-color)' }}>Physics</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="input-group">
                                            <label style={labelStyle}>Background / Proposal Abstract</label>
                                            <textarea required name="message" rows={4} className="hover-target" placeholder="Briefly describe your research focus..." value={form.message} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={{ ...inputStyle, resize: 'none' }} />
                                        </div>

                                        <motion.button
                                            type="submit"
                                            disabled={status === 'sending'}
                                            className="btn-premium hover-target"
                                            whileTap={{ scale: 0.98 }}
                                            style={{ padding: '18px 48px', fontSize: '0.85rem', alignSelf: 'flex-start', marginTop: '8px' }}
                                        >
                                            {status === 'sending' ? 'Transmitting...' : 'Submit Application'}
                                        </motion.button>

                                        {status === 'error' && (
                                            <p style={{ color: 'rgba(255,80,80,0.8)', fontSize: '0.8rem', fontFamily: 'monospace', margin: 0 }}>
                                                Transmission error. Please email hello@sophisticatesai.com
                                            </p>
                                        )}
                                    </form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Research;
