import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.leftMargin}></div>
      <div className={styles.signature}>Made by kena0ki</div>
    </footer>
  );
}
