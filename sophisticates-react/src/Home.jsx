import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import StatsStrip from './components/StatsStrip';
import ProblemStatement from './components/ProblemStatement';
import Portfolio from './components/Portfolio';
import ValueProposition from './components/ValueProposition';
import Products from './components/Products';
import Roadmap from './components/Roadmap';
import Founder from './components/Founder';
import FAQ from './components/FAQ';
import Closing from './components/Closing';


function Home() {
    useEffect(() => {
        // Reveal on scroll observer
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
            <Helmet>
                <title>Sophisticates — Deep Tech Venture Company | AI, Quantum Computing, Robotics & Physics</title>
                <meta name="description" content="Sophisticates is a deep tech venture company founded by Lachu Man Basnet. We build companies from first principles across AI, Quantum Computing, Robotics, and Physics. Flagship product: MEMOPT — Universal Memory Fabric." />
                <link rel="canonical" href="https://sophisticatesai.com/" />
            </Helmet>
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

        </main>
    );
}

export default Home;
