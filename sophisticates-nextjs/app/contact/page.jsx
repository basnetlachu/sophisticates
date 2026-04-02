import ContactPageClient from '../../components/ContactPageClient';

export const metadata = {
    title: 'Contact Sophisticates — Deep Tech Venture Company',
    description: 'Get in touch with Sophisticates. Contact us for partnerships, enterprise integrations, or general inquiries. Email hello@sophisticatesai.com or reach us via the contact form.',
    alternates: {
        canonical: 'https://sophisticatesai.com/contact',
    },
};

export default function ContactPage() {
    return <ContactPageClient />;
}
