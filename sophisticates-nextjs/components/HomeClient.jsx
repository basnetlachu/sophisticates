'use client';

import React, { useEffect } from 'react';
import Hero from './Hero';
import Marquee from './Marquee';
import StatsStrip from './StatsStrip';
import ProblemStatement from './ProblemStatement';
import Portfolio from './Portfolio';
import ValueProposition from './ValueProposition';
import Products from './Products';
import Roadmap from './Roadmap';
import Founder from './Founder';
import FAQ from './FAQ';
import Closing from './Closing';
import ChatWidget from './ChatWidget';

const HomeClient = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <main className="smooth-scroll-wrapper">
            <Hero />
            <Marquee />
            <StatsStrip />
            <ProblemStatement />
            <Portfolio />
            <ValueProposition />
            <Products />
            <Roadmap />
            <Founder />
            <FAQ />
            <Closing />
            <ChatWidget />
        </main>
    );
};

export default HomeClient;
