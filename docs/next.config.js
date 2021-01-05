const rehypeSlug = require('rehype-slug');
const rehypePrism = require('@mapbox/rehype-prism');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypePrism, rehypeSlug],
  },
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack: config => {
    config.module.rules.push({
      test: /\.html$/i,
      loader: 'html-loader',
    });

    return config;
  },
});
