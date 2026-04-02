import About from '../../components/About';

export const metadata = {
    title: 'About Sophisticates: Deep Tech Venture Company | Clarity In Complexity',
    description: 'Learn about Sophisticates: a deep tech venture company founded by Lachu Man Basnet. We bridge the gap between theoretical possibility and practical reality across AI, Quantum Computing, Robotics, and Physics.',
    alternates: {
        canonical: 'https://sophisticatesai.com/about',
    },
    openGraph: {
        title: 'About Sophisticates: Deep Tech Venture Company',
        description: 'Learn about Sophisticates: a deep tech venture company founded by Lachu Man Basnet. We bridge the gap between theoretical possibility and practical reality across AI, Quantum Computing, Robotics, and Physics.',
        url: 'https://sophisticatesai.com/about',
        images: [{ url: '/sophisticates.png', width: 667, height: 667, alt: 'Sophisticates: Deep Tech Company' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Sophisticates: Deep Tech Venture Company',
        description: 'Learn about Sophisticates: a deep tech venture company founded by Lachu Man Basnet.',
        images: ['/sophisticates.png'],
    },
};

export default function AboutPage() {
    return <About />;
}
