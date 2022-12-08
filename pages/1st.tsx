import Link from 'next/link';
import styles from './1st.module.scss';
import Layout from '../components/layout';
import Button from '../components/button';

export default function Home() {

  const title=`-  AI Font Demo  -`;
  const description=
`AIにより自動生成されたフォントを眺めて楽しむサイトです。
生成で参照するフォントは数枚程度です。`;
  const disclaimer1= `現状では`;
  const disclaimer2= `FTransGAN`;
  const disclaimer3= `というAIのモデルにより生成を行います。`;

  return (
    <Layout>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.button}>
        <Link href="/2nd">
          <Button>Try it!</Button>
        </Link>
      </div>
      <p>{disclaimer1}<a>{disclaimer2}</a>{disclaimer3}</p>
    </Layout>
  );
}
