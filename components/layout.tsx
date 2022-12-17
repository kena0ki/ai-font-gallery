import styles from './layout.module.scss';
import Divider from './divider';
import Footer from './footer';
import Header from './header';

type Props = {
  children?: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <Header/>
      <main className={styles.main}>{children}</main>
      <Divider/>
      <Footer/>
    </div>
  );
}
