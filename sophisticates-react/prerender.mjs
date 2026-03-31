/**
 * prerender.mjs — Static HTML Pre-renderer for Sophisticates React SPA
 *
 * How it works:
 * 1. Builds the Vite app (npm run build)
 * 2. Starts a local static server serving dist/
 * 3. Uses Node's built-in fetch to load each route
 * 4. However, since the app is a React SPA, we use a different strategy:
 *    We copy index.html for each route and inject route-specific meta tags
 *    directly into the HTML so Googlebot sees correct titles/descriptions on first load.
 *
 * Run after build: node prerender.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, 'dist');

// Route definitions — each route gets its own static HTML with correct meta tags
const routes = [
  {
    path: '/',
    outDir: distDir,
    outFile: 'index.html',
    title: 'Sophisticates: Deep Tech Venture in AI, Quantum Computing, Robotics & Physics',
    description: 'Sophisticates is a deep tech venture company founded by Lachu Man Basnet. We build ventures across AI, Quantum Computing, Robotics, and Physics — including MEMOPT, our Universal Memory Fabric that eliminates the Memory Wall in AI infrastructure.',
    canonical: 'https://sophisticatesai.com/',
    ogUrl: 'https://sophisticatesai.com/',
  },
  {
    path: '/about',
    outDir: join(distDir, 'about'),
    outFile: 'index.html',
    title: 'About Sophisticates — Deep Tech Venture Company | Clarity In Complexity',
    description: 'Learn about Sophisticates — a deep tech venture company founded by Lachu Man Basnet. We bridge the gap between theoretical possibility and practical reality across AI, Quantum Computing, Robotics, and Physics.',
    canonical: 'https://sophisticatesai.com/about',
    ogUrl: 'https://sophisticatesai.com/about',
  },
  {
    path: '/research',
    outDir: join(distDir, 'research'),
    outFile: 'index.html',
    title: 'Research — Sophisticates | AI, Quantum Computing, Robotics & Physics',
    description: 'Sophisticates research spans AI infrastructure, Quantum Computing, Robotics, and Physics. Explore our deep tech research areas including MEMOPT — our Universal Memory Fabric for AI workloads.',
    canonical: 'https://sophisticatesai.com/research',
    ogUrl: 'https://sophisticatesai.com/research',
  },
  {
    path: '/partners',
    outDir: join(distDir, 'partners'),
    outFile: 'index.html',
    title: 'Partners — Sophisticates | Deep Tech Strategic Alliances',
    description: 'Partner with Sophisticates on the frontier of deep tech. We form strategic alliances with industry leaders, research institutions, and enterprises to integrate AI, Quantum Computing, and Robotics infrastructure.',
    canonical: 'https://sophisticatesai.com/partners',
    ogUrl: 'https://sophisticatesai.com/partners',
  },
  {
    path: '/contact',
    outDir: join(distDir, 'contact'),
    outFile: 'index.html',
    title: 'Contact Sophisticates — Deep Tech Venture Company',
    description: 'Get in touch with Sophisticates. Contact us for partnerships, enterprise integrations, or general inquiries. Email hello@sophisticatesai.com or reach us via the contact form.',
    canonical: 'https://sophisticatesai.com/contact',
    ogUrl: 'https://sophisticatesai.com/contact',
  },
  {
    path: '/privacy',
    outDir: join(distDir, 'privacy'),
    outFile: 'index.html',
    title: 'Privacy Policy — Sophisticates',
    description: 'Privacy Policy for Sophisticates (sophisticatesai.com). Learn how we collect, use, and protect your personal information.',
    canonical: 'https://sophisticatesai.com/privacy',
    ogUrl: 'https://sophisticatesai.com/privacy',
  },
  {
    path: '/terms',
    outDir: join(distDir, 'terms'),
    outFile: 'index.html',
    title: 'Terms of Service — Sophisticates',
    description: 'Terms of Service for Sophisticates (sophisticatesai.com). Read the terms and conditions governing your use of our website and services.',
    canonical: 'https://sophisticatesai.com/terms',
    ogUrl: 'https://sophisticatesai.com/terms',
  },
];

function injectMeta(html, route) {
  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description"\s+content="[^"]*">/,
    `<meta name="description" content="${route.description}">`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*">/,
    `<link rel="canonical" href="${route.canonical}">`
  );

  // Replace OG URL
  html = html.replace(
    /<meta property="og:url" content="[^"]*">/,
    `<meta property="og:url" content="${route.ogUrl}">`
  );

  // Replace OG title
  html = html.replace(
    /<meta property="og:title" content="[^"]*">/,
    `<meta property="og:title" content="${route.title}">`
  );

  // Replace OG description
  html = html.replace(
    /<meta property="og:description"\s+content="[^"]*">/,
    `<meta property="og:description" content="${route.description}">`
  );

  // Replace Twitter URL
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*">/,
    `<meta name="twitter:url" content="${route.ogUrl}">`
  );

  // Replace Twitter title
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*">/,
    `<meta name="twitter:title" content="${route.title}">`
  );

  // Replace Twitter description
  html = html.replace(
    /<meta name="twitter:description"\s+content="[^"]*">/,
    `<meta name="twitter:description" content="${route.description}">`
  );

  return html;
}

// Check dist/ exists
if (!existsSync(distDir)) {
  console.error('❌  dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

// Read the base index.html from dist/
const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf-8');

let success = 0;
let failed = 0;

for (const route of routes) {
  try {
    const injected = injectMeta(baseHtml, route);

    // Ensure output directory exists
    if (!existsSync(route.outDir)) {
      mkdirSync(route.outDir, { recursive: true });
    }

    writeFileSync(join(route.outDir, route.outFile), injected, 'utf-8');
    console.log(`✅  Pre-rendered: ${route.canonical}`);
    success++;
  } catch (err) {
    console.error(`❌  Failed: ${route.path} — ${err.message}`);
    failed++;
  }
}

console.log(`\n🎉  Done! ${success} pages pre-rendered, ${failed} failed.`);
console.log('Deploy the dist/ folder to your host and Google will see unique static HTML for each route.');
