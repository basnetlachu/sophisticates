import React from 'react';

const Leadership = () => {
    const team = [
        { name: 'John Doe', role: 'Chief Executive Officer', bg: 'Former Director of Advanced Projects at X' },
        { name: 'Jane Smith', role: 'Chief Scientist', bg: 'PhD Quantum Physics, MIT' },
        { name: 'Alice Johnson', role: 'Head of Engineering', bg: 'Lead AI Infrastructure Architect' }
    ];

    return (
        <section className="section-padding reveal-on-scroll" style={{ background: 'var(--bg-color)', position: 'relative', marginTop: '120px' }}>
            <div className="max-w-container">
                <div className="section-label-wrapper">
                    <div className="section-label-line" />
                    <span className="section-label">Leadership</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text-main)', marginBottom: '80px', fontWeight: 400 }}>
                    The Minds Behind the Machine
                </h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                    {team.map((member, i) => (
                        <div key={i} style={{ border: '1px solid var(--border-color)', padding: '40px', background: 'rgba(255, 255, 255, 0.01)' }} className="hover-target glass-panel">
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--grid-line)', marginBottom: '32px' }} />
                            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontFamily: 'var(--font-display)', margin: '0 0 8px 0', fontWeight: 400 }}>{member.name}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontFamily: 'monospace', margin: '0 0 24px 0', textTransform: 'uppercase' }}>{member.role}</p>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', margin: 0 }}>{member.bg}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Leadership;
