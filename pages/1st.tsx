import Link from 'next/link';
import styles from './1st.module.scss';
import Layout from '../components/layout';
import Button from '../components/buttons';
import { TXTKEYTABLE, useLanguage } from '../components/language-context';
import { PageProps } from './_app';

const {first: K} = TXTKEYTABLE;

export default function Home({ setLang }: PageProps) {
  const getT = useLanguage();

  return (
    <Layout setLang={setLang}>
      <h1 className={styles.title}>{getT(K.title)}</h1>
      <p className={styles.description}>{getT(K.description)}</p>
      <div className={styles.button}>
        <Link href="/2nd">
          <Button size="big" >Try!</Button>
        </Link>
      </div>
      <p className={styles.disclaimer}>
        {getT(K.disclaimer1)}
        <a target="_blank" rel="noreferrer" href="https://openaccess.thecvf.com/content/WACV2021/papers/Li_Few-Shot_Font_Style_Transfer_Between_Different_Languages_WACV_2021_paper.pdf" >{getT(K.disclaimer2)}</a>
        {getT(K.disclaimer3)}
      </p>
    </Layout>
  );
}
