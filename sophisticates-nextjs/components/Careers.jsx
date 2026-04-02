'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Careers = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <main className="smooth-scroll-wrapper" style={{ paddingTop: '160px', paddingBottom: '160px', minHeight: '100vh', background: 'var(--bg-color)' }}>
            <div className="max-w-container">
                <div className="section-label-wrapper">
                    <div className="section-label-line" />
                    <span className="section-label">Careers</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--text-main)', marginBottom: '40px', letterSpacing: '-0.04em' }}>
                    Solve the Unsolved.
                </h1>
                <p style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', color: 'var(--text-muted)', maxWidth: '800px', lineHeight: 1.7, marginBottom: '100px' }}>
                    We are looking for the top 1% of researchers, physicists, and engineers. Join Sophisticates to build the fundamental infrastructure of intelligence and physical systems.
                </p>

                <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', fontFamily: 'var(--font-display)', marginBottom: '40px' }}>Open Positions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                        { title: 'Senior AI Researcher', dept: 'Artificial Intelligence', loc: 'Remote / London' },
                        { title: 'Quantum Control Engineer', dept: 'Quantum Computing', loc: 'San Francisco' },
                        { title: 'Robotics Perception Lead', dept: 'Robotics', loc: 'Berlin' }
                    ].map((job, i) => (
                        <div key={i} className="hover-target" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.01)', cursor: 'pointer', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'}>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontFamily: 'var(--font-display)', margin: '0 0 12px 0', fontWeight: 400 }}>{job.title}</h4>
                                <div style={{ display: 'flex', gap: '24px', fontSize: '0.85rem', color: 'var(--text-dim)', fontFamily: 'monospace' }}>
                                    <span>{job.dept}</span>
                                    <span>{job.loc}</span>
                                </div>
                            </div>
                            <div style={{ color: 'var(--text-main)' }}>→</div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};
export default Careers;
