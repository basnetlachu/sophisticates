import React, { useEffect } from 'react';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import Infrastructure from './components/Infrastructure';
import Products from './components/Products';
import Roadmap from './components/Roadmap';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';


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
            <ValueProposition />
            <Products />
            <Infrastructure />
            <Roadmap />
            <FAQ />
            <Newsletter />

        </main>
    );
}

export default Home;
