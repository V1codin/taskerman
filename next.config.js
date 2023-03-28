/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        destination: '/',
        source: '/api/auth/\\*{1,}',
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };

    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
        resourceQuery: { not: /url/ },
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
