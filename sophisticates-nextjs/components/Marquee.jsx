'use client';

import React from 'react';

const items = [
    'Artificial Intelligence',
    'Quantum Computing',
    'Robotics',
    'Physics',
    'MEMOPT',
    'Deep Tech',
    'First Principles',
    'Memory Fabric',
    'Autonomy',
    'Clarity in Complexity',
    'Frontier Engineering',
    'Redefining Reality',
];

const MarqueeTrack = ({ reverse = false }) => {
    const repeated = [...items, ...items, ...items];

    return (
        <div style={{
            display: 'flex',
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}>
            <div style={{
                display: 'flex',
                gap: '0',
                animation: `marquee-scroll${reverse ? '-reverse' : ''} 40s linear infinite`,
                willChange: 'transform',
                flexShrink: 0,
            }}>
                {repeated.map((item, i) => (
                    <span key={i} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0',
                        whiteSpace: 'nowrap',
                        padding: '0 clamp(20px, 3vw, 40px)',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(0.65rem, 0.85vw, 0.8rem)',
                        fontWeight: 400,
                        textTransform: 'uppercase',
                        letterSpacing: '0.25em',
                        color: i % 3 === 0 ? 'var(--text-muted)' : 'var(--text-dim)',
                    }}>
                        {item}
                        <span style={{
                            display: 'inline-block',
                            width: '3px',
                            height: '3px',
                            borderRadius: '50%',
                            background: 'var(--border-color)',
                            marginLeft: 'clamp(20px, 3vw, 40px)',
                            flexShrink: 0,
                        }} />
                    </span>
                ))}
            </div>
        </div>
    );
};

const Marquee = () => {
    return (
        <>
            <style>{`
                @keyframes marquee-scroll {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-33.333%); }
                }
                @keyframes marquee-scroll-reverse {
                    from { transform: translateX(-33.333%); }
                    to   { transform: translateX(0); }
                }
            `}</style>

            <div style={{
                borderTop: '1px solid var(--border-color)',
                borderBottom: '1px solid var(--border-color)',
                padding: 'clamp(14px, 2vh, 20px) 0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(10px, 1.5vh, 16px)',
                background: 'var(--bg-color)',
            }}>
                <MarqueeTrack reverse={false} />
                <MarqueeTrack reverse={true} />
            </div>
        </>
    );
};

export default Marquee;
