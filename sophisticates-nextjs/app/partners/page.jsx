import Partners from '../../components/Partners';

export const metadata = {
    title: 'Partners: Sophisticates | Deep Tech Strategic Alliances',
    description: 'Partner with Sophisticates on the frontier of deep tech. We form strategic alliances with industry leaders, research institutions, and enterprises to integrate AI, Quantum Computing, and Robotics infrastructure.',
    alternates: {
        canonical: 'https://sophisticatesai.com/partners',
    },
    openGraph: {
        title: 'Partners: Sophisticates | Deep Tech Strategic Alliances',
        description: 'Partner with Sophisticates on the frontier of deep tech. Strategic alliances across AI, Quantum Computing, and Robotics infrastructure.',
        url: 'https://sophisticatesai.com/partners',
        images: [{ url: '/sophisticates.png', width: 667, height: 667, alt: 'Sophisticates Partners' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Partners: Sophisticates | Deep Tech Strategic Alliances',
        description: 'Partner with Sophisticates on the frontier of deep tech.',
        images: ['/sophisticates.png'],
    },
};

export default function PartnersPage() {
    return <Partners />;
}
