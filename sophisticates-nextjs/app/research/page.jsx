import Research from '../../components/Research';

export const metadata = {
    title: 'Research: Sophisticates | AI, Quantum Computing, Robotics & Physics',
    description: 'Sophisticates research spans AI infrastructure, Quantum Computing, Robotics, and Physics. Explore our deep tech research areas including MEMOPT — our Universal Memory Fabric for AI workloads.',
    alternates: {
        canonical: 'https://sophisticatesai.com/research',
    },
    openGraph: {
        title: 'Research: Sophisticates | AI, Quantum Computing, Robotics & Physics',
        description: 'Sophisticates research spans AI infrastructure, Quantum Computing, Robotics, and Physics. Explore MEMOPT — our Universal Memory Fabric for AI workloads.',
        url: 'https://sophisticatesai.com/research',
        images: [{ url: '/sophisticates.png', width: 667, height: 667, alt: 'Sophisticates Research' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Research: Sophisticates | AI, Quantum Computing, Robotics & Physics',
        description: 'Sophisticates research spans AI infrastructure, Quantum Computing, Robotics, and Physics.',
        images: ['/sophisticates.png'],
    },
};

export default function ResearchPage() {
    return <Research />;
}
