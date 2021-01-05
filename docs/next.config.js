const rehypeHighlight = require('rehype-highlight');
const rehypeSlug = require('rehype-slug');

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypeHighlight, rehypeSlug],
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
