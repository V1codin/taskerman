/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
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
  babel: {
    plugins: [
      [
        'babel-plugin-inline-react-svg',
        {
          svgo: {
            plugins: [{ removeViewBox: false }],
          },
        },
      ],
    ],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
