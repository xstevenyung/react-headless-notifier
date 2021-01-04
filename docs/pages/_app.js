import '../styles/index.css';
import Head from 'next/head';
import { NotifierContextProvider } from '../../';
import { MDXProvider } from '@mdx-js/react';
import 'highlight.js/styles/atom-one-dark.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>React Headless Notifier</title>
      </Head>

      <MDXProvider>
        <NotifierContextProvider>
          <Component {...pageProps} />
        </NotifierContextProvider>
      </MDXProvider>
    </>
  );
}
