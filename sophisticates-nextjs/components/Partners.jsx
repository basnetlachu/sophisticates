'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { PartnersVisualizer } from './Visuals3D';

const Partners = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <main className="smooth-scroll-wrapper" style={{ paddingTop: 'clamp(100px, 12vh, 160px)', paddingBottom: 'clamp(60px, 10vh, 160px)', minHeight: '100vh', background: 'var(--bg-color)', position: 'relative' }}>
            <PartnersVisualizer />
            <div className="max-w-container" style={{ position: 'relative', zIndex: 2 }}>
                <div className="section-label-wrapper">
                    <div className="section-label-line" />
                    <span className="section-label">Partnerships</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--text-main)', marginBottom: '40px', letterSpacing: '-0.04em' }}>
                    Collaborate on the Frontier.
                </h1>
                <p style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', color: 'var(--text-muted)', maxWidth: '800px', lineHeight: 1.7, marginBottom: '80px' }}>
                    We form strategic alliances with industry leaders, research institutions, and visionary enterprises to integrate our deep tech infrastructure into the real world.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '40px', marginBottom: '100px' }}>
                    {[
                        { title: 'Research Partnerships', desc: 'Collaborate with our scientists on quantum control, AI reasoning, and robotic perception.' },
                        { title: 'Enterprise Integration', desc: 'Embed Sophisticates core intelligence models directly into your high-scale systems.' },
                        { title: 'Strategic Alliances', desc: 'Joint-ventures to scale advanced physical infrastructure across global markets.' }
                    ].map((program, i) => (
                        <div key={i} className="hover-target glass-panel" style={{ padding: '40px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)' }}>
                            <div style={{ width: '40px', height: '1px', background: 'var(--text-dim)', marginBottom: '24px' }} />
                            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontFamily: 'var(--font-display)', marginBottom: '16px', fontWeight: 400 }}>{program.title}</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>{program.desc}</p>
                        </div>
                    ))}
                </div>

                <div style={{ background: 'var(--nav-bg)', border: '1px solid var(--border-color)', padding: 'clamp(40px, 8vw, 80px)', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--text-main)', fontFamily: 'var(--font-display)', marginBottom: '24px', fontWeight: 400 }}>Initiate a Partnership</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
                        If your organization operates at the highest level of scale and ambition, we want to talk.
                    </p>
                    <Link href="/contact" className="btn-premium hover-target" style={{ display: 'inline-block', textDecoration: 'none', padding: '16px 40px', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Contact Partnership Team
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Partners;
