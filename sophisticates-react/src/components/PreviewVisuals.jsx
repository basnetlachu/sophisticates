import React from 'react';
import { VPPicture, ProductPicture, InfraPicture } from './StaticVisuals3D';
import { useTheme } from '../context/ThemeContext';

const PreviewVisuals = () => {
    const { isDarkMode } = useTheme();

    const containerStyle = {
        padding: '100px 50px',
        background: 'var(--bg-color)',
        minHeight: '100vh',
        color: 'var(--text-main)',
        fontFamily: 'var(--font-display)',
        position: 'relative',
        zIndex: 10
    };

    const sectionStyle = {
        marginBottom: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
    };

    const visualContainerStyle = {
        width: '500px',
        height: '500px',
        border: '1px solid var(--border-color)',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative'
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ textAlign: 'center', marginBottom: '80px' }}>3D Visuals Preview</h1>
            
            <div style={sectionStyle}>
                <h2>1. Value Proposition (Philosophy)</h2>
                <p style={{ color: 'var(--text-muted)' }}>Chaos being organized by a structural glass filter into a grid.</p>
                <div style={visualContainerStyle}>
                    <VPPicture />
                </div>
            </div>

            <div style={sectionStyle}>
                <h2>2. Products (MEMOPT)</h2>
                <p style={{ color: 'var(--text-muted)' }}>Multi-tier orchestration rings with efficient data flow.</p>
                <div style={visualContainerStyle}>
                    <ProductPicture />
                </div>
            </div>

            <div style={sectionStyle}>
                <h2>3. Infrastructure (Architecture)</h2>
                <p style={{ color: 'var(--text-muted)' }}>Foundational structural slabs supported by parallel pillars.</p>
                <div style={visualContainerStyle}>
                    <InfraPicture />
                </div>
            </div>
        </div>
    );
};

export default PreviewVisuals;
