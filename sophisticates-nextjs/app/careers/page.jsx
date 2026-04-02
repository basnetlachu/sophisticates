import Careers from '../../components/Careers';

export const metadata = {
    title: 'Careers: Sophisticates | Join the Deep Tech Frontier',
    description: 'Join Sophisticates. We are looking for the top 1% of researchers, physicists, and engineers to build the fundamental infrastructure of intelligence and physical systems.',
    alternates: {
        canonical: 'https://sophisticatesai.com/careers',
    },
    openGraph: {
        title: 'Careers: Sophisticates | Join the Deep Tech Frontier',
        description: 'Join Sophisticates. We are looking for the top 1% of researchers, physicists, and engineers to build the fundamental infrastructure of intelligence and physical systems.',
        url: 'https://sophisticatesai.com/careers',
        images: [{ url: '/sophisticates.png', width: 667, height: 667, alt: 'Careers at Sophisticates' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Careers: Sophisticates | Join the Deep Tech Frontier',
        description: 'Join Sophisticates. Top 1% of researchers, physicists, and engineers building the future of deep tech.',
        images: ['/sophisticates.png'],
    },
};

export default function CareersPage() {
    return <Careers />;
}
