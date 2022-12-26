import Head from 'next/head';
import styles from './layout.module.scss';
import Divider from './divider';
import Footer from './footer';
import Header from './header';
import { SITE_NAME } from '../utils/constants';
import { PageProps } from '../pages/_app';

type Props = {
  children?: React.ReactNode
  setLang: PageProps['setLang'],
}

export default function Layout({ children, setLang }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{SITE_NAME}</title>
      </Head>
      <Header setLang={setLang}/>
      <main className={styles.main}>{children}</main>
      <Divider/>
      <Footer/>
    </div>
  );
}
