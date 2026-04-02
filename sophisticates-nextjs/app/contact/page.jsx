import ContactPageClient from '../../components/ContactPageClient';

export const metadata = {
    title: 'Contact Sophisticates — Deep Tech Venture Company',
    description: 'Get in touch with Sophisticates. Contact us for partnerships, enterprise integrations, or general inquiries. Email hello@sophisticatesai.com or reach us via the contact form.',
    alternates: {
        canonical: 'https://sophisticatesai.com/contact',
    },
    openGraph: {
        title: 'Contact Sophisticates — Deep Tech Venture Company',
        description: 'Get in touch with Sophisticates for partnerships, enterprise integrations, or general inquiries.',
        url: 'https://sophisticatesai.com/contact',
        images: [{ url: '/sophisticates.png', width: 667, height: 667, alt: 'Contact Sophisticates' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Sophisticates — Deep Tech Venture Company',
        description: 'Get in touch with Sophisticates for partnerships, enterprise integrations, or general inquiries.',
        images: ['/sophisticates.png'],
    },
};

export default function ContactPage() {
    return <ContactPageClient />;
}
