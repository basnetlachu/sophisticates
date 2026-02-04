import React, { useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Vision from './components/Vision';
import Purpose from './components/Purpose';
import ValueProposition from './components/ValueProposition';
import WhoWeServe from './components/WhoWeServe';
import Infrastructure from './components/Infrastructure';
import Products from './components/Products';
import UseCases from './components/UseCases';
import Roadmap from './components/Roadmap';
import Values from './components/Values';
import Personality from './components/Personality';
import Contact from './components/Contact';

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
            <Hero />
            <About />
            <Vision />
            <Purpose />
            <ValueProposition />
            <WhoWeServe />
            <Infrastructure />
            <Products />
            <UseCases />
            <Roadmap />
            <Values />
            <Personality />
            <Contact />
        </main>
    );
}

export default Home;
