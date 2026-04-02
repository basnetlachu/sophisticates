'use client';

import React, { useEffect } from 'react';
import Contact from './Contact';

const ContactPageClient = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="smooth-scroll-wrapper">
            <div style={{ paddingTop: 'clamp(60px, 10vh, 100px)' }}>
                <Contact />
            </div>
            <div style={{ minHeight: '20vh', background: 'var(--bg-color)' }} />
        </main>
    );
};

export default ContactPageClient;
