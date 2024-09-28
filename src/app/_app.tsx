// _app.tsx
import { AppProps } from 'next/app';
import Head from 'next/head';
// import 'aos/dist/aos.css';
import '../styles/globals.css'; // Your global styles

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
     
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
