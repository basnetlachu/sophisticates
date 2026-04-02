import { Terms } from '../../components/LegalPages';

export const metadata = {
    title: 'Terms of Service: Sophisticates',
    description: 'Sophisticates terms of service. Read the terms governing your use of sophisticatesai.com and our deep tech platform.',
    alternates: {
        canonical: 'https://sophisticatesai.com/terms',
    },
    openGraph: {
        title: 'Terms of Service: Sophisticates',
        description: 'Read the terms governing your use of sophisticatesai.com and our deep tech platform.',
        url: 'https://sophisticatesai.com/terms',
        images: [{ url: '/sophisticates.png', width: 667, height: 667, alt: 'Sophisticates Terms of Service' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Terms of Service: Sophisticates',
        description: 'Read the terms governing your use of sophisticatesai.com and our deep tech platform.',
        images: ['/sophisticates.png'],
    },
};

export default function TermsPage() {
    return <Terms />;
}
