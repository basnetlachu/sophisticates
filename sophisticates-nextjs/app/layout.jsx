import './globals.css';
import Providers from '../components/Providers';

export const metadata = {
  metadataBase: new URL('https://sophisticatesai.com'),
  title: {
    default: 'Sophisticates: Deep Tech Venture in AI, Quantum Computing, Robotics & Physics',
    template: '%s | Sophisticates',
  },
  description: 'Sophisticates is a deep tech venture company founded by Lachu Man Basnet. We build ventures across AI, Quantum Computing, Robotics, and Physics — including MEMOPT, our Universal Memory Fabric that eliminates the Memory Wall in AI infrastructure.',
  keywords: ['Sophisticates', 'Lachu Man Basnet', 'deep tech venture company', 'MEMOPT', 'Universal Memory Fabric', 'AI infrastructure', 'quantum computing company', 'robotics ventures', 'physics engineering', 'deep tech startup'],
  authors: [{ name: 'Sophisticates' }],
  creator: 'Sophisticates',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Sophisticates',
    images: [
      {
        url: '/sophisticates.png',
        width: 667,
        height: 667,
        alt: 'Sophisticates: Deep Tech Company Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/sophisticates.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-144.png', sizes: '144x144', type: 'image/png' },
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/favicon.png', sizes: '192x192' }],
    shortcut: '/favicon.ico',
  },
  verification: {
    google: 'AFhabH78bAxTf71fBfdky9Hg_wccOxdLH4FPf5vdD_c',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@100..800&display=swap"
          rel="stylesheet"
        />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://sophisticatesai.com/#organization",
              "name": "Sophisticates",
              "legalName": "Sophisticates",
              "disambiguatingDescription": "Sophisticates is a global deep tech venture specializing in Quantum Computing, AI infrastructure, Robotics, and Physics — building companies from first principles.",
              "slogan": "Clarity In Complexity, Redefining Reality",
              "url": "https://sophisticatesai.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://sophisticatesai.com/sophisticates.png",
                "width": 667,
                "height": 667
              },
              "description": "Sophisticates is a deep tech company solving humanity's hardest problems across AI, Quantum Computing, Physics, and Robotics.",
              "foundingDate": "2025",
              "industry": "Deep Tech",
              "sameAs": ["https://www.linkedin.com/company/sophisticates/"],
              "founder": {
                "@type": "Person",
                "@id": "https://sophisticatesai.com/#founder",
                "name": "Lachu Man Basnet",
                "jobTitle": "Founder",
                "url": "https://lachumanbasnet.com",
                "sameAs": ["https://lachumanbasnet.com", "https://www.linkedin.com/in/lachu-man-basnet-b7787922b/"]
              },
              "owns": {
                "@type": "SoftwareApplication",
                "name": "MEMOPT",
                "url": "https://memopt.com",
                "description": "Universal Memory Fabric by Sophisticates."
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "lachu.basnet@sophisticatesai.com",
                "contactType": "customer support"
              }
            })
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
