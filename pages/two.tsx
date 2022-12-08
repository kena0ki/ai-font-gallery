import styles from './two.module.scss';
import Layout from '../components/layout';
import Button from '../components/button';

const texts = {
  instruction:`生成の元となる画像を６枚アップロードしてください`,
  note:`生成の元となる画像を６枚アップロードしてください`,
};

export default function Home() {

  const {instruction, note} =texts;

  return (
    <Layout>
      <div className={styles.uploadArea}>
        <p className={styles.instruction}>{instruction}</p>
      </div>
      <div className={styles.button}>
        <Button>Done!</Button>
      </div>
      <div className={styles.note}>{note}</div>
    </Layout>
  );
}
