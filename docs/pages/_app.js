import '../styles/index.css';
import Head from 'next/head';
import { NotifierContextProvider } from 'react-headless-notifier';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>React Headless Notifier</title>
      </Head>

      <NotifierContextProvider>
        <Component {...pageProps} />
      </NotifierContextProvider>
    </>
  );
}
