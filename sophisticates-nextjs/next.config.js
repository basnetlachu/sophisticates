/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Allow Three.js to work properly
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  // Serve static files from public/
  // Images: use standard img tags (the site already does this)
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
