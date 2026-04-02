import HomeClient from '../components/HomeClient';

export const metadata = {
    title: 'Sophisticates — Deep Tech Venture Company | AI, Quantum Computing, Robotics & Physics',
    description: 'Sophisticates is a deep tech venture company founded by Lachu Man Basnet. We build companies from first principles across AI, Quantum Computing, Robotics, and Physics. Flagship product: MEMOPT — Universal Memory Fabric.',
    alternates: {
        canonical: 'https://sophisticatesai.com/',
    },
};

export default function HomePage() {
    return <HomeClient />;
}
