import { Privacy } from '../../components/LegalPages';

export const metadata = {
    title: 'Privacy Policy: Sophisticates',
    description: 'Sophisticates privacy policy. We collect the minimum necessary data with scientific rigor. Read how we handle your information.',
    alternates: {
        canonical: 'https://sophisticatesai.com/privacy',
    },
    openGraph: {
        title: 'Privacy Policy: Sophisticates',
        description: 'Sophisticates privacy policy. We collect the minimum necessary data with scientific rigor.',
        url: 'https://sophisticatesai.com/privacy',
        images: [{ url: '/sophisticates.png', width: 667, height: 667, alt: 'Sophisticates Privacy Policy' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Privacy Policy: Sophisticates',
        description: 'Sophisticates privacy policy. We collect the minimum necessary data with scientific rigor.',
        images: ['/sophisticates.png'],
    },
};

export default function PrivacyPage() {
    return <Privacy />;
}
