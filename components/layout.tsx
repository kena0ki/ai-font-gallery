import Head from 'next/head';
import styles from './layout.module.scss';
import Divider from './divider';
import Footer from './footer';
import Header from './header';
import { SITE_NAME } from '../utils/constants';
import { PageProps } from '../pages/_app';
import Wood from './wood.svg';
import Paper from './paper.svg';

type Props = {
  children?: React.ReactNode
  changeLang: PageProps['changeLang'],
}

export default function Layout({ children, changeLang }: Props) {
  return <>
    <Wood className={styles.wood}></Wood>
    <div className={styles.paperContainer}>
      <Paper className={styles.paper}></Paper>
      <div className={styles.container}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{SITE_NAME}</title>
        </Head>
        <Header changeLang={changeLang}/>
        <main className={styles.main}>{children}</main>
        <Divider/>
        <Footer/>
      </div>
    </div>
  </>;
}
