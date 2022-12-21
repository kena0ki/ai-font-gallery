import Link from 'next/link';
import styles from './1st.module.scss';
import Layout from '../components/layout';
import Button from '../components/buttons';

export default function Home() {

  const title=`AI Font Gallery`;
  const description=
`AIによるフォント自動生成を試すことができるサイトです。
数枚の文字画像からフォントを生成します`;
  const disclaimer1= `現状は`;
  const disclaimer2= `FTransGAN`;
  const disclaimer3= `というAIのモデルにより生成を行います。`;

  return (
    <Layout>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.button}>
        <Link href="/2nd">
          <Button size="big" >Try!</Button>
        </Link>
      </div>
      <p className={styles.disclaimer}>
        {disclaimer1}
        <a target="_blank" rel="noreferrer" href="https://openaccess.thecvf.com/content/WACV2021/papers/Li_Few-Shot_Font_Style_Transfer_Between_Different_Languages_WACV_2021_paper.pdf" >{disclaimer2}</a>
        {disclaimer3}
      </p>
    </Layout>
  );
}
