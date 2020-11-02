import '../styles/globals.css';
import 'fontsource-montserrat';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Footer from '../Components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
