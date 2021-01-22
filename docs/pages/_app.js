import '../styles/index.css';
import Head from 'next/head';
import { NotifierContextProvider } from '../../';
import { MDXProvider } from '@mdx-js/react';
import 'prismjs/themes/prism-tomorrow.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ThemeContextProvider } from '../components/ThemeContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>
          React Headless Notifier - Highly customizable notifications for React
        </title>
        <meta
          name="title"
          content="React Headless Notifier - Highly customizable notifications for React"
        />
        <meta
          name="description"
          content="React Headless Notifier is component library for building highly customizable notification system. This library is lightweight, and ultra-customizable, but do not render any markup or styles for you. This effectively means that React Headless Notifier is a headless UI library"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://react-headless-notifier.recodable.io/"
        />
        <meta
          property="og:title"
          content="React Headless Notifier - Highly customizable notifications for React"
        />
        <meta
          property="og:description"
          content="React Headless Notifier is component library for building highly customizable notification system. This library is lightweight, and ultra-customizable, but do not render any markup or styles for you. This effectively means that React Headless Notifier is a headless UI library"
        />
        <meta
          property="og:image"
          content="https://react-headless-notifier.recodable.io/social.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://react-headless-notifier.recodable.io/"
        />
        <meta
          property="twitter:title"
          content="React Headless Notifier - Highly customizable notifications for React"
        />
        <meta
          property="twitter:description"
          content="React Headless Notifier is component library for building highly customizable notification system. This library is lightweight, and ultra-customizable, but do not render any markup or styles for you. This effectively means that React Headless Notifier is a headless UI library"
        />
        <meta
          property="twitter:image"
          content="https://react-headless-notifier.recodable.io/social.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32.ico"
        />
      </Head>

      <MDXProvider>
        <NotifierContextProvider>
          <ThemeContextProvider>
            <Navbar />

            <Component {...pageProps} />

            <Footer />
          </ThemeContextProvider>
        </NotifierContextProvider>
      </MDXProvider>
    </>
  );
}
