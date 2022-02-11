import styles from './Wrapper.module.scss';
import Head from 'next/head';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';

export const Wrapper = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Padcaster Portal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Header />
        <Sidebar />
        <div className={styles.scrollContainer}>
          {children}
        </div>
      </div>
    </>
  );
}

export default Wrapper;